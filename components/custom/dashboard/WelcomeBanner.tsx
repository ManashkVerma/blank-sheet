"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SparkleIcon } from "lucide-react";
import CreateNewBoardDialog from "./CreateNewBoardDialog";

function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div>
      <div className="p-10  border rounded-xl bg-gradient-to-r from-[#0c0c0c] to-[#595757] text-white">
        <h2 className="text-2xl font-bold">Welcome back, {user?.fullName}</h2>
        <p>Bring Your Ideas to Life</p>

        <div className="flex items-center gap-2 mt-5">
          <CreateNewBoardDialog variant="" />
          <Button size="lg">
            <SparkleIcon /> AI Helper
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
