/**
 * ====================================================
 *  เงินยืม MD — ข้อมูลกลาง (แก้ที่นี่อย่างเดียว)
 *  ยอดรวม / Balance / กราฟ คำนวณอัตโนมัติทั้งหมด
 * ====================================================
 *
 *  วิธีเพิ่มรายการ: ใส่ใน transactions ของบริษัทนั้น
 *    ยืม :  { date: "3/9/69", lent: 5000 }
 *    คืน :  { date: "10/9/69", repaid: 10000 }
 *    desc ไม่ใส่ → ยืม = "เงินสำรองจ่าย", คืน = "คืนแล้ว"
 *
 *  ขึ้นเดือนใหม่: เปลี่ยน month แล้วเอา Balance รวมสุทธิของเดือนก่อน
 *  มาใส่ carryOver และล้าง transactions ให้ว่าง
 *
 *  ยอดรวมสุทธิ = ยอดคงเหลือ (Balance) ของทุกบริษัทรวมกัน
 */
const MD_LOAN_DATA = {

  month: 8,          // เดือน (1-12)
  year:  2569,       // พ.ศ.

  companies: [
    {
      key: "QFC",
      name: "QFC",
      color: "blue",  headBg: "#1e3a8a",  chartRgb: "59, 130, 246",
      carryOver: 915400.00,
      transactions: [
        { date: "3/8/69",  lent: 5000.00 },
        { date: "6/8/69",  lent: 2000.00 },
        { date: "6/8/69",  lent: 6000.00 },
        { date: "10/8/69", repaid: 10000.00 },
        { date: "15/8/69", lent: 2000.00 },
        { date: "17/8/69", lent: 2000.00 },
        { date: "19/8/69", lent: 4500.00 },
        { date: "24/8/69", lent: 5000.00 },
        { date: "25/8/69", lent: 2000.00 },
        { date: "26/8/69", lent: 2000.00 },
        { date: "28/8/69", lent: 2000.00 },
        { date: "29/8/69", lent: 150000.00 },
        { date: "29/8/69", lent: 80000.00 },
        { date: "31/8/69", lent: 18000.00 }
      ]
    },
    {
      key: "NZN",
      name: "NZN",
      color: "purple",  headBg: "#6b21a8",  chartRgb: "168, 85, 247",
      carryOver: 1501149.32,
      transactions: [
        { date: "14/8/69", lent: 15000.00 },
        { date: "15/8/69", lent: 5000.00 },
        { date: "17/8/69", lent: 2000.00 },
        { date: "25/8/69", lent: 2000.00 },
        { date: "31/8/69", lent: 15000.00 }
      ]
    },
    {
      key: "SSB",
      name: "SSB",
      color: "teal",  headBg: "#0f766e",  chartRgb: "20, 184, 166",
      carryOver: 953075.61,
      transactions: []
    },
    {
      key: "RESERVE",
      name: "Company Reserve",
      color: "orange",  headBg: "#c2410c",  chartRgb: "249, 115, 22",
      carryOver: 26000.00,
      transactions: []
    }
  ]
};

// ── AUTO-CALC ──────────────────────────────────────────
const MD_LOAN_CALC = (() => {
  const d = MD_LOAN_DATA;
  const r2 = n => Math.round(n * 100) / 100;
  const sum = (arr, f) => r2(arr.reduce((s, x) => s + (x[f] || 0), 0));

  const MONTHS = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
                  "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
  const mm = String(d.month).padStart(2, "0");
  const prevMonth = d.month === 1 ? 12 : d.month - 1;
  const prevYear  = d.month === 1 ? d.year - 1 : d.year;

  const labels = {
    period:    `${mm}/${d.year}`,                                      // 08/2569
    periodTh:  `${MONTHS[d.month - 1]} ${d.year} (${mm}/${d.year})`,   // สิงหาคม 2569 (08/2569)
    carryOver: `ยอดยกมา (${String(prevMonth).padStart(2, "0")}/${String(prevYear).slice(-2)})`
  };

  const companies = d.companies.map(c => {
    // Balance สะสมทีละแถว
    let bal = c.carryOver;
    const rows = c.transactions.map(t => {
      bal = r2(bal + (t.lent || 0) - (t.repaid || 0));
      return {
        date:   t.date,
        desc:   t.desc || (t.repaid ? "คืนแล้ว" : "เงินสำรองจ่าย"),
        lent:   t.lent || 0,
        repaid: t.repaid || 0,
        balance: bal
      };
    });

    const monthLent   = sum(c.transactions, "lent");
    const monthRepaid = sum(c.transactions, "repaid");
    const monthNet    = r2(monthLent - monthRepaid);
    const balance     = r2(c.carryOver + monthNet);

    return { ...c, rows, monthLent, monthRepaid, monthNet, balance,
             totalLent: r2(c.carryOver + monthLent) };
  });

  const grandTotal = r2(companies.reduce((s, c) => s + c.balance, 0));

  return { labels, companies, grandTotal };
})();

// จัดรูปแบบตัวเลข 1,234.56 (0 → ค่าว่าง ถ้า blankZero)
function fmtMoney(n, blankZero = false) {
  if (blankZero && !n) return "";
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
