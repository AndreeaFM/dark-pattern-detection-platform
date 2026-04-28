const calculateRiskScore = (detections) => {
  let score = 0

  detections.forEach((item) => {
    switch (item.patternType) {
      case 'confirmshaming':
        score += 20 + item.count * 3
        break

      case 'urgency':
        score += 12 + item.count * 4
        break

      case 'scarcity':
        score += 12 + item.count * 4
        break

      case 'forcedAction':
        score += 25 + item.count * 5
        break

      default:
        score += 10
    }
  })

  if (score > 100) score = 100

  let riskLevel = 'Low'

  if (score > 25 && score <= 55) {
    riskLevel = 'Medium'
  }

  if (score > 55) {
    riskLevel = 'High'
  }

  return { score, riskLevel }
}

module.exports = calculateRiskScore
