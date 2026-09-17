import { useState } from 'react'
import { useTable } from '../hooks/useTable'
import EditModal from './EditModal'
import { AddButton, EditButton, DeleteButton } from './CardIconButtons'

const DOT_MAP = { red: 'bg-[#9E1A1A]', amber: 'bg-amber-400' }
const fmt = (n) => Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const FIELDS = [
  {
    name: 'level',
    label: 'ระดับ',
    type: 'select',
    options: [
      { value: 'red', label: 'แดง' },
      { value: 'amber', label: 'เหลือง' },
    ],
  },
  { name: 'title', label: 'หัวข้อ', type: 'text' },
  { name: 'detail', label: 'รายละเอียด', type: 'textarea' },
  { name: 'overdue', label: 'ค้างชำระ (บาท) — ใส่ 0 เพื่อซ่อน', type: 'number' },
]

export default function Risk() {
  const { rows: risks, insert, update, remove } = useTable('risks')
  const [modal, setModal] = useState(null)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[#9E1A1A] text-white px-3 py-2 font-semibold text-sm flex items-center justify-between group">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation" />
          <span>ความเสี่ยง (RISK)</span>
        </span>
        <AddButton onClick={() => setModal('add')} />
      </div>
      <div className="p-3 text-xs flex flex-col gap-2">
        {risks.map((r) => {
          const dot = DOT_MAP[r.level] || 'bg-amber-400'
          return (
            <div key={r.id} className="flex items-start gap-2 group">
              <span className={`w-2.5 h-2.5 rounded-full ${dot} inline-block mt-1 shrink-0`} />
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-800">{r.title}</div>
                  {r.detail && <div className="text-[11px] text-slate-500 leading-tight">{r.detail}</div>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {r.overdue > 0 && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">ค้างชำระ:</span>
                      <span className="font-bold text-[#9E1A1A]">
                        {' '}
                        {fmt(r.overdue)} <span className="text-[9px] font-normal">บาท</span>
                      </span>
                    </div>
                  )}
                  <EditButton onClick={() => setModal(r)} />
                  <DeleteButton onClick={() => remove(r.id)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <EditModal
          title={modal === 'add' ? 'เพิ่มความเสี่ยง' : 'แก้ไขความเสี่ยง'}
          fields={FIELDS}
          initialValues={modal === 'add' ? { level: 'amber', overdue: 0 } : modal}
          onSubmit={async (v) => {
            const payload = { ...v, overdue: Number(v.overdue) || 0 }
            if (modal === 'add') {
              await insert({ ...payload, sort_order: risks.length })
            } else {
              await update(modal.id, payload)
            }
          }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
