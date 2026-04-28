const generateRecommendations = (detections) => {
  const recommendations = []

  detections.forEach((item) => {
    switch (item.patternType) {
      case 'confirmshaming':
        recommendations.push(
          'Use neutral opt-out language instead of guilt-based wording.'
        )
        break

      case 'urgency':
        recommendations.push('Avoid excessive countdown or pressure messaging.')
        break

      case 'scarcity':
        recommendations.push(
          'Use stock indicators only when factually accurate.'
        )
        break

      case 'forcedAction':
        recommendations.push(
          'Allow users to continue without mandatory registration when possible.'
        )
        break

      default:
        break
    }
  })

  return [...new Set(recommendations)]
}

module.exports = generateRecommendations
