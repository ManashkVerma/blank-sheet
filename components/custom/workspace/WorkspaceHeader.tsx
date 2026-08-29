"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Share2Icon } from "lucide-react";

type Props = {
  selectedTab: any;
};

function WorkspaceHeader({ selectedTab }: Props) {
  return (
    <div className="p-3 border-b flex justify-between">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2>Workspace Name</h2>
      </div>

      <div>
        <Tabs
          defaultValue="whiteboard"
          className="w-[400px]"
          onValueChange={(value) => selectedTab(value)}
        >
          <TabsList variant="default">
            <TabsTrigger
              value="whiteboard"
              className={`${selectedTab !== "whiteboard" ? "text-white" : ""}`}
            >
              Whiteboard
            </TabsTrigger>
            <TabsTrigger
              value="doc"
              className={`${selectedTab !== "doc" ? "text-white" : ""}`}
            >
              Doc
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary">
          <Save /> Save
        </Button>
        <Button variant="outline">
          <Share2Icon />
          Share
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
