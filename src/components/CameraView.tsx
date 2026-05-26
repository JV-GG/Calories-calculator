import { useCallback, useState, useRef } from 'react'
import type { RefObject } from 'react'
import BitesAILogo from '../../BitesAI.png'
import { convertHeicToJpeg, isHeicFile } from '../lib/imageConversion'
import './CameraView.css'

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
      if (isHeicFile(file)) {
        setIsConverting(true)
        const converted = await convertHeicToJpeg(file)
        onUpload(converted.base64, converted.previewUrl)
      } else {
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
      if (fileRef.current) fileRef.current.value = ''
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
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 safe-area-top relative z-10 animate-fadeUp">
        <div className="flex items-center gap-3">
          <img
            src={BitesAILogo}
            alt="CalorieLens"
            className="w-12 h-12 rounded-2xl object-cover bg-white/10 border border-white/20 transition-transform duration-200 cursor-pointer hover:scale-105 active:scale-95"
          />
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight leading-none">CalorieLens</h1>
            <p className="text-white/60 text-xs font-medium tracking-wide mt-0.5">Snap · Estimate · Eat smarter</p>
          </div>
        </div>

        {hasHistory && (
          <button
            type="button"
            onClick={onHistory}
            aria-label="View history"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-semibold transition-all duration-150 min-h-11 hover:bg-white/20 active:scale-[0.97]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            History
          </button>
        )}
      </header>

      {/* Viewfinder */}
      <div className="flex-1 flex flex-col px-5 min-h-0 relative z-10">
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
              <p className="text-white/90 text-sm font-medium text-center max-w-64">
                {cameraError || 'Starting camera...'}
              </p>
              {cameraError && (
                <p className="text-white/60 text-xs text-center max-w-64">
                  Tap Gallery below to upload a photo
                </p>
              )}
            </div>
          )}

          {isConverting && (
            <div className="viewfinder-placeholder" role="status">
              <div className="placeholder-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </div>
              <p className="text-white/90 text-sm font-medium text-center max-w-64">Converting image...</p>
            </div>
          )}

          <div className="viewfinder-overlay" aria-hidden="true">
            <div className="viewfinder-frame" />
            {ready && !isConverting && (
              <div className="viewfinder-hint">Position food within frame</div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-around px-8 py-6 safe-area-bottom relative z-10">
        {/* Gallery */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-2 min-w-16 bg-transparent border-none text-white cursor-pointer transition-transform duration-150 active:scale-90 disabled:opacity-50"
          onClick={handleGalleryClick}
          disabled={isConverting}
          aria-label="Select from gallery"
        >
          <div className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-2xl transition-all duration-150 hover:bg-white/20 hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Gallery</span>
        </button>

        {/* Snap */}
        <button
          type="button"
          className="relative w-[76px] h-[76px] bg-transparent border-none cursor-pointer transition-transform duration-150 active:scale-90 disabled:opacity-40"
          onClick={onSnap}
          disabled={!ready || isConverting}
          aria-label="Take photo"
          aria-busy={!ready}
        >
          <div className="absolute inset-0 border-[3px] border-white rounded-full" />
          <div className="absolute inset-2 bg-white rounded-full transition-all duration-150 active:bg-[#2563EB] active:inset-3" />
        </button>

        {/* History */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-2 min-w-16 bg-transparent border-none text-white cursor-pointer transition-transform duration-150 active:scale-90 disabled:opacity-50"
          onClick={onHistory}
          disabled={isConverting}
          aria-label="View history"
        >
          <div className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-2xl transition-all duration-150 hover:bg-white/20 hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <span className="text-white/70 text-xs font-bold uppercase tracking-widest">History</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}
