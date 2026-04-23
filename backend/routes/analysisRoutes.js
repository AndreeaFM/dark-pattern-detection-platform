const express = require('express')
const router = express.Router()

router.post('/url', (req, res) => {
  res.send('Analyze URL route')
})

router.post('/screenshot', (req, res) => {
  res.send('Analyze screenshot route')
})

router.get('/history', (req, res) => {
  res.send('History route')
})

module.exports = router
