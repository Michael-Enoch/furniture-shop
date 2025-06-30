// import { useEffect, useState } from "react";

// const DebugBar = () => {
//   const [overflowData, setOverflowData] = useState({
//     totalOverflow: 0,
//     elements: [],
//   });

//   useEffect(() => {
//     const docWidth = document.documentElement.offsetWidth;
//     const elements = document.querySelectorAll("*:not(.debug-bar)");
//     const overflowElements = [];

//     elements.forEach((el) => {
//       const rect = el.getBoundingClientRect();
//       const style = getComputedStyle(el);
//       const scrollOffset = rect.right - docWidth;

//       const isOverflowing =
//         rect.right > docWidth + 1 || rect.left < -1 || scrollOffset > 1;

//       if (isOverflowing) {
//         const info = {
//           tag: el.tagName.toLowerCase(),
//           id: el.id || null,
//           className: el.className || null,
//           scrollOffset,
//           issues: [],
//         };

//         // Detect possible cause: large font + long text
//         const text = el.textContent?.trim();
//         if (text && text.length > 30 && parseFloat(style.fontSize) > 20) {
//           el.classList.add("__text-overflow-alert");
//           info.issues.push("⚠️ Large font with long text");
//         }

//         // Detect absolutely positioned elements that overflow
//         if (
//           style.position === "absolute" &&
//           (rect.right > docWidth || rect.left < 0)
//         ) {
//           el.classList.add("__absolute-overflow-alert");
//           info.issues.push("⚠️ Absolutely positioned and misaligned");
//         }

//         // Detect large margin or padding causing shift
//         const marginLeft = parseFloat(style.marginLeft || "0");
//         const paddingLeft = parseFloat(style.paddingLeft || "0");
//         if (marginLeft > 20 || paddingLeft > 20) {
//           el.classList.add("__spacing-overflow-alert");
//           info.issues.push("⚠️ Large margin or padding");
//         }

//         // Warn on flex + gap if applicable
//         if (style.display.includes("flex") && style.gap) {
//           el.classList.add("__flex-gap-alert");
//           info.issues.push("⚠️ Flex layout with gap may cause overflow");
//         }

//         el.classList.add("__overflow-highlight");
//         console.warn("Overflow Detected:", info, el);
//         overflowElements.push(info);
//       }
//     });

//     setOverflowData({
//       totalOverflow: document.body.scrollWidth - window.innerWidth,
//       elements: overflowElements,
//     });
//   }, []);

//   const exportData = () => {
//     const blob = new Blob([JSON.stringify(overflowData, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "overflow-debug.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (!import.meta.env.DEV) return null;

//   return (
//     <>
//       <div className="debug-bar fixed bottom-[40px] left-0 w-full bg-red-600 text-white p-3 z-[9999] text-xs sm:text-sm font-mono shadow-lg flex flex-col gap-1 max-h-[40vh] overflow-auto">
//         <div>
//           🔍 Scroll Overflow: <strong>{overflowData.totalOverflow}px</strong>
//         </div>

//         {overflowData.elements.map((el, i) => (
//           <div key={i} className="text-yellow-300">
//             - {"<" + el.tag}
//             {el.id ? ` id="${el.id}"` : ""}
//             {el.className ? ` class="${el.className}"` : ""}
//             {">"} — scrolls over by {Math.round(el.scrollOffset)}px
//             {el.issues.length > 0 && (
//               <div className="ml-4 text-orange-300">
//                 {el.issues.map((issue, j) => (
//                   <div key={j}>{issue}</div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         <button
//           onClick={exportData}
//           className="mt-2 self-start text-white border border-white px-2 py-1 rounded hover:bg-white hover:text-red-600 transition-all"
//         >
//           ⬇ Export Debug JSON
//         </button>
//       </div>

//       <style>{`
//   .__overflow-highlight {
//     outline: 3px solid yellow !important;
//     position: relative;
//     z-index: 9998;
//   }
//   .__text-overflow-alert::after,
//   .__absolute-overflow-alert::after,
//   .__spacing-overflow-alert::after,
//   .__flex-gap-alert::after {
//     content: attr(data-overflow-warning);
//     position: absolute;
//     top: -1.5rem;
//     left: 0;
//     background: rgba(0, 0, 0, 0.75);
//     color: #fff;
//     font-size: 10px;
//     padding: 2px 6px;
//     border-radius: 4px;
//     z-index: 9999;
//     white-space: nowrap;
//   }

//   .__text-overflow-alert[data-overflow-warning]:not([data-overflow-warning])::after {
//     content: "⚠️ Text too long or too large!";
//   }
//   .__absolute-overflow-alert[data-overflow-warning]:not([data-overflow-warning])::after {
//     content: "⚠️ Misaligned absolute element";
//   }
//   .__spacing-overflow-alert[data-overflow-warning]:not([data-overflow-warning])::after {
//     content: "⚠️ Excessive margin/padding";
//   }
// `}</style>
//     </>
//   );
// };

// export default DebugBar;
