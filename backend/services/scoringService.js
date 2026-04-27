const calculateRiskScore = (detections) => {
  let score = 0

  detections.forEach((detection) => {
    switch (detection.patternType) {
      case 'confirmshaming':
        score += 20
        break
      case 'urgency':
        score += 15
        break
      case 'scarcity':
        score += 15
        break
      case 'forcedAction':
        score += 25
        break
      default:
        score += 10
        break
    }
  })

  if (score > 100) score = 100

  let riskLevel = 'Low'
  if (score > 20 && score <= 50) riskLevel = 'Medium'
  if (score > 50) riskLevel = 'High'

  return {
    score,
    riskLevel,
  }
}

module.exports = calculateRiskScore
