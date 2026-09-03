import {
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import dagre from "dagre";

type ElementSkeleton = NonNullable<Parameters<typeof convertToExcalidrawElements>[0]>[number];

type GeminiNode = {
  id: string;
  type: string;
  label: string;
};

type GeminiEdge = {
  from: string;
  to: string;
  label?: string;
};

type GeminiResponse = {
  type?: string;
  nodes?: GeminiNode[];
  edges?: GeminiEdge[];
};

type PositionedNode = GeminiNode & {
  x: number;
  y: number;
  width: number;
  height: number;
};

function cleanGeminiResponse(response: unknown): GeminiResponse {
  let text: string;

  if (typeof response === "string") {
    text = response;
  } else {
    const obj = response as Record<string, unknown>;

    if (typeof obj.result === "string") {
      text = obj.result;
    } else {
      return response as GeminiResponse;
    }
  }

  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(text);
  } catch {
    console.error("Invalid Gemini JSON:", text);
    throw new Error("Gemini returned invalid JSON");
  }
}

function getNodeSize(type: string) {
  switch (type.toLowerCase()) {
    case "decision":
    case "diamond":
      return {
        width: 190,
        height: 110,
      };

    case "start":
    case "end":
      return {
        width: 170,
        height: 65,
      };

    case "input":
    case "output":
      return {
        width: 190,
        height: 70,
      };

    default:
      return {
        width: 190,
        height: 70,
      };
  }
}

function getShapeType(type: string) {
  switch (type.toLowerCase()) {
    case "decision":
    case "diamond":
      return "diamond";

    case "start":
    case "end":
      return "ellipse";

    case "input":
    case "output":
      return "rectangle";

    case "ellipse":
      return "ellipse";

    default:
      return "rectangle";
  }
}

function getColors(
  diagramType: string,
  nodeType: string,
) {
  const type = nodeType.toLowerCase();

  if (diagramType === "flowchart") {
    if (type === "start" || type === "end") {
      return {
        backgroundColor: "#dcfce7",
        strokeColor: "#16a34a",
      };
    }

    if (type === "decision") {
      return {
        backgroundColor: "#fef3c7",
        strokeColor: "#d97706",
      };
    }

    if (type === "input" || type === "output") {
      return {
        backgroundColor: "#dbeafe",
        strokeColor: "#2563eb",
      };
    }

    return {
      backgroundColor: "#f5f3ff",
      strokeColor: "#7c3aed",
    };
  }

  if (diagramType === "architecture") {
    return {
      backgroundColor: "#fff7ed",
      strokeColor: "#ea580c",
    };
  }

  if (diagramType === "web-mockup") {
    return {
      backgroundColor: "#f8fafc",
      strokeColor: "#64748b",
    };
  }

  if (diagramType === "mobile-mockup") {
    return {
      backgroundColor: "#fdf2f8",
      strokeColor: "#db2777",
    };
  }

  return {
    backgroundColor: "#f5f3ff",
    strokeColor: "#7c3aed",
  };
}

function getLayoutDirection(
  diagramType: string,
) {
  switch (diagramType) {
    case "architecture":
      return "LR";

    case "web-mockup":
    case "mobile-mockup":
    case "flowchart":
    default:
      return "TB";
  }
}

function calculateLayout(
  diagram: GeminiResponse,
) {
  const nodes = diagram.nodes ?? [];
  const edges = diagram.edges ?? [];

  const graph = new dagre.graphlib.Graph();

  graph.setGraph({
    rankdir: getLayoutDirection(
      diagram.type ?? "flowchart",
    ),
    ranksep: 100,
    nodesep: 70,
    marginx: 50,
    marginy: 50,
  });

  graph.setDefaultEdgeLabel(() => ({}));

  for (const node of nodes) {
    const size = getNodeSize(node.type);

    graph.setNode(node.id, {
      width: size.width,
      height: size.height,
    });
  }

  for (const edge of edges) {
    graph.setEdge(edge.from, edge.to);
  }

  dagre.layout(graph);

  return nodes.map((node) => {
    const size = getNodeSize(node.type);
    const position = graph.node(node.id);

    return {
      ...node,

      x: position.x - size.width / 2,
      y: position.y - size.height / 2,

      width: size.width,
      height: size.height,
    };
  });
}

function getConnectionPoints(
  from: PositionedNode,
  to: PositionedNode,
  offsetX: number,
  offsetY: number,
) {
  const fromCenterX =
    from.x + from.width / 2;
  const fromCenterY =
    from.y + from.height / 2;

  const toCenterX =
    to.x + to.width / 2;
  const toCenterY =
    to.y + to.height / 2;

  const dx = toCenterX - fromCenterX;
  const dy = toCenterY - fromCenterY;

  let startX = fromCenterX;
  let startY = fromCenterY;

  let endX = toCenterX;
  let endY = toCenterY;

  /*
   * Choose the correct side of the node.
   */
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      startX = from.x + from.width;
      endX = to.x;
    } else {
      startX = from.x;
      endX = to.x + to.width;
    }
  } else {
    if (dy > 0) {
      startY = from.y + from.height;
      endY = to.y;
    } else {
      startY = from.y;
      endY = to.y + to.height;
    }
  }

  return {
    startX: startX + offsetX,
    startY: startY + offsetY,
    endX: endX + offsetX,
    endY: endY + offsetY,
  };
}

export function geminiToExcalidraw(
  response: unknown,
  offsetX = 0,
  offsetY = 0,
) {
  const diagram = cleanGeminiResponse(response);

  if (!diagram.nodes || diagram.nodes.length === 0) {
    throw new Error(
      "Gemini response contains no nodes",
    );
  }

  const nodes = calculateLayout(diagram);

  const nodeMap = new Map<string, PositionedNode>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  /*
   * --------------------------------------------
   * CREATE NODE SHAPES
   * --------------------------------------------
   */

  const shapeSkeletons: ElementSkeleton[] = [];

  for (const node of nodes) {
    const colors = getColors(
      diagram.type ?? "flowchart",
      node.type,
    );

    shapeSkeletons.push({
      type: getShapeType(node.type),

      id: node.id,

      x: node.x + offsetX,
      y: node.y + offsetY,

      width: node.width,
      height: node.height,

      backgroundColor:
        colors.backgroundColor,

      strokeColor:
        colors.strokeColor,

      fillStyle: "solid",

      strokeWidth: 2,

      roughness: 1,

      roundness:
        getShapeType(node.type) === "rectangle"
          ? {
              type: 3,
            }
          : undefined,
    });

    /*
     * Node label
     */
    shapeSkeletons.push({
      type: "text",

      x:
        node.x +
        offsetX +
        10,

      y:
        node.y +
        offsetY +
        node.height / 2 -
        10,

      width: node.width - 20,

      text: node.label,

      fontSize: 16,

      fontFamily: 1,

      textAlign: "center",

      verticalAlign: "middle",

      strokeColor: "#111827",
    });
  }

  /*
   * --------------------------------------------
   * CREATE NODE ELEMENTS
   * --------------------------------------------
   */

  const nodeElements =
    convertToExcalidrawElements(
      shapeSkeletons,
    );

  /*
   * --------------------------------------------
   * CREATE CONNECTIONS
   * --------------------------------------------
   */

  const edgeSkeletons: ElementSkeleton[] = [];

  for (const edge of diagram.edges ?? []) {
    const from = nodeMap.get(edge.from);
    const to = nodeMap.get(edge.to);

    if (!from || !to) {
      continue;
    }

    const {
      startX,
      startY,
      endX,
      endY,
    } = getConnectionPoints(
      from,
      to,
      offsetX,
      offsetY,
    );

    const dx = endX - startX;
    const dy = endY - startY;

    edgeSkeletons.push({
      type: "arrow",

      x: startX,
      y: startY,

      points: [
        [0, 0],
        [dx, dy],
      ],

      strokeColor: "#64748b",

      strokeWidth: 2,

      roughness: 0,

      startArrowhead: null,

      endArrowhead: "arrow",

      startBinding: {
        elementId: from.id,
        focus: 0,
        gap: 4,
      },

      endBinding: {
        elementId: to.id,
        focus: 0,
        gap: 4,
      },
    });

    /*
     * Edge label
     */
    if (edge.label) {
      edgeSkeletons.push({
        type: "text",

        x:
          (startX + endX) / 2 - 40,

        y:
          (startY + endY) / 2 - 10,

        width: 80,

        text: edge.label,

        fontSize: 13,

        fontFamily: 1,

        textAlign: "center",

        verticalAlign: "middle",

        strokeColor: "#475569",

        backgroundColor: "#ffffff",
      });
    }
  }

  const edgeElements =
    convertToExcalidrawElements(
      edgeSkeletons,
    );

  return [
    ...nodeElements,
    ...edgeElements,
  ];
}