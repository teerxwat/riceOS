const express = require('express')
const fs = require('fs')
const pool = require('../../config/db')
const upload = require('../../middleware/upload')

const router = express.Router()

router.post('/', upload.array('documents'), async (req, res) => {
  const uploadedFiles = req.files || []

  let member, plots, plotLocations, cultivation
  try {
    member = JSON.parse(req.body.member)
    plots = JSON.parse(req.body.plots)
    plotLocations = JSON.parse(req.body.plotLocations)
    cultivation = JSON.parse(req.body.cultivation)
  } catch {
    uploadedFiles.forEach((f) => fs.unlink(f.path, () => {}))
    return res
      .status(400)
      .json({ success: false, message: 'ข้อมูลฟอร์มไม่ถูกต้อง' })
  }

  const documentCategories = req.body.documentCategories
    ? [].concat(req.body.documentCategories)
    : []

  if (!member?.nationalId || !member?.firstName || !member?.lastName) {
    uploadedFiles.forEach((f) => fs.unlink(f.path, () => {}))
    return res
      .status(400)
      .json({ success: false, message: 'กรุณากรอกข้อมูลสมาชิกให้ครบถ้วน' })
  }

  let connection
  try {
    connection = await pool.getConnection()
    await connection.beginTransaction()

    const [farmerResult] = await connection.execute(
      `INSERT INTO farmers
        (national_id, prefix, first_name, last_name, birth_date, phone, line_id,
         address_on_card, address_current, plant_times_per_year, planting_seasons)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        member.nationalId,
        member.prefix || null,
        member.firstName,
        member.lastName,
        member.birthDate || null,
        member.phone || null,
        member.lineId || null,
        member.addressOnCard || null,
        member.sameAsCardAddress
          ? member.addressOnCard
          : member.addressCurrent || null,
        cultivation?.plantTimesPerYear || null,
        JSON.stringify(cultivation?.seasons || []),
      ]
    )
    const farmerId = farmerResult.insertId

    const plotIdByLocalId = {}
    for (const plot of plots || []) {
      const [plotResult] = await connection.execute(
        `INSERT INTO farmer_plots
          (farmer_id, location, area_rai, land_doc_type, rice_variety,
           prev_yield_kg_per_rai, prev_cost_per_rai, prev_sale_price_per_ton)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          farmerId,
          plot.location || null,
          plot.areaRai === '' ? null : plot.areaRai,
          plot.landDocType || null,
          plot.riceVariety || null,
          plot.prevYieldKgPerRai === '' ? null : plot.prevYieldKgPerRai,
          plot.prevCostPerRai === '' ? null : plot.prevCostPerRai,
          plot.prevSalePricePerTon === '' ? null : plot.prevSalePricePerTon,
        ]
      )
      plotIdByLocalId[plot.localId] = plotResult.insertId
    }

    for (const loc of plotLocations || []) {
      const plotId = plotIdByLocalId[loc.plotLocalId]
      if (!plotId) continue
      await connection.execute(
        `UPDATE farmer_plots SET
           deed_no = ?, survey_no = ?, land_no = ?,
           sub_district = ?, district = ?, province = ?,
           latitude = ?, longitude = ?
         WHERE id = ?`,
        [
          loc.deedNo || null,
          loc.surveyNo || null,
          loc.landNo || null,
          loc.subDistrict || null,
          loc.district || null,
          loc.province || null,
          loc.latitude || null,
          loc.longitude || null,
          plotId,
        ]
      )
    }

    for (let i = 0; i < uploadedFiles.length; i += 1) {
      const file = uploadedFiles[i]
      const category = documentCategories[i] || 'other'
      await connection.execute(
        `INSERT INTO farmer_documents (farmer_id, doc_type, file_name, file_path)
         VALUES (?, ?, ?, ?)`,
        [
          farmerId,
          category,
          file.originalname,
          `uploads/farmers/${file.filename}`,
        ]
      )
    }

    await connection.commit()
    res.status(201).json({ success: true, farmerId })
  } catch (err) {
    if (connection) await connection.rollback()
    uploadedFiles.forEach((f) => fs.unlink(f.path, () => {}))
    console.error('POST /api/farmers failed:', err)
    res
      .status(500)
      .json({
        success: false,
        message:
          'บันทึกข้อมูลลงฐานข้อมูลไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล',
      })
  } finally {
    if (connection) connection.release()
  }
})

module.exports = router
