import { useCallback, useEffect, useRef, useState } from 'react'

export function useCamera(active: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  const stop = useCallback(() => {
    stopStream()
    setReady(false)
  }, [stopStream])

  const start = useCallback(async () => {
    stopStream()
    setError(null)
    setReady(false)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      })

      streamRef.current = stream
      const video = videoRef.current
      if (video) {
        video.srcObject = stream
        await video.play()
        setReady(true)
      }
    } catch {
      setError('Camera access denied. Please use image upload instead.')
    }
  }, [stopStream])

  const capture = useCallback((): string | null => {
    const video = videoRef.current
    if (!video || !ready) return null

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    return dataUrl.split(',')[1] ?? null
  }, [ready])

  useEffect(() => {
    if (!active) {
      stopStream()
      return
    }

    let cancelled = false
    void (async () => {
      await start()
      if (cancelled) stopStream()
    })()

    return () => {
      cancelled = true
      stopStream()
    }
  }, [active, start, stopStream])

  return { videoRef, ready, error, capture, stop, restart: start }
}
