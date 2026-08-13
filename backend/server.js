const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ quiet: true })

const addFarmerRoute = require('./routes/farmers/add')
const listFarmerRoute = require('./routes/farmers/list')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/farmers', addFarmerRoute)
app.use('/api/farmers', listFarmerRoute)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: err.message || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์',
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`DONAUS RiceOS backend running on http://localhost:${PORT}`)
})
