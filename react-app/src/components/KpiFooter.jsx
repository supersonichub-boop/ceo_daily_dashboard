import { useCashLiquidity } from '../hooks/useCashLiquidity'
import { useTable } from '../hooks/useTable'
import { computeKpis, KPI_CONFIG } from '../lib/kpiCalc'

export default function KpiFooter() {
  const { cash } = useCashLiquidity()
  const { rows: companies } = useTable('companies')
  const { rows: risks } = useTable('risks')
  const { rows: decisionItems } = useTable('decision_items')

  if (!cash) return null

  const kpi = computeKpis({ cash, companies, risks, decisionItems })

  const cards = [
    { cfg: KPI_CONFIG.cashPosition, pct: kpi.cashPct },
    { cfg: KPI_CONFIG.projectProgress, pct: kpi.projPct },
    { cfg: KPI_CONFIG.collection, pct: kpi.collPct },
    { cfg: KPI_CONFIG.submission, pct: kpi.submPct },
    { cfg: KPI_CONFIG.expenseControl, pct: kpi.expPct },
  ]

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8, alignItems: 'center' }}>
        <div
          style={{
            background: '#0B1E36',
            color: 'white',
            borderRadius: 8,
            padding: 8,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="fa-solid fa-chart-pie" style={{ color: '#38bdf8', fontSize: 16, marginBottom: 3 }} />
          <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: '.06em' }}>KPI TODAY</span>
        </div>
        {cards.map(({ cfg, pct }) => (
          <div
            key={cfg.label}
            style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 6, textAlign: 'center', padding: '5px 8px' }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: '#64748b', letterSpacing: '.04em', textTransform: 'uppercase' }}>
              {cfg.label}
            </div>
            <div className={cfg.textColor} style={{ fontSize: 15, fontWeight: 800, margin: '1px 0' }}>
              {pct}%
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: 9999, height: 5, overflow: 'hidden', marginBottom: 3 }}>
              <div className={`${cfg.barColor} progress-bar-fill`} style={{ height: 5, borderRadius: 9999, width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: 8, color: '#94a3b8' }}>{cfg.sublabel}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: 'center',
          fontSize: 10,
          color: '#475569',
          fontWeight: 500,
          marginTop: 6,
          paddingTop: 6,
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <span>💡 โฟกัสสิ่งสำคัญ</span>
        <span>|</span>
        <span>จัดลำดับงาน</span>
        <span>|</span>
        <span>ตัดสินใจไว</span>
        <span>|</span>
        <span>ทำให้สำเร็จ</span>
      </div>
    </>
  )
}
