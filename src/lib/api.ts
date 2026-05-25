import type { CalorieAnalysis } from '../types'

export async function analyzeFoodImage(base64: string): Promise<CalorieAnalysis> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 }),
  })

  const data = (await res.json()) as { error?: string } & Partial<CalorieAnalysis>

  if (!res.ok) {
    throw new Error(data.error ?? `分析失败 (${res.status})`)
  }

  return data as CalorieAnalysis
}
