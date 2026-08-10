// เจ้าของไฟล์: คนที่ 3
// route ทั้งหมดของ country อยู่ที่นี่ที่เดียว -> ไม่ชนกับ feature อื่น
import CountryListPage from './CountryListPage.jsx'

export const countryRoutes = [
  { path: 'countries', element: <CountryListPage /> },
  // เพิ่ม route ย่อยของ country ได้ตรงนี้ เช่น
  // { path: 'countries/:id', element: <CountryDetailPage /> },
]
