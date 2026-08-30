import { Textarea } from "@/components/ui/textarea";
import React from "react";
import PromptHeader from "./PromptHeader";

type Props = {
    prompt: any,
    setPrompt: any,
    selectedTool: any
}

function Prompt({prompt, setPrompt, selectedTool}: Props) {
  return (
    <div>
      <PromptHeader />

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          selectedTool === "Flowchart"
            ? "e.g. Login flow with email verification..."
            : selectedTool === "Architecture"
              ? "e.g. E-commerce system with API, database and Redis..."
              : selectedTool === "Web Mockup"
                ? "e.g. Landing page for an AI SaaS product..."
                : selectedTool === "Mobile Mockup"
                  ? "e.g. Food delivery app with home and checkout screens..."
                  : "e.g. Customer onboarding flow with decision points..."
        }
        className="min-h-[110px] resize-none rounded-xl border-gray-200 bg-white/80 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-purple-500"
      />
    </div>
  );
}

export default Prompt;
