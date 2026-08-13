// ดาวน์โหลดไฟล์ฝั่ง client ล้วนๆ ผ่าน Blob — ไม่ต้องมี backend มารองรับ
function downloadBlob(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// สร้างไฟล์ CSV จาก rows แบบ [{label, value}] แล้วสั่งดาวน์โหลดทันที
export function downloadCsv(filename, rows) {
  const header = 'รายการ,ค่า\n'
  const body = rows.map((r) => `"${r.label}","${r.value}"`).join('\n')
  const csv = '﻿' + header + body // BOM กัน Excel อ่านภาษาไทยเพี้ยน
  downloadBlob(filename, csv, 'text/csv;charset=utf-8;')
}

// ดาวน์โหลดไฟล์ข้อความธรรมดา — ใช้แทนรายงาน PDF/XLSX จริงที่ยังไม่มี backend
// สร้างให้ (mock ไว้ก่อน อย่างน้อยกดแล้วได้ไฟล์จริง ไม่ใช่ปุ่มลอย)
export function downloadText(filename, content) {
  downloadBlob(filename, '﻿' + content, 'text/plain;charset=utf-8;')
}
