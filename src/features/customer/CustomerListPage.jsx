// เจ้าของไฟล์: คนที่ 1
import { useEffect, useState } from 'react'
import { getCustomers } from './customerApi'
import CustomerTable from './components/CustomerTable.jsx'

export default function CustomerListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCustomers()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>กำลังโหลด...</p>
  if (error) return <p>เกิดข้อผิดพลาด: {error}</p>

  return (
    <section>
      <h2>รายการ Customer</h2>
      <CustomerTable items={items} />
    </section>
  )
}
