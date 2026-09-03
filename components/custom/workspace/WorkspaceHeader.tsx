"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Save, Share2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

function WorkspaceHeader({ projectName }: { projectName: any }) {
  const router = useRouter();
  return (
    <div className="p-3 border-b flex justify-between">

      <div className="flex gap-2 items-center" onClick={() => router.push("/dashboard")}>
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2>{projectName}</h2>
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
