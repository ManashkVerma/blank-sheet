import React from "react";

function Footer({ selectedToolData }: { selectedToolData: any }) {
  return (
    <div className="border-t border-gray-100 bg-white/60 px-5 py-3">
      <p className="text-center text-[11px] text-gray-400">
        {selectedToolData.name} mode selected
      </p>
    </div>
  );
}

export default Footer;
