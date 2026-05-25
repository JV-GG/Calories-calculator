export function LoadingOverlay() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-animation">
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring" />
      </div>
      <div>
        <p className="loading-text">正在分析食物...</p>
        <p className="loading-subtext">识别食材并计算营养成分</p>
      </div>
    </div>
  )
}
