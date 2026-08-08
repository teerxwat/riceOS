# แนวทางการทำงานร่วมกัน (Contributing Guide)

โปรเจคนี้ใช้ **trunk-based workflow** เหมาะกับทีมเล็ก (2–4 คน) เน้น branch สั้น
merge บ่อย เพื่อลด conflict ให้น้อยที่สุด

## กฎหลัก

1. **ห้าม push ตรงเข้า `main`** — ทุกการเปลี่ยนแปลงต้องผ่าน Pull Request (PR)
2. `main` ต้องใช้งานได้เสมอ (build ผ่าน)
3. branch ควรมีอายุสั้น (1–2 วัน) แล้ว merge — อย่าปล่อยค้างนาน

## ขั้นตอนการทำงาน (แต่ละ feature)

### 1. อัปเดต main ให้ล่าสุดก่อนเริ่ม

```bash
git checkout main
git pull origin main
```

### 2. แตก branch ใหม่

ตั้งชื่อตามรูปแบบ `ประเภท/ชื่อสั้นๆ` เช่น:

```bash
git checkout -b feature/login-page
# หรือ  fix/navbar-overlap
# หรือ  refactor/api-client
```

Prefix ที่ใช้: `feature/`, `fix/`, `refactor/`, `style/`, `docs/`

### 3. ทำงาน + commit

เขียน commit message สั้นและสื่อความหมาย:

```bash
git add .
git commit -m "add login form validation"
```

> ตอน commit ระบบจะ auto-format โค้ดด้วย Prettier + ESLint ให้อัตโนมัติ
> (ผ่าน husky pre-commit hook) ไม่ต้องจัดรูปแบบเอง

### 4. push แล้วเปิด PR

```bash
git push -u origin feature/login-page
```

จากนั้นเปิด PR บน GitHub เข้า `main` และขอให้เพื่อนในทีม review อย่างน้อย 1 คน

### 5. sync main บ่อยๆ ระหว่างทำ

ถ้า branch ทำนานหลายวัน ให้ดึง main เข้ามาเรื่อยๆ เพื่อ resolve conflict ทีละนิด:

```bash
git checkout main && git pull
git checkout feature/login-page
git merge main
```

## หลักเลี่ยง conflict

- **แบ่งงานเป็น component แยกไฟล์** — คนละคนทำคนละไฟล์ จะแทบไม่ชนกัน
- จัดโครงตาม feature เช่น `src/features/auth/`, `src/features/dashboard/`
- ระวังไฟล์รวมที่ทุกคนต้องแก้ (route config, barrel `index.js`) — เป็นจุด conflict ประจำ
  ถ้าต้องแก้ ให้บอกทีมและ merge ให้ไวที่สุด
- pull `main` บ่อยๆ ดีกว่าปล่อยไว้จน conflict กองใหญ่

## คำสั่งที่ใช้บ่อย

| คำสั่ง           | ความหมาย                          |
| ---------------- | --------------------------------- |
| `npm run dev`    | รัน dev server                    |
| `npm run lint`   | ตรวจ ESLint                       |
| `npm run format` | จัดรูปแบบโค้ดทั้งโปรเจค           |
| `npm run build`  | build production (CI จะรันอันนี้) |

## Branch protection ที่แนะนำให้ตั้งบน GitHub

ไปที่ **Settings → Branches → Add rule** สำหรับ `main`:

- ✅ Require a pull request before merging
- ✅ Require approvals (อย่างน้อย 1)
- ✅ Require status checks to pass → เลือก `build` (จาก CI)
- ✅ Require branches to be up to date before merging
