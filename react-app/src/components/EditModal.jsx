import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Generic add/edit form modal.
 *
 * Rendered via a portal directly into document.body so it always sits on
 * top of the whole page and is never affected by any ancestor's CSS
 * (transform / overflow / filter, etc. from the dashboard card).
 *
 * fields: [{ name, label, type: 'text'|'textarea'|'number'|'select'|'checkbox', options?, placeholder? }]
 */
export default function EditModal({ title, fields, initialValues = {}, onSubmit, onClose }) {
  const [values, setValues] = useState(() => {
    const v = {}
    for (const f of fields) v[f.name] = initialValues[f.name] ?? (f.type === 'checkbox' ? false : '')
    return v
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  function setField(name, val) {
    setValues((v) => ({ ...v, [name]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setErr(null)
    try {
      await onSubmit(values)
      onClose()
    } catch (e2) {
      setErr(e2.message || 'บันทึกไม่สำเร็จ')
    } finally {
      setSaving(false)
    }
  }

  return createPortal(
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal-box" onSubmit={handleSubmit}>
        <div className="modal-header">
          <span>{title}</span>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="ปิด">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">
          {fields.map((f) => (
            <label key={f.name} className="modal-field">
              {f.type !== 'checkbox' && <span className="modal-field-label">{f.label}</span>}
              {f.type === 'textarea' && (
                <textarea
                  className="modal-input"
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              )}
              {f.type === 'select' && (
                <select
                  className="modal-input"
                  value={values[f.name]}
                  onChange={(e) => setField(f.name, e.target.value)}
                >
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {f.type === 'checkbox' && (
                <span className="modal-checkbox-row">
                  <input
                    type="checkbox"
                    checked={!!values[f.name]}
                    onChange={(e) => setField(f.name, e.target.checked)}
                  />
                  {f.label}
                </span>
              )}
              {(f.type === 'text' || f.type === 'number' || !f.type) && (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  step={f.type === 'number' ? 'any' : undefined}
                  className="modal-input"
                  value={values[f.name]}
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setField(f.name, f.type === 'number' ? e.target.value : e.target.value)
                  }
                />
              )}
            </label>
          ))}
          {err && <div className="modal-error">{err}</div>}
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="modal-btn modal-btn-cancel">
            ยกเลิก
          </button>
          <button type="submit" disabled={saving} className="modal-btn modal-btn-save">
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}
