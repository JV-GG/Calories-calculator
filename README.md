# CalorieLens

Snap food photos and instantly estimate calories using **MiniMax** vision models.

## Features

- Full-screen camera viewfinder (mobile-first, rear camera)
- Take photos or upload images from gallery
- HEIC to JPEG conversion (works with iPhone photos)
- MiniMax VLM + multimodal Chat API analysis
- Food cards with total calories and confidence badges
- Mobile-responsive design, optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
cp .env.example .env
```

Edit `.env` and add your `MINIMAX_API_KEY`.

### Development

**Frontend + API (recommended, requires [Vercel CLI](https://vercel.com/docs/cli)):**

```bash
npx vercel dev
```

**Frontend only** (API endpoints unavailable):

```bash
npm run dev
```

## Deploy to Vercel

1. Import the repository to Vercel
2. In **Project Settings → Environment Variables**, add:
   - `MINIMAX_API_KEY` — Your API key from [MiniMax Console](https://platform.minimax.io/user-center/basic-information/interface-key)
   - (Optional) `MINIMAX_API_HOST` — Default `https://api.minimax.io`, or `https://api.minimaxi.com` for China
3. Deploy — `api/analyze.ts` runs as a Serverless Function, **keeping your API key secure from the browser**

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- MiniMax `/v1/coding_plan/vlm` (primary) with `/v1/text/chatcompletion_v2` fallback

## Project Structure

```
api/analyze.ts      # Vercel serverless: calls MiniMax API
shared/             # JSON parsing shared between frontend/backend
src/components/     # Camera, preview, results UI components
src/hooks/          # useCamera hook for camera access
src/lib/            # API client and image conversion utilities
```
