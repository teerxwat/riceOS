import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../../auth/authContext.js'
import { verify, CREDENTIALS } from './credentials.js'
import '../roles/roles.css'

export default function LoginPage() {
  const { user, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // ล็อกอินอยู่แล้ว -> ไปหน้าบทบาท
  if (user) return <Navigate to="/app" replace />

  const submit = (e) => {
    e.preventDefault()
    const match = verify(username, password)
    if (!match) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      return
    }
    login(match.role, username.trim())
    navigate('/app')
  }

  return (
    <div className="login-page">
      <div className="login-card login-card--form">
        <h1>เข้าสู่ระบบ riceOS</h1>
        <p className="login-sub">กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าใช้งาน</p>

        <form onSubmit={submit}>
          <label className="login-field">
            <span>ชื่อผู้ใช้</span>
            <input
              className="login-input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="เช่น villager"
            />
          </label>

          <label className="login-field">
            <span>รหัสผ่าน</span>
            <input
              className="login-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" type="submit">
            <LogIn size={18} /> เข้าสู่ระบบ
          </button>
        </form>

        <div className="login-hint">
          <b>บัญชีทดสอบ · รหัสผ่านทุกบัญชี: rice1234</b>
          <ul>
            {CREDENTIALS.map((c) => (
              <li key={c.username}>{c.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
