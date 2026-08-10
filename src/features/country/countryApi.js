// เจ้าของไฟล์: คนที่ 3  (แก้เฉพาะเรื่อง country)
import { api } from '../../services/apiClient'

const RESOURCE = '/countries'

export const getCountrys = () => api.get(RESOURCE)
export const getCountry = (id) => api.get(`${RESOURCE}/${id}`)
export const createCountry = (data) => api.post(RESOURCE, data)
export const updateCountry = (id, data) => api.put(`${RESOURCE}/${id}`, data)
export const deleteCountry = (id) => api.del(`${RESOURCE}/${id}`)
