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
      <header className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] bg-white safe-area-top flex-shrink-0">
        <button
          type="button"
          onClick={onRetake}
          aria-label="Retake photo"
          className="w-11 h-11 flex items-center justify-center bg-[#F8FAFC] border-none rounded-xl text-[#0F172A] cursor-pointer transition-all duration-150 hover:bg-[#F1F5F9] active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <div className="flex-1 text-center">
          <img src={BitesAILogo} alt="" className="w-8 h-8 rounded-lg object-cover mx-auto mb-1" />
          <h2 className="text-[#0F172A] text-lg font-bold">Confirm Photo</h2>
          <p className="text-[#475569] text-xs mt-0.5">Ready to analyze when you are</p>
        </div>

        <div className="w-11" aria-hidden="true" />
      </header>

      {/* Image */}
      <div className="preview-image-container flex-shrink-0">
        <img
          src={previewUrl}
          alt="Food photo to be analyzed for calorie content"
          className="preview-image"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 px-5 py-5 border-t border-[#E2E8F0] bg-white safe-area-bottom flex-shrink-0">
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-xl font-semibold text-base transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] active:bg-[#F1F5F9]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Retake
        </button>
        <button
          type="button"
          onClick={onAnalyze}
          className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-5 bg-[#2563EB] text-white rounded-xl font-semibold text-base transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] active:bg-[#1D4ED8]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Analyze Calories
        </button>
      </div>
    </div>
  )
}
