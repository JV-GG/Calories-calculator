import { useCallback, useState } from 'react'
import { CameraView } from './components/CameraView'
import { PreviewView } from './components/PreviewView'
import { ResultsView } from './components/ResultsView'
import { HistoryView } from './components/HistoryView'
import { LoadingOverlay } from './components/LoadingOverlay'
import { useCamera } from './hooks/useCamera'
import { analyzeFoodImage } from './lib/api'
import type { AppPhase, CalorieAnalysis, ScanHistoryItem } from '../shared/types.js'

const HISTORY_KEY = 'calorielens_history'
const MAX_HISTORY = 50

function loadHistory(): ScanHistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(history: ScanHistoryItem[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
  } catch {
    // Ignore storage errors
  }
}

function App() {
  const [phase, setPhase] = useState<AppPhase>('camera')
  const { videoRef, ready, error, capture, stop, restart } = useCamera(phase === 'camera')
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [analysis, setAnalysis] = useState<CalorieAnalysis | null>(null)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)
  const [history, setHistory] = useState<ScanHistoryItem[]>(() => loadHistory())
  const [showHistory, setShowHistory] = useState(false)

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

      // Save to history
      const newItem: ScanHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        timestamp: Date.now(),
        previewUrl,
        analysis: result,
      }
      setHistory(prev => {
        const updated = [newItem, ...prev].slice(0, MAX_HISTORY)
        saveHistory(updated)
        return updated
      })

      setPhase('results')
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Analysis failed')
      setPhase('preview')
    }
  }, [imageBase64, previewUrl])

  const handleScanAgain = useCallback(() => {
    setAnalysis(null)
    setPreviewUrl('')
    setImageBase64('')
    setAnalyzeError(null)
    setShowHistory(false)
    setPhase('camera')
    restart()
  }, [restart])

  const handleViewHistory = useCallback(() => {
    setShowHistory(true)
  }, [])

  const handleSelectHistory = useCallback((item: ScanHistoryItem) => {
    setAnalysis(item.analysis)
    setPreviewUrl(item.previewUrl)
    setShowHistory(false)
    setPhase('results')
  }, [])

  const handleDeleteHistory = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id)
      saveHistory(updated)
      return updated
    })
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return (
    <div className="app-root">
      <div className="grain" aria-hidden="true" />

      {showHistory && (
        <HistoryView
          history={history}
          onSelect={handleSelectHistory}
          onDelete={handleDeleteHistory}
          onClear={handleClearHistory}
          onBack={() => setShowHistory(false)}
        />
      )}

      {!showHistory && phase === 'camera' && (
        <CameraView
          videoRef={videoRef}
          ready={ready}
          cameraError={error}
          onSnap={handleSnap}
          onUpload={setImage}
          onHistory={handleViewHistory}
          hasHistory={history.length > 0}
        />
      )}

      {!showHistory && phase === 'preview' && (
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

      {!showHistory && phase === 'analyzing' && (
        <div className="preview-shell">
          <div className="preview-image-wrap flex-1">
            <img src={previewUrl} alt="" className="preview-image" />
          </div>
          <LoadingOverlay />
        </div>
      )}

      {!showHistory && phase === 'results' && analysis && (
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
