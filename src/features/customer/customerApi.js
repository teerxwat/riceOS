// เจ้าของไฟล์: คนที่ 1  (แก้เฉพาะเรื่อง customer)
import { api } from '../../services/apiClient'

const RESOURCE = '/customers'

export const getCustomers = () => api.get(RESOURCE)
export const getCustomer = (id) => api.get(`${RESOURCE}/${id}`)
export const createCustomer = (data) => api.post(RESOURCE, data)
export const updateCustomer = (id, data) => api.put(`${RESOURCE}/${id}`, data)
export const deleteCustomer = (id) => api.del(`${RESOURCE}/${id}`)
