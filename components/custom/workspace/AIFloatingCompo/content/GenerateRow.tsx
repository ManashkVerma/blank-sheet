import { Button } from '@/components/ui/button'
import { ArrowUp, LoaderCircle, Sparkles, X } from 'lucide-react'
import React from 'react'

type Props = {
    selectedToolData: any,
    setSelectedTool: any,
    isGenerating: any,
    onClickGenerate: any,
    prompt: any
}
function GenerateRow({selectedToolData, setSelectedTool, isGenerating, onClickGenerate, prompt}: Props) {
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
            {/* Selected tag */}
            <div
              className={`
                flex max-w-[210px] items-center gap-1.5 rounded-full
                border px-2.5 py-1 text-[11px] font-medium
                ${selectedToolData.bgColor}
                ${selectedToolData.color}
                ${selectedToolData.borderColor}
              `}
            >
              {selectedToolData.icon}

              <span className="truncate">
                {selectedToolData.name}
              </span>

              <button
                type="button"
                onClick={() => setSelectedTool("Generate Diagrams")}
                className="ml-0.5 rounded-full p-0.5 opacity-60 transition hover:bg-black/5 hover:opacity-100"
                aria-label="Change diagram type"
              >
                <X size={11} />
              </button>
            </div>

            <Button
              type="button"
              disabled={!prompt.trim() || isGenerating}
              className="gap-2 rounded-lg px-4 shadow-sm transition-all hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onClickGenerate}
            >
              {isGenerating ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                  Generating
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate
                  <ArrowUp size={15} />
                </>
              )}
            </Button>
          </div>
  )
}

export default GenerateRow