import { useRef } from 'react'
import type { RefObject } from 'react'

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>
  ready: boolean
  cameraError: string | null
  onSnap: () => void
  onUpload: (base64: string, previewUrl: string) => void
  onHistory: () => void
  hasHistory: boolean
}

export function CameraView({
  videoRef,
  ready,
  cameraError,
  onSnap,
  onUpload,
  onHistory,
  hasHistory,
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
      {/* Header */}
      <header className="camera-header">
        <div className="header-brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              <circle cx="12" cy="12" r="9" strokeDasharray="4 2"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1>CalorieLens</h1>
            <p>Snap · Estimate · Eat smarter</p>
          </div>
        </div>

        {hasHistory && (
          <button
            type="button"
            className="history-btn"
            onClick={onHistory}
            aria-label="查看历史记录"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="12,7 12,12 15,15"/>
            </svg>
            <span>历史</span>
          </button>
        )}
      </header>

      {/* Viewfinder */}
      <div className="viewfinder-container">
        <div className="viewfinder">
          <video
            ref={videoRef}
            className="viewfinder-video"
            playsInline
            muted
            autoPlay
            aria-label="相机取景"
          />

          {!ready && (
            <div className="viewfinder-placeholder" role="status">
              {cameraError ? (
                <>
                  <div className="placeholder-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="placeholder-text">{cameraError}</p>
                  <p className="placeholder-text" style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                    点击下方按钮上传图片
                  </p>
                </>
              ) : (
                <>
                  <div className="placeholder-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                  <p className="placeholder-text">正在启动相机...</p>
                </>
              )}
            </div>
          )}

          {/* Overlay */}
          <div className="viewfinder-overlay" aria-hidden="true">
            <div className="viewfinder-frame" />
            <div className="focus-ring" />
            {ready && (
              <div className="viewfinder-hint">
                将食物置于框内
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="camera-controls">
        <button
          type="button"
          className="control-btn"
          onClick={() => fileRef.current?.click()}
          aria-label="从相册选择"
        >
          <div className="control-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <span className="control-btn-label">相册</span>
        </button>

        <button
          type="button"
          className="snap-btn"
          onClick={onSnap}
          disabled={!ready}
          aria-label="拍照"
          aria-busy={!ready}
        >
          <div className="snap-btn-ring" />
          <div className="snap-btn-inner" />
        </button>

        <button
          type="button"
          className="control-btn"
          onClick={onHistory}
          aria-label="查看历史"
        >
          <div className="control-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9"/>
              <polyline points="12,7 12,12 15,15"/>
            </svg>
          </div>
          <span className="control-btn-label">历史</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={handleFile}
        aria-hidden="true"
      />
    </div>
  )
}
