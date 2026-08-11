import { Plus, Trash2 } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { emptyPlot } from '../../utils/farmerForm'

const LAND_DOC_OPTIONS = [
  'โฉนดที่ดิน (นส.4จ.)',
  'นส.3ก.',
  'นส.3',
  'สปก.4-01',
  'อื่นๆ',
]
const RICE_VARIETY_OPTIONS = [
  'ข้าวหอมมะลิ 105',
  'ข้าวเหนียว กข.6',
  'ข้าวหอมปทุม',
  'กข.87',
  'อื่นๆ',
]

function numOrEmpty(value) {
  if (value === '') return ''
  const n = Number(value)
  return Number.isNaN(n) ? '' : n
}

export function StepPlots({
  plots,
  onChangePlots,
  cultivation,
  onChangeCultivation,
}) {
  const totalArea = plots.reduce(
    (sum, p) => sum + (typeof p.areaRai === 'number' ? p.areaRai : 0),
    0
  )

  function updatePlot(localId, patch) {
    onChangePlots(
      plots.map((p) => (p.localId === localId ? { ...p, ...patch } : p))
    )
  }

  function addPlot() {
    onChangePlots([...plots, emptyPlot()])
  }

  function removePlot(localId) {
    if (plots.length <= 1) return
    onChangePlots(plots.filter((p) => p.localId !== localId))
  }

  return (
    <Card
      title="2. ข้อมูลแปลงนาและการเพาะปลูก"
      titleAction={
        <span className="c-card__header-action">
          {plots.length} แปลง · {totalArea.toFixed(2)} ไร่
        </span>
      }
    >
      <div className="cf-plot-table-wrap">
        <table className="cf-plot-table">
          <thead>
            <tr>
              <th>แปลงที่</th>
              <th>ตำแหน่งที่ตั้ง</th>
              <th>เนื้อที่ (ไร่)</th>
              <th>เอกสารสิทธิ์</th>
              <th>พันธุ์ข้าวหลัก</th>
              <th>ผลผลิตเดิม (กก./ไร่)</th>
              <th>ต้นทุนเดิม (บาท/ไร่)</th>
              <th>ราคาขายเดิม (บาท/ตัน)</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plots.map((plot, index) => (
              <tr key={plot.localId}>
                <td>{index + 1}</td>
                <td>
                  <input
                    value={plot.location}
                    onChange={(e) =>
                      updatePlot(plot.localId, { location: e.target.value })
                    }
                    placeholder="ม.4 ต.ทุ่งกว้าง"
                    className="cf-plot-input cf-plot-input--location"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={plot.areaRai}
                    onChange={(e) =>
                      updatePlot(plot.localId, {
                        areaRai: numOrEmpty(e.target.value),
                      })
                    }
                    className="cf-plot-input cf-plot-input--num"
                  />
                </td>
                <td>
                  <select
                    value={plot.landDocType}
                    onChange={(e) =>
                      updatePlot(plot.localId, { landDocType: e.target.value })
                    }
                    className="cf-plot-input cf-plot-input--select"
                  >
                    {LAND_DOC_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={plot.riceVariety}
                    onChange={(e) =>
                      updatePlot(plot.localId, { riceVariety: e.target.value })
                    }
                    className="cf-plot-input cf-plot-input--select"
                  >
                    {RICE_VARIETY_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={plot.prevYieldKgPerRai}
                    onChange={(e) =>
                      updatePlot(plot.localId, {
                        prevYieldKgPerRai: numOrEmpty(e.target.value),
                      })
                    }
                    className="cf-plot-input cf-plot-input--num"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={plot.prevCostPerRai}
                    onChange={(e) =>
                      updatePlot(plot.localId, {
                        prevCostPerRai: numOrEmpty(e.target.value),
                      })
                    }
                    className="cf-plot-input cf-plot-input--num"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={plot.prevSalePricePerTon}
                    onChange={(e) =>
                      updatePlot(plot.localId, {
                        prevSalePricePerTon: numOrEmpty(e.target.value),
                      })
                    }
                    className="cf-plot-input cf-plot-input--num"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removePlot(plot.localId)}
                    disabled={plots.length <= 1}
                    className="cf-plot-remove-btn"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={addPlot} className="cf-add-plot-btn">
        <Plus size={13} /> เพิ่มแปลง
      </button>

      <div className="cf-cultivation">
        <p className="cf-cultivation-label">ฤดูกาลเพาะปลูก</p>
        <div className="cf-cultivation-row">
          <div className="cf-plant-times">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() =>
                  onChangeCultivation({ ...cultivation, plantTimesPerYear: n })
                }
                className={`cf-plant-times-btn ${cultivation.plantTimesPerYear === n ? 'is-active' : ''}`}
              >
                {n} ครั้ง
              </button>
            ))}
          </div>
          <div className="cf-seasons">
            {cultivation.seasons
              .slice(0, cultivation.plantTimesPerYear)
              .map((s, i) => (
                <span key={i} className="cf-season-tag">
                  ครั้งที่ {i + 1}: {s.start} - {s.end}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
