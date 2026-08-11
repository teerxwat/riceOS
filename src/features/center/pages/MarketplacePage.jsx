import { useMemo, useState } from 'react'
import { Plus, Search, FileSignature, Truck, BookOpen } from 'lucide-react'
import { Topbar } from '../components/layout/Topbar.jsx'
import { LoadingState, ErrorState } from '../components/common/LoadingState.jsx'
import { KpiRow } from '../components/marketplace/KpiRow.jsx'
import { CategoryFilters } from '../components/marketplace/CategoryFilters.jsx'
import { FilterBar } from '../components/marketplace/FilterBar.jsx'
import { ListingsTable } from '../components/marketplace/ListingsTable.jsx'
import { MatchingSidebar } from '../components/marketplace/MatchingSidebar.jsx'
import { StandardsFooter } from '../components/marketplace/StandardsFooter.jsx'
import { Tabs } from '../components/marketplace/Tabs.jsx'
import { useApiData } from '../hooks/useApiData'
import { fetchMarketplaceData } from '../api/marketplace'
import '../styles/marketplace.css'

export function MarketplacePage() {
  const { data, loading, error } = useApiData(fetchMarketplaceData)
  const [tab, setTab] = useState('market')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filteredListings = useMemo(() => {
    if (!data) return []
    return data.listings.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesSearch =
        !search ||
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [data, category, search])

  return (
    <div className="c-light" style={{ display: 'contents' }}>
      <Topbar
        title="Rice, Straw and Biomass Marketplace"
        subtitle="ตลาดซื้อขายผลผลิตและวัสดุชีวมวลของโครงการศูนย์ข้าวชุมชน"
        verified
      />
      <div className="c-content">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <div className="c-stack">
            <KpiRow kpis={data.kpis} />

            <div className="c-card">
              <Tabs active={tab} onChange={setTab} />
              <div style={{ padding: '1rem' }}>
                {tab !== 'market' ? (
                  <div
                    style={{
                      display: 'flex',
                      height: '10rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      color: 'var(--c-text-faint)',
                    }}
                  >
                    เร็วๆ นี้
                  </div>
                ) : (
                  <div className="c-stack">
                    <CategoryFilters
                      categories={data.categories}
                      active={category}
                      onChange={setCategory}
                    />
                    <FilterBar
                      search={search}
                      onSearchChange={setSearch}
                      onClear={() => {
                        setSearch('')
                        setCategory('all')
                      }}
                    />

                    <div className="cdr-top-row">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <ListingsTable listings={filteredListings} />
                      </div>
                      <MatchingSidebar
                        matching={data.matching}
                        centralPrices={data.centralPrices}
                        news={data.news}
                        pricesUpdatedAt={data.pricesUpdatedAt}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <StandardsFooter />

            <div className="cm-actions">
              <button type="button" className="c-btn c-btn--primary">
                <Plus size={15} /> ประกาศขายสินค้า
              </button>
              <button type="button" className="c-btn c-btn--outline">
                <Search size={15} /> ค้นหาความต้องการซื้อ
              </button>
              <button type="button" className="c-btn c-btn--outline">
                <FileSignature size={15} /> สร้างสัญญามาตรฐาน
              </button>
              <button type="button" className="c-btn c-btn--outline">
                <Truck size={15} /> ติดตามการขนส่ง
              </button>
              <button type="button" className="c-btn c-btn--outline">
                <BookOpen size={15} /> คู่มือการใช้งาน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
