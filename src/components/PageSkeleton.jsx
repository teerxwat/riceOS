// โครงหน้าจำลอง (skeleton) ระหว่างรอเนื้อหา — ใช้ร่วมได้ทุกแดชบอร์ด
export default function PageSkeleton() {
  return (
    <div className="skel-page" aria-hidden="true">
      <div className="skel skel-title" />
      <div className="skel-kpis">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="skel skel-kpi" key={i} />
        ))}
      </div>
      <div className="skel skel-block" />
      <div className="skel-rows">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="skel skel-row" key={i} />
        ))}
      </div>
    </div>
  )
}
