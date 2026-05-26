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
    bgColor: 'rgba(139, 92, 246, 0.10)',
    textColor: '#7C3AED',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  grains: {
    label: 'Grains',
    bgColor: 'rgba(217, 119, 6, 0.10)',
    textColor: '#B45309',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  vegetables: {
    label: 'Vegetables',
    bgColor: 'rgba(5, 150, 105, 0.10)',
    textColor: '#047857',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/>
      </svg>
    ),
  },
  fruits: {
    label: 'Fruits',
    bgColor: 'rgba(219, 39, 119, 0.10)',
    textColor: '#BE185D',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-12 8-12s4.5 3 4.5 8.5"/>
      </svg>
    ),
  },
  dairy: {
    label: 'Dairy',
    bgColor: 'rgba(245, 158, 11, 0.10)',
    textColor: '#D97706',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"/><path d="M6 6h12"/>
      </svg>
    ),
  },
  fats_oils: {
    label: 'Fats & Oils',
    bgColor: 'rgba(234, 88, 12, 0.10)',
    textColor: '#EA580C',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  beverages: {
    label: 'Beverages',
    bgColor: 'rgba(2, 132, 199, 0.10)',
    textColor: '#0369A1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      </svg>
    ),
  },
  snacks: {
    label: 'Snacks',
    bgColor: 'rgba(147, 51, 234, 0.10)',
    textColor: '#7E22CE',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
      </svg>
    ),
  },
  condiments: {
    label: 'Condiments',
    bgColor: 'rgba(75, 85, 99, 0.10)',
    textColor: '#374151',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18"/><path d="M8 21h8"/><path d="M8 3h8"/>
      </svg>
    ),
  },
  mixed: {
    label: 'Mixed Dishes',
    bgColor: 'rgba(139, 92, 246, 0.10)',
    textColor: '#6D28D9',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family-sans)' }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family-sans)' }}>
          {value}{unit}
        </span>
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
    confidence === 'high' ? 'High confidence' : confidence === 'medium' ? 'Medium confidence' : 'Low confidence'

  const itemsByCategory = items.reduce((acc, item) => {
    const cat = item.category || 'mixed'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<FoodCategory, typeof items>)

  return (
    <div className="results-shell">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-4 px-5 py-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] safe-area-top">
        <img
          src={previewUrl}
          alt=""
          className="w-12 h-12 rounded-xl object-cover border border-[var(--color-border)] flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <img src={BitesAILogo} alt="" className="w-5 h-5 rounded object-cover mb-1" />
          <h2 className="font-heading text-base font-bold truncate" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-family-heading)' }}>
            Nutrition Analysis
          </h2>
          <span
            className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${
              confidence === 'high'
                ? 'bg-[rgba(5,150,105,0.12)] text-[var(--color-accent)]'
                : confidence === 'medium'
                ? 'bg-[rgba(217,119,6,0.12)] text-[#B45309]'
                : 'bg-[rgba(220,38,38,0.12)] text-[var(--color-danger)]'
            }`}
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            {confidenceLabel}
          </span>
        </div>
      </header>

      {/* Hero calorie card */}
      <div className="hero-card animate-fadeUp">
        <p className="hero-card-label">Total Calories</p>
        <div className="hero-card-value">
          <span className="hero-card-number">{totalCalories}</span>
          <span className="hero-card-unit">kcal</span>
        </div>
      </div>

      {/* Health rating */}
      <div
        className="mx-4 mb-4 p-5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl animate-fadeUp md:mx-5 md:mb-5"
        style={{ fontFamily: 'var(--font-family-sans)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-0.5" aria-label={`Health rating ${healthInsight.rating} stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="18" height="18" viewBox="0 0 24 24"
                fill={i <= healthInsight.rating ? '#059669' : '#E5E7EB'}
                className="flex-shrink-0"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{healthInsight.label}</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{healthInsight.summary}</p>
      </div>

      {/* Macros */}
      <section className="mx-4 mb-4 md:mx-5 md:mb-5 animate-fadeUp">
        <div className="flex items-center gap-3 mb-4">
          {/* Flat icon container */}
          <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-lg flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
            </svg>
          </div>
          <h3 className="font-heading text-sm font-bold" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-family-heading)' }}>
            Nutritional Facts
          </h3>
        </div>
        <div
          className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-4 lg:flex-row lg:gap-8"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          <MacroBar label="Protein" value={totalMacros.protein} max={100} color="#8B5CF6" />
          <MacroBar label="Carbs" value={totalMacros.carbs} max={100} color="#2563EB" />
          <MacroBar label="Fat" value={totalMacros.fat} max={100} color="#059669" />
          {totalMacros.fiber !== undefined && (
            <MacroBar label="Fiber" value={totalMacros.fiber} max={30} color="#0284C7" />
          )}
        </div>
      </section>

      {/* Food categories */}
      <section className="mx-4 mb-4 md:mx-5 md:mb-5 animate-fadeUp">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-lg flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h3 className="font-heading text-sm font-bold" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-family-heading)' }}>
            Food Classification
          </h3>
        </div>

        {Object.entries(itemsByCategory).map(([cat, catItems]) => {
          const config = CATEGORY_CONFIG[cat as FoodCategory] ?? CATEGORY_CONFIG.mixed
          const categoryCalories = catItems.reduce((sum, i) => sum + i.calories, 0)
          return (
            <div
              key={cat}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden mb-3 border-l-4"
              style={{ borderLeftColor: config.textColor, fontFamily: 'var(--font-family-sans)' }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]"
                style={{ backgroundColor: config.bgColor }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-white rounded-lg flex-shrink-0"
                  style={{ backgroundColor: config.textColor }}
                >
                  {config.icon}
                </div>
                <span className="flex-1 text-sm font-semibold" style={{ color: config.textColor }}>{config.label}</span>
                <span className="text-sm font-bold" style={{ color: config.textColor }}>{categoryCalories} kcal</span>
              </div>
              <div>
                {catItems.map((item, i) => (
                  <div
                    key={`${item.name}-${i}`}
                    className="flex flex-col gap-1 px-4 py-3 border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.name}</span>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: 'var(--color-primary)' }}>{item.calories} kcal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--color-text-subtle)' }}>{item.portion}</span>
                      {item.macros && (
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
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

      {/* Tips */}
      {healthInsight.tips.length > 0 && (
        <section className="mx-4 mb-4 md:mx-5 md:mb-5 animate-fadeUp">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-accent)] text-white rounded-lg flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </div>
            <h3 className="font-heading text-sm font-bold" style={{ color: 'var(--color-foreground)', fontFamily: 'var(--font-family-heading)' }}>
              Health Tips
            </h3>
          </div>
          <ul
            className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3 list-none m-0"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            {healthInsight.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: 'var(--color-accent)' }} />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Notes */}
      {notes && (
        <p
          className="mx-4 mb-4 px-4 py-3 bg-[var(--color-surface)] rounded-xl text-sm leading-relaxed border-l-4 border-[var(--color-primary)] md:mx-5 md:mb-5"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-sans)' }}
        >
          {notes}
        </p>
      )}

      {/* Scan again */}
      <div className="px-4 pt-2 pb-6 safe-area-bottom md:px-5">
        <button
          type="button"
          onClick={onScanAgain}
          className="w-full flex items-center justify-center gap-2 min-h-[52px] px-6 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-sm transition-colors duration-150 active:bg-[var(--color-primary-hover)] active:scale-[0.97] cursor-pointer lg:min-h-[56px]"
          style={{ fontFamily: 'var(--font-family-sans)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Scan Again
        </button>
      </div>
    </div>
  )
}
