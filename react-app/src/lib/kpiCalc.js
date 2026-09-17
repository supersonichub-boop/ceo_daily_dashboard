// Ports the KPI_CALC logic from the original data/dashboard-data.js

export function computeKpis({ cash, companies, risks, decisionItems }) {
  const inflow = Number(cash?.inflow_7d ?? 0)
  const outflow = Number(cash?.outflow_7d ?? 0)

  // CASH POSITION: inflow / (inflow + outflow) * 100
  const cashPct = inflow + outflow > 0
    ? Math.round((inflow / (inflow + outflow)) * 100)
    : 0

  // PROJECT PROGRESS: avg of all companies
  const avgProgress = companies?.length
    ? Math.round(companies.reduce((s, c) => s + (c.progress || 0), 0) / companies.length)
    : 0
  const projPct = avgProgress
  const submPct = avgProgress

  // COLLECTION: if any risk has overdue → 50%, else 100%
  const hasOverdue = (risks || []).some((r) => Number(r.overdue) > 0)
  const collPct = hasOverdue ? 50 : 100

  // EXPENSE CONTROL: (1 - outflow/inflow) * 100, capped 0-100
  const rawExpense = inflow > 0 ? Math.round((1 - outflow / inflow) * 100) : 0
  const expPct = Math.max(0, Math.min(100, rawExpense))

  // DECISIONS TOTAL: sum of all amounts
  const decisionTotal = (decisionItems || [])
    .filter((i) => Number(i.amount) > 0)
    .reduce((s, i) => s + Number(i.amount), 0)

  return { cashPct, projPct, submPct, collPct, expPct, decisionTotal }
}

export const KPI_CONFIG = {
  cashPosition: {
    label: 'CASH POSITION',
    sublabel: 'สถานะคล่องตัว',
    barColor: 'bg-[#217346]',
    textColor: 'text-[#217346]',
  },
  projectProgress: {
    label: 'PROJECT PROGRESS',
    sublabel: 'ติดตามใกล้ชิด',
    barColor: 'bg-blue-600',
    textColor: 'text-blue-700',
  },
  collection: {
    label: 'COLLECTION',
    sublabel: 'เร่งติดตามหนี้',
    barColor: 'bg-amber-500',
    textColor: 'text-amber-600',
  },
  submission: {
    label: 'SUBMISSION',
    sublabel: 'อยู่ระหว่างดำเนินการ',
    barColor: 'bg-[#5A2A82]',
    textColor: 'text-[#5A2A82]',
  },
  expenseControl: {
    label: 'EXPENSE CONTROL',
    sublabel: 'ควบคุมค่าใช้จ่ายได้ดี',
    barColor: 'bg-teal-500',
    textColor: 'text-teal-600',
  },
}
