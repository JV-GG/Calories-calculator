import BitesAILogo from '../../BitesAI.png'
import './PreviewView.css'

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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div className="preview-title">
          <img src={BitesAILogo} alt="" className="preview-logo" />
          <h2>Confirm Photo</h2>
          <p>Ready to analyze when you are</p>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Retake
        </button>
        <button type="button" className="btn btn-primary" onClick={onAnalyze}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Analyze Calories
        </button>
      </div>
    </div>
  )
}
