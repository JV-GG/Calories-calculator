import { type ReactNode } from 'react'
import type { CalorieAnalysis, FoodCategory } from '../../shared/types.js'
import './ResultsView.css'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
  onBack: () => void
}

/* ─── Macro Ring SVG ─────────────────────────────────── */
const RING_SZ = 56
const RING_SW = 3.5
const RING_R = (RING_SZ - RING_SW) / 2
const RING_CIRC = 2 * Math.PI * RING_R

function MacroRing({ value, max, label, color }: {
  value: number; max: number; label: string; color: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  const dash = (pct / 100) * RING_CIRC

  return (
    <div className="ring-item">
      <div className="ring-wrap">
        <svg className="ring-svg" width={RING_SZ} height={RING_SZ}
          viewBox={`0 0 ${RING_SZ} ${RING_SZ}`} aria-hidden="true">
          <circle cx={RING_SZ/2} cy={RING_SZ/2} r={RING_R}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={RING_SW} />
          <circle cx={RING_SZ/2} cy={RING_SZ/2} r={RING_R}
            fill="none" stroke={color} strokeWidth={RING_SW}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${RING_CIRC}`}
            strokeDashoffset={0}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }} />
        </svg>
        <div className="ring-value" style={{ color }}>{value}</div>
      </div>
      <div className="ring-info">
        <span className="ring-name">{label}</span>
        <span className="ring-gram">{value}<span>g</span></span>
        <span className="ring-pct">{pct.toFixed(0)}%</span>
      </div>
    </div>
  )
}

/* ─── Food Category Row ───────────────────────────────── */
const CAT: Record<FoodCategory, { label: string; color: string; icon: ReactNode }> = {
  protein:    { label: 'Protein',     color: '#A78BFA', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg> },
  grains:     { label: 'Grains',      color: '#FBBF24', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
  vegetables:  { label: 'Vegetables',  color: '#34D399', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/></svg> },
  fruits:     { label: 'Fruits',      color: '#F472B6', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-12 8-12s4.5 3 4.5 8.5"/></svg> },
  dairy:      { label: 'Dairy',       color: '#FBBF24', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2h8l2 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6l2-4z"/><path d="M6 6h12"/></svg> },
  fats_oils:  { label: 'Fats & Oils', color: '#FB923C', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  beverages:  { label: 'Beverages',   color: '#38BDF8', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/></svg> },
  snacks:     { label: 'Snacks',      color: '#C084FC', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> },
  condiments: { label: 'Condiments',  color: '#9CA3AF', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v18"/><path d="M8 21h8"/><path d="M8 3h8"/></svg> },
  mixed:      { label: 'Mixed Dishes', color: '#60A5FA', icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> },
}

function FoodCatRow({ cat, items, maxCal }: {
  cat: FoodCategory
  items: Array<{ name: string; calories: number; portion?: string; macros?: { protein: number; carbs: number; fat: number } }>
  maxCal: number
}) {
  const cfg = CAT[cat] ?? CAT.mixed
  const catCal = items.reduce((s, i) => s + i.calories, 0)
  return (
    <div className="food-cat-row" style={{ borderLeftColor: cfg.color }}>
      <div className="food-cat-head">
        <div className="food-cat-icon" style={{ backgroundColor: cfg.color }} aria-hidden="true">
          {cfg.icon}
        </div>
        <span className="food-cat-label" style={{ color: cfg.color }}>{cfg.label}</span>
        <span className="food-cat-kcal" style={{ color: cfg.color }}>{catCal} kcal</span>
      </div>
      <ul className="food-items">
        {items.map((item, i) => {
          const pct = maxCal > 0 ? Math.min((item.calories / maxCal) * 100, 100) : 0
          return (
            <li key={`${item.name}-${i}`}>
              <div className="food-item-row">
                <div className="food-item-left">
                  <span className="food-item-name">{item.name}</span>
                  <span className="food-item-portion">{item.portion}</span>
                </div>
                <span className="food-item-cal" style={{ color: cfg.color }}>{item.calories}</span>
              </div>
              <div className="food-bar">
                <div className="food-bar-fill" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────── */
export function ResultsView({ analysis, previewUrl, onScanAgain, onBack }: ResultsViewProps) {
  const { items, totalCalories, totalMacros, confidence, notes, healthInsight } = analysis
  const confLabel =
    confidence === 'high' ? 'High confidence' :
    confidence === 'medium' ? 'Medium confidence' : 'Low confidence'

  const byCat = items.reduce((acc, item) => {
    const c = item.category || 'mixed'
    if (!acc[c]) acc[c] = []
    acc[c].push(item)
    return acc
  }, {} as Record<FoodCategory, typeof items>)

  const protein = totalMacros.protein
  const carbs   = totalMacros.carbs
  const fat     = totalMacros.fat
  const fiber   = totalMacros.fiber ?? 0
  const maxCal  = Math.max(...items.map(i => i.calories), 1)

  return (
    <div className="results-shell">
      {/* Sticky header */}
      <header className="results-header">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to history"
          className="results-back-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>

        <div className="results-header-title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span>Analysis</span>
        </div>

        <button
          type="button"
          onClick={onScanAgain}
          aria-label="Scan another food item"
          className="results-scan-again-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span className="results-scan-text">Scan Again</span>
        </button>
      </header>

      <div className="results-layout">

        {/* ── Photo + Hero ─────────────────────────────── */}
        <div className="results-top-row">

          {/* Photo card */}
          <div className="photo-card">
            <img src={previewUrl} alt="Scanned food" />
            <div className="photo-overlay" />
            <div className={`confidence ${confidence}`}>
              {confidence === 'high' && (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              )}
              {confLabel}
            </div>
          </div>

          {/* Hero card */}
          <div className="hero-card">
            <p className="hero-label">Total Estimated Calories</p>
            <div className="hero-number">{totalCalories}</div>
            <div className="hero-unit">kcal / serving</div>
            <div className="hero-health">
              <div className="hero-stars"
                aria-label={`Health rating: ${healthInsight.rating} out of 5 — ${healthInsight.label}`}
                role="img">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                    fill={i <= healthInsight.rating ? '#34D399' : 'rgba(255,255,255,0.08)'}
                    aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span className="hero-stars-label">{healthInsight.label}</span>
            </div>
          </div>
        </div>

        {/* ── Macros ───────────────────────────────────── */}
        <div className="macros-card animate-fadeUp">
          <div className="card-header">
            <div className="card-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
              </svg>
            </div>
            <div>
              <div className="card-title">Macronutrients</div>
              <div className="card-subtitle">Per serving</div>
            </div>
          </div>
          <div className="macros-ring-grid">
            <MacroRing label="Protein" value={protein} max={80}  color="#A78BFA" />
            <MacroRing label="Carbs"   value={carbs}   max={100} color="#60A5FA" />
            <MacroRing label="Fat"     value={fat}     max={60}  color="#34D399" />
            {fiber > 0 && <MacroRing label="Fiber" value={fiber} max={30} color="#38BDF8" />}
          </div>
        </div>

        {/* ── Food Classification ───────────────────────── */}
        <div className="food-card animate-fadeUp animate-delay-100">
          <div className="card-header">
            <div className="card-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <div>
              <div className="card-title">Food Classification</div>
              <div className="card-subtitle">{items.length} items detected</div>
            </div>
          </div>
          <div className="food-card-body">
            {Object.entries(byCat).map(([cat, catItems]) => (
              <FoodCatRow key={cat} cat={cat as FoodCategory} items={catItems} maxCal={maxCal} />
            ))}
            {notes && <p className="food-notes">{notes}</p>}
          </div>
        </div>

        {/* ── Health Insights (mobile) ──────────────────── */}
        {healthInsight.tips.length > 0 && (
          <div className="tips-card animate-fadeUp animate-delay-200">
            <div className="card-header">
              <div className="card-icon" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
              <div className="card-title">Health Insights</div>
            </div>
            <ul className="tips-list">
              {healthInsight.tips.map((tip, i) => (
                <li key={i} className="tip-item">
                  <span className="tip-dot" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}
