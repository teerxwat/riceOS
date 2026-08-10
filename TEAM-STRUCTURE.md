# แนวทางทำงาน 3 คน: Customer / Province / Country

## โครงสร้างโฟลเดอร์ (ทุกอย่างเป็น feature แบบเดียวกันหมด)

```
src/
├─ main.jsx                 # entry (แทบไม่ต้องแตะ)
├─ App.jsx                  # เรียก router อย่างเดียว
├─ router.jsx               # hotspot: รวม route ของทุก feature
├─ components/              # ของใช้ร่วมทั้งเว็บ
│  ├─ Layout.jsx            #   โครงหน้า + <Outlet/>
│  └─ Navbar.jsx            #   เมนู (hotspot)
├─ services/
│  └─ apiClient.js          # ชั้นเรียก API ร่วม (hotspot, ตั้งครั้งเดียว)
└─ features/                # 1 feature = 1 โฟลเดอร์ = 1 เจ้าของ
   ├─ home/                 #   หน้าแรก
   │  ├─ HomePage.jsx
   │  └─ homeRoutes.jsx
   ├─ customer/            # ← คนที่ 1
   │  ├─ CustomerListPage.jsx
   │  ├─ customerApi.js
   │  ├─ customerRoutes.jsx
   │  └─ components/CustomerTable.jsx
   ├─ province/           # ← คนที่ 2  (โครงเหมือน customer)
   └─ country/            # ← คนที่ 3  (โครงเหมือน customer)
```

## 1. ใครเป็นเจ้าของอะไร

| คน      | โฟลเดอร์ที่ดูแล (แตะได้เต็มที่)                  |
| ------- | ------------------------------------------------ |
| คนที่ 1 | `src/features/customer/`                         |
| คนที่ 2 | `src/features/province/`                         |
| คนที่ 3 | `src/features/country/`                          |
| ร่วมกัน | `src/features/home/`, `components/`, `services/` |

แต่ละคนทำงาน **ภายในโฟลเดอร์ตัวเองทั้งหมด** (หน้า, ตาราง, API, route ของ feature นั้น
อยู่ในนั้นครบ) → 3 คนเขียนโค้ดพร้อมกันได้โดยไม่แตะไฟล์เดียวกันเลย

## 2. ไฟล์ที่ใช้ร่วมกัน (hotspot — ต้องระวัง)

ไฟล์พวกนี้ทุกคนใช้ร่วม ถ้าแก้พร้อมกันจะ conflict ได้ **ให้ตกลงกันก่อนแก้ + merge ให้ไว**

- `src/router.jsx` — แต่ละคนเพิ่มแค่ 2 บรรทัดของตัวเอง (1 import + 1 spread) จึง conflict น้อยมาก
- `src/components/Navbar.jsx` — เพิ่มลิงก์เมนู
- `src/services/apiClient.js` — ตั้งค่า base URL ร่วม ตั้งครั้งเดียวแล้วแทบไม่แก้
- `src/index.css` / global style

> เคล็ดลับ: ทำ hotspot พวกนี้ให้เสร็จ+merge ตั้งแต่ต้นโปรเจค จากนั้นแทบไม่ต้องแตะอีก

## 3. Pattern สำคัญ: แต่ละ feature เป็นเจ้าของ route ตัวเอง

ปกติทุกคนต้องไปเขียน `<Route>` รวมในไฟล์เดียว = ชนกันตลอด
เราแก้โดยให้แต่ละ feature ประกาศ route ของตัวเองในไฟล์ของตัวเอง:

```jsx
// src/features/customer/customerRoutes.jsx  (คนที่ 1 คนเดียวที่แตะ)
export const customerRoutes = [
  { path: 'customers', element: <CustomerListPage /> },
]
```

แล้ว `router.jsx` แค่เอามารวม (แต่ละคนเพิ่มบรรทัดตัวเอง):

```jsx
children: [
  ...homeRoutes, // หน้าแรก
  ...customerRoutes, // คนที่ 1
  ...provinceRoutes, // คนที่ 2
  ...countryRoutes, // คนที่ 3
]
```

## 4. ขั้นตอน git ของแต่ละคน (ทำขนานกันได้)

```bash
# เริ่มงานใหม่ทุกครั้ง: อัปเดต main ก่อน
git checkout main && git pull

# แตก branch ของ feature ตัวเอง
git checkout -b feature/customer-list      # คนที่ 1
# git checkout -b feature/province-list    # คนที่ 2
# git checkout -b feature/country-list     # คนที่ 3

# ...เขียนโค้ดในโฟลเดอร์ตัวเอง...
git add .
git commit -m "add customer list page"
git push -u origin feature/customer-list

# เปิด PR บน GitHub -> ให้เพื่อน review 1 คน -> merge เข้า main
```

ทั้ง 3 คนทำพร้อมกันได้ เพราะแตะคนละไฟล์ พอ merge เข้า `main` งานก็มารวมกันเอง

## 5. เวลารวมงาน (integration) ให้ราบรื่น

- **merge บ่อยๆ** อย่ารอทำเสร็จ 100% ค่อย merge — PR เล็กๆ วันต่อวันดีที่สุด
- ระหว่างทำ ถ้ามีคน merge เข้า main แล้ว ให้ดึงเข้ามาในงานตัวเอง:
  ```bash
  git checkout main && git pull
  git checkout feature/customer-list
  git merge main        # resolve conflict ทีละนิด (ถ้ามี)
  ```
- ตกลง **สัญญา API ร่วมกัน** ก่อน (field ของ customer/province/country หน้าตาเป็นยังไง)
  จะได้ต่อกันติดตอนรวม

## 6. ติดตั้งเพิ่มก่อนใช้ scaffold นี้

```bash
npm install react-router-dom
```

แล้วเอาไฟล์ในโฟลเดอร์ `src/` จาก zip ไปวางทับ `src/` เดิมในโปรเจค
(ลบ `App.css` เดิมที่ไม่ใช้ออกได้)
