import type { CalorieAnalysis } from '../types'

interface ResultsViewProps {
  analysis: CalorieAnalysis
  previewUrl: string
  onScanAgain: () => void
}

const confidenceLabels = {
  high: { label: '高置信度', className: 'badge-high' },
  medium: { label: '中等置信度', className: 'badge-medium' },
  low: { label: '低置信度', className: 'badge-low' },
} as const

export function ResultsView({ analysis, previewUrl, onScanAgain }: ResultsViewProps) {
  const badge = confidenceLabels[analysis.confidence]

  return (
    <div className="results-shell">
      <header className="results-header">
        <div>
          <h2 className="font-display text-2xl text-forest">营养分析</h2>
          <span className={`confidence-badge ${badge.className}`}>{badge.label}</span>
        </div>
        <img src={previewUrl} alt="" className="results-thumb" />
      </header>

      <div className="total-card">
        <p className="text-forest/60 text-sm uppercase tracking-widest">总计</p>
        <p className="total-kcal font-display">
          {analysis.totalCalories}
          <span className="text-2xl text-forest/50 ml-1">kcal</span>
        </p>
      </div>

      <ul className="food-list">
        {analysis.items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="food-card"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="food-card-top">
              <h3 className="font-display text-lg text-forest">{item.name}</h3>
              <span className="food-kcal">{item.calories} kcal</span>
            </div>
            <p className="text-forest/55 text-sm">{item.portion}</p>
          </li>
        ))}
      </ul>

      {analysis.notes && (
        <p className="results-notes">{analysis.notes}</p>
      )}

      <button type="button" className="btn-primary w-full mt-4" onClick={onScanAgain}>
        再次扫描
      </button>
    </div>
  )
}
