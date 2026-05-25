import { type ReactNode } from 'react'
import type { CalorieAnalysis, FoodCategory } from '../../shared/types'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
}

const categoryConfig: Record<FoodCategory, { label: string; bgColor: string; textColor: string; icon: ReactNode }> = {
  protein: {
    label: '蛋白质',
    bgColor: 'rgba(198, 123, 92, 0.15)',
    textColor: '#8B5A3C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  grains: {
    label: '主食',
    bgColor: 'rgba(212, 165, 116, 0.15)',
    textColor: '#996B3D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 6v12M6 12h12"/>
      </svg>
    ),
  },
  vegetables: {
    label: '蔬菜',
    bgColor: 'rgba(45, 106, 79, 0.12)',
    textColor: '#2D6A4F',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c4-4 8-7.582 8-12a8 8 0 10-16 0c0 4.418 4 8 8 12z"/>
        <path d="M12 10v4"/>
      </svg>
    ),
  },
  fruits: {
    label: '水果',
    bgColor: 'rgba(212, 165, 116, 0.12)',
    textColor: '#996B3D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="14" r="7"/>
        <path d="M12 7V3"/>
      </svg>
    ),
  },
  dairy: {
    label: '奶制品',
    bgColor: 'rgba(143, 168, 138, 0.15)',
    textColor: '#5A7A66',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 2h8l2 4v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6l2-4z"/>
      </svg>
    ),
  },
  fats_oils: {
    label: '油脂坚果',
    bgColor: 'rgba(166, 124, 82, 0.15)',
    textColor: '#7A4C2A',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  beverages: {
    label: '饮品汤类',
    bgColor: 'rgba(91, 138, 114, 0.12)',
    textColor: '#3D6B5C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/>
      </svg>
    ),
  },
  snacks: {
    label: '零食甜点',
    bgColor: 'rgba(155, 107, 158, 0.12)',
    textColor: '#6B4A6E',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  condiments: {
    label: '调味酱料',
    bgColor: 'rgba(122, 111, 93, 0.12)',
    textColor: '#5A4F3D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M6 9l6-6 6 6"/>
      </svg>
    ),
  },
  mixed: {
    label: '混合菜品',
    bgColor: 'rgba(90, 122, 102, 0.12)',
    textColor: '#3A5A46',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
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
          {value}
          {unit}
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
    confidence === 'high' ? '高置信度' : confidence === 'medium' ? '中等置信度' : '低置信度'

  // Group items by category
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
          <h2>营养分析报告</h2>
          <span
            className={`confidence-badge confidence-${confidence}`}
          >
            {confidenceLabel}
          </span>
        </div>
      </header>

      {/* Hero Card - Total Calories */}
      <div className="hero-card">
        <p className="hero-card-label">总热量</p>
        <div className="hero-card-value">
          <span className="hero-card-number">{totalCalories}</span>
          <span className="hero-card-unit">kcal</span>
        </div>
      </div>

      {/* Health Rating */}
      <div className="health-card">
        <div className="health-rating-header">
          <div className="health-stars" aria-label={`健康评分 ${healthInsight.rating} 星`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`health-star ${i <= healthInsight.rating ? '' : 'empty'}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
          </div>
          <h3 className="section-title">营养成分</h3>
        </div>
        <div className="macro-card">
          <div className="macro-list">
            <MacroBar label="蛋白质" value={totalMacros.protein} max={macroMax} color="#C67B5C" />
            <MacroBar label="碳水化合物" value={totalMacros.carbs} max={macroMax} color="#D4A574" />
            <MacroBar label="脂肪" value={totalMacros.fat} max={macroMax} color="#40916C" />
            {totalMacros.fiber !== undefined && (
              <MacroBar label="膳食纤维" value={totalMacros.fiber} max={30} color="#5B8A72" />
            )}
          </div>
        </div>
      </section>

      {/* Food Classification by Category */}
      <section className="section category-section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <h3 className="section-title">食物分类</h3>
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
                  style={{ backgroundColor: config.textColor, color: 'white' }}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <h3 className="section-title">健康建议</h3>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
          </svg>
          再次扫描
        </button>
      </div>
    </div>
  )
}
