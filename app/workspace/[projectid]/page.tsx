"use client";
import { useEffect, useState } from "react";
import WorkspaceHeader from "@/components/custom/workspace/WorkspaceHeader";
import Whiteboard from "@/components/custom/workspace/Whiteboard";
import axios from "axios";
import { useParams } from "next/navigation";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

function Workspace() {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const [projectName, setProjectName] = useState();
  const { projectid } = useParams();

  useEffect(() => {
    projectid && api && getWhiteboardData();
  }, [projectid]);

  async function getWhiteboardData() {
    try {
      const result = await axios.get(`/api/projects?projectId=${projectid}`);
      setProjectName(result?.data?.projectName);
      api?.updateScene({
        elements: result.data.elements || [],
        appState: result.data.appState || {},
      });

      if (result.data.files) {
        api?.addFiles(Object.values(result.data.files));
      }
    } catch (error) {
      console.log("Faild ot load whiteboard datata", error);
    }
  }
  return (
    <div className="">
      <WorkspaceHeader projectName={projectName} />
      <Whiteboard />
    </div>
  );
}

export default Workspace;
