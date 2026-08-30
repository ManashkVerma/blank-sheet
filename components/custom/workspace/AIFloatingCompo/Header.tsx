import { Sparkles, X } from "lucide-react";


function Header({ setShowAiSidebar }: { setShowAiSidebar: any }) {
  return (
    <div className="border-b border-gray-100 bg-gradient-to-br from-white via-white to-gray-50 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-white via-white to-gray-50 text-black shadow-sm">
            <Sparkles size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">AI Helper</h2>

            <p className="text-xs text-gray-400">Turn ideas into visuals</p>
          </div>
        </div>

        <button
          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close"
          onClick={() => setShowAiSidebar((val: boolean) => !val)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default Header;
