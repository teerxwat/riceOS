import { Search } from 'lucide-react'

function Select({ label }) {
  return (
    <div className="cm-filter-field">
      <span className="cm-filter-label">{label}</span>
      <select className="cm-select-sm">
        <option>ทั้งหมด</option>
      </select>
    </div>
  )
}

export function FilterBar({ search, onSearchChange, onClear }) {
  return (
    <div className="cm-filter-bar">
      <div className="cm-filter-field cm-filter-field--grow">
        <span className="cm-filter-label">ค้นหา</span>
        <div className="cm-search-box">
          <Search size={15} color="var(--c-text-faint)" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาสินค้า, ศูนย์, พื้นที่..."
          />
        </div>
      </div>

      <Select label="จังหวัด" />
      <Select label="ประเภทสินค้า" />
      <Select label="คุณภาพ" />

      <div className="cm-filter-field">
        <span className="cm-filter-label">ช่วงราคา (บาท/ตัน)</span>
        <div className="cm-range">
          <input placeholder="ต่ำสุด" className="cm-input-sm" />
          <span>-</span>
          <input placeholder="สูงสุด" className="cm-input-sm" />
        </div>
      </div>

      <div className="cm-filter-field">
        <span className="cm-filter-label">ความชื้น (%)</span>
        <div className="cm-range">
          <input placeholder="ต่ำสุด" className="cm-input-sm cm-input-sm--sm" />
          <span>-</span>
          <input placeholder="สูงสุด" className="cm-input-sm cm-input-sm--sm" />
        </div>
      </div>

      <button type="button" className="c-btn c-btn--primary">
        ค้นหา
      </button>
      <button type="button" onClick={onClear} className="c-btn c-btn--outline">
        ล้างค่า
      </button>
    </div>
  )
}
