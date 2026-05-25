import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseAnalysisResponse } from '../shared/parseAnalysis'

const SYSTEM_PROMPT = `You are a professional nutrition expert and food analyst. Analyze food photos and provide comprehensive nutritional information. Always return valid JSON only without any markdown formatting or extra text.`

const USER_PROMPT = `Analyze this food image and provide a detailed nutritional breakdown. Return ONLY valid JSON with this exact structure:

{
  "items": [
    {
      "name": "Food name in Chinese",
      "portion": "estimated portion size (e.g., '150g', '2 slices', '1 cup')",
      "calories": number,
      "category": "one of: protein, grains, vegetables, fruits, dairy, fats_oils, beverages, snacks, condiments, mixed",
      "macros": {
        "protein": number in grams,
        "carbs": number in grams,
        "fat": number in grams,
        "fiber": number in grams (optional)
      }
    }
  ],
  "totalCalories": number,
  "totalMacros": {
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number
  },
  "confidence": "high" or "medium" or "low",
  "healthInsight": {
    "rating": 1 to 5 (1=poor, 5=excellent),
    "label": "One of: Poor, Fair, Good, Great, Excellent",
    "summary": "Brief overall health assessment in Chinese",
    "tips": ["Tip 1 in Chinese", "Tip 2 in Chinese", "Tip 3 in Chinese"]
  },
  "notes": "Additional observations in Chinese"
}

Category Guidelines:
- protein: Meat, fish, eggs, tofu, beans
- grains: Rice, bread, pasta, noodles, cereals
- vegetables: All vegetables and salads
- fruits: All fruits
- dairy: Milk, cheese, yogurt, ice cream
- fats_oils: Oils, butter, nuts, seeds, avocado
- beverages: Coffee, tea, juice, soda, soup
- snacks: Chips, cookies, candy, chocolate, desserts
- condiments: Sauces, dressings, spices, salt
- mixed: Combination dishes (curry, pizza, burgers, etc.)

Be accurate with portion estimates and ensure totalCalories equals sum of all item calories.`

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
