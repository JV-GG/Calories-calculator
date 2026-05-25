import { useRef } from 'react'
import type { RefObject } from 'react'

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>
  ready: boolean
  cameraError: string | null
  onSnap: () => void
  onUpload: (base64: string, previewUrl: string) => void
}

export function CameraView({
  videoRef,
  ready,
  cameraError,
  onSnap,
  onUpload,
}: CameraViewProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      if (base64) onUpload(base64, result)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className="camera-shell">
      <header className="camera-header">
        <span className="brand-mark" aria-hidden="true">
          ◉
        </span>
        <div>
          <h1 className="font-display text-2xl tracking-tight text-cream">CalorieLens</h1>
          <p className="text-cream/55 text-xs tracking-wide uppercase">Snap · Estimate · Eat smarter</p>
        </div>
      </header>

      <div className="viewfinder-frame">
        <video
          ref={videoRef}
          className="viewfinder-video"
          playsInline
          muted
          autoPlay
          aria-label="相机取景"
        />
        {!ready && (
          <div className="viewfinder-placeholder">
            <p className="text-cream/70 text-sm text-center px-6">
              {cameraError ?? '正在启动相机…'}
            </p>
          </div>
        )}
        <div className="viewfinder-corners" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
      </div>

      <div className="camera-controls">
        <button
          type="button"
          className="btn-upload"
          onClick={() => fileRef.current?.click()}
          aria-label="上传图片"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 16V4m0 0L7 9m5-5 5 5" />
            <path d="M4 20h16" />
          </svg>
        </button>

        <button
          type="button"
          className="btn-snap"
          onClick={onSnap}
          disabled={!ready}
          aria-label="拍照"
        >
          <span className="btn-snap-inner" />
        </button>

        <div className="w-11" aria-hidden="true" />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={handleFile}
      />
    </div>
  )
}
