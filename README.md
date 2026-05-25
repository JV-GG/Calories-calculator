# CalorieLens

拍照识别食物，用 **MiniMax** 视觉模型估算卡路里。

## 功能

- 全屏相机取景（移动端优先后置摄像头）
- 拍照 / 上传图片预览
- MiniMax VLM + 多模态 Chat API 分析
- 食物卡片、总卡路里、置信度徽章
- 移动端响应式，适配 Vercel 部署

## 本地开发

```bash
npm install
cp .env.example .env
# 在 .env 中填入 MINIMAX_API_KEY
```

前端 + API（推荐，需要 [Vercel CLI](https://vercel.com/docs/cli)）：

```bash
npx vercel dev
```

仅前端（`/api/analyze` 不可用）：

```bash
npm run dev
```

## 部署到 Vercel

1. 将仓库导入 Vercel
2. 在 **Project Settings → Environment Variables** 添加：
   - `MINIMAX_API_KEY` — [MiniMax 控制台](https://platform.minimax.io/user-center/basic-information/interface-key) 的 API Key
   - （可选）`MINIMAX_API_HOST` — 默认 `https://api.minimax.io`，国内可用 `https://api.minimaxi.com`
3. 部署即可；`api/analyze.ts` 作为 Serverless Function 运行，**API Key 不会暴露到浏览器**

## 技术栈

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- MiniMax `/v1/coding_plan/vlm`（优先）与 `/v1/text/chatcompletion_v2`（回退）

## 项目结构

```
api/analyze.ts      # Vercel 服务端：调用 MiniMax
shared/             # 前后端共享的 JSON 解析
src/components/     # 相机、预览、结果 UI
src/hooks/          # useCamera
```
