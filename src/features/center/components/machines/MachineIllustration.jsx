import dryerPhoto from '../../../../assets/machines/dryer.jpg'
import solarPhoto from '../../../../assets/machines/solar.jpg'
import shredderPhoto from '../../../../assets/machines/shredder.jpg'

// Real reference photos per machine type (CC0 / CC-BY-SA — see credits below),
// not stock icons or generated art.
const PHOTOS = {
  dryer: {
    src: dryerPhoto,
    alt: 'เครื่องอบข้าวเคลื่อนที่แบบทาวเวอร์',
  },
  solar: {
    src: solarPhoto,
    alt: 'แผงโซล่าเซลล์บนหลังคา',
  },
  shredder: {
    src: shredderPhoto,
    alt: 'เครื่องปั่นฟางแบบพ่วงท้ายรถแทรกเตอร์',
  },
}

// Credits (required by CC-BY-SA):
// dryer.jpg   — "Mecmar-mobile-grain-dryer.jpg", Wikimedia Commons, CC BY-SA 4.0
// solar.jpg   — Roy Bury / Pixabay via Wikimedia Commons, CC0
// shredder.jpg — "Teagle Tomahawk 8550 Dual Chop Bale Processor.jpg" by Vauxford,
//                Wikimedia Commons, CC BY-SA 4.0

export function MachineIllustration({ kind }) {
  const photo = PHOTOS[kind]
  if (!photo) return null
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      className="cm-illustration"
      loading="lazy"
    />
  )
}
