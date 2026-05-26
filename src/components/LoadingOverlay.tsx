import BitesAILogo from '../../BitesAI.png'
import './LoadingOverlay.css'

export function LoadingOverlay() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <img src={BitesAILogo} alt="" className="loading-logo" />
      <div className="loading-animation">
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring" />
      </div>
      <div style={{ fontFamily: 'var(--font-family-sans)' }}>
        <p className="text-white text-base font-semibold text-center">
          Analyzing food...
        </p>
        <p className="text-white/60 text-sm text-center mt-1">
          Identifying ingredients and calculating nutrition
        </p>
      </div>
    </div>
  )
}
