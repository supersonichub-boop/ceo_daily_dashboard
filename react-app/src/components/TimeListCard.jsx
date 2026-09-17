import { useState } from 'react'
import { useTable } from '../hooks/useTable'
import EditModal from './EditModal'
import { AddButton, DeleteButton } from './CardIconButtons'

const FIELDS = [
  { name: 'time', label: 'เวลา (เช่น 09.00น.)', type: 'text' },
  { name: 'title', label: 'รายการ', type: 'text' },
]

/**
 * Shared card for "today schedule" and "appointments" — same shape
 * (time + title), just different table/label/color/icon/empty text.
 */
export default function TimeListCard({ table, headerColor, headerBg, icon, title, emptyText, dotColor }) {
  const { rows: items, insert, remove } = useTable(table)
  const [adding, setAdding] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex-1">
      <div className={`${headerBg} text-white px-3 py-2 font-semibold text-sm flex items-center justify-between group`}>
        <span className="flex items-center gap-2">
          <i className={icon} />
          <span>{title}</span>
        </span>
        <AddButton onClick={() => setAdding(true)} />
      </div>
      <div className="p-3 text-xs flex flex-col gap-2.5">
        {items.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 flex flex-col items-center justify-center h-full gap-1">
            <i className="fa-regular fa-calendar-check text-slate-300 text-2xl" />
            <span>{emptyText}</span>
          </div>
        ) : (
          items.map((it, i) => (
            <div
              key={it.id}
              className="flex items-center gap-2.5 pb-2 border-b border-slate-100 hover:bg-slate-50 p-1 rounded transition group"
            >
              <span
                className={`w-5 h-5 rounded-full ${dotColor} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}
              >
                {i + 1}
              </span>
              {it.time && <span className="font-bold text-slate-700 w-14 shrink-0">{it.time}</span>}
              <div className="text-slate-800 font-medium flex-1">{it.title}</div>
              <DeleteButton onClick={() => remove(it.id)} />
            </div>
          ))
        )}
      </div>

      {adding && (
        <EditModal
          title={`เพิ่ม${title}`}
          fields={FIELDS}
          initialValues={{}}
          onSubmit={async (v) => insert({ ...v, sort_order: items.length })}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  )
}
