import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import EditModal from './EditModal'
import { EditButton } from './CardIconButtons'

function getThaiDateToday() {
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ]
  const now = new Date()
  const buddhistYear = now.getFullYear() + 543
  return `${now.getDate()} ${months[now.getMonth()]} ${buddhistYear}`
}

export default function Header() {
  const { settings, update } = useSettings()
  const [editing, setEditing] = useState(false)

  return (
    <header className="bg-[#0B1E36] text-white px-4 py-2.5 flex flex-col md:flex-row justify-between items-center gap-2 border-b-4 border-[#061223] flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">CEO DAILY DASHBOARD</h1>
      </div>
      <div className="text-sky-300 text-xs sm:text-sm font-light text-center flex items-center gap-2 group">
        {settings.motto}
        <EditButton onClick={() => setEditing(true)} />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-[#162D4A] px-3 py-1 rounded-md border border-slate-600/50 flex items-center gap-2 text-sm font-semibold">
          <i className="fa-regular fa-calendar-days text-sky-400" />
          <span>{getThaiDateToday()}</span>
        </div>
        <Link
          to="/weekly-plan"
          className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-table-cells" /> Weekly Plan
        </Link>
      </div>

      {editing && (
        <EditModal
          title="แก้ไข Motto"
          fields={[{ name: 'motto', label: 'ข้อความ Motto', type: 'textarea' }]}
          initialValues={{ motto: settings.motto || '' }}
          onSubmit={async (v) => update('motto', v.motto)}
          onClose={() => setEditing(false)}
        />
      )}
    </header>
  )
}
