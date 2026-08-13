import { useRef } from 'react'
import {
  CheckCircle2,
  Circle,
  FileText,
  Image as ImageIcon,
  MapPinOff,
  UploadCloud,
  X,
} from 'lucide-react'
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card } from '../common/Card.jsx'
import { nextLocalId } from '../../utils/id'
import { polygonAreaSqm, polygonCentroid } from '../../utils/geo'

const CATEGORIES = [
  { key: 'id_card', label: 'สำเนาบัตรประชาชน', multiple: false },
  { key: 'land_deed', label: 'เอกสารสิทธิ์ที่ดิน', multiple: true },
  { key: 'plot_photo', label: 'รูปแปลงนา', multiple: true },
  { key: 'house_photo', label: 'รูปบ้าน/ที่อยู่อาศัย', multiple: true },
]

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function UploadSlot({ category, label, multiple, files, onAdd, onRemove }) {
  const inputRef = useRef(null)
  const categoryFiles = files.filter((f) => f.category === category)

  return (
    <div>
      <p className="cf-doc-label">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="cf-upload-drop"
      >
        <UploadCloud size={18} />
        <span className="cf-upload-hint">คลิกอัปโหลดไฟล์ (PDF, JPG, PNG)</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="application/pdf,image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) onAdd(Array.from(e.target.files))
          e.target.value = ''
        }}
      />

      {categoryFiles.length > 0 && (
        <div className="cf-file-list">
          {categoryFiles.map((f) => (
            <div key={f.localId} className="cf-file-chip">
              <span className="cf-file-chip__name">
                {f.file.type.startsWith('image/') ? (
                  <ImageIcon size={13} />
                ) : (
                  <FileText size={13} />
                )}
                <span>{f.file.name}</span>
              </span>
              <span className="cf-file-chip__meta">
                <span className="cf-file-chip__size">
                  {formatSize(f.file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(f.localId)}
                  className="cf-file-chip__remove"
                >
                  <X size={13} />
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PlotBoundaryPreview({ plot, index, plotLocation }) {
  const boundary = plotLocation?.boundary ?? []
  const hasBoundary = boundary.length >= 3
  const center = hasBoundary ? polygonCentroid(boundary) : null
  const areaRai = hasBoundary
    ? (polygonAreaSqm(boundary) / 1600).toFixed(2)
    : null

  return (
    <div className="cf-plot-review">
      <p className="cf-plot-review__title">
        แปลงที่ {index + 1} {plot.location ? `· ${plot.location}` : ''}
      </p>
      {hasBoundary ? (
        <>
          <div className="cf-plot-review__map">
            <MapContainer
              center={center}
              zoom={16}
              scrollWheelZoom={false}
              className="c-leaflet"
              attributionControl={false}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
              <Polygon
                positions={boundary}
                pathOptions={{
                  color: '#34b866',
                  weight: 2,
                  fillColor: '#1f9450',
                  fillOpacity: 0.3,
                }}
              />
            </MapContainer>
          </div>
          <p className="cf-plot-review__meta">
            พื้นที่จากแนวเขตที่วาด {areaRai} ไร่ · {boundary.length} จุด
          </p>
        </>
      ) : (
        <div className="cf-plot-review__empty">
          <MapPinOff size={18} />
          <span>
            ยังไม่ได้กำหนดขอบเขตแปลงนา (ย้อนกลับไปขั้นตอนที่ 3 เพื่อวาดแนวเขต)
          </span>
        </div>
      )}
    </div>
  )
}

export function StepDocuments({
  plots,
  plotLocations,
  files,
  onFilesChange,
  checklist,
  submitting,
  submitError,
  onSaveDraft,
  onSubmit,
}) {
  function addFiles(category, newFiles) {
    const entries = newFiles.map((file) => ({
      localId: nextLocalId('file'),
      file,
      category,
    }))
    onFilesChange([...files, ...entries])
  }

  function removeFile(localId) {
    onFilesChange(files.filter((f) => f.localId !== localId))
  }

  const allDone = checklist.every((c) => c.done)

  return (
    <div className="c-stack">
      <Card title="ตำแหน่งแปลงนาที่บันทึกจากขั้นตอนที่ 3">
        <div className="cf-plot-review-grid">
          {plots.map((plot, i) => (
            <PlotBoundaryPreview
              key={plot.localId}
              plot={plot}
              index={i}
              plotLocation={plotLocations.find(
                (l) => l.plotLocalId === plot.localId
              )}
            />
          ))}
        </div>
      </Card>

      <div className="c-grid c-grid-1 c-grid-lg-3">
        <div className="c-col-span-2">
          <Card title="4. เอกสารและรูปภาพ">
            <div className="cf-doc-grid">
              {CATEGORIES.map((c) => (
                <UploadSlot
                  key={c.key}
                  category={c.key}
                  label={c.label}
                  multiple={c.multiple}
                  files={files}
                  onAdd={(f) => addFiles(c.key, f)}
                  onRemove={removeFile}
                />
              ))}
            </div>
          </Card>
        </div>

        <Card title="ตรวจสอบและบันทึก">
          <div className="cf-checklist">
            {checklist.map((item) => (
              <div
                key={item.label}
                className={`cf-checklist-item ${item.done ? 'is-done' : ''}`}
              >
                {item.done ? (
                  <CheckCircle2 size={15} color="var(--c-emerald)" />
                ) : (
                  <Circle size={15} />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {submitError && <p className="cf-submit-error">{submitError}</p>}

          <div className="cf-submit-actions">
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={submitting}
              className="c-btn c-btn--outline"
            >
              บันทึกเป็นร่าง
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting || !allDone}
              className="c-btn c-btn--primary"
            >
              {submitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูลสมาชิก'}
            </button>
          </div>
          <p className="cf-submit-hint">
            สมาชิกจะได้รับรหัสสมาชิกและสามารถใช้งานศูนย์ได้ทันทีหลังบันทึก
          </p>
        </Card>
      </div>
    </div>
  )
}
