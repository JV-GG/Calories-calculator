interface PreviewViewProps {
  previewUrl: string
  onRetake: () => void
  onAnalyze: () => void
}

export function PreviewView({ previewUrl, onRetake, onAnalyze }: PreviewViewProps) {
  return (
    <div className="preview-shell">
      <header className="preview-header">
        <h2 className="font-display text-xl text-cream">确认照片</h2>
        <p className="text-cream/55 text-sm">满意后开始分析卡路里</p>
      </header>

      <div className="preview-image-wrap">
        <img src={previewUrl} alt="待分析的食物照片" className="preview-image" />
      </div>

      <div className="preview-actions">
        <button type="button" className="btn-secondary" onClick={onRetake}>
          重拍
        </button>
        <button type="button" className="btn-primary" onClick={onAnalyze}>
          分析卡路里
        </button>
      </div>
    </div>
  )
}
