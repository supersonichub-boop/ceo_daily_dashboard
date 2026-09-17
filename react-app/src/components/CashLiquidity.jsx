import { useState } from 'react'
import { useCashLiquidity } from '../hooks/useCashLiquidity'
import EditModal from './EditModal'
import { EditButton } from './CardIconButtons'

const STATUS_MAP = {
  ดี: { cls: 'bg-emerald-500 text-white', icon: 'fa-check-circle' },
  ระวัง: { cls: 'bg-amber-400 text-slate-900 animate-pulse-glow', icon: 'fa-triangle-exclamation' },
  วิกฤต: { cls: 'bg-red-600 text-white animate-pulse-glow', icon: 'fa-circle-xmark' },
}

const fmt = (n) => Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function CashLiquidity() {
  const { cash, loading, update } = useCashLiquidity()
  const [editing, setEditing] = useState(false)

  if (loading || !cash) return null
  const st = STATUS_MAP[cash.status] || STATUS_MAP['ระวัง']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="bg-[#217346] text-white px-3 py-2 font-semibold text-sm flex items-center justify-between group">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-wallet" />
          <span>CASH &amp; LIQUIDITY</span>
        </span>
        <EditButton onClick={() => setEditing(true)} />
      </div>
      <div className="p-3 text-xs sm:text-sm flex flex-col gap-2.5">
        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
              <i className="fa-solid fa-money-bill" />
            </span>
            เงินสดคงเหลือ
          </span>
          <span className="font-bold text-emerald-700 text-sm sm:text-base">
            {fmt(cash.current)} <span className="text-xs font-normal text-slate-500">บาท</span>
          </span>
        </div>
        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
              <i className="fa-solid fa-arrow-trend-up" />
            </span>
            เงินเข้าคาดการณ์ 7 วัน
          </span>
          <span className="font-bold text-emerald-800 text-sm sm:text-base">
            {fmt(cash.inflow_7d)} <span className="text-xs font-normal text-slate-500">บาท</span>
          </span>
        </div>
        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
          <span className="text-slate-600 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px]">
              <i className="fa-solid fa-arrow-trend-down" />
            </span>
            เงินออกคาดการณ์ 7 วัน
          </span>
          <span className="font-bold text-[#9E1A1A] text-sm sm:text-base">
            {fmt(cash.outflow_7d)} <span className="text-xs font-normal text-slate-500">บาท</span>
          </span>
        </div>
        <div className="mt-1 pt-2 flex items-center justify-between">
          <span className="font-semibold text-slate-700">สถานะ:</span>
          <div className="flex items-center gap-2">
            <span className={`${st.cls} font-bold px-5 py-1 rounded text-xs shadow-sm`}>{cash.status}</span>
            <i className={`fa-solid ${st.icon} text-amber-500 text-lg`} />
          </div>
        </div>
      </div>

      {editing && (
        <EditModal
          title="แก้ไข Cash & Liquidity"
          fields={[
            { name: 'current', label: 'เงินสดคงเหลือ', type: 'number' },
            { name: 'inflow_7d', label: 'เงินเข้าคาดการณ์ 7 วัน', type: 'number' },
            { name: 'outflow_7d', label: 'เงินออกคาดการณ์ 7 วัน', type: 'number' },
            {
              name: 'status',
              label: 'สถานะ',
              type: 'select',
              options: [
                { value: 'ดี', label: 'ดี' },
                { value: 'ระวัง', label: 'ระวัง' },
                { value: 'วิกฤต', label: 'วิกฤต' },
              ],
            },
          ]}
          initialValues={cash}
          onSubmit={async (v) =>
            update({
              current: Number(v.current),
              inflow_7d: Number(v.inflow_7d),
              outflow_7d: Number(v.outflow_7d),
              status: v.status,
            })
          }
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  )
}
