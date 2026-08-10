// เจ้าของไฟล์: คนที่ 2
import { useEffect, useState } from 'react'
import { getProvinces } from './provinceApi'
import ProvinceTable from './components/ProvinceTable.jsx'

export default function ProvinceListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProvinces()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>กำลังโหลด...</p>
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <section>
      <h2>รายการ Province</h2>
      <ProvinceTable items={items} />
    </section>
  )
}
