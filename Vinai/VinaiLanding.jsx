import { useState, useEffect } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #f5f0eb;
    --text: #1a1a1a;
    --accent: #c1593a;
    --accent-hover: #a84830;
    --muted: #6b6560;
    --card-bg: #ffffff;
    --border: #e0d9d1;
    --sidebar-active: #c1593a;
    --purple: #4a4adb;
  }

  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }

  .page { min-height: 100vh; background: var(--bg); overflow: hidden; }

  /* NAV */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 60px;
    position: relative;
    z-index: 10;
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
  }

  .nav-links {
    display: flex;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    text-decoration: none;
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 400;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--accent); }

  /* HERO */
  .hero {
    text-align: center;
    padding: 80px 20px 0;
    position: relative;
  }

  .hero-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -1.5px;
    max-width: 860px;
    margin: 0 auto 24px;
    color: var(--text);
  }

  .hero-sub {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 500px;
    margin: 0 auto 40px;
    line-height: 1.65;
    font-weight: 300;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    margin-bottom: 64px;
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 16px 30px;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    letter-spacing: 0.01em;
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  .btn-ghost {
    background: none;
    border: none;
    font-size: 0.95rem;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    color: var(--text);
    transition: color 0.2s;
  }

  .btn-ghost:hover { color: var(--accent); }

  /* DASHBOARD MOCKUP */
  .mockup-wrapper {
    margin: 0 auto;
    max-width: 900px;
    padding: 0 40px;
    position: relative;
  }

  .mockup-outer {
    background: #ede8e2;
    border-radius: 18px 18px 0 0;
    padding: 28px 28px 0;
    box-shadow: 0 -4px 40px rgba(0,0,0,0.06);
  }

  .mockup-inner {
    background: var(--card-bg);
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    display: flex;
    min-height: 320px;
  }

  /* SIDEBAR */
  .sidebar {
    width: 180px;
    background: var(--card-bg);
    border-right: 1px solid var(--border);
    padding: 24px 16px;
    flex-shrink: 0;
  }

  .sidebar-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 24px;
    padding-left: 4px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 0.82rem;
    color: var(--muted);
    cursor: pointer;
    margin-bottom: 4px;
    transition: all 0.15s;
  }

  .sidebar-item.active {
    background: var(--sidebar-active);
    color: #fff;
  }

  .sidebar-item:not(.active):hover {
    background: #f0ebe4;
    color: var(--text);
  }

  .sidebar-icon { font-size: 0.9rem; }

  /* MAIN CONTENT */
  .dash-main {
    flex: 1;
    padding: 24px 28px;
    background: #fafaf8;
  }

  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .dash-title {
    font-size: 1.05rem;
    font-weight: 500;
  }

  .dash-icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notif-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    position: relative;
    cursor: pointer;
  }

  .notif-dot::after {
    content: '';
    width: 7px;
    height: 7px;
    background: var(--accent);
    border-radius: 50%;
    position: absolute;
    top: 3px;
    right: 3px;
    border: 1.5px solid #fafaf8;
  }

  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
  }

  /* DATE NAV */
  .date-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .date-label { font-size: 0.9rem; font-weight: 500; }

  .date-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.78rem;
    background: var(--card-bg);
  }

  .date-arrow {
    cursor: pointer;
    color: var(--muted);
    font-size: 0.7rem;
  }

  /* TASK */
  .task-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border);
    margin-bottom: 8px;
  }

  .task-checkbox {
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--border);
    border-radius: 4px;
    flex-shrink: 0;
  }

  .task-text { font-size: 0.82rem; color: var(--text); }
  .task-time { font-size: 0.74rem; color: var(--muted); margin-top: 2px; }

  /* ENERGY PANEL */
  .energy-panel {
    width: 200px;
    border-left: 1px solid var(--border);
    padding: 24px 18px;
    background: var(--card-bg);
    flex-shrink: 0;
  }

  .energy-title { font-size: 0.82rem; font-weight: 500; margin-bottom: 4px; }
  .energy-eg { font-size: 0.72rem; color: var(--muted); margin-bottom: 14px; }

  .toggle-bar {
    background: #e8e3fd;
    border-radius: 20px;
    height: 22px;
    width: 44px;
    position: relative;
    margin-bottom: 14px;
  }

  .toggle-knob {
    width: 18px;
    height: 18px;
    background: var(--purple);
    border-radius: 50%;
    position: absolute;
    right: 2px;
    top: 2px;
    transition: right 0.2s;
  }

  .energy-cards {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .energy-card {
    flex: 1;
    min-width: 70px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 8px;
    text-align: center;
    font-size: 0.72rem;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .energy-card.active {
    background: var(--purple);
    color: #fff;
    border-color: var(--purple);
  }

  .energy-card:not(.active):hover {
    background: #f0ebe4;
    color: var(--text);
  }

  .energy-icon { font-size: 1.1rem; margin-bottom: 4px; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-headline { animation: fadeUp 0.7s ease both; }
  .hero-sub      { animation: fadeUp 0.7s 0.15s ease both; }
  .hero-actions  { animation: fadeUp 0.7s 0.28s ease both; }
  .mockup-wrapper { animation: fadeUp 0.8s 0.4s ease both; }

  @media (max-width: 700px) {
    nav { padding: 20px 24px; }
    .energy-panel { display: none; }
    .sidebar { width: 140px; }
  }
`

export default function App() {
  const [activeEnergy, setActiveEnergy] = useState('deep')
  const [backendMessage, setBackendMessage] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(r => r.json())
      .then(d => setBackendMessage(d.message))
      .catch(() => {})
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* NAV */}
        <nav>
          <div className="logo">Vinai</div>
          <ul className="nav-links">
            <li><a href="#">Features</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="hero">
          <h1 className="hero-headline">
            Vinai: The task manager that respects<br />
            your energy, environment, and lifestyle.
          </h1>
          <p className="hero-sub">
            Built for focus and balance. Effortlessly organize your workday
            and protect your personal time.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started – It's Free</button>
            <button className="btn-ghost">Learn More</button>
          </div>

          {/* DASHBOARD MOCKUP */}
          <div className="mockup-wrapper">
            <div className="mockup-outer">
              <div className="mockup-inner">
                {/* Sidebar */}
                <div className="sidebar">
                  <div className="sidebar-logo">Vinai</div>
                  {[
                    { icon: '⊞', label: 'Home', active: true },
                    { icon: '📅', label: 'Today' },
                    { icon: '🕐', label: 'Resource' },
                  ].map(({ icon, label, active }) => (
                    <div key={label} className={`sidebar-item${active ? ' active' : ''}`}>
                      <span className="sidebar-icon">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>

                {/* Main */}
                <div className="dash-main">
                  <div className="dash-header">
                    <span className="dash-title">Calm Dashboard</span>
                    <div className="dash-icons">
                      <div className="notif-dot">🔔</div>
                      <div className="avatar" />
                    </div>
                  </div>

                  <div className="date-nav">
                    <span className="date-label">Today</span>
                    <div className="date-controls">
                      <span className="date-arrow">‹</span>
                      <span>Today</span>
                      <span className="date-arrow">›</span>
                    </div>
                  </div>

                  {[
                    { text: 'Book a salary report', time: 'Today · 11 am' },
                  ].map(({ text, time }) => (
                    <div key={text} className="task-item">
                      <div className="task-checkbox" />
                      <div>
                        <div className="task-text">{text}</div>
                        <div className="task-time">{time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Energy Panel */}
                <div className="energy-panel">
                  <div className="energy-title">Energy level toggle</div>
                  <div className="energy-eg">e.g.</div>
                  <div className="toggle-bar">
                    <div className="toggle-knob" />
                  </div>
                  <div className="energy-cards">
                    <div
                      className={`energy-card${activeEnergy === 'low' ? ' active' : ''}`}
                      onClick={() => setActiveEnergy('low')}
                    >
                      <div className="energy-icon">☀️</div>
                      Low Energy Focus
                    </div>
                    <div
                      className={`energy-card${activeEnergy === 'deep' ? ' active' : ''}`}
                      onClick={() => setActiveEnergy('deep')}
                    >
                      <div className="energy-icon">🎯</div>
                      Deep Focus
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backend status (hidden unless connected) */}
        {backendMessage && (
          <div style={{ textAlign: 'center', padding: '12px', fontSize: '0.8rem', color: '#6b6560' }}>
            {backendMessage}
          </div>
        )}
      </div>
    </>
  )
}
