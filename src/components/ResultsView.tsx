import { type ReactNode } from 'react'
import type { CalorieAnalysis, FoodCategory } from '../../shared/types.js'
import BitesAILogo from '../../BitesAI.png'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
}

const categoryConfig: Record<FoodCategory, { label: string; bgColor: string; textColor: string; icon: ReactNode }> = {
  protein: {
    label: 'Protein',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    textColor: '#7C3AED',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  grains: {
    label: 'Grains',
    bgColor: 'rgba(217, 119, 6, 0.12)',
    textColor: '#D97706',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  vegetables: {
    label: 'Vegetables',
    bgColor: 'rgba(5, 150, 105, 0.12)',
    textColor: '#047857',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21h10"/>
        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/>
        <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/>
      </svg>
    ),
  },
  fruits: {
    label: 'Fruits',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    textColor: '#DB2777',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-12 8-12s4.5 3 4.5 8.5"/>
        <path d="M12 2c1 2-1 5-1 5"/>
      </svg>
    ),
  },
  dairy: {
    label: 'Dairy',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    textColor: '#F59E0B',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"/>
        <path d="M6 6h12"/>
      </svg>
    ),
  },
  fats_oils: {
    label: 'Fats & Oils',
    bgColor: 'rgba(249, 115, 22, 0.12)',
    textColor: '#EA580C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  beverages: {
    label: 'Beverages',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    textColor: '#0284C7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
  },
  snacks: {
    label: 'Snacks',
    bgColor: 'rgba(168, 85, 247, 0.12)',
    textColor: '#9333EA',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
        <path d="M8.5 8.5v.01"/>
        <path d="M16 15.5v.01"/>
        <path d="M12 12v.01"/>
        <path d="M11 17v.01"/>
        <path d="M7 14v.01"/>
      </svg>
    ),
  },
  condiments: {
    label: 'Condiments',
    bgColor: 'rgba(75, 85, 99, 0.12)',
    textColor: '#4B5563',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18"/>
        <path d="M8 21h8"/>
        <path d="M8 3h8"/>
      </svg>
    ),
  },
  mixed: {
    label: 'Mixed Dishes',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    textColor: '#7C3AED',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
}

function MacroBar({
  label,
  value,
  max,
  color,
  unit = 'g',
}: {
  label: string
  value: number
  max: number
  color: string
  unit?: string
}) {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div className="macro-item">
      <div className="macro-item-header">
        <span className="macro-item-label">
          <span className="macro-dot" style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="macro-item-value">
          {value}{unit}
        </span>
      </div>
      <div className="macro-bar">
        <div
          className="macro-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
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

  const macroMax = 100

  return (
    <div className="results-shell">
      {/* Sticky Header */}
      <header className="results-header">
        <img src={previewUrl} alt="" className="results-thumb" />
        <div className="results-header-info">
          <img src={BitesAILogo} alt="" className="results-logo" />
          <h2>Nutrition Analysis</h2>
          <span className={`confidence-badge confidence-${confidence}`}>
            {confidenceLabel}
          </span>
        </div>
      </header>

      {/* Hero Card */}
      <div className="hero-card">
        <p className="hero-card-label">Total Calories</p>
        <div className="hero-card-value">
          <span className="hero-card-number">{totalCalories}</span>
          <span className="hero-card-unit">kcal</span>
        </div>
      </div>

      {/* Health Rating */}
      <div className="health-card">
        <div className="health-rating-header">
          <div className="health-stars" aria-label={`Health rating ${healthInsight.rating} stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`health-star ${i <= healthInsight.rating ? '' : 'empty'}`}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          <span className="health-label">{healthInsight.label}</span>
        </div>
        <p className="health-summary">{healthInsight.summary}</p>
      </div>

      {/* Macros Section */}
      <section className="section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10"/>
              <path d="M12 20V4"/>
              <path d="M6 20v-6"/>
            </svg>
          </div>
          <h3 className="section-title">Nutritional Facts</h3>
        </div>
        <div className="macro-card">
          <div className="macro-list">
            <MacroBar label="Protein" value={totalMacros.protein} max={macroMax} color="#A78BFA" />
            <MacroBar label="Carbs" value={totalMacros.carbs} max={macroMax} color="#10B981" />
            <MacroBar label="Fat" value={totalMacros.fat} max={macroMax} color="#8B5CF6" />
            {totalMacros.fiber !== undefined && (
              <MacroBar label="Fiber" value={totalMacros.fiber} max={30} color="#0284C7" />
            )}
          </div>
        </div>
      </section>

      {/* Food Classification */}
      <section className="section category-section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h3 className="section-title">Food Classification</h3>
        </div>

        {Object.entries(itemsByCategory).map(([cat, catItems]) => {
          const config = categoryConfig[cat as FoodCategory] || categoryConfig.mixed
          const categoryCalories = catItems.reduce((sum, i) => sum + i.calories, 0)

          return (
            <div
              key={cat}
              className="category-card"
              style={{ borderLeft: `4px solid ${config.textColor}` }}
            >
              <div className="category-header" style={{ backgroundColor: config.bgColor }}>
                <div
                  className="category-icon"
                  style={{ backgroundColor: config.textColor }}
                >
                  {config.icon}
                </div>
                <span className="category-name" style={{ color: config.textColor }}>
                  {config.label}
                </span>
                <span className="category-calories" style={{ color: config.textColor }}>
                  {categoryCalories} kcal
                </span>
              </div>
              <div className="category-items">
                {catItems.map((item, i) => (
                  <div key={`${item.name}-${i}`} className="food-item">
                    <div className="food-item-top">
                      <span className="food-name">{item.name}</span>
                      <span className="food-calories">{item.calories} kcal</span>
                    </div>
                    <div className="food-item-bottom">
                      <span className="food-portion">{item.portion}</span>
                      {item.macros && (
                        <span className="food-macros">
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

      {/* Health Tips */}
      {healthInsight.tips.length > 0 && (
        <section className="section">
          <div className="section-header">
            <div className="section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <h3 className="section-title">Health Tips</h3>
          </div>
          <div className="tips-card">
            <ul className="tips-list">
              {healthInsight.tips.map((tip, i) => (
                <li key={i} className="tip-item">
                  <span className="tip-bullet" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Notes */}
      {notes && <p className="results-notes">{notes}</p>}

      {/* Actions */}
      <div className="results-actions">
        <button type="button" className="btn btn-primary" onClick={onScanAgain}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Scan Again
        </button>
      </div>
    </div>
  )
}
