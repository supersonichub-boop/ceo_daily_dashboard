import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import WeeklyPlanPage from './pages/WeeklyPlanPage'
import { isSupabaseConfigured } from './lib/supabaseClient'

function ConfigError() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B1E36',
        color: 'white',
        fontFamily: 'Prompt, sans-serif',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>ยังไม่ได้ตั้งค่า Supabase</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
          ไม่พบไฟล์ <code>.env</code> หรือค่าที่ตั้งไว้ไม่ครบ (<code>VITE_SUPABASE_URL</code>,{' '}
          <code>VITE_SUPABASE_ANON_KEY</code>)
          <br />
          <br />
          สร้างไฟล์ <code>.env</code> ในโฟลเดอร์นี้ (ดูตัวอย่างที่ <code>.env.example</code>) ใส่ URL และ
          anon/publishable key ของ Supabase project ให้ครบ แล้วรีสตาร์ท <code>npm run dev</code> ใหม่
        </p>
      </div>
    </div>
  )
}

export default function App() {
  if (!isSupabaseConfigured) return <ConfigError />

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/weekly-plan" element={<WeeklyPlanPage />} />
    </Routes>
  )
}
