"use client";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import React, { useState } from "react";
import CreateNewBoardDialog from "./CreateNewBoardDialog";

function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  return (
    <div>
      {projectList.length === 0 ? (
        <div className="flex flex-col items-center p-10 border rounded-xl mt-10 gap-3">
          {" "}
          <Folder className="h-35 w-35" />{" "}
          <h2 className="text-2xl font-bold">No Board Found</h2>
          <p className="text-muted-foreground">Create your first board to start brainstorming, planning!</p>
          <CreateNewBoardDialog variant="secondary" />
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default ProjectList;
