export interface FoodItem {
  name: string
  portion: string
  calories: number
}

export interface CalorieAnalysis {
  items: FoodItem[]
  totalCalories: number
  confidence: 'high' | 'medium' | 'low'
  notes: string
}

export function parseAnalysisResponse(text: string): CalorieAnalysis {
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('模型未返回有效 JSON')
  }

  const parsed = JSON.parse(jsonMatch[0]) as Partial<CalorieAnalysis>

  if (!Array.isArray(parsed.items) || parsed.items.length === 0) {
    throw new Error('未识别到食物项')
  }

  const items = parsed.items.map((item) => ({
    name: String(item.name ?? '未知食物'),
    portion: String(item.portion ?? '—'),
    calories: Number(item.calories) || 0,
  }))

  const totalCalories =
    typeof parsed.totalCalories === 'number'
      ? parsed.totalCalories
      : items.reduce((sum, i) => sum + i.calories, 0)

  const confidence = ['high', 'medium', 'low'].includes(parsed.confidence as string)
    ? (parsed.confidence as CalorieAnalysis['confidence'])
    : 'medium'

  return {
    items,
    totalCalories,
    confidence,
    notes: String(parsed.notes ?? '基于可见份量的估算'),
  }
}
