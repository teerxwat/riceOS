import dryerPhoto1 from '../../../../assets/machines/dryer-1.jpg'
import dryerPhoto2 from '../../../../assets/machines/dryer-2.jpg'
import dryerPhoto3 from '../../../../assets/machines/dryer-3.jpg'
import dryerPhoto4 from '../../../../assets/machines/dryer-4.jpg'
import solarPhoto from '../../../../assets/machines/solar.jpg'
import shredderPhoto from '../../../../assets/machines/shredder.jpg'

// Real reference photos per machine type (CC0 / CC-BY-SA — see credits below),
// not stock icons or generated art. Each dryer gets its own crop from the
// same source photo so the four cards aren't identical.
const DRYER_PHOTOS = [dryerPhoto1, dryerPhoto2, dryerPhoto3, dryerPhoto4]

const PHOTOS = {
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
// dryer-*.jpg  — cropped from "Mecmar-mobile-grain-dryer.jpg", Wikimedia
//                Commons, CC BY-SA 4.0
// solar.jpg    — Roy Bury / Pixabay via Wikimedia Commons, CC0
// shredder.jpg — "Teagle Tomahawk 8550 Dual Chop Bale Processor.jpg" by
//                Vauxford, Wikimedia Commons, CC BY-SA 4.0

export function MachineIllustration({ kind, variant = 0 }) {
  if (kind === 'dryer') {
    const src = DRYER_PHOTOS[variant % DRYER_PHOTOS.length]
    return (
      <img
        src={src}
        alt="เครื่องอบข้าวเคลื่อนที่แบบทาวเวอร์"
        className="cm-illustration"
        loading="lazy"
      />
    )
  }

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
