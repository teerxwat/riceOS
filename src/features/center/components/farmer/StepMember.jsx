import { CreditCard } from 'lucide-react'
import { Card } from '../common/Card.jsx'
import { TextInput, SelectInput } from '../common/FormField.jsx'
import { MOCK_ID_CARD_DATA } from '../../utils/farmerForm'

const PREFIX_OPTIONS = [
  { value: 'นาย', label: 'นาย' },
  { value: 'นาง', label: 'นาง' },
  { value: 'นางสาว', label: 'นางสาว' },
]

export function StepMember({ member, onChange }) {
  function set(key, value) {
    onChange({ ...member, [key]: value })
  }

  function handleReadCard() {
    onChange({ ...member, ...MOCK_ID_CARD_DATA })
  }

  return (
    <Card title="1. ข้อมูลบัตรประชาชน">
      <button
        type="button"
        onClick={handleReadCard}
        className="cf-read-card-btn"
      >
        <CreditCard size={16} /> อ่านบัตรประชาชน (จำลอง)
        หรือกรอกข้อมูลด้วยตนเองด้านล่าง
      </button>

      <div className="cf-form-grid">
        <TextInput
          label="เลขประจำตัวประชาชน"
          required
          value={member.nationalId}
          onChange={(e) => set('nationalId', e.target.value)}
          placeholder="1-2345-67890-12-3"
          className="cf-span-2"
        />
        <SelectInput
          label="คำนำหน้า"
          options={PREFIX_OPTIONS}
          value={member.prefix}
          onChange={(e) => set('prefix', e.target.value)}
        />
        <TextInput
          label="วันเกิด"
          type="date"
          value={member.birthDate}
          onChange={(e) => set('birthDate', e.target.value)}
        />
        <TextInput
          label="ชื่อ"
          required
          value={member.firstName}
          onChange={(e) => set('firstName', e.target.value)}
        />
        <TextInput
          label="นามสกุล"
          required
          value={member.lastName}
          onChange={(e) => set('lastName', e.target.value)}
        />
        <TextInput
          label="เบอร์โทรศัพท์"
          value={member.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="08X-XXX-XXXX"
        />
        <TextInput
          label="LINE ID"
          value={member.lineId}
          onChange={(e) => set('lineId', e.target.value)}
        />

        <TextInput
          label="ที่อยู่ตามบัตรประชาชน"
          value={member.addressOnCard}
          onChange={(e) => set('addressOnCard', e.target.value)}
          className="cf-span-2"
        />

        <label className="cf-checkbox-row cf-span-2">
          <input
            type="checkbox"
            checked={member.sameAsCardAddress}
            onChange={(e) => {
              const checked = e.target.checked
              onChange({
                ...member,
                sameAsCardAddress: checked,
                addressCurrent: checked
                  ? member.addressOnCard
                  : member.addressCurrent,
              })
            }}
          />
          ที่อยู่ปัจจุบันเหมือนที่อยู่ตามบัตร
        </label>

        {!member.sameAsCardAddress && (
          <TextInput
            label="ที่อยู่ปัจจุบัน"
            value={member.addressCurrent}
            onChange={(e) => set('addressCurrent', e.target.value)}
            className="cf-span-2"
          />
        )}
      </div>
    </Card>
  )
}
