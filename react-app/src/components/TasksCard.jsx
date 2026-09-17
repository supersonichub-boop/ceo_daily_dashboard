import { useState } from 'react'
import { useTable } from '../hooks/useTable'
import EditModal from './EditModal'
import { AddButton, EditButton, DeleteButton } from './CardIconButtons'

const STATUS_COLOR = { red: '#EF4444', amber: '#F59E0B', green: '#22C55E' }

const FIELDS = [
  { name: 'title', label: 'หัวข้องาน', type: 'text' },
  { name: 'detail', label: 'รายละเอียด', type: 'textarea', placeholder: 'บรรทัดใหม่ = ขึ้นบรรทัดใหม่' },
  { name: 'bold', label: 'ตัวหนา', type: 'checkbox' },
  {
    name: 'status',
    label: 'สถานะ',
    type: 'select',
    options: [
      { value: '', label: '(ไม่มี)' },
      { value: 'red', label: 'แดง' },
      { value: 'amber', label: 'เหลือง' },
      { value: 'green', label: 'เขียว' },
    ],
  },
]

export default function TasksCard() {
  const { rows: tasks, insert, update, remove } = useTable('tasks')
  const [modal, setModal] = useState(null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,.08)',
        border: '1px solid #e2e8f0',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div className="bg-[#0B1E36] text-white px-3 py-2 font-semibold text-sm flex items-center justify-between flex-shrink-0 group">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-clipboard-list" />
          <span>งานสำคัญวันนี้</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#162D4A] text-sky-200 px-2 py-0.5 rounded text-xs">{tasks.length} ข้อ</span>
          <AddButton onClick={() => setModal('add')} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {tasks.map((t, i) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-2.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 p-1 pb-2 rounded transition group"
          >
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0B1E36] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div className="text-slate-800 leading-tight">
                {t.bold ? (
                  <span className="font-bold text-[#0B1E36]">{t.title}</span>
                ) : (
                  <span className="font-medium">{t.title}</span>
                )}
                {t.detail && (
                  <div
                    className="text-[11px] text-slate-600 mt-0.5"
                    dangerouslySetInnerHTML={{ __html: t.detail.replace(/\n/g, '<br>') }}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {t.status && (
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: STATUS_COLOR[t.status] || '#94a3b8', boxShadow: '0 0 0 2px rgba(0,0,0,.04) inset' }}
                />
              )}
              <EditButton onClick={() => setModal(t)} />
              <DeleteButton onClick={() => remove(t.id)} />
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <EditModal
          title={modal === 'add' ? 'เพิ่มงาน' : 'แก้ไขงาน'}
          fields={FIELDS}
          initialValues={modal === 'add' ? { bold: false, status: '' } : { ...modal, status: modal.status || '' }}
          onSubmit={async (v) => {
            const payload = { ...v, status: v.status || null }
            if (modal === 'add') {
              await insert({ ...payload, sort_order: tasks.length })
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
