import type { ScanHistoryItem } from '../../shared/types'

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

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins} 分钟前`
  if (diffHours < 24) return `${diffHours} 小时前`
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[date.getDay()]
  }
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

export function HistoryView({ history, onSelect, onDelete, onClear, onBack }: HistoryViewProps) {
  return (
    <div className="history-shell">
      {/* Header */}
      <header className="history-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="返回">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
          </svg>
        </button>
        <h1>扫描历史</h1>
        {history.length > 0 && (
          <button type="button" className="clear-btn" onClick={onClear}>
            清空
          </button>
        )}
      </header>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="12,7 12,12 15,15"/>
            </svg>
          </div>
          <h2 className="empty-title">暂无历史记录</h2>
          <p className="empty-text">扫描食物后会自动保存到这里，方便随时查看</p>
        </div>
      ) : (
        /* History List */
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
                aria-label="删除此记录"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
