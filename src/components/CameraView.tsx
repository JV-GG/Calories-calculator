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
      {/* Desktop Sidebar — only visible on lg+ */}
      <aside className="camera-sidebar">
        <div className="camera-sidebar-brand">
          <div className="flex items-center gap-3">
            <img
              src={BitesAILogo}
              alt="CalorieLens brand logo"
              className="w-14 h-14 rounded-2xl object-cover bg-white/10 border border-white/20"
            />
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight leading-none">CalorieLens</h1>
              <p className="text-white/60 text-sm font-medium tracking-wide mt-1">Snap · Estimate · Eat smarter</p>
            </div>
          </div>

          <div className="camera-sidebar-features">
            <div className="camera-sidebar-feature">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3>Snap a Photo</h3>
                <p>Take a picture of your meal or upload from gallery</p>
              </div>
            </div>

            <div className="camera-sidebar-feature">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3>AI Analysis</h3>
                <p>Get instant calorie and macro breakdown powered by AI</p>
              </div>
            </div>

            <div className="camera-sidebar-feature">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
                </svg>
              </div>
              <div className="feature-text">
                <h3>Track Progress</h3>
                <p>View your scan history and nutritional trends</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="mt-auto pt-6">
          <p className="text-white/30 text-xs text-center">
            Powered by AI · Estimates may vary
          </p>
        </div>
      </aside>

      {/* Main camera area */}
      <div className="camera-main">
        {/* Header — mobile + tablet brand; desktop minimal */}
        <header className="camera-header safe-area-top">
          {/* Brand — hidden on desktop (shown in sidebar) */}
          <div className="flex items-center gap-3 lg:hidden">
            <img
              src={BitesAILogo}
              alt="CalorieLens brand logo"
              className="w-12 h-12 rounded-2xl object-cover bg-white/10 border border-white/20 transition-transform duration-200 cursor-pointer hover:scale-105 active:scale-95"
            />
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight leading-none">CalorieLens</h1>
              <p className="text-white/60 text-xs font-medium tracking-wide mt-0.5">Snap · Estimate · Eat smarter</p>
            </div>
          </div>

          {/* Desktop: minimal branding in header */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-white/50 text-sm font-medium">Live Camera</span>
          </div>

          {hasHistory && (
            <button
              type="button"
              onClick={onHistory}
              aria-label="View scan history"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-semibold transition-all duration-150 min-h-11 hover:bg-white/20 active:scale-[0.97]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>History</span>
            </button>
          )}
        </header>

        {/* Viewfinder */}
        <div className="camera-viewfinder-area">
          <div className="viewfinder">
            <video
              ref={videoRef}
              className="viewfinder-video"
              playsInline
              muted
              autoPlay
              aria-label="Live camera viewfinder — position food within the frame"
            />

            {!ready && (
              <div className="viewfinder-placeholder" role="status" aria-live="polite">
                <div className="placeholder-icon" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <p className="text-white/90 text-sm font-medium text-center px-4 max-w-64">
                  {cameraError || 'Starting camera…'}
                </p>
                {cameraError && (
                  <p className="text-white/60 text-xs text-center px-4 max-w-64">
                    Tap Gallery below to upload a photo
                  </p>
                )}
              </div>
            )}

            {isConverting && (
              <div className="viewfinder-placeholder" role="status" aria-live="polite">
                <div className="placeholder-icon" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                </div>
                <p className="text-white/90 text-sm font-medium text-center px-4 max-w-64">Converting image…</p>
              </div>
            )}

            <div className="viewfinder-overlay" aria-hidden="true">
              <div className="viewfinder-frame" />
              {ready && !isConverting && (
                <p className="viewfinder-hint">Position food within frame</p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="camera-controls safe-area-bottom">
          {/* Gallery */}
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 w-16 min-h-16 bg-transparent border-none text-white cursor-pointer transition-transform duration-150 active:scale-90 disabled:opacity-40"
            onClick={handleGalleryClick}
            disabled={isConverting}
            aria-label="Select photo from gallery"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-2xl transition-all duration-150 hover:bg-white/20 hover:scale-105 active:bg-white/25">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            aria-label={!ready ? 'Camera not ready' : 'Take photo'}
            aria-busy={!ready}
          >
            <div className="absolute inset-0 border-[3px] border-white rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full transition-all duration-150 active:bg-[#2563EB] active:inset-3" />
          </button>

          {/* History */}
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 w-16 min-h-16 bg-transparent border-none text-white cursor-pointer transition-transform duration-150 active:scale-90 disabled:opacity-40"
            onClick={onHistory}
            disabled={isConverting}
            aria-label="View scan history"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-2xl transition-all duration-150 hover:bg-white/20 hover:scale-105 active:bg-white/25">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest">History</span>
          </button>
        </div>
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
