import type { CalorieAnalysis } from '../types.js'

export async function analyzeFoodImage(base64: string): Promise<CalorieAnalysis> {
  // Ensure base64 doesn't have data URL prefix
  const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64
  
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: cleanBase64 }),
  })

  const data = (await res.json()) as { error?: string } & Partial<CalorieAnalysis>

  if (!res.ok) {
    throw new Error(data.error ?? `Analysis failed (${res.status}). Please try again.`)
  }

  return data as CalorieAnalysis
}
