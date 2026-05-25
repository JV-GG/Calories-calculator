import type { ScanHistoryItem } from '../../shared/types.js'
import BitesAILogo from '../../BitesAI.png'

interface HistoryViewProps {
  history: ScanHistoryItem[]
  onSelect: (item: ScanHistoryItem) => void
  onDelete: (id: string) => void
  onClear: () => void
  onBack: () => void
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - timestamp
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

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
      <header className="history-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Go back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div className="history-header-center">
          <img src={BitesAILogo} alt="" className="history-logo" />
          <h1>Scan History</h1>
        </div>
        {history.length > 0 && (
          <button type="button" className="clear-btn" onClick={onClear}>
            Clear
          </button>
        )}
      </header>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="history-empty">
          <img src={BitesAILogo} alt="" className="empty-logo" />
          <h2 className="empty-title">No history yet</h2>
          <p className="empty-text">Your scanned food will appear here for easy access</p>
        </div>
      ) : (
        <div className="history-list" role="list">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              className="history-item"
              onClick={() => onSelect(item)}
              role="listitem"
            >
              <img
                src={item.previewUrl}
                alt=""
                className="history-thumb"
                loading="lazy"
              />
              <div className="history-info">
                <div className="history-meta">
                  <span className="history-date">{formatDate(item.timestamp)}</span>
                  <span className="history-calories">{item.analysis.totalCalories} kcal</span>
                </div>
                <p className="history-foods">
                  {item.analysis.items.slice(0, 3).map((i) => i.name).join(' · ')}
                  {item.analysis.items.length > 3 && ` +${item.analysis.items.length - 3}`}
                </p>
              </div>
              <button
                type="button"
                className="history-delete"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(item.id)
                }}
                aria-label="Delete this record"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
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
