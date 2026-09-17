import { useState } from 'react'
import { useTable } from '../hooks/useTable'
import { useSettings } from '../hooks/useSettings'
import EditModal from './EditModal'
import { AddButton, EditButton, DeleteButton } from './CardIconButtons'

const fmt = (n) => Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const FIELDS = [
  { name: 'group_name', label: 'กลุ่ม (เช่น QFC, NZN)', type: 'text' },
  { name: 'label', label: 'รายการ', type: 'text' },
  { name: 'amount', label: 'จำนวนเงิน (บาท) — ใส่ 0 เพื่อแสดง "-"', type: 'number' },
]

export default function Decisions() {
  const { rows: items, insert, update, remove } = useTable('decision_items')
  const { settings, update: updateSetting } = useSettings()
  const [modal, setModal] = useState(null)
  const [editingTitle, setEditingTitle] = useState(false)

  const decisionTotal = items
    .filter((i) => Number(i.amount) > 0)
    .reduce((s, i) => s + Number(i.amount), 0)

  // group consecutive items that share a group_name, in sort_order
  const groups = []
  for (const it of items) {
    const last = groups[groups.length - 1]
    if (last && last.group_name === it.group_name) last.items.push(it)
    else groups.push({ group_name: it.group_name, items: [it] })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[#9E1A1A] text-white px-3 py-2 font-semibold text-sm flex items-center justify-between group">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-stamp" />
          <span>เรื่องที่ต้องการตัดสินใจ</span>
        </span>
        <AddButton onClick={() => setModal('add')} />
      </div>
      <div className="p-3 text-xs sm:text-sm">
        <div className="text-center pb-2 border-b border-slate-100 mb-2">
          <div className="text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5 group">
            {settings.decision_title}
            <EditButton onClick={() => setEditingTitle(true)} />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#9E1A1A] mt-0.5">
            {fmt(decisionTotal)} <span className="text-xs font-normal text-slate-500">บาท</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-xs text-slate-700 pr-1">
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.group_name && (
                <div className="flex justify-between items-center mt-1">
                  <span className="font-bold text-slate-700">{g.group_name}</span>
                </div>
              )}
              {g.items.map((it) => (
                <div key={it.id} className="flex justify-between items-center group">
                  <span className="text-slate-600">• {it.label}</span>
                  <span className="font-semibold shrink-0 ml-2 flex items-center gap-1.5">
                    {!it.amount || it.amount === 0 ? '-' : fmt(it.amount)}
                    <EditButton onClick={() => setModal(it)} />
                    <DeleteButton onClick={() => remove(it.id)} />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 text-center font-semibold text-xs">
          <button className="bg-[#217346] hover:bg-emerald-800 text-white py-1.5 px-1 rounded flex items-center justify-center gap-1 transition shadow-sm">
            <i className="fa-solid fa-check-circle" /> อนุมัติ
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-white py-1.5 px-1 rounded flex items-center justify-center gap-1 transition shadow-sm">
            <i className="fa-solid fa-pause-circle" /> ชะลอ
          </button>
          <button className="bg-slate-500 hover:bg-slate-600 text-white py-1.5 px-1 rounded flex items-center justify-center gap-1 transition shadow-sm">
            <i className="fa-solid fa-arrow-right" /> ติดตาม
          </button>
        </div>
      </div>

      {modal && (
        <EditModal
          title={modal === 'add' ? 'เพิ่มรายการตัดสินใจ' : 'แก้ไขรายการ'}
          fields={FIELDS}
          initialValues={modal === 'add' ? { amount: 0 } : modal}
          onSubmit={async (v) => {
            const payload = { ...v, amount: Number(v.amount) || 0 }
            if (modal === 'add') {
              await insert({ ...payload, sort_order: items.length })
            } else {
              await update(modal.id, payload)
            }
          }}
          onClose={() => setModal(null)}
        />
      )}

      {editingTitle && (
        <EditModal
          title="แก้ไขหัวข้อการตัดสินใจ"
          fields={[{ name: 'decision_title', label: 'หัวข้อ', type: 'text' }]}
          initialValues={{ decision_title: settings.decision_title || '' }}
          onSubmit={async (v) => updateSetting('decision_title', v.decision_title)}
          onClose={() => setEditingTitle(false)}
        />
      )}
    </div>
  )
}
