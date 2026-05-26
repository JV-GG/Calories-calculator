import type { ScanHistoryItem } from '../../shared/types.js'
import BitesAILogo from '../../BitesAI.png'
import './HistoryView.css'

interface HistoryViewProps {
  history: ScanHistoryItem[]
  onSelect: (item: ScanHistoryItem) => void
  onDelete: (id: string) => void
  onClear: () => void
  onBack: () => void
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const diffMs = Date.now() - timestamp
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays[date.getDay()]
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function HistoryView({ history, onSelect, onDelete, onClear, onBack }: HistoryViewProps) {
  return (
    <div className="history-shell">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-white border-b border-[#E2E8F0] safe-area-top">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="w-11 h-11 flex items-center justify-center bg-[#F8FAFC] border-none rounded-xl text-[#0F172A] cursor-pointer transition-all duration-150 hover:bg-[#F1F5F9] active:scale-95 md:w-12 md:h-12 lg:w-12 lg:h-12"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <div className="flex flex-col items-center gap-1">
          <img src={BitesAILogo} alt="" className="w-7 h-7 rounded-lg object-cover" />
          <h1 className="text-[#0F172A] text-base font-bold md:text-lg">Scan History</h1>
        </div>

        {history.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2 bg-transparent border border-[#E2E8F0] rounded-xl text-[#475569] text-sm font-semibold cursor-pointer transition-all duration-150 min-h-10 hover:bg-[rgba(220,38,38,0.05)] hover:border-[#DC2626] hover:text-[#DC2626] active:bg-[rgba(220,38,38,0.1)] md:text-base md:px-5"
          >
            Clear
          </button>
        ) : (
          <div className="w-16" />
        )}
      </header>

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center animate-fadeUp">
          <img src={BitesAILogo} alt="" className="w-20 h-20 rounded-2xl object-cover opacity-80 mb-6" />
          <h2 className="text-[#0F172A] text-xl font-bold mb-2">No history yet</h2>
          <p className="text-[#475569] text-sm leading-relaxed max-w-64">
            Your scanned food will appear here for easy access
          </p>
        </div>
      ) : (
        /* List */
        <div className="p-5 flex flex-col gap-3 md:p-6 lg:p-[2.5rem]" role="list">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="history-item"
              role="listitem"
            >
              <img
                src={item.previewUrl}
                alt=""
                className="w-14 h-14 rounded-xl object-cover border border-[#E2E8F0] flex-shrink-0 md:w-16 md:h-16 lg:w-16 lg:h-16"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#94A3B8] text-xs">{formatDate(item.timestamp)}</span>
                  <span className="text-[#2563EB] text-base font-bold flex-shrink-0">
                    {item.analysis.totalCalories} kcal
                  </span>
                </div>
                <p className="text-[#475569] text-sm truncate">
                  {item.analysis.items.slice(0, 3).map((i) => i.name).join(' · ')}
                  {item.analysis.items.length > 3 && ` +${item.analysis.items.length - 3}`}
                </p>
              </div>
              <button
                type="button"
                className="w-9 h-9 flex items-center justify-center bg-transparent border-none rounded-full text-[#94A3B8] cursor-pointer transition-all duration-150 flex-shrink-0 hover:bg-[rgba(220,38,38,0.1)] hover:text-[#DC2626] active:bg-[rgba(220,38,38,0.1)]"
                onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
                aria-label="Delete this record"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                </svg>
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
