"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import type { ExcalidrawImperativeAPI, AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { Sparkle } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import AIFloatingSidebar from "./AIFloatingSidebar";

const Excalidraw = dynamic(
  () =>
    import("@excalidraw/excalidraw").then(
      (mod) => mod.Excalidraw
    ),
  {
    ssr: false,
  }
);

function Whiteboard({
  onApiReady,
}: {
  onApiReady?: (api: ExcalidrawImperativeAPI) => void;
}) {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const saveTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestDataRef = useRef<{ elements: readonly ExcalidrawElement[]; appState: AppState; files: BinaryFiles } | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeRef.current) {
        clearTimeout(saveTimeRef.current);
        if (latestDataRef.current) {
          SaveCanvasChanges(
            latestDataRef.current.elements,
            latestDataRef.current.appState,
            latestDataRef.current.files,
            true // true indicates silent save (no toast)
          );
        }
      }
    };
  }, []);

  // Your route is /workspace/[projectid]
  const { projectid } = useParams<{ projectid: string }>();

  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);
  const [canvasState, setCanvasState] = useState<AppState | null>(null);
  const [showAiSidebar, setShowAiSidebar] = useState(false);

  function handleCanvasChange(
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) {
    setCanvasState(appState);

    const selectedIds = Object.keys(
      appState.selectedElementIds || {}
    );

    if (selectedIds.length === 1) {
      const element = elements.find(
        (el) => el.id === selectedIds[0]
      );

      setSelectedElement(element || null);
    } else {
      setSelectedElement(null);
    }

    latestDataRef.current = { elements, appState, files };

    if (saveTimeRef.current) {
      clearTimeout(saveTimeRef.current);
    }

    saveTimeRef.current = setTimeout(() => {
      SaveCanvasChanges(elements, appState, files, false);
      saveTimeRef.current = null;
    }, 10000);
  }

  async function SaveCanvasChanges(
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles,
    isSilent: boolean = false
  ) {
    try {
      if (!projectid) {
        console.error("Project ID is missing");
        return;
      }

      let thumbnail = "";
      if (elements && elements.length > 0) {
        try {
          const { exportToSvg } = await import("@excalidraw/excalidraw");
          const svg = await exportToSvg({
            elements,
            appState: { ...appState, exportWithDarkMode: false },
            files,
          });
          
          if (svg) {
            thumbnail = svg.outerHTML;
          }
        } catch (e) {
          console.error("Failed to generate thumbnail:", e);
        }
      }

      const result = await axios.post("/api/whiteboard", {
        projectId: projectid,
        elements,
        appState,
        files,
        thumbnail,
      });

      console.log("Whiteboard saved:", result.data);
      if (!isSilent) {
        toast.add({
          title: "Changes Saved",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to save whiteboard:", error);

      toast.add({
        title: "Failed to save changes",
        type: "error",
      });
    }
  }

  function getFloatingPosition() {
    if (!selectedElement || !canvasState) {
      return {
        left: 0,
        top: 0,
      };
    }

    const zoom = canvasState?.zoom?.value ?? 1;

    const scrollX = canvasState?.scrollX ?? 0;
    const scrollY = canvasState?.scrollY ?? 0;

    const centerX =
      selectedElement.x + selectedElement.width / 2;

    const screenX = (centerX + scrollX) * zoom;

    const screenY =
      (selectedElement.y + scrollY) * zoom;

    return {
      left: screenX,
      top: screenY - 60,
    };
  }

  const floatingPosition = getFloatingPosition();

  return (
    <div
      className="relative"
      style={{ height: "91vh" }}
    >
      <Excalidraw
        excalidrawAPI={(api) => {
          setExcalidrawAPI(api);
          if (onApiReady) onApiReady(api);
        }}
        onChange={handleCanvasChange}
      />

      <div className="absolute right-15 bottom-5 z-50">
        <Button
          variant="secondary"
          size="lg"
          onClick={() =>
            setShowAiSidebar((value) => !value)
          }
        >
          <Sparkle />
          AI
        </Button>
      </div>

      {showAiSidebar && (
        <AIFloatingSidebar
          excalidrawAPI={excalidrawAPI}
          setShowAiSidebar={setShowAiSidebar}
        />
      )}
    </div>
  );
}

export default Whiteboard; 