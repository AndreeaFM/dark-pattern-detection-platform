const patternDictionary = {
  confirmshaming: [
    "no thanks, i don't want",
    'i prefer paying full price',
    "no, i don't like saving money",
    "i don't want to save",
    'no, i want to miss out',
  ],
  urgency: [
    'limited time',
    'offer ends today',
    'act now',
    'hurry',
    'last chance',
    'expires soon',
    'only today',
  ],
  scarcity: [
    'only 1 left',
    'only 2 left',
    'few items remaining',
    'almost sold out',
    'low stock',
    'selling fast',
    'only a few left',
  ],
  forcedAction: [
    'sign up to continue',
    'create account to continue',
    'subscribe to continue',
    'start free trial',
    'continue with subscription',
    'register to continue',
  ],
}

const detectPatterns = (text) => {
  const detections = []
  const normalizedText = text.toLowerCase()

  for (const [patternType, keywords] of Object.entries(patternDictionary)) {
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword)) {
        detections.push({
          patternType,
          matchedText: keyword,
          explanation: `The phrase "${keyword}" may indicate a ${patternType} dark pattern.`,
          confidence: 0.85,
        })
      }
    }
  }

  return detections
}

module.exports = detectPatterns
