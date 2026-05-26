# CalorieLens

> Snap a photo of your meal and get an instant, AI-powered calorie and nutritional breakdown — powered by MiniMax vision models.

<p align="center">
  <img src="dist/BitesAI.png" alt="CalorieLens logo" width="80" />
</p>

---

## What it does

CalorieLens turns your phone's camera into a food analyst. Point it at any plate, hit snap, and within seconds you'll see:

- **Per-item breakdown** — name, portion size, calories, and macros (protein, carbs, fat, fiber) for every food detected
- **Total meal summary** — combined calorie count with a macro ring visualization
- **Health rating** — a 1–5 label (Poor → Excellent) with an AI-written summary and actionable tips
- **Confidence indicator** — know how sure the model is about each analysis
- **Scan history** — past analyses are saved locally and can be revisited anytime

---

## Features

| | |
|---|---|
| **Camera-first UI** | Full-screen viewfinder, rear camera, tap-to-snap — built mobile-first |
| **Photo import** | Upload images from your gallery in addition to snapping |
| **HEIC support** | iPhone HEIC photos are automatically converted to JPEG before upload |
| **Dual API fallback** | Calls MiniMax VLM first (`/v1/coding_plan/vlm`); falls back to the Chat API (`/v1/text/chatcompletion_v2`) on failure |
| **Macro ring charts** | Animated SVG rings for protein / carbs / fat on the results screen |
| **Health insights** | AI-generated rating, summary, and up to 3 improvement tips per scan |
| **Local history** | Last 50 scans persisted in `localStorage`; searchable via History view |
| **Serverless backend** | API runs as a Vercel Serverless Function — your API key never touches the browser |
| **Dark-mode desktop** | Clean dark background on desktop, true app-like experience on mobile |
| **Accessibility** | Semantic HTML, ARIA labels, `prefers-reduced-motion` support, keyboard-navigable |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| Backend | Vercel Serverless Functions (`api/analyze.ts`) |
| AI | MiniMax VLM + MiniMax Chat API (`MiniMax-Text-01`) |
| Fonts | Figtree (UI) · Sora (display) |

---

## Project Structure

```
calorielens/
├── api/
│   └── analyze.ts          Vercel serverless function — calls MiniMax, returns parsed analysis
│
├── shared/
│   ├── parseAnalysis.ts     JSON parsing logic shared between frontend and backend
│   └── types.ts            TypeScript types: FoodItem, CalorieAnalysis, ScanHistoryItem, AppPhase
│
├── src/
│   ├── App.tsx             Root component; owns all phase/state transitions and history logic
│   ├── main.tsx            Vite entry point
│   ├── index.css           Global base styles (reset, tokens, animations)
│   │
│   ├── components/
│   │   ├── App.css         App-level layout (phase routing, root container)
│   │   ├── CameraView.tsx  Camera viewfinder: video stream, snap button, gallery picker
│   │   ├── CameraView.css
│   │   ├── PreviewView.tsx Photo review: shows captured image with Retake / Analyze CTAs
│   │   ├── PreviewView.css
│   │   ├── LoadingOverlay.tsx Pulsing overlay shown while analysis runs
│   │   ├── LoadingOverlay.css
│   │   ├── ResultsView.tsx Full analysis display: food cards, macro rings, health insight
│   │   ├── ResultsView.css
│   │   ├── HistoryView.tsx  Scrollable list of past scans; delete & clear controls
│   │   └── HistoryView.css
│   │
│   ├── hooks/
│   │   └── useCamera.ts    Camera stream lifecycle (start/stop/restart, ready state, capture-to-base64)
│   │
│   ├── lib/
│   │   ├── api.ts              POSTs the image to /api/analyze and handles errors
│   │   ├── imageConversion.ts  HEIC → JPEG canvas conversion (iPhone compatibility)
│   │   └── parseAnalysis.ts    Client-side JSON parsing fallback (mirrors shared/)
│   │
│   ├── styles/
│   │   └── design-tokens.css   Tailwind v4 @theme block: all CSS custom properties & keyframes
│   │
│   └── types.ts                Re-exports from shared/types for convenience
│
├── index.html              App shell; loads Figtree + Sora fonts, sets viewport/meta
├── vercel.json             Rewrites /api/* to the serverless function
├── .env.example            Template for local environment variables
└── package.json
```

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-username/Calories-calculator.git
cd Calories-calculator
npm install
```

### 2. Configure your API key

```bash
cp .env.example .env
```

Open `.env` and set your MiniMax key:

```
MINIMAX_API_KEY=your_minimax_api_key_here
```

Get a key at [MiniMax Console → API Keys](https://platform.minimax.io/user-center/basic-information/interface-key).

> **Optional:** set `MINIMAX_API_HOST` if you're in a region that requires the China endpoint:
> ```
> MINIMAX_API_HOST=https://api.minimaxi.com
> ```

### 3. Run locally

**Frontend + API (recommended — requires [Vercel CLI](https://vercel.com/cli)):**

```bash
npm run dev:api
```

**Frontend only (API calls will fail, useful for UI work):**

```bash
npm run dev
```

---

## Deploy to Vercel

1. Push your repo to GitHub.
2. Import the repo into [Vercel](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:
   - `MINIMAX_API_KEY` — your key from MiniMax Console
   - *(Optional)* `MINIMAX_API_HOST` — only needed for China region
4. Deploy. The `api/analyze.ts` function is automatically detected and deployed as a serverless endpoint at `/api/analyze`.

Your API key stays server-side — the browser only ever talks to your Vercel deployment.

---

## API Reference

### `POST /api/analyze`

Accepts a JSON body with a base64-encoded image. Returns a `CalorieAnalysis` object.

**Request**

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response**

```json
{
  "items": [
    {
      "name": "Grilled Chicken Breast",
      "portion": "120g",
      "calories": 165,
      "category": "protein",
      "macros": { "protein": 31, "carbs": 0, "fat": 3.6, "fiber": 0 }
    }
  ],
  "totalCalories": 420,
  "totalMacros": { "protein": 35, "carbs": 45, "fat": 12, "fiber": 6 },
  "confidence": "high",
  "healthInsight": {
    "rating": 4,
    "label": "Great",
    "summary": "A balanced meal with good protein content...",
    "tips": [
      "Add a serving of leafy greens to boost fiber.",
      "Consider reducing oil used in cooking by half."
    ]
  },
  "notes": "Well-balanced macronutrient profile."
}
```

**Error responses**

| Status | Meaning |
|---|---|
| `400` | Missing or malformed image data |
| `500` | MiniMax API error or JSON parsing failure |

---

## Data Flow

```
User snaps photo
      │
      ▼
CameraView captures frame → useCamera.ts converts to JPEG base64
      │
      ▼
PreviewView shows image  ──[ Analyze ]──►  App.tsx sends POST /api/analyze
      │                                              │
      │                                              ▼
      │                                    api/analyze.ts
      │                                         │
      │                            ┌────────────┴────────────┐
      │                            ▼                         ▼
      │               MiniMax VLM                    (fallback)
      │           /v1/coding_plan/vlm               /v1/text/chatcompletion_v2
      │                            │                         │
      │                            └────────────┬────────────┘
      │                                         ▼
      │                              shared/parseAnalysis.ts
      │                              (extract + validate JSON)
      │                                         │
      │                                         ▼
      │                              CalorieAnalysis returned to frontend
      │                                         │
      ▼                                         ▼
ResultsView renders food cards + macro rings
HistoryView saves to localStorage
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (frontend only) |
| `npm run dev:api` | Vite + Vercel dev server (frontend + API) |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build locally |

---

## License

MIT
