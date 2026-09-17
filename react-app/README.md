# CEO Daily Dashboard — React + Supabase

React (Vite) เวอร์ชันของ CEO Daily Dashboard เดิม (`../index.html` แบบ static)
ข้อมูลทั้งหมด (cash, companies, tasks, decisions, risks, schedule, appointments)
ย้ายไปเก็บใน Supabase แล้ว แก้ไขข้อมูลได้จากไอคอน ✏️ / ➕ / 🗑️ ในตัวแดชบอร์ดได้เลย
ไม่ต้องแก้โค้ด และหน้าจะอัปเดตแบบเรียลไทม์ (ผ่าน Supabase Realtime) ถ้าเปิดหลายเครื่อง/หลายแท็บ

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

แล้วเปิด http://localhost:5173

ไฟล์ `.env` มี URL + anon key ของ Supabase project ("ohm-ceo-dashboard") เตรียมไว้ให้แล้ว
ถ้าย้ายไปใช้ Supabase project อื่น ให้แก้ค่าในไฟล์นี้ (ดูตัวอย่างที่ `.env.example`)

## Build สำหรับ deploy

```bash
npm run build
```

จะได้ไฟล์ static ออกมาที่โฟลเดอร์ `dist/` เอาไปวางบน hosting อะไรก็ได้ (Vercel, Netlify, Cloudflare Pages ฯลฯ)

## โครงสร้าง

- `src/lib/supabaseClient.js` — Supabase client
- `src/hooks/` — hook สำหรับดึง/แก้ข้อมูลแต่ละตาราง พร้อม realtime subscription
- `src/components/` — widget การ์ดแต่ละใบ (พอร์ตมาจาก `components/*.html` เดิม)
- `src/pages/DashboardPage.jsx` — หน้าแดชบอร์ดหลัก (route `/`)
- `src/pages/WeeklyPlanPage.jsx` — หน้า Weekly Plan (route `/weekly-plan`) เป็นเนื้อหา static เหมือนเดิม ไม่ได้ผูกกับ Supabase

## ตาราง Supabase

`settings`, `cash_liquidity`, `companies`, `schedule_items`, `appointments`,
`tasks`, `decision_items`, `risks` — ดู schema เต็ม ๆ ได้ใน Supabase Studio ของโปรเจกต์

**หมายเหตุเรื่องความปลอดภัย:** ตอนนี้เปิด RLS policy แบบ anon เข้าถึงได้เต็ม (อ่าน/เขียน/ลบ)
เหมือนกับตอนที่ยังเป็นไฟล์ static ที่ไม่มีการล็อกอินเลย ถ้าจะเอาแดชบอร์ดนี้ไป deploy ให้คนอื่นเข้าถึงได้
หรือมีข้อมูลอ่อนไหวมากขึ้น ควรเพิ่มระบบ auth (Supabase Auth) แล้วปรับ policy ทีหลัง

## ของเดิม (static site)

ไฟล์ `index.html`, `weekly-plan.html`, `components/`, `data/dashboard-data.js` เดิม
ที่อยู่นอกโฟลเดอร์ `react-app/` นี้ ยังอยู่ครบไม่ได้ถูกลบ — เก็บไว้อ้างอิง/ใช้สำรองได้ตามสะดวก
