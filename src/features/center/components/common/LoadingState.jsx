import { Loader2 } from 'lucide-react'

export function LoadingState() {
  return (
    <div className="c-loading">
      <Loader2 size={28} />
      <span>กำลังโหลดข้อมูล...</span>
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="c-error">
      <span>เกิดข้อผิดพลาด: {message}</span>
    </div>
  )
}
