import type { CalorieAnalysis, FoodCategory, Macros, HealthInsight } from './types.js'

const VALID_CATEGORIES: FoodCategory[] = [
  'protein', 'grains', 'vegetables', 'fruits', 'dairy',
  'fats_oils', 'beverages', 'snacks', 'condiments', 'mixed'
]

function parseMacros(input: unknown): Macros {
  if (typeof input !== 'object' || input === null) {
    return { protein: 0, carbs: 0, fat: 0 }
  }
  const m = input as Record<string, unknown>
  return {
    protein: Number(m.protein) || 0,
    carbs: Number(m.carbs) || 0,
    fat: Number(m.fat) || 0,
    fiber: m.fiber !== undefined ? Number(m.fiber) || 0 : undefined,
  }
}

function parseHealthInsight(input: unknown): HealthInsight {
  if (typeof input !== 'object' || input === null) {
    return {
      rating: 3,
      label: 'Good',
      summary: 'A balanced meal with good nutritional value',
      tips: ['Maintain regular exercise', 'Include more vegetables and fruits'],
    }
  }
  const h = input as Record<string, unknown>
  const rating = Math.min(5, Math.max(1, Number(h.rating) || 3)) as 1 | 2 | 3 | 4 | 5
  const labels: Record<number, HealthInsight['label']> = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent' }
  const label = labels[rating] ?? 'Good'

  let tips: string[] = []
  if (Array.isArray(h.tips)) {
    tips = h.tips.filter(t => typeof t === 'string').slice(0, 5)
  }
  if (tips.length === 0) {
    tips = ['Maintain a balanced diet']
  }

  return {
    rating,
    label,
    summary: String(h.summary ?? 'Nutrition assessment complete'),
    tips,
  }
}

export function parseAnalysisResponse(text: string): CalorieAnalysis {
  // Clean up the text - remove any markdown code blocks or extra characters
  let cleanedText = text.trim()
  
  // Remove markdown code block markers
  cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '')
  
  // Try to find JSON object in the text
  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    console.error('No JSON found in response:', text.substring(0, 200))
    throw new Error('Model did not return valid JSON format. Please try again.')
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(jsonMatch[0])
  } catch (err) {
    console.error('JSON parse error:', err, 'Raw text:', text.substring(0, 500))
    throw new Error('Failed to parse food analysis. Please try again.')
  }

  if (!Array.isArray(parsed.items) || parsed.items.length === 0) {
    throw new Error('No food items detected in the image')
  }

  const items = parsed.items.map((item, index) => {
    const i = item as Record<string, unknown>
    const category = VALID_CATEGORIES.includes(i.category as FoodCategory)
      ? (i.category as FoodCategory)
      : 'mixed'

    return {
      name: String(i.name ?? `Food ${index + 1}`),
      portion: String(i.portion ?? '—'),
      calories: Number(i.calories) || 0,
      category,
      macros: parseMacros(i.macros),
    }
  })

  const totalCalories =
    typeof parsed.totalCalories === 'number'
      ? parsed.totalCalories
      : items.reduce((sum, i) => sum + i.calories, 0)

  const confidence = ['high', 'medium', 'low'].includes(parsed.confidence as string)
    ? (parsed.confidence as CalorieAnalysis['confidence'])
    : 'medium'

  const totalMacros = parseMacros(parsed.totalMacros)

  // Calculate totals from items if not provided
  if (totalMacros.protein === 0 && totalMacros.carbs === 0 && totalMacros.fat === 0) {
    items.forEach(item => {
      totalMacros.protein += item.macros.protein
      totalMacros.carbs += item.macros.carbs
      totalMacros.fat += item.macros.fat
      if (item.macros.fiber) totalMacros.fiber = (totalMacros.fiber || 0) + item.macros.fiber
    })
  }

  return {
    items,
    totalCalories,
    totalMacros,
    confidence,
    notes: String(parsed.notes ?? 'Estimate based on visible portions'),
    healthInsight: parseHealthInsight(parsed.healthInsight),
  }
}
