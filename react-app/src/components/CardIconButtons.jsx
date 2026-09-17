// Small icon buttons used inside card headers / rows for CRUD actions.

export function AddButton({ onClick, title = 'เพิ่มรายการ' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="card-edit-btn w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-[10px]"
    >
      <i className="fa-solid fa-plus" />
    </button>
  )
}

export function EditButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="แก้ไข"
      className="card-edit-btn text-slate-400 hover:text-slate-700 text-[11px]"
    >
      <i className="fa-solid fa-pen" />
    </button>
  )
}

export function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="ลบ"
      className="card-edit-btn text-slate-300 hover:text-red-600 text-[11px]"
    >
      <i className="fa-solid fa-trash" />
    </button>
  )
}
