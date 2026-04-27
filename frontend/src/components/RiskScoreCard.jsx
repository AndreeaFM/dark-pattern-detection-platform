import RiskBadge from './RiskBadge'

function RiskScoreCard({ inputType, inputValue, riskScore, riskLevel }) {
  const isScreenshot = inputType === 'screenshot'

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Risk Overview</h2>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">Input type:</span> {inputType}
        </p>

        {!isScreenshot && (
          <p className="break-all">
            <span className="font-semibold">Input value:</span> {inputValue}
          </p>
        )}

        <div className="flex items-center gap-3">
          <span className="font-semibold">Risk level:</span>
          <RiskBadge level={riskLevel} />
        </div>

        <p>
          <span className="font-semibold">Risk score:</span> {riskScore}/100
        </p>
      </div>
    </div>
  )
}

export default RiskScoreCard
