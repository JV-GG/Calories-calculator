import { useCallback, useState } from 'react'
import { CameraView } from './components/CameraView'
import { PreviewView } from './components/PreviewView'
import { ResultsView } from './components/ResultsView'
import { LoadingOverlay } from './components/LoadingOverlay'
import { useCamera } from './hooks/useCamera'
import { analyzeFoodImage } from './lib/api'
import type { AppPhase, CalorieAnalysis } from './types'

function App() {
  const [phase, setPhase] = useState<AppPhase>('camera')
  const { videoRef, ready, error, capture, stop, restart } = useCamera(phase === 'camera')
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [analysis, setAnalysis] = useState<CalorieAnalysis | null>(null)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  const setImage = useCallback(
    (base64: string, url: string) => {
      stop()
      setImageBase64(base64)
      setPreviewUrl(url)
      setAnalyzeError(null)
      setPhase('preview')
    },
    [stop]
  )

  const handleSnap = useCallback(() => {
    const base64 = capture()
    if (!base64) return
    setImage(base64, `data:image/jpeg;base64,${base64}`)
  }, [capture, setImage])

  const handleAnalyze = useCallback(async () => {
    setPhase('analyzing')
    setAnalyzeError(null)
    try {
      const result = await analyzeFoodImage(imageBase64)
      setAnalysis(result)
      setPhase('results')
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : '分析失败')
      setPhase('preview')
    }
  }, [imageBase64])

  const handleScanAgain = useCallback(() => {
    setAnalysis(null)
    setPreviewUrl('')
    setImageBase64('')
    setAnalyzeError(null)
    setPhase('camera')
    restart()
  }, [restart])

  return (
    <div className="app-root">
      <div className="grain" aria-hidden="true" />

      {phase === 'camera' && (
        <CameraView
          videoRef={videoRef}
          ready={ready}
          cameraError={error}
          onSnap={handleSnap}
          onUpload={setImage}
        />
      )}

      {phase === 'preview' && (
        <>
          <PreviewView
            previewUrl={previewUrl}
            onRetake={handleScanAgain}
            onAnalyze={handleAnalyze}
          />
          {analyzeError && (
            <p className="error-banner" role="alert">
              {analyzeError}
            </p>
          )}
        </>
      )}

      {phase === 'analyzing' && (
        <div className="preview-shell">
          <div className="preview-image-wrap flex-1">
            <img src={previewUrl} alt="" className="preview-image" />
          </div>
          <LoadingOverlay />
        </div>
      )}

      {phase === 'results' && analysis && (
        <ResultsView
          analysis={analysis}
          previewUrl={previewUrl}
          onScanAgain={handleScanAgain}
        />
      )}
    </div>
  )
}

export default App
