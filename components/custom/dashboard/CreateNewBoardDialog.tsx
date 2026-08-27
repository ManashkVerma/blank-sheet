import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { LoaderCircleIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { VariantProps } from "class-variance-authority";

import { useState } from "react";

function CreateNewBoardDialog({
  variant,
}: {
  variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  async function handleCreateBoard() {
    if (workspaceName.trim() === "" || workspaceName?.length > 30) {
      toast.add({
        type: "error",
        title: "Invalid Workspace Name",
        description: "Place enter a valid workspace name (1-30 characters).",
      });

      return;
    }

    const projectId = crypto.randomUUID();

    setLoading(true);
    const result = await axios.post("/api/projects", {
      projectName: workspaceName,
      projectId: projectId,
    });

    console.log(result?.data);

    toast.add({
      type: "success",
      title: "New Workspace Created",
    });
    setLoading(false);
    setDialog(false);
    router.push(`/workspace/${projectId}`);
  }

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogTrigger>
        <Button variant={variant} className="w-full">
          <Plus /> Create New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-black">
            Whiteboard Workspace Name
          </DialogTitle>
        </DialogHeader>
        <div>
          <label className="text-gray-500">
            Enter Whiteboad Workspace Name
          </label>
          <Input
            className=" mt-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent caret-black outline-none"
            placeholder="Workspace Name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button
            variant="secondary"
            disabled={workspaceName.trim() === "" || loading}
            onClick={handleCreateBoard}
          >
            {loading && (
              <LoaderCircleIcon className="animate-spin"></LoaderCircleIcon>
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewBoardDialog;
