// ========================================
// TagBadge.jsx — Light theme pill tag
// ========================================

export default function TagBadge({ tag, onRemove, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#6C63FF]/5 text-[#6C63FF] border border-[#6C63FF]/15 ${className}`}>
      #{tag}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
          className="ml-0.5 text-[#6C63FF]/40 hover:text-[#EF4444] transition-colors"
        >
          ×
        </button>
      )}
    </span>
  );
}
