import { Link } from 'react-router-dom'
import './WeeklyPlan.css'

// Static content ported 1:1 from the original weekly-plan.html.
// This page isn't backed by Supabase (it's a fixed weekly routine, not
// day-to-day data) — edit this string directly if the schedule changes.
const GRID_HTML = `
<!-- ════ จันทร์ ════ -->
<div class="dc mon">
  <div class="dh">
    <div class="dn">วันจันทร์</div>
    <div class="dt">DESIGN DAY</div>
    <div class="di">🎨</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 08.30 – 10.00 <span class="badge">MORNING</span></div>
    <ul><li>เช็กภาพรวมธุรกิจ – ดูรายงาน</li><li>ตอบเรื่องเร่งด่วน</li><li>จัดลำดับงานวันนี้</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">🎨 11.00 – 13.00</div>
    <ul><li>Nuzen Studio</li><li>Design Direction</li><li>Concept Design</li><li>Review งานออกแบบ</li><li>พัฒนาบริการใหม่</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🍽️ 13.00 – 14.00</div>
    <div class="tx">อาหารกลางวัน<br>เดิน 10–15 นาที</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 14.00 – 15.00 <span class="badge">AFTERNOON</span></div>
    <ul><li>ประชุม / ติดตามทีม</li><li>โทรศัพท์ / อนุมัติงาน</li></ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 15.00 – 17.00</div>
    <div class="tx">รับลูก อยู่กับลูกเต็มที่<span class="sub-note">(งานเฉพาะถูกเถลิงเท่านั้น)</span></div>
  </div>
  <div class="sl">
    <div class="tm">📋 17.00 – 19.00 <span class="badge">EVENING</span></div>
    <ul><li>ตรวจงาน / อ่านเอกสาร</li><li>ตอบแชท / วางแผนวันถัดไป</li><li class="fc">Focus: ปรับปรุงระบบบริษัท</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">📖 19.30 – 21.00 </div>
    <ul><li>อ่านหนังสือ / Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ อังคาร ════ -->
<div class="dc tue">
  <div class="dh">
    <div class="dn">วันอังคาร</div>
    <div class="dt">CONSTRUCTION DAY</div>
    <div class="di">🏗️</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 08.30 – 10.00 <span class="badge">MORNING</span></div>
    <ul><li>เช็กภาพรวมธุรกิจ – ดูรายงาน</li><li>ตอบเรื่องเร่งด่วน</li><li>จัดลำดับงานวันนี้</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">🏗️ 11.00 – 13.00</div>
    <ul><li>Quiet Force</li><li>Site Review</li><li>Cost Control</li><li>Quality Control</li><li>ตรวจปัญหาโครงการ</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🍽️ 13.00 – 14.00</div>
    <div class="tx">อาหารกลางวัน<br>เดิน 10–15 นาที</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 14.00 – 15.00 <span class="badge">AFTERNOON</span></div>
    <ul><li>ประชุม / ติดตามทีม</li><li>โทรศัพท์ / อนุมัติงาน</li><li class="fc">Focus: ติดตามโปรเจ็คแมน</li></ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 15.00 – 17.00</div>
    <div class="tx">รับลูก อยู่กับลูกเต็มที่<span class="sub-note">(งานเฉพาะถูกเถลิงเท่านั้น)</span></div>
  </div>
  <div class="sl">
    <div class="tm">📋 17.00 – 19.00 <span class="badge">EVENING</span></div>
    <ul><li>ตรวจงาน / อ่านเอกสาร / ตอบแชท</li></ul>
    <div class="tx" style="font-size:8.5px;margin-top:2px">17.20 – 18.40 เดินออกกำลังกาย</div>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">📖 19.30 – 21.00 </div>
    <ul><li>อ่านหนังสือ / Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ พุธ ════ -->
<div class="dc wed">
  <div class="dh">
    <div class="dn">วันพุธ</div>
    <div class="dt">MONEY DAY</div>
    <div class="di">💰</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 08.30 – 10.00 <span class="badge">MORNING</span></div>
    <ul><li>เช็กภาพรวมธุรกิจ – ดูรายงาน</li><li>ตอบเรื่องเร่งด่วน</li><li>จัดลำดับงานวันนี้</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">💰 11.00 – 13.00</div>
    <ul><li>การเงินทั้งหมด</li><li>Cash Flow</li><li>รายรับรายจ่าย</li><li>หนี้สิน</li><li>งบการเงิน</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🍽️ 13.00 – 14.00</div>
    <div class="tx">อาหารกลางวัน<br>เดิน 10–15 นาที</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 14.00 – 15.00 <span class="badge">AFTERNOON</span></div>
    <ul>
      <li>ประชุม / ติดตามทีม</li><li>โทรศัพท์ / อนุมัติงาน</li>
      <li class="fc">Focus: การลงทุน</li>
      <li class="si">· หุ้นไทย / หุ้นต่างประเทศ</li>
      <li class="si">· Bitcoin / Asset Allocation</li>
    </ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 15.00 – 17.00</div>
    <div class="tx">รับลูก อยู่กับลูกเต็มที่<span class="sub-note">(งานเฉพาะถูกเถลิงเท่านั้น)</span></div>
  </div>
  <div class="sl">
    <div class="tm">📋 17.00 – 19.00 <span class="badge">EVENING</span></div>
    <ul><li>ตรวจงาน / อ่านเอกสาร</li><li>ตอบแชท / วางแผนวันถัดไป</li><li class="fc">Focus: ปรับปรุงระบบบริษัท</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">▶️ 19.30 – 21.00 </div>
    <ul><li>ทำข้อมูลผ่าน Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ พฤหัสบดี ════ -->
<div class="dc thu">
  <div class="dh">
    <div class="dn">วันพฤหัสบดี</div>
    <div class="dt">GROWTH DAY</div>
    <div class="di">📈</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 08.30 – 10.00 <span class="badge">MORNING</span></div>
    <ul><li>เช็กภาพรวมธุรกิจ – ดูรายงาน</li><li>ตอบเรื่องเร่งด่วน</li><li>จัดลำดับงานวันนี้</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">📈 11.00 – 13.00</div>
    <ul><li>ธุรกิจใหม่</li><li>Cafe Sandwich</li><li>Camp คูนาย</li><li>Parking</li><li>Land Development</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🍽️ 13.00 – 14.00</div>
    <div class="tx">อาหารกลางวัน<br>เดิน 10–15 นาที</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 14.00 – 15.00 <span class="badge">AFTERNOON</span></div>
    <ul><li>ประชุม / ติดตามทีม</li><li>โทรศัพท์ / อนุมัติงาน</li><li class="fc">Focus: คู่ค้า / นักลงทุน / พันธมิตร</li></ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 15.00 – 17.00</div>
    <div class="tx">รับลูก อยู่กับลูกเต็มที่<span class="sub-note">(งานเฉพาะถูกเถลิงเท่านั้น)</span></div>
  </div>
  <div class="sl">
    <div class="tm">📋 17.00 – 19.20 <span class="badge">EVENING</span></div>
    <ul><li>ตรวจงาน / อ่านเอกสาร / ตอบแชท</li></ul>
    <div class="tx" style="font-size:8.5px;margin-top:2px">17.20 – 18.40 เดินออกกำลังกาย</div>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">▶️ 19.30 – 21.00 </div>
    <ul><li>Youtube Focus: ปรับบริษัท</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ ศุกร์ ════ -->
<div class="dc fri">
  <div class="dh">
    <div class="dn">วันศุกร์</div>
    <div class="dt">OWNER DAY</div>
    <div class="di">👑</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 08.30 – 10.00 <span class="badge">MORNING</span></div>
    <ul><li>เช็กภาพรวมธุรกิจ – ดูรายงาน</li><li>ตอบเรื่องเร่งด่วน</li><li>จัดลำดับงานวันนี้</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">👑 11.00 – 13.00</div>
    <ul><li>เรื่องเจ้าของกิจการ</li><li>คดีความ</li><li>เอกสาร</li><li>หนาย</li><li>หุ้นส่วน</li><li>ความเสี่ยง</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🍽️ 13.00 – 14.00</div>
    <div class="tx">อาหารกลางวัน<br>เดิน 10–15 นาที</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ 14.00 – 15.00 <span class="badge">AFTERNOON</span></div>
    <ul><li>ประชุม / ติดตามทีม</li><li>โทรศัพท์ / อนุมัติงาน</li><li class="fc">Focus: Review ทั้งสัปดาห์</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🔍 13.00 – 15.00</div>
    <ul><li>ดูที่ดิน / ดูโครงการ</li><li>สำรวจโอกาส</li></ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 15.00 – 17.00</div>
    <div class="tx">รับลูก อยู่กับลูกเต็มที่<span class="sub-note">(งานเฉพาะถูกเถลิงเท่านั้น)</span></div>
  </div>
  <div class="sl">
    <div class="tm">📋 17.00 – 19.00 <span class="badge">EVENING</span></div>
    <ul><li>ตรวจงาน / อ่านเอกสาร</li><li>ตอบแชท / วางแผนวันถัดไป</li><li class="fc">Focus: ปรับปรุงระบบบริษัท</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">▶️ 19.30 – 21.00 </div>
    <ul><li>หาข้อมูลผ่าน Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ เสาร์ ════ -->
<div class="dc sat">
  <div class="dh">
    <div class="dn">วันเสาร์</div>
    <div class="dt">FUTURE DAY</div>
    <div class="di">🚀</div>
  </div>
  <div class="sl">
    <div class="tm">🏃 07.00 – 08.30</div>
    <div class="tx">เดินออกกำลังกาย</div>
  </div>
  <div class="sl">
    <div class="tm">🚿 10.00 – 11.00</div>
    <div class="tx">อาบน้ำ</div>
  </div>
  <div class="sl">
    <div class="tm">📚 11.00 – 13.00</div>
    <ul><li>ศึกษาการลงทุน</li><li>อสังหา</li><li>AI</li><li>ธุรกิจใหม่</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🔍 13.00 – 15.00</div>
    <ul><li>ดูที่ดิน / ดูโครงการ</li><li>สำรวจโอกาส</li></ul>
  </div>
  <div class="sl">
    <div class="tm">📱 15.00 – 17.00</div>
    <ul><li>Personal Branding</li><li>Facebook</li><li>Instagram / Tiktok</li><li>ถ่ายรูป</li><li>ทำ Content</li><li>ภาษาอังกฤษ</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">📖 19.30 – 21.00 </div>
    <ul><li>อ่านหนังสือ / Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>

<!-- ════ อาทิตย์ ════ -->
<div class="dc sun">
  <div class="dh">
    <div class="dn">วันอาทิตย์</div>
    <div class="dt">RECOVERY DAY</div>
    <div class="di">🌿</div>
  </div>
  <div class="sl">
    <div class="tm">☀️ เช้า (Morning)</div>
    <ul><li>ดู Youtube ความรู้</li><li>อาหารเช้า</li><li>กาแฟ / อ่านหนังสือ</li></ul>
  </div>
  <div class="sl">
    <div class="tm">👨‍👩‍👧‍👦 กลางวัน (Midday)</div>
    <ul><li>ลูก</li><li>คนรัก</li><li>ญาติพี่น้อง</li></ul>
  </div>
  <div class="sl">
    <div class="tm">❤️ เย็น (Evening)</div>
    <ul><li>เดินออกกำลังกาย</li><li>วางแผนสัปดาห์ 30 นาที</li><li>เตรียมเป้าหมายสัปดาห์ใหม่</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🎓 19.00 – 19.30 </div>
    <ul><li>เรียน ENG Online</li></ul>
  </div>
  <div class="sl">
    <div class="tm">📖 19.30 – 21.00 </div>
    <ul><li>อ่านหนังสือ / Youtube</li></ul>
  </div>
  <div class="sl">
    <div class="tm">🛁 21.00 – 21.45 </div>
    <ul><li>อาบน้ำ</li></ul>
  </div><div class="sl">
    <div class="tm">🛌 21.45 – 22.00 </div>
    <ul><li>เตรียมตัวนอน</li></ul>
  </div>
  <div class="nt"></div>
</div>
`

const FOOTER_HTML = `
<div class="kp-wrap">
  <div class="kp-title">KEY<br>PRINCIPLES</div>
  <div class="kp-item">
    <span class="kp-icon">🕐</span>
    <div><div class="kp-label">เวลาทอง</div><div class="kp-sub">08.30 – 13.00<br>โฟกัสงานสำคัญที่สุด</div></div>
  </div>
  <div class="kp-item">
    <span class="kp-icon">👨‍👩‍👧‍👦</span>
    <div><div class="kp-label">ครอบครัวคืออันดับ 1</div><div class="kp-sub">15.00 – 17.00<br>อยู่กับครอบครัวเต็มที่</div></div>
  </div>
  <div class="kp-item">
    <span class="kp-icon">📚</span>
    <div><div class="kp-label">พัฒนาตัวเองทุกวัน</div><div class="kp-sub">19.00 เป็นต้นไป<br>เรียนรู้ / อ่านหนังสือ / วางแผน</div></div>
  </div>
  <div class="kp-item">
    <span class="kp-icon">🎯</span>
    <div><div class="kp-label">ทบทวนทุกวัน</div><div class="kp-sub">วางแผน – ลงมือทำ – ตรวจสอบ<br>ปรับปรุง – พัฒนา</div></div>
  </div>
</div>
`

export default function WeeklyPlanPage() {
  return (
    <div className="weekly-plan-page">
      <div id="app">
        <div className="wp-header">
          <h1>WEEKLY PLAN – 7 DAYS OVERVIEW</h1>
          <div style={{ textAlign: 'center', margin: '3px 0' }}>
            <span style={{ display: 'inline-block', width: 100, height: 1.5, background: '#ccc', verticalAlign: 'middle' }} />
          </div>
          <div className="sub">
            <span>วางแผนชีวิต</span>
            <span className="sep">|</span>
            <span>บริหารเวลา</span>
            <span className="sep">|</span>
            <span>สร้างผลลัพธ์</span>
          </div>
          <Link to="/" className="nav-btn">⬅ Dashboard</Link>
        </div>

        <div id="grid" dangerouslySetInnerHTML={{ __html: GRID_HTML }} />

        <div className="wp-footer" dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      </div>
    </div>
  )
}
