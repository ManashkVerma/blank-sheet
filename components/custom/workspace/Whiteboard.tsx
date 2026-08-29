"use client";
import { toast } from "@/components/ui/toast";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { useRef, useState } from "react";

function Whiteboard() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const saveTimeRef = useRef<any>(null);
  const { projectId } = useParams();

  function handleCanvasChange(
    element: readonly any[],
    appState: any,
    files: any,
  ) {
    if (saveTimeRef?.current) {
      clearTimeout(saveTimeRef.current);
    }

    saveTimeRef.current = setTimeout(() => {
      SaveCanvasChanges(element, appState, files);
      toast.add({
        title: "Changes Saved",
        type: "success",
      });
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

  return (
    <div style={{ height: "91vh" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        onChange={handleCanvasChange}
      />
    </div>
  );
}

export default Whiteboard;
