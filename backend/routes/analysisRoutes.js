const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const {
  analyzeUrl,
  analyzeScreenshot,
  getHistory,
  getAnalysisById,
} = require('../controllers/analysisController')

router.post('/url', authMiddleware, analyzeUrl)
router.post(
  '/screenshot',
  authMiddleware,
  upload.single('image'),
  analyzeScreenshot
)
router.get('/history', authMiddleware, getHistory)
router.get('/:id', authMiddleware, getAnalysisById)

module.exports = router
