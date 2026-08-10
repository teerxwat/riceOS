// เจ้าของไฟล์: คนที่ 1
// route ทั้งหมดของ customer อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
import CustomerListPage from './CustomerListPage.jsx'

export const customerRoutes = [
  { path: 'customers', element: <CustomerListPage /> },
  // เพิ่ม route ย่อยของ customer ได้ตรงนี้ เช่น
  // { path: 'customers/:id', element: <CustomerDetailPage /> },
]
