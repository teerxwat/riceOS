// fallback ระหว่างรอ code-split chunk ของแต่ละหน้าโหลด (ดู React.lazy ใน countryRoutes.jsx)
function PageLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center text-label text-db-text-muted">
      กำลังโหลด...
    </div>
  )
}

export default PageLoading
