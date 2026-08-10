// เจ้าของไฟล์: คนที่ 2
// route ทั้งหมดของ province อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
import ProvinceListPage from './ProvinceListPage.jsx'

export const provinceRoutes = [
  { path: 'provinces', element: <ProvinceListPage /> },
  // เพิ่ม route ย่อยของ province ได้ตรงนี้ เช่น
  // { path: 'provinces/:id', element: <ProvinceDetailPage /> },
]
