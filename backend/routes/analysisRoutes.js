const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  analyzeUrl,
  getHistory,
  getAnalysisById,
} = require('../controllers/analysisController')

router.post('/url', authMiddleware, analyzeUrl)
router.get('/history', authMiddleware, getHistory)
router.get('/:id', authMiddleware, getAnalysisById)

module.exports = router
