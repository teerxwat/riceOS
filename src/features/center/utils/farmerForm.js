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

export function initialFarmerForm() {
  const firstPlot = emptyPlot()
  return {
    member: emptyMember(),
    plots: [firstPlot],
    plotLocations: [
      {
        plotLocalId: firstPlot.localId,
        deedNo: '',
        surveyNo: '',
        landNo: '',
        subDistrict: '',
        district: '',
        province: '',
        latitude: '',
        longitude: '',
        areaRai: '',
      },
    ],
    cultivation: {
      plantTimesPerYear: 2,
      seasons: [
        { start: 'พ.ค.', end: 'ก.ย.' },
        { start: 'พ.ย.', end: 'มี.ค.' },
      ],
    },
    files: [],
  }
}

// Simulates reading a Thai national ID card via a card reader device.
export const MOCK_ID_CARD_DATA = {
  nationalId: '1-2345-67890-12-3',
  prefix: 'นาย',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  birthDate: '1982-01-01',
  addressOnCard:
    '123 หมู่ 4 ตำบลทุ่งกว้าง อำเภอวารินชำราบ จังหวัดอุบลราชธานี 34190',
}
