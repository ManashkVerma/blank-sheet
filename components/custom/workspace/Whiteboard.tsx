"use client";
import { toast } from "@/components/ui/toast";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Circle,
  Diamond,
  Eraser,
  Hand,
  Image,
  Minus,
  MousePointer2,
  Pencil,
  Sparkle,
  Square,
  Type,
} from "lucide-react";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { Button } from "@/components/ui/button";
import AIFloatingSidebar from "./AIFloatingSidebar";

// const tools = [
//   {
//     name: "selection",
//     icon: MousePointer2,
//     color: "text-blue-600",
//   },
//   {
//     name: "hand",
//     icon: Hand,
//     color: "text-cyan-600",
//   },
//   {
//     name: "rectangle",
//     icon: Square,
//     color: "text-blue-600",
//   },
//   {
//     name: "diamond",
//     icon: Diamond,
//     color: "text-emerald-500",
//   },
//   {
//     name: "ellipse",
//     icon: Circle,
//     color: "text-amber-500",
//   },
//   {
//     name: "arrow",
//     icon: ArrowRight,
//     color: "text-violet-500",
//   },
//   {
//     name: "line",
//     icon: Minus,
//     color: "text-pink-500",
//   },
//   {
//     name: "freedraw",
//     icon: Pencil,
//     color: "text-orange-500",
//   },
//   {
//     name: "text",
//     icon: Type,
//     color: "text-indigo-500",
//   },
//   {
//     name: "image",
//     icon: Image,
//     color: "text-green-500",
//   },
//   {
//     name: "eraser",
//     icon: Eraser,
//     color: "text-rose-500",
//   },
// ];

function Whiteboard() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI>(null);
  const saveTimeRef = useRef<any>(null);
  const { projectId } = useParams();
  const [activeTool, setActiveTool] = useState("selection");
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [canvasState, setCanvasState] = useState();
  const [showAiSidebar, setShowAiSidebar] = useState(true);

  function handleCanvasChange(
    elements: readonly any[],
    appState: any,
    files: any,
  ) {
    setCanvasState(appState);

    const selectedIds = Object.keys(appState.selectedElementIds || {});

    if (selectedIds?.length == 1) {
      const element = elements.find((el) => el.id == selectedIds[0]);
      setSelectedElement(element);
    } else {
      setSelectedElement(null);
    }
    if (saveTimeRef?.current) {
      clearTimeout(saveTimeRef.current);
    }

    saveTimeRef.current = setTimeout(() => {
      // SaveCanvasChanges(elements, appState, files);
      // toast.add({
      //   title: "Changes Saved",
      //   type: "success",
      // });
    }, 10000);
  }

  async function SaveCanvasChanges(
    elements: readonly any[],
    appState: any,
    files: any,
  ) {
    const result = await axios.post("/api/whiteboard", {
      elements: elements,
      appState: appState,
      files: files,
      projectId: projectId,
    });
  }

  function changeTool(tool: any) {
    if (!excalidrawAPI) return;

    setActiveTool(tool);
    excalidrawAPI.setActiveTool({
      type: tool,
    });
  }

  function getFloatingPosition() {
    if (!selectedElement || !canvasState) {
      return { left: 0, top: 0 };
    }

    const zoom = canvasState?.zoom?.value ?? 1;

    const scrollX = canvasState.scrollX ?? 0;
    const scrollY = canvasState.scrollY ?? 0;
    const centerX = selectedElement.x + selectedElement.width / 2;
    const screenX = (centerX + scrollX) * zoom;
    const screenY = (selectedElement.y + scrollY) * zoom;

    return {
      left: screenX,
      top: screenY - 60,
    };
  }

  const floatingPosition = getFloatingPosition();

  return (
    <div style={{ height: "91vh" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={handleCanvasChange}
      />

      <div className="absolute right-15 bottom-5 z-50">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setShowAiSidebar((value) => !value)}
        >
          <Sparkle /> AI
        </Button>
      </div>
      {showAiSidebar && <AIFloatingSidebar excalidrawAPI={excalidrawAPI} setShowAiSidebar={setShowAiSidebar} />}
    </div>
  );
}

export default Whiteboard;
