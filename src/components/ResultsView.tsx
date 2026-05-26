import { type ReactNode } from 'react'
import type { CalorieAnalysis, FoodCategory } from '../../shared/types.js'
import './ResultsView.css'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
  onViewHistory: () => void
}

const CATEGORY_CONFIG: Record<FoodCategory, { label: string; bgColor: string; textColor: string; barColor: string; icon: ReactNode }> = {
  protein: {
    label: 'Protein',
    bgColor: 'rgba(167, 139, 250, 0.12)',
    textColor: '#A78BFA',
    barColor: '#7C3AED',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  grains: {
    label: 'Grains',
    bgColor: 'rgba(251, 191, 36, 0.12)',
    textColor: '#FBBF24',
    barColor: '#D97706',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  vegetables: {
    label: 'Vegetables',
    bgColor: 'rgba(52, 211, 153, 0.12)',
    textColor: '#34D399',
    barColor: '#059669',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/>
      </svg>
    ),
  },
  fruits: {
    label: 'Fruits',
    bgColor: 'rgba(244, 114, 182, 0.12)',
    textColor: '#F472B6',
    barColor: '#DB2777',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-12 8-12s4.5 3 4.5 8.5"/>
      </svg>
    ),
  },
  dairy: {
    label: 'Dairy',
    bgColor: 'rgba(251, 191, 36, 0.12)',
    textColor: '#FBBF24',
    barColor: '#D97706',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"/><path d="M6 6h12"/>
      </svg>
    ),
  },
  fats_oils: {
    label: 'Fats & Oils',
    bgColor: 'rgba(251, 146, 60, 0.12)',
    textColor: '#FB923C',
    barColor: '#EA580C',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  beverages: {
    label: 'Beverages',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    textColor: '#38BDF8',
    barColor: '#0284C7',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      </svg>
    ),
  },
  snacks: {
    label: 'Snacks',
    bgColor: 'rgba(192, 132, 252, 0.12)',
    textColor: '#C084FC',
    barColor: '#9333EA',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
      </svg>
    ),
  },
  condiments: {
    label: 'Condiments',
    bgColor: 'rgba(156, 163, 175, 0.12)',
    textColor: '#9CA3AF',
    barColor: '#6B7280',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18"/><path d="M8 21h8"/><path d="M8 3h8"/>
      </svg>
    ),
  },
  mixed: {
    label: 'Mixed Dishes',
    bgColor: 'rgba(96, 165, 250, 0.12)',
    textColor: '#60A5FA',
    barColor: '#2563EB',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
}

function MacroPill({ label, value, max, dotColor, fillClass }: {
  label: string
  value: number
  max: number
  dotColor: string
  fillClass: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className={`macro-pill pill-${label.toLowerCase()}`}>
      <div className="macro-pill-top">
        <span className="macro-pill-name">
          <span className="macro-pill-dot" style={{ backgroundColor: dotColor }} />
          {label}
        </span>
        <span className="macro-pill-value">
          {value}
          <span className="macro-pill-unit">g</span>
        </span>
      </div>
      <div className="macro-pill-track">
        <div
          className={`macro-pill-fill ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function FoodCategoryCard({ cat, catItems, maxCal }: {
  cat: FoodCategory
  catItems: Array<{ name: string; calories: number; portion?: string; macros?: { protein: number; carbs: number; fat: number } }>
  maxCal: number
}) {
  const config = CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG.mixed
  const categoryCalories = catItems.reduce((sum, i) => sum + i.calories, 0)
  return (
    <div className="food-category" style={{ borderTopColor: config.textColor }}>
      <div className="food-category-header" style={{ backgroundColor: config.bgColor }}>
        <div
          className="food-category-icon"
          style={{ backgroundColor: config.textColor }}
          aria-hidden="true"
        >
          {config.icon}
        </div>
        <span className="food-category-name" style={{ color: config.textColor }}>
          {config.label}
        </span>
        <span className="food-category-cal" style={{ color: config.textColor }}>
          {categoryCalories} kcal
        </span>
      </div>
      <ul className="food-items-list">
        {catItems.map((item, i) => {
          const pct = maxCal > 0 ? Math.min((item.calories / maxCal) * 100, 100) : 0
          return (
            <li key={`${item.name}-${i}`} className="food-item">
              <div className="food-item-top">
                <div className="food-item-left">
                  <span className="food-item-name">{item.name}</span>
                  <span className="food-item-portion">{item.portion}</span>
                </div>
                <span className="food-item-cal">{item.calories}</span>
              </div>
              <div className="food-item-bar">
                <div
                  className="food-item-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: config.barColor }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ResultsView({ analysis, previewUrl, onScanAgain, onViewHistory }: ResultsViewProps) {
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

  const totalProtein = totalMacros.protein
  const totalCarbs = totalMacros.carbs
  const totalFat = totalMacros.fat
  const totalFiber = totalMacros.fiber ?? 0

  // For calorie bars, find the max calorie item
  const maxItemCal = Math.max(...items.map(i => i.calories), 1)

  return (
    <div className="results-shell">
      <div className="results-layout">

        {/* ── TOP ROW ────────────────────────────────────── */}
        <div className="results-top-row">

          {/* Left: Photo + Confidence/History + CTA */}
          <div className="results-panel-photo">
            <div className="results-photo-card">
              <img src={previewUrl} alt="Scanned food" />
              <div className="results-photo-overlay" />
              <div className="results-photo-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                AI Analysis
              </div>
            </div>

            <div className="results-meta-row">
              <span className={`results-confidence ${confidence}`}>
                {confidence === 'high' && (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
                {confidenceLabel}
              </span>
              <button
                type="button"
                onClick={onViewHistory}
                className="results-history-btn"
                aria-label="View scan history"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                History
              </button>
            </div>

            <div className="results-cta">
              <button type="button" onClick={onScanAgain} className="cta-button" aria-label="Scan another food item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Scan Again
              </button>
            </div>
          </div>

          {/* Center: Hero Calorie */}
          <div className="results-panel-hero">
            <div className="hero-card">
              <div className="hero-card-inner">
                <p className="hero-card-label">Total Estimated Calories</p>
                <div className="hero-card-value">
                  <span className="hero-card-number">{totalCalories}</span>
                </div>
                <span className="hero-card-unit">kcal per serving</span>
                <div className="hero-card-bottom">
                  <div className="hero-health">
                    <div className="hero-health-stars" aria-label={`Health rating: ${healthInsight.rating} out of 5 stars — ${healthInsight.label}`} role="img">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          width="12" height="12" viewBox="0 0 24 24"
                          fill={i <= healthInsight.rating ? '#34D399' : 'rgba(255,255,255,0.1)'}
                          aria-hidden="true"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="hero-health-label">{healthInsight.label}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="results-summary-row">
              <div className="results-stat-card">
                <div className="results-stat-label">Protein</div>
                <div className="results-stat-value" style={{ color: '#A78BFA' }}>{totalProtein}g</div>
                <div className="results-stat-unit">macros</div>
              </div>
              <div className="results-stat-card">
                <div className="results-stat-label">Carbs</div>
                <div className="results-stat-value" style={{ color: '#60A5FA' }}>{totalCarbs}g</div>
                <div className="results-stat-unit">macros</div>
              </div>
              <div className="results-stat-card">
                <div className="results-stat-label">Fat</div>
                <div className="results-stat-value" style={{ color: '#34D399' }}>{totalFat}g</div>
                <div className="results-stat-unit">macros</div>
              </div>
            </div>
          </div>

          {/* Right: Food Classification (xl) */}
          <div className="results-panel-food">
            <div className="food-section">
              <div className="food-section-header">
                <div className="food-icon" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <h3 className="food-title">Food Classification</h3>
              </div>
              {Object.entries(itemsByCategory).map(([cat, catItems]) => (
                <FoodCategoryCard
                  key={cat}
                  cat={cat as FoodCategory}
                  catItems={catItems}
                  maxCal={maxItemCal}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW ─────────────────────────────────── */}
        <div className="results-bottom-row">

          {/* Left: Macros — Premium pill design */}
          <div className="macros-card animate-fadeUp">
            <div className="macros-header">
              <div className="macros-icon" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
                </svg>
              </div>
              <div>
                <div className="macros-title">Macronutrients</div>
                <div className="macros-subtitle">Per estimated serving</div>
              </div>
            </div>
            <div className="macros-grid">
              <MacroPill label="Protein" value={totalProtein} max={80} dotColor="#A78BFA" fillClass="fill-protein" />
              <MacroPill label="Carbs" value={totalCarbs} max={100} dotColor="#60A5FA" fillClass="fill-carbs" />
              <MacroPill label="Fat" value={totalFat} max={60} dotColor="#34D399" fillClass="fill-fat" />
              {totalFiber > 0 && (
                <MacroPill label="Fiber" value={totalFiber} max={30} dotColor="#38BDF8" fillClass="fill-fiber" />
              )}
            </div>
          </div>

          {/* Right: Tips + Food Classification */}
          <div className="results-panel-tips-food">

            {/* Health Tips */}
            {healthInsight.tips.length > 0 && (
              <div className="tips-card animate-fadeUp animate-delay-100">
                <div className="tips-header">
                  <div className="tips-icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </svg>
                  </div>
                  <span className="tips-title">Health Insights</span>
                </div>
                <ul className="tips-list">
                  {healthInsight.tips.map((tip, i) => (
                    <li key={i} className="tip-item">
                      <span className="tip-bullet" aria-hidden="true" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Food Classification — bottom panel */}
            <div className="results-panel-food-mobile">
              <div className="food-section">
                <div className="food-section-header">
                  <div className="food-icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  </div>
                  <h3 className="food-title">Food Classification</h3>
                </div>
                {Object.entries(itemsByCategory).map(([cat, catItems]) => (
                  <FoodCategoryCard
                    key={cat}
                    cat={cat as FoodCategory}
                    catItems={catItems}
                    maxCal={maxItemCal}
                  />
                ))}
              </div>
              {notes && <p className="results-notes">{notes}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
