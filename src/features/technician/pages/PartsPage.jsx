// เจ้าของไฟล์: คนที่ 4 (feature technician)
// อะไหล่และคลัง: สต๊อกทั้งหมด + เบิกอะไหล่ / ช่างใหญ่เติมสต๊อกได้
import { useOutletContext } from 'react-router-dom'
import { PackageMinus, PackagePlus, TriangleAlert } from 'lucide-react'
import { useParts, adjustPart } from '../techStore.js'

export default function PartsPage() {
  const { isChief } = useOutletContext()
  const parts = useParts()
  const low = parts.filter((p) => p.stock < p.min)

  return (
    <div className="pv-stack">
      {low.length > 0 && (
        <div className="tc-low-banner">
          <TriangleAlert size={17} />
          อะไหล่ต่ำกว่าขั้นต่ำ {low.length} รายการ:{' '}
          {low.map((p) => p.name).join(', ')}
          {!isChief && ' — แจ้งช่างใหญ่เพื่อสั่งซื้อเพิ่ม'}
        </div>
      )}

      <section className="pv-card">
        <div className="pv-card-head">
          <h2>คลังอะไหล่ ({parts.length} รายการ)</h2>
          <span className="pv-muted">
            {isChief
              ? 'ช่างใหญ่: เบิกและเติมสต๊อกได้ทุกจังหวัด'
              : 'เบิกใช้ได้เฉพาะคลังจังหวัดของตัวเอง'}
          </span>
        </div>
        <div className="pv-table-wrap">
          <table className="pv-table">
            <thead>
              <tr>
                <th>อะไหล่</th>
                <th className="num">คงเหลือ</th>
                <th className="num">ขั้นต่ำ</th>
                <th>หน่วย</th>
                <th>ใช้กับเครื่องจักร</th>
                <th>สถานะ</th>
                <th className="num">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => {
                const isLow = p.stock < p.min
                return (
                  <tr key={p.id}>
                    <td>
                      <b>{p.name}</b>
                    </td>
                    <td className="num">
                      <b className={isLow ? 'tc-low' : ''}>{p.stock}</b>
                    </td>
                    <td className="num">{p.min}</td>
                    <td>{p.unit}</td>
                    <td>{p.usedFor}</td>
                    <td>
                      {isLow ? (
                        <span className="pv-chip pv-chip--returned">
                          ต่ำกว่าขั้นต่ำ
                        </span>
                      ) : (
                        <span className="pv-chip pv-chip--approved">
                          เพียงพอ
                        </span>
                      )}
                    </td>
                    <td className="num">
                      <span className="pv-row-actions">
                        <button
                          type="button"
                          className="pv-btn pv-btn--sm"
                          disabled={p.stock === 0}
                          onClick={() => adjustPart(p.id, -1)}
                        >
                          <PackageMinus size={14} /> เบิก 1
                        </button>
                        {isChief && (
                          <button
                            type="button"
                            className="pv-btn pv-btn--sm pv-btn--primary"
                            onClick={() => adjustPart(p.id, +10)}
                          >
                            <PackagePlus size={14} /> เติม 10
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
