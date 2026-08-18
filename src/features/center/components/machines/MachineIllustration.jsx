import dryerPhoto from '../../../../assets/machines/dryer.jpg'
import solarPhoto from '../../../../assets/machines/solar.jpg'
import spinnerPhoto from '../../../../assets/machines/spinner.jpg'
import chopperPhoto from '../../../../assets/machines/chopper.jpg'
import pelletPhoto from '../../../../assets/machines/pellet.jpg'

// Real reference photos per machine type (CC0 / CC-BY-SA / CC-BY — see
// credits below), not stock icons or generated art.
const PHOTOS = {
  dryer: {
    src: dryerPhoto,
    alt: 'เครื่องอบข้าวเคลื่อนที่แบบทาวเวอร์',
  },
  solar: {
    src: solarPhoto,
    alt: 'แผงโซล่าเซลล์บนหลังคา',
  },
  spinner: {
    src: spinnerPhoto,
    alt: 'เครื่องปั่นฟางแบบพ่วงท้ายรถแทรกเตอร์ กำลังทำงาน',
  },
  chopper: {
    src: chopperPhoto,
    alt: 'เครื่องสับฟางแบบพ่วงท้ายรถแทรกเตอร์',
  },
  pellet: {
    src: pelletPhoto,
    alt: 'เครื่องอัดเม็ดชีวมวล',
  },
}

// Credits (required by CC-BY-SA / CC-BY):
// dryer.jpg   — cropped from "Mecmar-mobile-grain-dryer.jpg", Wikimedia
//               Commons, CC BY-SA 4.0
// solar.jpg   — Roy Bury / Pixabay via Wikimedia Commons, CC0
// spinner.jpg — cropped from "Claas Volto 52 hay tedder.JPG" by Christer
//               Folkesson, Wikimedia Commons, CC BY 3.0
// chopper.jpg — "Teagle Tomahawk 8550 Dual Chop Bale Processor.jpg" by
//               Vauxford, Wikimedia Commons, CC BY-SA 4.0
// pellet.jpg  — cropped from "Pellet mill.jpg", RICHI Machinery via
//               Wikimedia Commons, CC BY-SA 4.0

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
