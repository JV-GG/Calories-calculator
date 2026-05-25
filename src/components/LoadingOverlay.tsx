export function LoadingOverlay() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-ring" aria-hidden="true" />
      <p className="font-display text-xl text-cream mt-6">正在分析营养…</p>
      <p className="text-cream/60 text-sm mt-2">MiniMax 视觉模型识别中</p>
    </div>
  )
}
