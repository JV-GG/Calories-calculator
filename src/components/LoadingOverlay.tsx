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
      <div>
        <p className="loading-text">Analyzing food...</p>
        <p className="loading-subtext">Identifying ingredients and calculating nutrition</p>
      </div>
    </div>
  )
}
