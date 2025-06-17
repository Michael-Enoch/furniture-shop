function highlightMatch(text, query) {
  if (!query) return text;
 const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const regex = new RegExp(`(${escapedQuery})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

export default highlightMatch;
