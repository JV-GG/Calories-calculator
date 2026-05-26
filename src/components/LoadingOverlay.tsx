import BitesAILogo from '../../BitesAI.png'
import './LoadingOverlay.css'

export function LoadingOverlay() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-label="Analyzing food image">
      <img
        src={BitesAILogo}
        alt="CalorieLens analyzing"
        className="loading-logo"
      />
      <div className="loading-animation" aria-hidden="true">
        <div className="loading-ring" />
        <div className="loading-ring" />
        <div className="loading-ring" />
      </div>
      <div>
        <p className="text-white text-base font-semibold text-center md:text-lg">
          Analyzing food…
        </p>
        <p className="text-white/60 text-sm text-center mt-1 md:text-base">
          Identifying ingredients and calculating nutrition
        </p>
      </div>
    </div>
  )
}
