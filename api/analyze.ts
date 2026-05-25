import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseAnalysisResponse } from '../shared/parseAnalysis'

const SYSTEM_PROMPT =
  'You are a nutrition expert. Analyze food photos and return calorie estimates as JSON only. Be concise and realistic with portion sizes.'

const USER_PROMPT = `Identify each food item in this image. Return ONLY valid JSON with this exact shape (no markdown, no extra text):
{
  "items": [{ "name": "Food name", "portion": "150g", "calories": 248 }],
  "totalCalories": 454,
  "confidence": "medium",
  "notes": "Estimates based on visible portion sizes"
}
confidence must be one of: high, medium, low.`

function getApiHost(): string {
  return process.env.MINIMAX_API_HOST ?? 'https://api.minimax.io'
}

async function callMiniMaxVlm(
  apiKey: string,
  imageDataUrl: string
): Promise<string> {
  const host = getApiHost()
  const res = await fetch(`${host}/v1/coding_plan/vlm`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${SYSTEM_PROMPT}\n\n${USER_PROMPT}`,
      image_url: imageDataUrl,
    }),
  })

  const data = (await res.json()) as {
    content?: string
    base_resp?: { status_code?: number; status_msg?: string }
  }

  if (!res.ok || (data.base_resp?.status_code && data.base_resp.status_code !== 0)) {
    throw new Error(data.base_resp?.status_msg ?? `VLM API error ${res.status}`)
  }

  if (!data.content) {
    throw new Error('VLM 返回为空')
  }

  return data.content
}

async function callMiniMaxChat(
  apiKey: string,
  imageDataUrl: string
): Promise<string> {
  const host = getApiHost()
  const res = await fetch(`${host}/v1/text/chatcompletion_v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'MiniMax-Text-01',
      messages: [
        {
          role: 'system',
          name: 'MiniMax AI',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          name: 'User',
          content: [
            { type: 'text', text: USER_PROMPT },
            { type: 'image_url', image_url: { url: imageDataUrl } },
          ],
        },
      ],
    }),
  })

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    base_resp?: { status_code?: number; status_msg?: string }
  }

  if (!res.ok || (data.base_resp?.status_code && data.base_resp.status_code !== 0)) {
    throw new Error(data.base_resp?.status_msg ?? `Chat API error ${res.status}`)
  }

  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Chat API 返回为空')
  }

  return content
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.MINIMAX_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'MINIMAX_API_KEY 未配置' })
  }

  const { image } = req.body as { image?: string }
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: '缺少图片数据' })
  }

  const imageDataUrl = image.startsWith('data:')
    ? image
    : `data:image/jpeg;base64,${image}`

  try {
    let rawText: string
    try {
      rawText = await callMiniMaxVlm(apiKey, imageDataUrl)
    } catch {
      rawText = await callMiniMaxChat(apiKey, imageDataUrl)
    }

    const analysis = parseAnalysisResponse(rawText)
    return res.status(200).json(analysis)
  } catch (err) {
    const message = err instanceof Error ? err.message : '分析失败'
    return res.status(500).json({ error: message })
  }
}
