/**
 * ====================================================
 *  CEO DAILY DASHBOARD — ข้อมูลกลาง (แก้ที่นี่อย่างเดียว)
 * ====================================================
 */
const DASHBOARD_DATA = {

  // ── HEADER ──────────────────────────────────────────
  date: "10 กันยายน 2569",
  motto: "โฟกัสวันนี้ เพื่อผลลัพธ์ที่ยิ่งใหญ่ในอนาคต",

  // ── CASH & LIQUIDITY ────────────────────────────────
  cash: {
    current:   2060.00,          // เงินสดคงเหลือ
    inflow7d:  200000.00,        // เงินเข้าคาดการณ์ 7 วัน
    outflow7d: 50000.00,        // เงินออกคาดการณ์ 7 วัน
    // สถานะ: "ดี" | "ระวัง" | "วิกฤต"
    status: "ระวัง"
  },

  // ── COMPANIES OVERVIEW ──────────────────────────────
  companies: [
    {
      tag:      "NUZEN",
      name:     "Nuzen Studio",
      detail:   "• SUBMISSION VICTORY PHASE 2\n• SUBMISSION LIBERTY",
      progress: 80,              // %
      // สถานะดอท: "green" | "amber" | "red"
      dotColor: "amber"
    },
    {
      tag:      "QUIET",
      name:     "Quiet Force",
      detail:   "• รอพี่วาสิฏอัปเดต",
      progress: 75,
      dotColor: "amber"
    }
  ],

  // ── TODAY SCHEDULE ──────────────────────────────────
  schedule: [
    { title: "ติดตามเงินค่าแรง" }
    // เพิ่มนัดตรงนี้: { time: "09.00น.", title: "..." }
  ],

  // ── TASKS (งานสำคัญวันนี้) ─────────────────────────
  tasks: [
    {
      title: "NUZEN STUDIO",
      detail: "- SUBMISSION VICTORY COMMON AREA PHASE 2 - SUBMISSION HALAL\n- SUBMISSION LIBERTY",
      bold: true
    },
    {
      title: "QUIET FORCE - รอพี่วาสิฏอัปเดต",
      bold: true
    },
    {
      title: "ธุรกิจใหม่",
      detail: "- CAFE : ตามช่างเข้างาน / สั่งซื้อของใช้ CAFÉ / สั่งของตกแต่ง\n- CAMP : รั้ว / ปรับปรุงห้องน้ำ / ทางเดิน / ซ่อมแซมอาคาร / มิตเตอร์ไฟและขยายเขต / ค่าเช่าแคมป์",
      bold: true
    },
    { title: "ติดต่อสำเนาโฉนดที่ดินคุณอันและสัญญาฉบับแก้ไข", status: "amber" },
    { title: "ติดต่อสอบถามเรื่องคดีปลอมแปลงเอกสาร ปปช ภาค 8", status: "red" },
    { title: "ติดตามงานเพิ่มเอกสาร C ( พี่วาสิฏกำลังดำเนินการ ) เร่งรัด", status: "red" },
    { title: "ติดตามหนังสือจากเทศบาลศรีสุนทร (โทรสอบถาม)", status: "red" },
    { title: "ทำอัปเดตรายงานต้นทุนอาคาร C (เริ่มทำไปด้วย)", status: "amber" },
    { title: "เตรียมเอกสารทางบัญชีให้พี่กิ่ง", status: "green" },
    { title: "บันทึกข้อมูลค่าใช้จ่ายให้ครบและถูกต้อง", status: "amber" },
    { title: "ค่าใช้จ่ายรอจ่าย 2 บริษัท", status: "green" },
    { title: "หนังสือไปสภาสถาปนิก", status: "amber" },
    { title: "ตามเงินค่าเช่าห้องคนงานจากพี่วาสิฏ", status: "amber" },
    { title: "ตามเงินค่างวดของ Wallaya", status: "green" },
    { title: "ตามเงินของอันดามันแอสเซท เขาแจ้งจะจ่ายกลางเดือน", status: "amber" }
  ],

  // ── DECISIONS (เรื่องที่ต้องการตัดสินใจ) ───────────
  // ยอดรวมคำนวณอัตโนมัติจากรายการด้านล่าง
  // amount = null หรือ 0 → แสดงเป็น "-"
  decisionTitle: "อนุมัติจ่ายค่าใช้จ่ายบางส่วน",
  decisionItems: [
    // ─ QFC ─
    { group: "QFC" },
    // { label: "หนี้เก่า CMI",                  amount: 10000.00 },
    // { label: "หนี้เก่าคอนกรีต TPI",           amount: 10000.00 },
    // { label: "ย่าตุ๊",                         amount: 20000.00 },
    // { label: "โคกคลอย",                        amount: 20000.00 },
    // { label: "เชิงทะเล",                        amount: 10000.00 },
    // { label: "ฉลองคอนกรีต (CLC)",             amount: 0 },
    // { label: "หนี้เก่าพี่ยุ้ย",               amount: 5000.00 },
    // { label: "ประกันสังคม MD",                 amount: 1500.00 },
    { label: "ค่าเช่าที่ดิน",                  amount: 36000.00 },
    { label: "ค่าบริการรถเครน 25 ตัน 7/9/69", amount: 7280.00 },
    // ─ NZN ─
    { group: "NZN" },
    { label: "ค่าบริการออกแบบ (พี่หมี) งวดที่ 4", amount: 26600.00 }
  ],

  // ── RISK ────────────────────────────────────────────
  risks: [
    {
      level: "red",   // "red" | "amber"
      title: "QNITY TYPE C",
      detail: "งานโครงสร้างต้องเสร็จ Update แผนงานเป็นรายวันทุกวัน"
    },
    {
      level: "amber",
      title: "ลูกหนี้ WLY",
      overdue: 4230635.51   // ค้างชำระ (บาท) ใส่ 0 เพื่อซ่อน
    },
    {
      level: "red",
      title: "THE UNIVERSE (CAFE NUZEN)",
      detail: "ติดตามความคืบหน้าอย่างใกล้ชิด"
    },
    {
      level: "amber",
      title: "ราคางาน FURNITURE ยังไม่สรุป",
      detail: "Search หาเพิ่มเติม"
    }
  ],

  // ── APPOINTMENTS (นัดหมายสำคัญ) ──────────────────
  appointments: [
    { time: "19.00น.", title: "พบ CEO บ.จระเข้" }
    // เพิ่มนัดตรงนี้
  ],

  // ── KPI TODAY ───────────────────────────────────────
  // percent คำนวณอัตโนมัติจากข้อมูลข้างต้น
  // แต่สามารถ override ด้วยการใส่ manualPct ได้
  kpi: {
    cashPosition: {
      // net = inflow - outflow → ถ้า net > 0 → ดี
      // สูตร: (inflow / (inflow+outflow)) * 100
      label: "CASH POSITION",
      sublabel: "สถานะคล่องตัว",
      color: "dashGreen",
      barColor: "bg-[#217346]",
      textColor: "text-[#217346]"
      // manualPct: 50  ← ถ้าต้องการกำหนดเอง
    },
    projectProgress: {
      // เฉลี่ย progress ของทุก company
      label: "PROJECT PROGRESS",
      sublabel: "ติดตามใกล้ชิด",
      color: "blue",
      barColor: "bg-blue-600",
      textColor: "text-blue-700"
    },
    collection: {
      // ถ้ามีลูกหนี้ค้างชำระ → ต่ำ
      // สูตร: ถ้า overdue > 0 → 50%, ไม่มี → 100%
      label: "COLLECTION",
      sublabel: "เร่งติดตามหนี้",
      color: "amber",
      barColor: "bg-amber-500",
      textColor: "text-amber-600"
    },
    submission: {
      // เฉลี่ย progress ของ company ที่มี submission
      label: "SUBMISSION",
      sublabel: "อยู่ระหว่างดำเนินการ",
      color: "purple",
      barColor: "bg-[#5A2A82]",
      textColor: "text-[#5A2A82]"
    },
    expenseControl: {
      // สูตร: (1 - outflow/inflow) * 100 capped 0-100
      label: "EXPENSE CONTROL",
      sublabel: "ควบคุมค่าใช้จ่ายได้ดี",
      color: "teal",
      barColor: "bg-teal-500",
      textColor: "text-teal-600"
    }
  }
};

// ── KPI AUTO-CALC ──────────────────────────────────────
const KPI_CALC = (() => {
  const d = DASHBOARD_DATA;

  // CASH POSITION: inflow / (inflow + outflow) * 100
  const cashPct = d.kpi.cashPosition.manualPct !== undefined
    ? d.kpi.cashPosition.manualPct
    : Math.round((d.cash.inflow7d / (d.cash.inflow7d + d.cash.outflow7d)) * 100);

  // PROJECT PROGRESS: avg of all companies
  const avgProgress = Math.round(
    d.companies.reduce((s, c) => s + c.progress, 0) / d.companies.length
  );
  const projPct = d.kpi.projectProgress.manualPct !== undefined
    ? d.kpi.projectProgress.manualPct
    : avgProgress;

  // SUBMISSION: avg progress of companies with submission tasks
  const submPct = d.kpi.submission.manualPct !== undefined
    ? d.kpi.submission.manualPct
    : avgProgress;

  // COLLECTION: if any risk has overdue → 50%, else 100%
  const hasOverdue = d.risks.some(r => r.overdue > 0);
  const collPct = d.kpi.collection.manualPct !== undefined
    ? d.kpi.collection.manualPct
    : (hasOverdue ? 50 : 100);

  // EXPENSE CONTROL: (1 - outflow/inflow) * 100
  const rawExpense = Math.round((1 - d.cash.outflow7d / d.cash.inflow7d) * 100);
  const expPct = d.kpi.expenseControl.manualPct !== undefined
    ? d.kpi.expenseControl.manualPct
    : Math.max(0, Math.min(100, rawExpense));

  // DECISIONS TOTAL: sum all amounts
  const decisionTotal = d.decisionItems
    .filter(i => i.amount > 0)
    .reduce((s, i) => s + i.amount, 0);

  return { cashPct, projPct, submPct, collPct, expPct, decisionTotal };
})();
