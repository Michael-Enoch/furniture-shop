import { useEffect, useState } from "react";

const DebugBar = () => {
  const [overflowData, setOverflowData] = useState({
    totalOverflow: 0,
    elements: [],
  });

  useEffect(() => {
    const docWidth = document.documentElement.offsetWidth;
    const elements = document.querySelectorAll("*:not(.debug-bar)"); // ✅ Exclude itself
    const overflowElements = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
  const scrollOffset = rect.right - docWidth;
      if (rect.right > docWidth || rect.left < 0) {
    const style = getComputedStyle(el);
        const info = {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: el.className || null,
          scrollOffset: rect.right - docWidth,
        };
        overflowElements.push(info);

          if (style.display.includes("flex") && style.gap && scrollOffset < 0) {
      el.classList.add("__flex-gap-alert");
    }

    el.classList.add("__overflow-highlight");
    console.warn("Overflow Detected:", info, el);
    overflowElements.push(info);
  }
    });

    setOverflowData({
      totalOverflow: document.body.scrollWidth - window.innerWidth,
      elements: overflowElements,
    });
  }, []);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(overflowData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "overflow-debug.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!import.meta.env.DEV) return null;

  return (
    <>
      <div className="debug-bar fixed bottom-[40px] left-0 w-full bg-red-600 text-white p-3 z-[9999] text-xs sm:text-sm font-mono shadow-lg flex flex-col gap-1 max-h-[40vh] overflow-auto">
        <div>
          🔍 Scroll Overflow:{" "}
          <strong>{overflowData.totalOverflow}px</strong>
        </div>

        {overflowData.elements.map((el, i) => (
          <div key={i} className="text-yellow-300">
            - {"<" + el.tag}
            {el.id ? ` id="${el.id}"` : ""}
            {el.className ? ` class="${el.className}"` : ""}
            {">"} — scrolls over by {Math.round(el.scrollOffset)}px
          </div>
        ))}

        <button
          onClick={exportData}
          className="mt-2 self-start text-white border border-white px-2 py-1 rounded hover:bg-white hover:text-red-600 transition-all"
        >
          ⬇ Export Debug JSON
        </button>
      </div>

      <style>{`
  .__overflow-highlight {
    outline: 3px solid yellow !important;
    position: relative;
    z-index: 9998;
  }
  .__flex-gap-alert::after {
    content: "⚠️ Flex + Gap overflow risk!";
    position: absolute;
    top: -1.5rem;
    left: 0;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    z-index: 9999;
  }
`}</style>

    </>
  );
};

export default DebugBar;
