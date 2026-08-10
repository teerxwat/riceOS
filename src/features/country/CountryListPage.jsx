// เจ้าของไฟล์: คนที่ 3
import { useEffect, useState } from 'react'
import { getCountrys } from './countryApi'
import CountryTable from './components/CountryTable.jsx'

export default function CountryListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCountrys()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>กำลังโหลด...</p>
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <section>
      <h2>รายการ Country</h2>
      <CountryTable items={items} />
    </section>
  )
}
