import {
  Flame,
  Layers,
  LayoutGrid,
  Package,
  Sprout,
  Sun,
  Truck,
  Wheat,
} from 'lucide-react'

const ICONS = {
  all: LayoutGrid,
  paddy: Wheat,
  dried_paddy: Sun,
  straw: Package,
  husk: Layers,
  biomass: Flame,
  seed: Sprout,
  supply: Truck,
}

export function CategoryFilters({ categories, active, onChange }) {
  return (
    <div
      className="c-grid c-grid-md-8"
      style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
    >
      {categories.map((c) => {
        const Icon = ICONS[c.key] ?? Package
        const isActive = c.key === active
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            className={`cm-category-btn ${isActive ? 'is-active' : ''}`}
          >
            <Icon size={18} />
            <span className="cm-category-btn__label">{c.label}</span>
            <span className="cm-category-btn__count">
              {c.count.toLocaleString('th-TH')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
