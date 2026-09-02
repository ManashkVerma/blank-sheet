"use client";
import { Button } from "@/components/ui/button";
import { Folder, Clock, FilePlus, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import CreateNewBoardDialog from "./CreateNewBoardDialog";
import axios from "axios";
import Link from "next/link";

interface Project {
  projectId: string;
  projectName: string;
  userEmail: string;
  createdAt: string;
  thumbnail?: string;
}

function ProjectList() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data } = await axios.get("/api/projects");
      setProjectList(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {projectList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl mt-10 gap-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="p-4 bg-primary/10 rounded-full">
            <Folder className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Board Found</h2>
          <p className="text-muted-foreground text-center max-w-sm mb-2">
            You haven't created any boards yet. Create your first board to start brainstorming and planning!
          </p>
          <CreateNewBoardDialog variant="default" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {projectList.map((project) => (
            <Link
              href={`/workspace/${project.projectId}`}
              key={project.projectId}
              className="group flex flex-col justify-between h-56 p-0 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Thumbnail Area */}
              <div className="h-32 w-full bg-gray-50 dark:bg-white flex items-center justify-center overflow-hidden relative border-b border-gray-100 dark:border-gray-800">
                {project.thumbnail ? (
                  <div 
                    className="w-full h-full flex items-center justify-center p-4 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
                    dangerouslySetInnerHTML={{ __html: project.thumbnail }}
                  />
                ) : (
                  <Folder className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              {/* Content Area */}
              <div className="p-4 flex flex-col justify-between flex-grow bg-white dark:bg-gray-900 z-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {project.projectName}
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors duration-300 translate-x-0 group-hover:translate-x-1 flex-shrink-0" />
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mt-auto">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Recently active"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          
          <CreateNewBoardDialog>
            <div className="flex flex-col items-center justify-center h-56 w-full p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer group hover:border-primary/50">
              <FilePlus className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors duration-300 mb-2 transform group-hover:scale-110" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
                Create New Board
              </span>
            </div>
          </CreateNewBoardDialog>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
