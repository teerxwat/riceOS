// เจ้าของไฟล์: คนที่ 2  (แก้เฉพาะเรื่อง province)
import { api } from '../../services/apiClient'

const RESOURCE = '/provinces'

export const getProvinces = () => api.get(RESOURCE)
export const getProvince = (id) => api.get(`${RESOURCE}/${id}`)
export const createProvince = (data) => api.post(RESOURCE, data)
export const updateProvince = (id, data) => api.put(`${RESOURCE}/${id}`, data)
export const deleteProvince = (id) => api.del(`${RESOURCE}/${id}`)
