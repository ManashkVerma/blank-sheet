"use client";

import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import {
  Monitor,
  Network,
  PencilRuler,
  Smartphone,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import Footer from "./AIFloatingCompo/Footer";
import Header from "./AIFloatingCompo/Header";
import Heading from "./AIFloatingCompo/content/Heading";
import Tools from "./AIFloatingCompo/content/Tools";
import GenerateRow from "./AIFloatingCompo/content/GenerateRow";
import Prompt from "./AIFloatingCompo/content/Prompt";
import { geminiToExcalidraw } from "./utils/geminiToExcalidraw";

type Props = {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  setShowAiSidebar: any;
};

type AITool = {
  name: string;
  description: string;
  icon: React.ReactNode;

  color: string;
  bgColor: string;
  borderColor: string;

  systemPrompt: string;
};

type GeminiElement = {
  id: string;
  type:
  | "rectangle"
  | "diamond"
  | "ellipse"
  | "text"
  | "container"
  | "service"
  | "button"
  | "start"
  | "end"
  | "process"
  | "decision"
  | "input"
  | "output";

  label?: string;

  x: number;
  y: number;
  width: number;
  height: number;

  backgroundColor?: string;
  strokeColor?: string;

  groupId?: string;
};

function AIFloatingSidebar({ excalidrawAPI, setShowAiSidebar }: Props) {
  const [selectedTool, setSelectedTool] = useState("Generate Diagrams");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const AI_PLACEHOLDER_ID = "ai_generation_placeholder";

  const AITools: AITool[] = [
    {
      name: "Generate Diagrams",
      description: "Create diagrams from ideas",
      icon: <PencilRuler size={18} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "hover:border-blue-200",

      systemPrompt: `
You are an expert diagram designer.

Convert the user's request into a semantic diagram.

Do NOT generate x/y coordinates.

Return only:

{
  "type": "diagram",
  "nodes": [
    {
      "id": "node-1",
      "type": "process",
      "label": "Example"
    }
  ],
  "edges": [
    {
      "from": "node-1",
      "to": "node-2",
      "label": "relationship"
    }
  ]
}

Rules:
- Every node needs a unique ID.
- Every edge must reference existing nodes.
- Represent important relationships.
- Keep the structure simple and logical.
- Do not generate coordinates.
- Do not generate markdown.
- JSON only.
`.trim(),
    },

    {
      name: "Flowchart",
      description: "Turn ideas into workflows",
      icon: <Workflow size={18} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "hover:border-purple-200",

      systemPrompt: `
You are an expert flowchart designer.

Convert the user's request into a semantic flowchart.

DO NOT calculate coordinates.
DO NOT calculate positions.
DO NOT calculate width or height.

The application will calculate the layout automatically.

Return ONLY valid JSON using this structure:

{
  "type": "flowchart",
  "nodes": [
    {
      "id": "start",
      "type": "start",
      "label": "Start"
    },
    {
      "id": "login",
      "type": "process",
      "label": "Enter Email & Password"
    },
    {
      "id": "validate",
      "type": "process",
      "label": "Validate Credentials"
    },
    {
      "id": "valid",
      "type": "decision",
      "label": "Credentials Valid?"
    }
  ],
  "edges": [
    {
      "from": "start",
      "to": "login"
    },
    {
      "from": "login",
      "to": "validate"
    },
    {
      "from": "validate",
      "to": "valid"
    }
  ]
}

Node types:

start
end
process
decision
input
output

Rules:

1. Every node must have a unique ID.
2. Every connection must reference existing node IDs.
3. Decisions should have separate edges for branches.
4. Add labels such as "Yes" and "No" to decision edges.
5. Keep the diagram logically connected.
6. Do not create unnecessary nodes.
7. Do not output coordinates.
8. Do not output markdown.
9. Return JSON only.
`.trim(),
    },

    {
      name: "Architecture",
      description: "Design system architecture",
      icon: <Network size={18} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "hover:border-orange-200",

      systemPrompt: `
You are a senior software architect.

Create a semantic software architecture diagram.

DO NOT generate coordinates.

Return:

{
  "type": "architecture",
  "nodes": [
    {
      "id": "frontend",
      "type": "service",
      "label": "Frontend"
    },
    {
      "id": "api",
      "type": "service",
      "label": "API Server"
    },
    {
      "id": "database",
      "type": "database",
      "label": "PostgreSQL"
    }
  ],
  "edges": [
    {
      "from": "frontend",
      "to": "api",
      "label": "HTTPS"
    },
    {
      "from": "api",
      "to": "database",
      "label": "SQL"
    }
  ]
}

Rules:
- Identify major architecture components.
- Show important data/request flows.
- Every ID must be unique.
- Every edge must reference valid node IDs.
- Do not generate x/y coordinates.
- Do not generate markdown.
- JSON only.
`.trim(),
    },

    {
      name: "Web Mockup",
      description: "Create website wireframes",
      icon: <Monitor size={18} />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "hover:border-cyan-200",

      systemPrompt: `
You are an expert UI/UX wireframe designer.

Create a semantic desktop web wireframe.

DO NOT generate coordinates.

Return:

{
  "type": "web-mockup",
  "nodes": [
    {
      "id": "header",
      "type": "container",
      "label": "Header"
    },
    {
      "id": "hero",
      "type": "container",
      "label": "Hero Section"
    },
    {
      "id": "button",
      "type": "button",
      "label": "Get Started"
    }
  ],
  "edges": []
}

Create appropriate UI components based on the request.

Possible node types:
container
button
input
text
image
card
navigation
form

Keep the hierarchy logical.

Do not generate coordinates.
Do not generate markdown.
Return JSON only.
`.trim(),
    },

    {
      name: "Mobile Mockup",
      description: "Create mobile wireframes",
      icon: <Smartphone size={18} />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "hover:border-pink-200",

      systemPrompt: `
You are an expert mobile UI/UX designer.

Create a semantic mobile application wireframe.

DO NOT generate coordinates.

Return:

{
  "type": "mobile-mockup",
  "nodes": [
    {
      "id": "home",
      "type": "container",
      "label": "Home Screen"
    },
    {
      "id": "profile",
      "type": "container",
      "label": "Profile Screen"
    }
  ],
  "edges": [
    {
      "from": "home",
      "to": "profile",
      "label": "Open Profile"
    }
  ]
}

Possible node types:
container
button
input
text
image
card
navigation

Keep the mobile layout hierarchical.

Do not generate coordinates.
Do not generate markdown.
Return JSON only.
`.trim(),
    },
  ];

  const selectedToolData =
    AITools.find((tool) => tool.name === selectedTool) || AITools[0];

  function getEmptyCanvasPosition() {
    if (!excalidrawAPI) {
      return { x: 100, y: 100 };
    }

    const elements = excalidrawAPI
      .getSceneElements()
      .filter((element) => !element.isDeleted);

    if (elements.length === 0) {
      return { x: 100, y: 100 };
    }

    const maxRight = Math.max(
      ...elements.map((element) => element.x + element.width),
    );

    const minTop = Math.min(...elements.map((element) => element.y));

    return {
      x: maxRight + 150,
      y: minTop,
    };
  }

  function addGeminiDiagram(geminiResponse: unknown) {
    if (!excalidrawAPI) {
      return;
    }

    const position = getEmptyCanvasPosition();

    try {
      const generatedElements = geminiToExcalidraw(
        geminiResponse,
        position.x,
        position.y,
      );

      const currentElements = excalidrawAPI.getSceneElements();

      excalidrawAPI.updateScene({
        elements: [...currentElements, ...generatedElements],
      });

      excalidrawAPI.scrollToContent(generatedElements, {
        fitToContent: true,
        animate: true,
        duration: 500,
      });
    } catch (error) {
      console.error("Failed to create Excalidraw elements:", error);
    }
  }

  async function onClickGenerate() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      return;
    }

    if (isGenerating) {
      return;
    }

    try {
      setIsGenerating(true);

      const finalPrompt = `
        ${selectedToolData.systemPrompt}

        USER REQUEST:
        ${trimmedPrompt}
      `.trim();

      console.log("Sending prompt to Gemini:", finalPrompt);

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt: selectedToolData.systemPrompt,
          userPrompt: trimmedPrompt,
          prompt: finalPrompt,
          type: selectedToolData.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("Gemini response:", data);

      addGeminiDiagram(data.result);

      setPrompt("");
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="absolute bottom-24 right-6 z-50 w-[400px] overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-white to-gray-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
      <Header setShowAiSidebar={setShowAiSidebar} />

      {/* Content */}
      <div className="p-5">
        <Heading />

        {/* Tools */}
        {/* <div className="grid grid-cols-2 gap-2"> */}
        <Tools
          AITools={AITools}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        {/* Prompt */}
        <div className="mt-5">
          <Prompt
            prompt={prompt}
            setPrompt={setPrompt}
            selectedTool={selectedTool}
          />

          {/* Generate row */}
          <GenerateRow
            selectedToolData={selectedToolData}
            setSelectedTool={setSelectedTool}
            isGenerating={isGenerating}
            onClickGenerate={onClickGenerate}
            prompt={prompt}
          />
        </div>
      </div>

      {/* Footer */}
      {/* <Footer selectedToolData={selectedToolData} /> */}
    </div>
  );
}

export default AIFloatingSidebar;
