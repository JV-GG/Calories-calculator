import { useRef, useCallback, useState } from 'react'
import type { RefObject } from 'react'
import BitesAILogo from '../../BitesAI.png'
import { convertHeicToJpeg, isHeicFile } from '../lib/imageConversion'

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
  const [isConverting, setIsConverting] = useState(false)

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Check if it's HEIC format
      if (isHeicFile(file)) {
        setIsConverting(true)
        const converted = await convertHeicToJpeg(file)
        onUpload(converted.base64, converted.previewUrl)
      } else {
        // Standard image processing
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          if (base64) onUpload(base64, result)
        }
        reader.readAsDataURL(file)
      }
    } catch (err) {
      console.error('Image processing error:', err)
      alert('Failed to process image. Please try again.')
    } finally {
      setIsConverting(false)
      if (fileRef.current) {
        fileRef.current.value = ''
      }
    }
  }, [onUpload])

  const handleGalleryClick = useCallback(() => {
    if (fileRef.current && !isConverting) {
      fileRef.current.value = ''
      fileRef.current.click()
    }
  }, [isConverting])

  return (
    <div className="camera-shell">
      <header className="camera-header">
        <div className="header-brand">
          <img src={BitesAILogo} alt="CalorieLens" className="brand-logo" />
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
            aria-label="View history"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            History
          </button>
        )}
      </header>

      <div className="viewfinder-container">
        <div className="viewfinder">
          <video
            ref={videoRef}
            className="viewfinder-video"
            playsInline
            muted
            autoPlay
            aria-label="Camera viewfinder"
          />

          {!ready && (
            <div className="viewfinder-placeholder" role="status">
              <div className="placeholder-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <p className="placeholder-text">
                {cameraError || 'Starting camera...'}
              </p>
              {cameraError && (
                <p className="placeholder-text" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                  Tap Gallery below to upload a photo
                </p>
              )}
            </div>
          )}

          {isConverting && (
            <div className="viewfinder-placeholder" role="status">
              <div className="placeholder-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </div>
              <p className="placeholder-text">Converting image...</p>
            </div>
          )}

          <div className="viewfinder-overlay" aria-hidden="true">
            <div className="viewfinder-frame" />
            {ready && !isConverting && (
              <div className="viewfinder-hint">
                Position food within frame
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="camera-controls">
        <button
          type="button"
          className="control-btn"
          onClick={handleGalleryClick}
          disabled={isConverting}
          aria-label="Select from gallery"
        >
          <div className="control-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="control-btn-label">Gallery</span>
        </button>

        <button
          type="button"
          className="snap-btn"
          onClick={onSnap}
          disabled={!ready || isConverting}
          aria-label="Take photo"
          aria-busy={!ready}
        >
          <div className="snap-btn-ring" />
          <div className="snap-btn-inner" />
        </button>

        <button
          type="button"
          className="control-btn"
          onClick={onHistory}
          disabled={isConverting}
          aria-label="View history"
        >
          <div className="control-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <span className="control-btn-label">History</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        aria-hidden="true"
      />
    </div>
  )
}
