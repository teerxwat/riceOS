const express = require('express')
const pool = require('../../config/db')

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const [farmers] = await pool.query(
      `SELECT id, national_id, prefix, first_name, last_name, phone, line_id,
              address_on_card, address_current, plant_times_per_year, created_at
       FROM farmers ORDER BY created_at DESC`
    )

    if (farmers.length === 0) return res.json({ success: true, farmers: [] })

    const farmerIds = farmers.map((f) => f.id)
    const [plots] = await pool.query(
      `SELECT * FROM farmer_plots WHERE farmer_id IN (?)`,
      [farmerIds]
    )
    const [documents] = await pool.query(
      `SELECT id, farmer_id, doc_type, file_name, file_path, uploaded_at
       FROM farmer_documents WHERE farmer_id IN (?)`,
      [farmerIds]
    )

    const result = farmers.map((farmer) => ({
      ...farmer,
      plots: plots.filter((p) => p.farmer_id === farmer.id),
      documents: documents.filter((d) => d.farmer_id === farmer.id),
    }))

    res.json({ success: true, farmers: result })
  } catch (err) {
    console.error('GET /api/farmers failed:', err)
    res.status(500).json({ success: false, message: 'ดึงข้อมูลไม่สำเร็จ' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [farmers] = await pool.query(`SELECT * FROM farmers WHERE id = ?`, [
      req.params.id,
    ])
    if (farmers.length === 0)
      return res
        .status(404)
        .json({ success: false, message: 'ไม่พบข้อมูลสมาชิก' })

    const [plots] = await pool.query(
      `SELECT * FROM farmer_plots WHERE farmer_id = ?`,
      [req.params.id]
    )
    const [documents] = await pool.query(
      `SELECT * FROM farmer_documents WHERE farmer_id = ?`,
      [req.params.id]
    )

    res.json({ success: true, farmer: { ...farmers[0], plots, documents } })
  } catch (err) {
    console.error('GET /api/farmers/:id failed:', err)
    res.status(500).json({ success: false, message: 'ดึงข้อมูลไม่สำเร็จ' })
  }
})

module.exports = router
