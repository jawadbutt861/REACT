import { useState } from 'react';

const ReadMore = ({ 
  text, 
  maxLength = 100, 
  className = "",
  expandText = "Read more",
  collapseText = "Read less"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? text 
    : text.slice(0, maxLength) + '...';

  if (!shouldTruncate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-sm font-medium transition-colors hover:underline focus:outline-none focus:underline"
          style={{ color: 'var(--primary)' }}
        >
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </span>
  );
};

export default ReadMore;