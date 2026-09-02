"use client";
import { useEffect, useState } from "react";
import WorkspaceHeader from "@/components/custom/workspace/WorkspaceHeader";
import axios from "axios";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Whiteboard = dynamic(
  () => import("@/components/custom/workspace/Whiteboard"),
  { ssr: false }
);
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

function Workspace() {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const [projectName, setProjectName] = useState();
  const { projectid } = useParams();

  useEffect(() => {
    if (projectid && api) {
      getWhiteboardData();
    }
  }, [projectid, api]);

  async function getWhiteboardData() {
    try {
      const result = await axios.get(`/api/projects?projectId=${projectid}`);
      setProjectName(result?.data?.projectName);
      const appState = result.data.appState || {};
      // Excalidraw expects collaborators to be a Map, but it serializes as an object.
      // We safely delete it before updating the scene to avoid the forEach is not a function error.
      if (appState.collaborators) {
        delete appState.collaborators;
      }

      api?.updateScene({
        elements: result.data.elements || [],
        appState: appState,
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
      <Whiteboard onApiReady={(api) => setApi(api)} />
    </div>
  );
}

export default Workspace;
