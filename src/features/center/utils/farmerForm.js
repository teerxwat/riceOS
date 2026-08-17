import { nextLocalId } from './id'

export function emptyMember() {
  return {
    nationalId: '',
    prefix: 'นาย',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    lineId: '',
    addressOnCard: '',
    addressCurrent: '',
    sameAsCardAddress: true,
  }
}

export function emptyPlot() {
  return {
    localId: nextLocalId('plot'),
    location: '',
    areaRai: '',
    landDocType: 'โฉนดที่ดิน (นส.4จ.)',
    riceVariety: 'ข้าวหอมมะลิ 105',
    prevYieldKgPerRai: '',
    prevCostPerRai: '',
    prevSalePricePerTon: '',
  }
}

export function emptyPlotLocation(plotLocalId) {
  return {
    plotLocalId,
    deedNo: '',
    surveyNo: '',
    landNo: '',
    subDistrict: '',
    district: '',
    province: '',
    latitude: '',
    longitude: '',
    areaRai: '',
    boundary: [],
  }
}

// Same fictional address used across the app's mock data (ศูนย์ข้าวชุมชนบ้านหนองหวัด, สันป่าตอง, เชียงใหม่).
function sampleMember() {
  return {
    nationalId: '1-2345-67890-12-3',
    prefix: 'นาย',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    birthDate: '1982-01-01',
    phone: '081-234-5678',
    lineId: 'somchai_jaidee',
    addressOnCard:
      '89 หมู่ 4 ตำบลหนองหวัด อำเภอสันป่าตอง จังหวัดเชียงใหม่ 50120',
    addressCurrent:
      '89 หมู่ 4 ตำบลหนองหวัด อำเภอสันป่าตอง จังหวัดเชียงใหม่ 50120',
    sameAsCardAddress: true,
  }
}

function samplePlot() {
  return {
    localId: nextLocalId('plot'),
    location: 'ม.4 ต.หนองหวัด อ.สันป่าตอง',
    areaRai: 4.4,
    landDocType: 'โฉนดที่ดิน (นส.4จ.)',
    riceVariety: 'ข้าวหอมมะลิ 105',
    prevYieldKgPerRai: 620,
    prevCostPerRai: 3800,
    prevSalePricePerTon: 11800,
  }
}

// Tiny placeholder blob — enough to populate the upload UI for a demo
// without needing a real file; content is never actually read anywhere.
function mockFile(name, type, category) {
  return {
    localId: nextLocalId('file'),
    file: new File(['mock'], name, { type }),
    category,
  }
}

// Pre-filled so the whole 4-step flow can be demoed with just "ถัดไป" clicks
// — no typing needed when there's no time for a live data-entry demo.
export function initialFarmerForm() {
  const firstPlot = samplePlot()
  return {
    member: sampleMember(),
    plots: [firstPlot],
    plotLocations: [
      {
        plotLocalId: firstPlot.localId,
        deedNo: '12345',
        surveyNo: '1234',
        landNo: '5678',
        subDistrict: 'หนองหวัด',
        district: 'สันป่าตอง',
        province: 'เชียงใหม่',
        latitude: '18.618606',
        longitude: '98.918754',
        areaRai: 4.4,
        // A real paddy-field boundary traced from satellite imagery near the
        // sample plot (~4.4 ไร่, matching areaRai above) so the demo already
        // has a boundary to show in step 3/4 without drawing.
        boundary: [
          [18.618879, 98.918207],
          [18.618879, 98.919301],
          [18.618347, 98.919301],
          [18.618321, 98.918207],
        ],
      },
    ],
    cultivation: {
      plantTimesPerYear: 2,
      seasons: [
        { start: 'พ.ค.', end: 'ก.ย.' },
        { start: 'พ.ย.', end: 'มี.ค.' },
      ],
    },
    files: [
      mockFile('id_card.jpg', 'image/jpeg', 'id_card'),
      mockFile('land_deed.pdf', 'application/pdf', 'land_deed'),
      mockFile('plot_photo.jpg', 'image/jpeg', 'plot_photo'),
      mockFile('house_photo.jpg', 'image/jpeg', 'house_photo'),
    ],
  }
}

// Simulates reading a Thai national ID card via a card reader device.
export const MOCK_ID_CARD_DATA = {
  nationalId: '1-2345-67890-12-3',
  prefix: 'นาย',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  birthDate: '1982-01-01',
  addressOnCard: '89 หมู่ 4 ตำบลหนองหวัด อำเภอสันป่าตอง จังหวัดเชียงใหม่ 50120',
}
