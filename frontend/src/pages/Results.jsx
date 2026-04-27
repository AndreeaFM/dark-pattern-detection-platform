import { useLocation, Link } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import RiskScoreCard from '../components/RiskScoreCard'
import DetectionCard from '../components/DetectionCard'
import EmptyState from '../components/EmptyState'

function Results() {
  const location = useLocation()
  const analysis = location.state?.analysis

  if (!analysis) {
    return (
      <PageContainer title="Analysis Results">
        <EmptyState
          title="No analysis data found"
          description="Go back and run a new analysis first."
        />
        <div className="mt-4">
          <Link to="/analyze-url" className="text-blue-600 underline">
            Go back to analysis
          </Link>
        </div>
      </PageContainer>
    )
  }

  const isScreenshot = analysis.inputType === 'screenshot'

  return (
    <PageContainer
      title="Analysis Results"
      subtitle="Detected dark patterns and manipulation risk assessment."
    >
      <div className="grid gap-6">
        <RiskScoreCard
          inputType={analysis.inputType}
          inputValue={analysis.inputValue}
          riskScore={analysis.riskScore}
          riskLevel={analysis.riskLevel}
        />

        {isScreenshot && (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Uploaded Screenshot</h2>
            <img
              src={`http://localhost:5000/${analysis.inputValue}`}
              alt="Uploaded screenshot"
              className="max-h-96 rounded-lg border"
            />
          </div>
        )}

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Extracted Text</h2>
          <p className="text-slate-700 whitespace-pre-wrap">
            {analysis.extractedText || 'No text extracted.'}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Detected Patterns</h2>

          {analysis.detections.length === 0 ? (
            <EmptyState
              title="No dark patterns detected"
              description="The system did not identify suspicious patterns in this analysis."
            />
          ) : (
            <div className="grid gap-4">
              {analysis.detections.map((detection, index) => (
                <DetectionCard key={index} detection={detection} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default Results
