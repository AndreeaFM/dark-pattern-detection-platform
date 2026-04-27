const axios = require('axios')
const cheerio = require('cheerio')
const Tesseract = require('tesseract.js')
const Analysis = require('../models/Analysis')
const detectPatterns = require('../services/detectionService')
const calculateRiskScore = require('../services/scoringService')

exports.analyzeUrl = async (req, res) => {
  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ message: 'URL is required' })
    }

    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    $('script, style, noscript').remove()

    const extractedText = $('body').text().replace(/\s+/g, ' ').trim()

    const detections = detectPatterns(extractedText)
    const { score, riskLevel } = calculateRiskScore(detections)

    const analysis = await Analysis.create({
      userId: req.user.id,
      inputType: 'url',
      inputValue: url,
      extractedText,
      detections,
      riskScore: score,
      riskLevel,
    })

    res.status(201).json(analysis)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to analyze URL',
      error: error.message,
    })
  }
}

exports.analyzeScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' })
    }

    const imagePath = req.file.path

    const result = await Tesseract.recognize(imagePath, 'eng')
    const extractedText = result.data.text.replace(/\s+/g, ' ').trim()

    const detections = detectPatterns(extractedText)
    const { score, riskLevel } = calculateRiskScore(detections)

    const analysis = await Analysis.create({
      userId: req.user.id,
      inputType: 'screenshot',
      inputValue: imagePath,
      extractedText,
      detections,
      riskScore: score,
      riskLevel,
    })

    res.status(201).json(analysis)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to analyze screenshot',
      error: error.message,
    })
  }
}

exports.getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.id }).sort({
      createdAt: -1,
    })
    res.status(200).json(history)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' })
    }

    res.status(200).json(analysis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
