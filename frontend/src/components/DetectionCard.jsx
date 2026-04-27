function formatPatternType(type) {
  switch (type) {
    case 'confirmshaming':
      return 'Confirmshaming'
    case 'urgency':
      return 'Urgency'
    case 'scarcity':
      return 'Scarcity'
    case 'forcedAction':
      return 'Forced Action'
    case 'asymmetricChoice':
      return 'Asymmetric Choice'
    default:
      return type
  }
}

function DetectionCard({ detection }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border">
      <p className="mb-2">
        <span className="font-semibold">Pattern type:</span>{' '}
        {formatPatternType(detection.patternType)}
      </p>
      <p className="mb-2 break-words">
        <span className="font-semibold">Matched text:</span>{' '}
        {detection.matchedText || 'N/A'}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Explanation:</span>{' '}
        {detection.explanation}
      </p>
      <p>
        <span className="font-semibold">Confidence:</span>{' '}
        {detection.confidence}
      </p>
    </div>
  )
}

export default DetectionCard
