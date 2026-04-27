import { useLocation, Link } from 'react-router-dom'

function Results() {
  const location = useLocation()
  const analysis = location.state?.analysis

  if (!analysis) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">No analysis data found</h2>
        <Link to="/analyze-url" className="text-blue-600 underline">
          Go back to Analyze URL
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analysis Results</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p className="mb-2">
          <span className="font-semibold">Input type:</span>{' '}
          {analysis.inputType}
        </p>
        <p className="mb-2 break-all">
          <span className="font-semibold">Input value:</span>{' '}
          {analysis.inputValue}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Risk score:</span>{' '}
          {analysis.riskScore}/100
        </p>
        <p>
          <span className="font-semibold">Risk level:</span>{' '}
          {analysis.riskLevel}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Detected Patterns</h2>

        {analysis.detections.length === 0 ? (
          <p className="text-slate-600">No dark patterns detected.</p>
        ) : (
          <div className="space-y-4">
            {analysis.detections.map((detection, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="mb-1">
                  <span className="font-semibold">Pattern type:</span>{' '}
                  {detection.patternType}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Matched text:</span>{' '}
                  {detection.matchedText}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Explanation:</span>{' '}
                  {detection.explanation}
                </p>
                <p>
                  <span className="font-semibold">Confidence:</span>{' '}
                  {detection.confidence}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
const formatPatternType = (type) => {
  switch (type) {
    case 'confirmshaming':
      return 'Confirmshaming'
    case 'urgency':
      return 'Urgency'
    case 'scarcity':
      return 'Scarcity'
    case 'forcedAction':
      return 'Forced Action'
    default:
      return type
  }
}
export default Results
