import { useState } from 'react'
import { useTable } from '../hooks/useTable'
import EditModal from './EditModal'
import { AddButton, EditButton, DeleteButton } from './CardIconButtons'

const DOT_MAP = { green: 'bg-emerald-500', amber: 'bg-amber-400', red: 'bg-red-600' }

const FIELDS = [
  { name: 'tag', label: 'แท็ก (เช่น NUZEN)', type: 'text' },
  { name: 'name', label: 'ชื่อบริษัท', type: 'text' },
  { name: 'detail', label: 'รายละเอียด', type: 'textarea', placeholder: 'บรรทัดใหม่ = ขึ้นบรรทัดใหม่' },
  { name: 'progress', label: 'ความคืบหน้า (%)', type: 'number' },
  {
    name: 'dot_color',
    label: 'สถานะ',
    type: 'select',
    options: [
      { value: 'green', label: 'เขียว' },
      { value: 'amber', label: 'เหลือง' },
      { value: 'red', label: 'แดง' },
    ],
  },
]

export default function CompaniesOverview() {
  const { rows: companies, insert, update, remove } = useTable('companies')
  const [modal, setModal] = useState(null) // 'add' | company row | null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[#0B1E36] text-white px-3 py-2 font-semibold text-sm flex items-center justify-between group">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-city" />
          <span>COMPANIES OVERVIEW</span>
        </span>
        <AddButton onClick={() => setModal('add')} />
      </div>
      <div className="p-3 text-xs sm:text-sm">
        <div className="grid grid-cols-12 text-slate-500 font-medium text-[11px] pb-1.5 border-b mb-2">
          <div className="col-span-5">บริษัท</div>
          <div className="col-span-5 text-center">ความคืบหน้าโครงการ</div>
          <div className="col-span-2 text-right">สถานะ</div>
        </div>
        {companies.map((c) => {
          const dot = DOT_MAP[c.dot_color] || 'bg-amber-400'
          const detailLines = (c.detail || '').split('\n').filter(Boolean)
          return (
            <div key={c.id} className="grid grid-cols-12 items-center mb-3 last:mb-0 group">
              <div className="col-span-5 flex items-center gap-1.5">
                <span className="bg-slate-900 text-white font-bold text-[9px] p-1 rounded leading-none shrink-0">
                  {c.tag}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 text-xs whitespace-nowrap">{c.name}</div>
                  <div className="text-[9px] text-slate-400 leading-tight">
                    {detailLines.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-5 px-2">
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#0B1E36] h-2.5 rounded-full progress-bar-fill"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
              <div className="col-span-3 text-right font-bold text-xs flex items-center justify-end gap-1.5">
                <span>{c.progress}%</span>
                <span className={`w-2.5 h-2.5 rounded-full ${dot} inline-block`} />
                <EditButton onClick={() => setModal(c)} />
                <DeleteButton onClick={() => remove(c.id)} />
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <EditModal
          title={modal === 'add' ? 'เพิ่มบริษัท' : `แก้ไข ${modal.name}`}
          fields={FIELDS}
          initialValues={modal === 'add' ? { dot_color: 'amber', progress: 0 } : modal}
          onSubmit={async (v) => {
            const payload = { ...v, progress: Number(v.progress) }
            if (modal === 'add') {
              await insert({ ...payload, sort_order: companies.length })
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
