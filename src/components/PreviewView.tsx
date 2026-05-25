import BitesAILogo from '../../BitesAI.png'

interface PreviewViewProps {
  previewUrl: string
  onRetake: () => void
  onAnalyze: () => void
}

export function PreviewView({ previewUrl, onRetake, onAnalyze }: PreviewViewProps) {
  return (
    <div className="preview-shell">
      <header className="preview-header">
        <button type="button" className="back-btn" onClick={onRetake} aria-label="Retake photo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
          </svg>
        </button>
        <div className="preview-title">
          <img src={BitesAILogo} alt="" className="preview-logo" />
          <h2>Confirm Photo</h2>
          <p>Start analysis when ready</p>
        </div>
        <div className="preview-spacer" />
      </header>

      <div className="preview-image-container">
        <img
          src={previewUrl}
          alt="Food photo to analyze"
          className="preview-image"
        />
      </div>

      <div className="preview-actions">
        <button type="button" className="btn btn-secondary" onClick={onRetake}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6"/>
            <path d="M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
          </svg>
          Retake
        </button>
        <button type="button" className="btn btn-primary" onClick={onAnalyze}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Analyze Calories
        </button>
      </div>
    </div>
  )
}
