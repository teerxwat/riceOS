const TABS = [
  { key: 'market', label: 'ตลาดสินค้า' },
  { key: 'my_orders', label: 'คำสั่งซื้อของฉัน' },
  { key: 'my_contracts', label: 'สัญญาของฉัน' },
  { key: 'shipping', label: 'การขนส่ง' },
  { key: 'history', label: 'ประวัติการซื้อขาย' },
  { key: 'reports', label: 'รายงาน' },
]

export function Tabs({ active, onChange }) {
  return (
    <div className="cm-tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`cm-tab ${active === t.key ? 'is-active' : ''}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
