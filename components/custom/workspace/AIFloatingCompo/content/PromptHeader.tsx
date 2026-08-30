import React from "react";

function PromptHeader() {
  return (
    <div className="mb-2 flex items-center justify-between">
      <label className="text-sm font-medium text-gray-900">
        Describe your idea
      </label>

      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-400">
        AI powered
      </span>
    </div>
  );
}

export default PromptHeader;
