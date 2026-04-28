const patterns = {
  confirmshaming: [
    "no thanks, i don't want",
    'i prefer paying full price',
    'no, i like paying more',
    "i don't want to save",
    'no thanks',
  ],

  urgency: [
    'limited time',
    'offer ends today',
    'hurry',
    'act now',
    'expires soon',
    'today only',
    'last chance',
    'ending soon',
  ],

  scarcity: [
    'only 1 left',
    'only 2 left',
    'few items remaining',
    'low stock',
    'almost sold out',
    'selling fast',
  ],

  forcedAction: [
    'sign up to continue',
    'create account to continue',
    'subscribe to continue',
    'start free trial',
    'register to continue',
    'continue with subscription',
  ],
}

const detectPatterns = (text) => {
  const lower = text.toLowerCase()
  const detections = []

  for (const [type, keywords] of Object.entries(patterns)) {
    let foundMatches = []

    keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        foundMatches.push(keyword)
      }
    })

    if (foundMatches.length > 0) {
      detections.push({
        patternType: type,
        matchedText: foundMatches.join(', '),
        count: foundMatches.length,
        confidence: getConfidence(foundMatches.length),
        explanation: generateExplanation(type, foundMatches.length),
      })
    }
  }

  return detections
}

function getConfidence(count) {
  if (count >= 3) return 0.95
  if (count === 2) return 0.88
  return 0.8
}

function generateExplanation(type, count) {
  const labels = {
    confirmshaming: 'manipulative refusal wording',
    urgency: 'time-pressure language',
    scarcity: 'stock scarcity pressure',
    forcedAction: 'forced registration/subscription behavior',
  }

  return `${count} signal(s) related to ${labels[type]} were detected.`
}

module.exports = detectPatterns
