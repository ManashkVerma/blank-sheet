import { Check } from "lucide-react";


type Props = {AITools:any, selectedTool: any, setSelectedTool:any}



function Tools({AITools, selectedTool, setSelectedTool}: Props) {
  return (
    <div className="gap-7 w-full">
      {AITools.map((tool: any) => {
        const isSelected = selectedTool === tool.name;

        return (
          <button
            key={tool.name}
            type="button"
            onClick={() => setSelectedTool(tool.name)}
            className={`
                  group relative flex items-center gap-3 rounded-xl border p-3
                  text-left transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-white hover:shadow-sm

                  ${
                    isSelected
                      ? `border-gray-900 bg-gray-50 shadow-sm`
                      : `border-gray-200 bg-white/70 ${tool.borderColor}`
                  }
                `}
          >
            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-white">
                <Check size={10} strokeWidth={3} />
              </div>
            )}

            <div
              className={`
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                    ${tool.bgColor}
                    ${tool.color}
                  `}
            >
              {tool.icon}
            </div>

            <div className="min-w-0 pr-3">
              <p className="truncate text-xs font-medium text-gray-800">
                {tool.name}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-gray-400">
                {tool.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default Tools;
