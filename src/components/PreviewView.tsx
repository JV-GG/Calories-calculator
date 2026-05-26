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
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-bg)] safe-area-top"
        style={{ fontFamily: 'var(--font-family-sans)' }}
      >
        <button
          type="button"
          onClick={onRetake}
          aria-label="Retake photo"
          className="w-11 h-11 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] cursor-pointer transition-colors duration-150 active:bg-[var(--color-surface-hover)] active:scale-[0.97]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <div className="flex-1 text-center">
          <img src={BitesAILogo} alt="" className="w-8 h-8 rounded-lg object-cover mx-auto mb-1 border border-[var(--color-border)]" />
          <h2 className="text-[var(--color-foreground)] font-heading text-lg font-bold" style={{ fontFamily: 'var(--font-family-heading)' }}>Confirm Photo</h2>
          <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Ready to analyze when you are</p>
        </div>

        <div className="w-11" />
      </header>

      {/* Image */}
      <div className="preview-image-container">
        <img
          src={previewUrl}
          alt="Food photo to analyze"
          className="preview-image"
        />
      </div>

      {/* Actions — flat buttons, no shadows */}
      <div className="flex gap-3 px-5 py-5 border-t border-[var(--color-border)] bg-[var(--color-bg)] safe-area-bottom">
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-xl font-semibold text-sm transition-colors duration-150 active:bg-[var(--color-surface-hover)] active:scale-[0.97] cursor-pointer"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Retake
        </button>
        <button
          type="button"
          onClick={onAnalyze}
          className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-5 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-sm transition-colors duration-150 active:bg-[var(--color-primary-hover)] active:scale-[0.97] cursor-pointer"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Analyze Calories
        </button>
      </div>
    </div>
  )
}
