import { type ReactNode } from 'react'
import type { CalorieAnalysis, FoodCategory } from '../../shared/types.js'
import BitesAILogo from '../../BitesAI.png'
import './ResultsView.css'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
}

const CATEGORY_CONFIG: Record<FoodCategory, { label: string; bgColor: string; textColor: string; icon: ReactNode }> = {
  protein: {
    label: 'Protein',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    textColor: '#A78BFA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  grains: {
    label: 'Grains',
    bgColor: 'rgba(217, 119, 6, 0.15)',
    textColor: '#FBBF24',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  vegetables: {
    label: 'Vegetables',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    textColor: '#34D399',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/>
      </svg>
    ),
  },
  fruits: {
    label: 'Fruits',
    bgColor: 'rgba(236, 72, 153, 0.15)',
    textColor: '#F472B6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-12 8-12s4.5 3 4.5 8.5"/>
      </svg>
    ),
  },
  dairy: {
    label: 'Dairy',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    textColor: '#FBBF24',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"/><path d="M6 6h12"/>
      </svg>
    ),
  },
  fats_oils: {
    label: 'Fats & Oils',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    textColor: '#FB923C',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  beverages: {
    label: 'Beverages',
    bgColor: 'rgba(2, 132, 199, 0.15)',
    textColor: '#38BDF8',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      </svg>
    ),
  },
  snacks: {
    label: 'Snacks',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    textColor: '#C084FC',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
      </svg>
    ),
  },
  condiments: {
    label: 'Condiments',
    bgColor: 'rgba(156, 163, 175, 0.15)',
    textColor: '#9CA3AF',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18"/><path d="M8 21h8"/><path d="M8 3h8"/>
      </svg>
    ),
  },
  mixed: {
    label: 'Mixed Dishes',
    bgColor: 'rgba(37, 99, 235, 0.15)',
    textColor: '#60A5FA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
}

function MacroBar({ label, value, max, color, unit = 'g' }: {
  label: string; value: number; max: number; color: string; unit?: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex-1 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="text-sm font-bold text-white tabular-nums">{value}{unit}</span>
      </div>
      <div className="macro-bar">
        <div className="macro-bar-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export function ResultsView({ analysis, previewUrl, onScanAgain }: ResultsViewProps) {
  const { items, totalCalories, totalMacros, confidence, notes, healthInsight } = analysis
  const confidenceLabel =
    confidence === 'high' ? 'High confidence' :
    confidence === 'medium' ? 'Medium confidence' : 'Low confidence'

  const itemsByCategory = items.reduce((acc, item) => {
    const cat = item.category || 'mixed'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<FoodCategory, typeof items>)

  return (
    <div className="results-shell">
      {/* Header */}
      <header className="results-header safe-area-top lg:px-8">
        <img
          src={previewUrl}
          alt="Photo of scanned food"
          className="w-14 h-14 rounded-2xl object-cover border border-white/10 flex-shrink-0 lg:w-16 lg:h-16"
        />
        <div className="flex-1 min-w-0">
          <img src={BitesAILogo} alt="" className="w-5 h-5 rounded object-cover mb-1" aria-hidden="true" />
          <h2 className="text-white text-base font-bold leading-tight truncate lg:text-lg">Nutrition Analysis</h2>
          <span
            className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${
              confidence === 'high' ? 'bg-emerald-500/20 text-emerald-400' :
              confidence === 'medium' ? 'bg-amber-500/20 text-amber-400' :
              'bg-red-500/20 text-red-400'
            }`}
          >
            {confidenceLabel}
          </span>
        </div>

        {/* Desktop: scan again in header */}
        <button
          type="button"
          onClick={onScanAgain}
          className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] hover:bg-blue-500 active:bg-blue-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Scan Again
        </button>
      </header>

      {/* Content */}
      <div className="results-content">
        <div className="results-grid">
          {/* Left column: hero + macros + health */}
          <div className="results-col-left">
            {/* Hero calorie card */}
            <div className="hero-card animate-fadeUp lg:mt-6">
              <p className="hero-card-label">Total Calories</p>
              <div className="hero-card-value">
                <span className="hero-card-number tabular-nums">{totalCalories}</span>
                <span className="hero-card-unit">kcal</span>
              </div>
            </div>

            {/* Health rating */}
            <div className="mx-4 mb-4 mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl animate-fadeUp md:mx-6 md:mb-5 md:p-5 lg:mx-0 lg:mb-6 lg:mt-6 lg:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-0.5" aria-label={`Health rating: ${healthInsight.rating} out of 5 stars`} role="img">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="18" height="18" viewBox="0 0 24 24"
                      fill={i <= healthInsight.rating ? '#10B981' : 'rgba(255,255,255,0.2)'}
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="text-white text-base font-semibold">{healthInsight.label}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{healthInsight.summary}</p>
            </div>

            {/* Macros */}
            <section className="mx-4 mb-4 md:mx-6 md:mb-5 lg:mx-0 lg:mb-6 animate-fadeUp animate-delay-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg flex-shrink-0" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
                  </svg>
                </div>
                <h3 className="text-white text-base font-bold">Nutritional Facts</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 md:p-5 lg:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                  <MacroBar label="Protein" value={totalMacros.protein} max={100} color="#A78BFA" />
                  <MacroBar label="Carbs" value={totalMacros.carbs} max={100} color="#60A5FA" />
                  <MacroBar label="Fat" value={totalMacros.fat} max={100} color="#34D399" />
                  {totalMacros.fiber !== undefined && (
                    <MacroBar label="Fiber" value={totalMacros.fiber} max={30} color="#38BDF8" />
                  )}
                </div>
              </div>
            </section>

            {/* Tips — on desktop, shown in left column */}
            {healthInsight.tips.length > 0 && (
              <section className="mx-4 mb-4 md:mx-6 md:mb-5 lg:mx-0 lg:mb-6 animate-fadeUp animate-delay-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg flex-shrink-0" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </svg>
                  </div>
                  <h3 className="text-white text-base font-bold">Health Tips</h3>
                </div>
                <ul className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 list-none m-0 md:p-5 lg:p-6">
                  {healthInsight.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" aria-hidden="true" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right column: food classification */}
          <div className="results-col-right">
            <section className="mx-4 mb-4 md:mx-6 md:mb-5 lg:mx-0 lg:mb-6 lg:mt-6 animate-fadeUp animate-delay-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg flex-shrink-0" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <h3 className="text-white text-base font-bold">Food Classification</h3>
              </div>

              {Object.entries(itemsByCategory).map(([cat, catItems]) => {
                const config = CATEGORY_CONFIG[cat as FoodCategory] ?? CATEGORY_CONFIG.mixed
                const categoryCalories = catItems.reduce((sum, i) => sum + i.calories, 0)

                return (
                  <div
                    key={cat}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-4 border-l-4 last:mb-0"
                    style={{ borderLeftColor: config.textColor }}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
                      style={{ backgroundColor: config.bgColor }}
                    >
                      <div
                         className="w-9 h-9 flex items-center justify-center text-white rounded-lg flex-shrink-0"
                        style={{ backgroundColor: config.textColor }}
                        aria-hidden="true"
                      >
                        {config.icon}
                      </div>
                      <span className="flex-1 text-sm font-semibold min-w-0 truncate" style={{ color: config.textColor }}>
                        {config.label}
                      </span>
                      <span className="text-sm font-bold flex-shrink-0 tabular-nums" style={{ color: config.textColor }}>
                        {categoryCalories} kcal
                      </span>
                    </div>
                    <div>
                      {catItems.map((item, i) => (
                        <div
                          key={`${item.name}-${i}`}
                          className="flex flex-col gap-0.5 px-4 py-3 border-b border-white/10 last:border-b-0"
                        >
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-white text-sm font-semibold truncate">{item.name}</span>
                            <span className="text-blue-400 text-sm font-bold flex-shrink-0 tabular-nums">{item.calories} kcal</span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-white/50 text-xs truncate">{item.portion}</span>
                            {item.macros && (
                              <span className="text-white/40 text-xs flex-shrink-0">
                                P: {item.macros.protein}g · C: {item.macros.carbs}g · F: {item.macros.fat}g
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </section>

            {/* Notes */}
            {notes && (
              <p className="mx-4 mb-4 px-4 py-3 bg-white/5 rounded-xl text-sm text-white/70 leading-relaxed border-l-4 border-blue-500 md:mx-6 md:mb-5 lg:mx-0 lg:mb-6">
                {notes}
              </p>
            )}
          </div>
        </div>

        {/* Scan again — mobile only (desktop has it in header) */}
        <div className="px-4 pt-2 pb-6 safe-area-bottom md:px-6 lg:hidden relative z-10">
          <button
            type="button"
            onClick={onScanAgain}
            className="w-full flex items-center justify-center gap-2 min-h-14 px-6 bg-blue-600 text-white rounded-xl font-semibold text-base transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-500 active:scale-[0.97] active:bg-blue-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Scan Again
          </button>
        </div>
      </div>
    </div>
  )
}
