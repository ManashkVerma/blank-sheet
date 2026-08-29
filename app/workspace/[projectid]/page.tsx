"use client";
import { useState } from "react";
import WorkspaceHeader from "@/components/custom/workspace/WorkspaceHeader";
import Whiteboard from "@/components/custom/workspace/Whiteboard";
import SmartDoc from "@/components/custom/workspace/SmartDoc";

function Workspace() {
  const [activeTab, setActiveTab] = useState("whiteboard");
  return (
    <div className="">
      <WorkspaceHeader selectedTab={(value: string) => setActiveTab(value)} />

      {activeTab == "whiteboard" ? <Whiteboard /> : <SmartDoc />}

      
    </div>
  );
}

export default Workspace;
