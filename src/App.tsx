import { useEffect, useRef, useState } from 'react'

/* ─── Types ─── */
interface FilterState {
  [key: string]: Set<string>
}

interface MatchData {
  game?: string
  rank?: string
  size?: string
  style?: string
  lang?: string
  mic?: string
  time?: string
  age?: string
}

/* ─── Navbar ─── */
function Navbar({
  onOpenMatch,
  onOpenLogin,
  onOpenRegister,
}: {
  onOpenMatch: () => void
  onOpenLogin: () => void
  onOpenRegister: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a href="#" className="nav-logo">
          <div className="logo-icon">⬡</div>
          SQUAD<span>X</span>
        </a>

        {/* Desktop: sol linkler */}
        <ul className="nav-links nav-links-left nav-desktop-only">
          <li><a href="#">Kesfet</a></li>
          <li><a href="#">Oyunlar</a></li>
        </ul>

        {/* Desktop: eşleş butonu */}
        <button className="nav-esles-btn nav-desktop-only" onClick={onOpenMatch}>
          <span className="nav-esles-pulse"></span>
          <span className="nav-esles-icon">⚡</span>
          <span className="nav-esles-text">ESLES</span>
          <span className="nav-esles-count">2.347</span>
        </button>

        {/* Desktop: sağ linkler */}
        <ul className="nav-links nav-links-right nav-desktop-only">
          <li><a href="#">Liderlik</a></li>
          <li><a href="#">Topluluk</a></li>
        </ul>

        {/* Desktop: aksiyonlar */}
        <div className="nav-actions nav-desktop-only">
          <div className="nav-ping" title="2.347 cevrimici"></div>
          <button className="btn-ghost" onClick={onOpenLogin}>Giris Yap</button>
          <button className="btn-primary" onClick={onOpenRegister}>Kaydol</button>
        </div>

        {/* Mobil: sağ taraf */}
        <div className="nav-mobile-right">
          <div className="nav-ping"></div>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menüyü aç/kapat"
          >
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobil menü overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={close}></div>
      )}

      {/* Mobil menü drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <a href="#" className="nav-logo" onClick={close}>
            <div className="logo-icon">⬡</div>
            SQUAD<span>X</span>
          </a>
          <button className="mobile-menu-close" onClick={close}>✕</button>
        </div>

        <div className="mobile-menu-body">
          <button className="nav-esles-btn mobile-esles" onClick={() => { onOpenMatch(); close() }}>
            <span className="nav-esles-pulse"></span>
            <span className="nav-esles-icon">⚡</span>
            <span className="nav-esles-text">ESLES</span>
            <span className="nav-esles-count">2.347</span>
          </button>

          <ul className="mobile-nav-links">
            <li><a href="#" onClick={close}>Kesfet</a></li>
            <li><a href="#" onClick={close}>Oyunlar</a></li>
            <li><a href="#" onClick={close}>Liderlik</a></li>
            <li><a href="#" onClick={close}>Topluluk</a></li>
          </ul>

          <div className="mobile-auth-btns">
            <button className="btn-ghost" style={{ width: '100%' }} onClick={() => { onOpenLogin(); close() }}>Giris Yap</button>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { onOpenRegister(); close() }}>Kaydol</button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Hero Slider ─── */
function HeroSlider({ onOpenMatch }: { onOpenMatch: () => void }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef(0)

  const goTo = (idx: number) => {
    const next = ((idx % 3) + 3) % 3
    setCurrent(next)
    if (progressRef.current) {
      progressRef.current.style.animation = 'none'
      void progressRef.current.offsetWidth
      progressRef.current.style.animation = 'progress-bar 5s linear infinite'
    }
  }

  const resetAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % 3), 5000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % 3), 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${current * 100}%)`
    }
  }, [current])

  return (
    <div className="slider-wrapper">
      <div
        className="slides"
        ref={slidesRef}
        onTouchStart={e => { touchStartRef.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const diff = touchStartRef.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto() }
        }}
      >
        {/* Slide 1 */}
        <div className={`slide slide-1${current === 0 ? ' active' : ''}`}>
          <div className="slide-bg"></div>
          <div className="slide-overlay"></div>
          <div className="slide-deco">
            <div className="hex hex-1"></div>
            <div className="hex hex-2"></div>
            <div className="hex hex-3"></div>
          </div>
          <div className="slide-number-deco">01</div>
          <div className="slide-content">
            <div className="slide-tag"><span className="dot"></span> Anlık Eşleşme Aktif</div>
            <h1 className="slide-title">SAVAŞA<br /><span className="accent-cyan">HAZIR</span> MISIN</h1>
            <p className="slide-desc">Saniyeler içinde sana uygun takım arkadaşlarını bul. Seviye, bölge ve oyun tarzına göre akıllı eşleştirme.</p>
            <div className="slide-cta">
              <button className="cta-main" onClick={onOpenMatch}>⚡ Squad Bul</button>
              <button className="cta-secondary">▶ Nasıl Çalışır</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`slide slide-2${current === 1 ? ' active' : ''}`}>
          <div className="slide-bg"></div>
          <div className="slide-overlay"></div>
          <div className="slide-deco">
            <div className="hex hex-1"></div>
            <div className="hex hex-2"></div>
            <div className="hex hex-3"></div>
          </div>
          <div className="slide-number-deco">02</div>
          <div className="slide-content">
            <div className="slide-tag" style={{ color: 'var(--pink)', background: 'rgba(255,0,144,0.1)', borderColor: 'rgba(255,0,144,0.3)' }}>
              <span className="dot" style={{ background: 'var(--pink)', boxShadow: '0 0 6px var(--pink)' }}></span> Akilli Eslestirme
            </div>
            <h1 className="slide-title">SANA OZEL<br /><span className="accent-pink">KADRO</span></h1>
            <p className="slide-desc">Rank, dil, oyun saati ve oyun tarzina gore AI destekli eslestirme. Hicbir yabanci, sadece takim arkadasi.</p>
            <div className="slide-cta">
              <button className="cta-main" style={{ background: 'var(--pink)', boxShadow: '0 0 30px rgba(255,0,144,0.5)' }} onClick={onOpenMatch}>⚡ Hemen Esles</button>
              <button className="cta-secondary">Nasil Calisir</button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`slide slide-3${current === 2 ? ' active' : ''}`}>
          <div className="slide-bg"></div>
          <div className="slide-overlay"></div>
          <div className="slide-deco">
            <div className="hex hex-1"></div>
            <div className="hex hex-2"></div>
            <div className="hex hex-3"></div>
          </div>
          <div className="slide-number-deco">03</div>
          <div className="slide-content">
            <div className="slide-tag" style={{ color: 'var(--green)', background: 'rgba(0,255,135,0.1)', borderColor: 'rgba(0,255,135,0.3)' }}>
              <span className="dot" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }}></span> Topluluk Canlı
            </div>
            <h1 className="slide-title">TOPLULUK<br /><span className="accent-green">GÜCÜ</span></h1>
            <p className="slide-desc">50,000+ aktif oyuncuya katıl. Discord entegrasyonu, klan sistemi ve gerçek zamanlı sesli iletişim.</p>
            <div className="slide-cta">
              <button className="cta-main" style={{ background: 'var(--green)', boxShadow: '0 0 30px rgba(0,255,135,0.5)' }}>🌐 Topluluğa Gir</button>
              <button className="cta-secondary">Klan Kur</button>
            </div>
          </div>
        </div>
      </div>

      <button className="slider-arrow prev" onClick={() => { goTo(current - 1); resetAuto() }} aria-label="Önceki">←</button>
      <button className="slider-arrow next" onClick={() => { goTo(current + 1); resetAuto() }} aria-label="Sonraki">→</button>

      <div className="slider-dots">
        {[0, 1, 2].map(i => (
          <div key={i} className={`dot${current === i ? ' active' : ''}`} onClick={() => { goTo(i); resetAuto() }}></div>
        ))}
      </div>

      <div className="slider-progress" ref={progressRef}></div>
    </div>
  )
}

/* ─── Hero Below ─── */
function HeroBelow({ onOpenMatch, onOpenFilter }: { onOpenMatch: () => void; onOpenFilter: () => void }) {
  const [countersStarted, setCountersStarted] = useState(false)
  const [c1, setC1] = useState(0)
  const [c2, setC2] = useState(0)
  const [c3, setC3] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        setCountersStarted(true)
        animateCounter(setC1, 52400)
        animateCounter(setC2, 18700)
        animateCounter(setC3, 128)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (barRef.current) obs.observe(barRef.current)
    return () => obs.disconnect()
  }, [countersStarted])

  function animateCounter(setter: (v: number) => void, target: number) {
    let start = 0
    const step = target / 80
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setter(target); clearInterval(timer); return }
      setter(Math.floor(start))
    }, 18)
  }

  return (
    <section className="hero-below">
      <div className="hero-headline-bar" ref={barRef}>
        <h2 className="hero-main-title">
          OYUN OYNA <span className="slash">/</span>
          <span className="line2">YALNIZ KALMA</span>
        </h2>
        <div className="hero-stats-inline">
          <div className="stat-item">
            <span className="stat-number">{c1.toLocaleString('tr-TR')}+</span>
            <span className="stat-label">Aktif Oyuncu</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{c2.toLocaleString('tr-TR')}+</span>
            <span className="stat-label">Eslestirme/Gun</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{c3}+</span>
            <span className="stat-label">Desteklenen Oyun</span>
          </div>
        </div>
      </div>

      <div className="hero-search-area">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Oyun, oyuncu adi veya klan ara..." />
        </div>
        <button className="filter-btn" onClick={onOpenFilter}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
          Filtrele
        </button>
        <button className="find-btn" onClick={onOpenMatch}>
          <span>⚡</span> Hizli Esles
        </button>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <div className="info-card-icon" style={{ background: 'rgba(255,59,59,0.18)', boxShadow: '0 0 16px rgba(255,59,59,0.4)' }}>🔔</div>
          <div className="info-card-text">
            <span className="label">Bildirim</span>
            <span className="value">Canli Alarm</span>
            <span className="live-badge"><span className="live-dot"></span>CANLI</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-icon icon-yellow">⚡</div>
          <div className="info-card-text">
            <span className="label">Hiz</span>
            <span className="value glow-cyan">Yuksek Tempo</span>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1px' }}>Ort. eslestirme: 12 sn</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-icon icon-green">🎮</div>
          <div className="info-card-text">
            <span className="label">Durum</span>
            <span className="value glow-green">Hazir Squad</span>
            <span style={{ fontSize: '11px', color: 'var(--green)', letterSpacing: '1px' }}>847 hazir ekip</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-icon icon-cyan">🛡</div>
          <div className="info-card-text">
            <span className="label">Guvenlik</span>
            <span className="value">Dogrulanmis</span>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1px' }}>Anti-troll sistemi aktif</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-icon icon-purple">👥</div>
          <div className="info-card-text">
            <span className="label">Topluluk</span>
            <span className="value">52.400+</span>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1px' }}>Kayitli oyuncu</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Games Section ─── */
const games = [
  { name: 'VALORANT', players: '12,847', genre: 'FPS', rank: '#1', bg: 'game-bg-1', deco: '⚔' },
  { name: 'PUBG', players: '9,321', genre: 'BR', rank: '#2', bg: 'game-bg-2', deco: '🌿' },
  { name: 'CS2', players: '8,650', genre: 'FPS', rank: '#3', bg: 'game-bg-3', deco: '🔥' },
  { name: 'LEAGUE OF LEGENDS', players: '7,200', genre: 'MOBA', rank: '#4', bg: 'game-bg-4', deco: '⚡' },
  { name: 'FORTNITE', players: '6,980', genre: 'BR', rank: '', bg: 'game-bg-5', deco: '💀' },
  { name: 'APEX LEGENDS', players: '5,140', genre: 'BR', rank: '', bg: 'game-bg-6', deco: '🚀' },
]

function GamesSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge badge-cyan">🎮 Popüler Oyunlar</span>
        <h3 className="section-title">Şu An En Çok Oynananlar</h3>
        <div className="section-line"></div>
        <span className="section-count">128 / OYUN</span>
      </div>
      <div className="games-grid">
        {games.map((g, i) => (
          <div className="game-card" key={i}>
            <div className={`game-bg ${g.bg}`}>
              <div className="game-deco">{g.deco}</div>
            </div>
            <div className="game-gradient"></div>
            <div className="game-overlay"></div>
            {g.rank && <div className="game-rank">{g.rank}</div>}
            <button className="game-join-btn">KATIL</button>
            <div className="game-info">
              <div className="game-name">{g.name}</div>
              <div className="game-meta">
                <span className="game-players">🟢 {g.players} çevrimiçi</span>
                <span className="game-genre-tag">{g.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Workflow Section ─── */
function WorkflowSection() {
  const steps = [
    { num: '01', icon: '🎮', title: 'Oyununu Seç', desc: "128'den fazla desteklenen oyun arasından kendine uygun olanı seç. Birden fazla seçim yapabilirsin." },
    { num: '02', icon: '⚙', title: 'Profilini Oluştur', desc: 'Rank, bölge, dil ve oyun saatini belirle. Akıllı algoritmamız sana en uygun oyuncuları getirir.' },
    { num: '03', icon: '⚡', title: 'Anında Eşleş', desc: 'Ortalama 12 saniyede takım arkadaşı bul. Gerçek zamanlı bildirimlerle hiçbir fırsatı kaçırma.' },
    { num: '04', icon: '🤝', title: 'Takim Kur & Yuksel', desc: 'Takim arkadaşlarınla sıralamalarda yuksel, klanını buyut, liderlik tablosunda adını tarihe yaz.' },
  ]
  return (
    <section className="section workflow-section">
      <div className="section-header">
        <span className="section-badge badge-purple">⚡ Workflow</span>
        <h3 className="section-title">4 Adımda Takımını Bul</h3>
        <div className="section-line"></div>
      </div>
      <div className="workflow-grid">
        {steps.map((s, i) => (
          <div className="workflow-step" key={i}>
            <span className="step-number">{s.num}</span>
            <div className="step-icon-wrap">{s.icon}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Players Section ─── */
const players = [
  { initials: 'NX', name: 'NeonX_Pro', rank: '★ Diamond', rankColor: 'var(--yellow)', game: 'Valorant', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '18+', color: 'var(--green)' }, { label: 'Mikrofon', color: 'var(--purple)' }], avatarBg: 'linear-gradient(135deg,rgba(0,245,255,0.2),rgba(0,245,255,0.05))', btnColor: 'var(--cyan)', btnBorder: 'rgba(0,245,255,0.4)' },
  { initials: 'VK', name: 'VoidKiller', rank: '◆ Platinum', rankColor: '#c0c0c0', game: 'CS2', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '16+', color: 'var(--pink)' }], avatarBg: 'linear-gradient(135deg,rgba(255,0,144,0.2),rgba(255,0,144,0.05))', btnColor: 'var(--pink)', btnBorder: 'rgba(255,0,144,0.4)' },
  { initials: 'SG', name: 'ShadowGrid', rank: '◈ Gold', rankColor: '#cd7f32', game: 'PUBG', tags: [{ label: 'EN', color: 'var(--green)' }, { label: '18+', color: 'var(--cyan)' }], avatarBg: 'linear-gradient(135deg,rgba(0,255,135,0.2),rgba(0,255,135,0.05))', btnColor: 'var(--green)', btnBorder: 'rgba(0,255,135,0.4)' },
  { initials: 'CY', name: 'CyberYuki', rank: '★ Challenger', rankColor: 'var(--yellow)', game: 'League of Legends', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: 'Mikrofon', color: 'var(--purple)' }], avatarBg: 'linear-gradient(135deg,rgba(180,0,255,0.2),rgba(180,0,255,0.05))', btnColor: 'var(--purple)', btnBorder: 'rgba(180,0,255,0.4)' },
  { initials: 'RZ', name: 'R4Z0R_TR', rank: '★ Master', rankColor: 'var(--yellow)', game: 'Apex Legends', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '21+', color: 'var(--yellow)' }], avatarBg: 'linear-gradient(135deg,rgba(255,224,0,0.2),rgba(255,224,0,0.05))', btnColor: 'var(--yellow)', btnBorder: 'rgba(255,224,0,0.4)' },
  { initials: 'GX', name: 'GhostX', rank: '◆ Silver', rankColor: '#c0c0c0', game: 'Fortnite', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '14+', color: 'var(--green)' }], avatarBg: 'linear-gradient(135deg,rgba(0,245,255,0.15),rgba(180,0,255,0.15))', btnColor: 'var(--cyan)', btnBorder: 'rgba(0,245,255,0.4)' },
]

function PlayersSection({ onOpenMatch }: { onOpenMatch: (game?: string) => void }) {
  return (
    <section className="section community-section">
      <div className="section-header">
        <span className="section-badge badge-green">🟢 Cevrimici Oyuncular</span>
        <h3 className="section-title">Simdi Eslesmeye Hazir</h3>
        <div className="section-line"></div>
        <span className="section-count" style={{ color: 'var(--green)', textShadow: '0 0 8px rgba(0,255,135,0.4)' }}>● 2.347 CANLI</span>
      </div>

      <div className="players-module-grid">
        <div className="player-cards-col">
          <div className="player-card-row">
            {players.map((p, i) => (
              <div className="player-card" key={i}>
                <div className="pc-header">
                  <div className="pc-avatar" style={{ background: p.avatarBg }}>{p.initials}</div>
                  <div className="pc-online-ring"></div>
                </div>
                <div className="pc-body">
                  <div className="pc-name">{p.name}</div>
                  <div className="pc-rank" style={{ color: p.rankColor }}>{p.rank}</div>
                  <div className="pc-game">{p.game}</div>
                  <div className="pc-tags">
                    {p.tags.map((t, j) => (
                      <span key={j} className="pc-tag" style={{ color: t.color }}>{t.label}</span>
                    ))}
                  </div>
                </div>
                <button
                  className="pc-invite-btn"
                  style={{ borderColor: p.btnBorder, color: p.btnColor }}
                  onClick={() => onOpenMatch(p.game)}
                >Davet Et</button>
              </div>
            ))}
          </div>
        </div>

        <div className="module-side">
          <div className="side-widget">
            <div className="widget-title">Anlik Istatistikler</div>
            <div className="mini-stats-grid">
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--cyan)' }}>2.347</div><div className="mini-stat-label">Cevrimici</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--green)' }}>847</div><div className="mini-stat-label">Hazir Squad</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--purple)' }}>128</div><div className="mini-stat-label">Aktif Oyun</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--yellow)' }}>12sn</div><div className="mini-stat-label">Ort. Eslestirme</div></div>
            </div>
          </div>

          <div className="side-widget">
            <div className="widget-title">En Cok Eslesen</div>
            <div className="leaderboard-list">
              {[
                { rank: '#1', cls: 'gold', name: 'NeonX_Pro', score: '342 eslesme' },
                { rank: '#2', cls: 'silver', name: 'CyberYuki', score: '298 eslesme' },
                { rank: '#3', cls: 'bronze', name: 'R4Z0R_TR', score: '261 eslesme' },
                { rank: '#4', cls: '', name: 'GhostByte', score: '203 eslesme' },
                { rank: '#5', cls: '', name: 'StormBreaker', score: '187 eslesme' },
              ].map((lb, i) => (
                <div className="lb-item" key={i}>
                  <div className={`lb-rank${lb.cls ? ' ' + lb.cls : ''}`}>{lb.rank}</div>
                  <div className="lb-name">{lb.name}</div>
                  <div className="lb-score">{lb.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-cta-card">
            <div className="side-cta-glow"></div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>TAKIM ARIYORUM</div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.5 }}>Tercihlerini belirle, sana en uygun takimi saniyeler icinde bulalim.</p>
            <button className="cta-main" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }} onClick={() => onOpenMatch()}>⚡ Simdi Esles</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-text">SQUADX</div>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="nav-logo">
            <div className="logo-icon">⬡</div>
            SQUAD<span>X</span>
          </a>
          <p className="footer-tagline">Türkiye'nin en büyük oyuncu topluluğunda takım arkadaşını bul, sıra dışı deneyimler yaşa, efsane ol.</p>
          <div className="social-links">
            <a href="#" className="social-link ig" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
            </a>
            <a href="#" className="social-link yt" title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" className="social-link x-tw" title="X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" className="social-link fb" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" className="social-link tw" title="Twitch">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2H3v16h5v4l4-4h5l4-4V2z" /><line x1="11" y1="7" x2="11" y2="11" /><line x1="16" y1="7" x2="16" y2="11" /></svg>
            </a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <ul className="footer-links">
            <li><a href="#">Squad Bul</a></li>
            <li><a href="#">Turnuvalar</a></li>
            <li><a href="#">Klan Sistemi</a></li>
            <li><a href="#">Liderlik Tablosu</a></li>
            <li><a href="#">Anlık Bildirimler</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Oyunlar</div>
          <ul className="footer-links">
            <li><a href="#">Valorant</a></li>
            <li><a href="#">CS2</a></li>
            <li><a href="#">League of Legends</a></li>
            <li><a href="#">PUBG</a></li>
            <li><a href="#">Tüm Oyunlar →</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Destek</div>
          <ul className="footer-links">
            <li><a href="#">Yardım Merkezi</a></li>
            <li><a href="#">Topluluk Kuralları</a></li>
            <li><a href="#">Güvenli Oyun</a></li>
            <li><a href="#">İletişim</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 SQUADX. TÜM HAKLAR SAKLIDIR.</div>
        <div className="footer-legal">
          <a href="#">Gizlilik Politikası</a>
          <a href="#">Kullanım Koşulları</a>
          <a href="#">Çerez Politikası</a>
        </div>
        <div className="footer-status">
          <div className="nav-ping"></div>
          TÜM SİSTEMLER AKTİF
        </div>
      </div>
    </footer>
  )
}

/* ─── Filter Panel ─── */
const filterGroups = [
  { label: 'Oyun Adi', key: 'game', chips: ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Apex Legends', 'Fortnite', 'Overwatch 2', 'Dota 2', 'Minecraft', 'GTA Online'] },
  { label: 'Oyun Turu', key: 'genre', chips: ['FPS', 'Battle Royale', 'MOBA', 'RPG', 'Strateji', 'Spor', 'Sandbox'] },
  { label: 'Oyuncu Dili', key: 'lang', chips: ['🇹🇷 Turkce', '🇬🇧 English', '🇩🇪 Deutsch', '🇪🇸 Espanol', '🇫🇷 Francais', '🇷🇺 Russca'] },
  { label: 'Oyun Stili', key: 'style', chips: ['Rekabetci', 'Eglenceli', 'Stratejik', 'Agresif', 'Rahat'] },
  { label: 'Ekip Boyutu', key: 'size', chips: ['Solo (1)', 'Duo (2)', 'Trio (3)', 'Squad (4+)'] },
  { label: 'Mikrofon', key: 'mic', chips: ['Zorunlu', 'Tercih Edilir', 'Farketmez'] },
]

function FilterPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [filters, setFilters] = useState<FilterState>({})

  const toggle = (key: string, val: string) => {
    setFilters(prev => {
      const next = { ...prev }
      if (!next[key]) next[key] = new Set()
      else next[key] = new Set(next[key])
      if (next[key].has(val)) next[key].delete(val)
      else next[key].add(val)
      return next
    })
  }

  const clear = () => setFilters({})

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className={`filter-panel-overlay${open ? ' open' : ''}`} onClick={onClose}></div>
      <div className={`filter-panel${open ? ' open' : ''}`}>
        <div className="fp-header">
          <div className="fp-title">▼ FILTRELEME SECENEKLERI</div>
          <button className="fp-close" onClick={onClose}>✕</button>
        </div>
        <div className="fp-body">
          {filterGroups.map(g => (
            <div className="fp-group" key={g.key}>
              <div className="fp-group-label">{g.label}</div>
              <div className="fp-chips">
                {g.chips.map(chip => (
                  <button
                    key={chip}
                    className={`fp-chip${filters[g.key]?.has(chip) ? ' selected' : ''}`}
                    onClick={() => toggle(g.key, chip)}
                  >{chip}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="fp-footer">
          <button className="fp-clear-btn" onClick={clear}>Temizle</button>
          <button className="fp-apply-btn" onClick={onClose}>Filtreleri Uygula</button>
        </div>
      </div>
    </>
  )
}

/* ─── Match Modal ─── */
const mmGames = ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Apex Legends', 'Fortnite', 'Overwatch 2', 'Dota 2']
const mmRanks = ['Yeni Basliyor', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master+']
const mmSizes = ['Duo (2 kisi)', 'Trio (3 kisi)', 'Tam Squad (4+)']
const mmStyles = ['🏆 Rekabetci', '😄 Rahat', '🧠 Stratejik', '🔥 Agresif']
const mmLangs = ['🇹🇷 Turkce', '🇬🇧 English', 'Fark etmez']
const mmMics = ['🎤 Zorunlu', 'Tercih Edilir', 'Farketmez']
const mmTimes = ['🌅 Sabah (06-12)', '🌞 Ogle (12-18)', '🌇 Aksam (18-24)', '🌙 Gece (00-06)']
const mmAges = ['14–17', '18–21', '22–27', '28+', 'Fark etmez']

function MatchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<MatchData>({})
  const [searching, setSearching] = useState(false)
  const [found, setFound] = useState(false)
  const [timer, setTimer] = useState(0)

  const sel = (key: keyof MatchData, val: string) => setData(d => ({ ...d, [key]: val }))

  const reset = () => {
    setStep(1); setData({}); setSearching(false); setFound(false); setTimer(0)
  }

  const handleClose = () => { reset(); onClose() }

  const handleNext = () => {
    if (step < 3) { setStep(s => s + 1) }
    else {
      setSearching(true)
      let t = 0
      const iv = setInterval(() => {
        t++
        setTimer(t)
        if (t >= 4) { clearInterval(iv); setSearching(false); setFound(true) }
      }, 1000)
    }
  }

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button className={`mm-chip${active ? ' sel' : ''}`} onClick={onClick}>{label}</button>
  )

  return (
    <div className={`match-overlay${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="match-modal">
        <div className="mm-header">
          <div className="mm-header-left">
            <div className="mm-pretitle">Akilli Eslestirme Sistemi</div>
            <div className="mm-title">TAKIM ARA</div>
          </div>
          <button className="mm-close" onClick={handleClose}>✕</button>
        </div>

        <div className="mm-steps">
          {['Oyun', 'Tercihler', 'Profil'].map((label, i) => (
            <div key={i} className={`mm-step${step === i + 1 ? ' active' : ''}${step > i + 1 ? ' done' : ''}`}>
              <div className="mm-step-num">{i + 1}</div>
              <div className="mm-step-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="mm-body">
          {step === 1 && (
            <div className="mm-step-content active">
              <div className="mm-section">
                <div className="mm-section-title">Hangi oyunu oynuyorsun?</div>
                <div className="mm-chips">
                  {mmGames.map(g => <Chip key={g} label={g} active={data.game === g} onClick={() => sel('game', g)} />)}
                </div>
              </div>
              <div className="mm-section">
                <div className="mm-section-title">Rankın nedir?</div>
                <div className="mm-chips">
                  {mmRanks.map(r => <Chip key={r} label={r} active={data.rank === r} onClick={() => sel('rank', r)} />)}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="mm-step-content active">
              <div className="mm-section">
                <div className="mm-section-title">Ekip boyutu</div>
                <div className="mm-chips">{mmSizes.map(s => <Chip key={s} label={s} active={data.size === s} onClick={() => sel('size', s)} />)}</div>
              </div>
              <div className="mm-section">
                <div className="mm-section-title">Oyun stili</div>
                <div className="mm-chips">{mmStyles.map(s => <Chip key={s} label={s} active={data.style === s} onClick={() => sel('style', s)} />)}</div>
              </div>
              <div className="mm-section">
                <div className="mm-section-title">Dil</div>
                <div className="mm-chips">{mmLangs.map(l => <Chip key={l} label={l} active={data.lang === l} onClick={() => sel('lang', l)} />)}</div>
              </div>
              <div className="mm-section">
                <div className="mm-section-title">Mikrofon</div>
                <div className="mm-chips">{mmMics.map(m => <Chip key={m} label={m} active={data.mic === m} onClick={() => sel('mic', m)} />)}</div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="mm-step-content active">
              {!searching && !found && (
                <>
                  <div className="mm-section">
                    <div className="mm-section-title">Oyuncu adin</div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, fontSize: '15px' }}>👤</span>
                      <input type="text" className="form-input with-icon" placeholder="Oyuncu adinizi girin..." style={{ margin: 0 }} />
                    </div>
                  </div>
                  <div className="mm-section">
                    <div className="mm-section-title">Oyun saatlerin</div>
                    <div className="mm-chips">{mmTimes.map(t => <Chip key={t} label={t} active={data.time === t} onClick={() => sel('time', t)} />)}</div>
                  </div>
                  <div className="mm-section">
                    <div className="mm-section-title">Yas araligi</div>
                    <div className="mm-chips">{mmAges.map(a => <Chip key={a} label={a} active={data.age === a} onClick={() => sel('age', a)} />)}</div>
                  </div>
                </>
              )}
              {searching && (
                <div className="mm-searching active">
                  <div className="search-radar">
                    <div className="radar-ring"></div>
                    <div className="radar-ring"></div>
                    <div className="radar-ring"></div>
                    <div className="radar-ring"></div>
                    <div className="radar-center"></div>
                  </div>
                  <div className="searching-text">TAKIM ARANIYOR...</div>
                  <div className="searching-timer">{timer}sn</div>
                  <div className="searching-sub">Kriterlerinize uyan oyuncular taranıyor</div>
                </div>
              )}
              {found && (
                <div className="mm-found active">
                  <div className="found-icon">🤝</div>
                  <div className="found-title">TAKIM BULUNDU!</div>
                  <div className="found-players">
                    {[{ av: 'NX', nm: 'NeonX', rk: 'Diamond', bg: 'rgba(0,245,255,0.15)', color: 'var(--cyan)' }, { av: 'SG', nm: 'ShadowG', rk: 'Platinum', bg: 'rgba(180,0,255,0.15)', color: 'var(--purple)' }, { av: 'CY', nm: 'CyberY', rk: 'Gold', bg: 'rgba(0,255,135,0.12)', color: 'var(--green)' }].map((fp, i) => (
                      <div className="found-player" key={i}>
                        <div className="fp-av" style={{ background: fp.bg, color: fp.color }}>{fp.av}</div>
                        <div className="fp-nm">{fp.nm}</div>
                        <div className="fp-rk">{fp.rk}</div>
                      </div>
                    ))}
                  </div>
                  <button className="cta-main" style={{ fontSize: '11px' }}>🎮 Lobiye Katil</button>
                </div>
              )}
            </div>
          )}
        </div>

        {!searching && !found && (
          <div className="mm-footer">
            {step > 1 && <button className="mm-back-btn" onClick={() => setStep(s => s - 1)}>← Geri</button>}
            <button className="mm-next-btn" onClick={handleNext}>{step < 3 ? 'Devam Et →' : '⚡ Esles!'}</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Auth Modals ─── */
function RegisterModal({ open, onClose, onSwitchToLogin }: { open: boolean; onClose: () => void; onSwitchToLogin: () => void }) {
  const [passVal, setPassVal] = useState('')

  const getStrength = (val: string) => {
    let score = 0
    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++
    return score
  }

  const strengthConfigs = [
    { w: '0%', color: 'transparent', text: '', textColor: 'transparent' },
    { w: '25%', color: '#ff3b3b', text: 'ZAYIF', textColor: '#ff3b3b' },
    { w: '50%', color: '#ff8800', text: 'ORTA', textColor: '#ff8800' },
    { w: '75%', color: '#ffe000', text: 'IYI', textColor: '#ffe000' },
    { w: '100%', color: '#00ff87', text: 'GUCLU', textColor: '#00ff87' },
  ]

  const sc = strengthConfigs[getStrength(passVal)]

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`auth-overlay${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>✕</button>
        <div className="auth-left">
          <div className="auth-brand"><div className="logo-icon">⬡</div>SQUAD<span>X</span></div>
          <div className="auth-left-content">
            <div className="auth-left-tag"><span className="dot"></span> 52.400+ Aktif Oyuncu</div>
            <h2 className="auth-left-title">EFSANELER<br /><span className="accent-cyan">BURADAN</span><br />BASLAR</h2>
            <p className="auth-left-desc">Saniyeler icinde takım bul, turnuvalara katil, sıradışı deneyimler yaşa.</p>
            <div className="auth-perks">
              <div className="auth-perk"><span className="perk-icon icon-cyan">⚡</span><span>Aninda eslestirme — ort. 12 sn</span></div>
              <div className="auth-perk"><span className="perk-icon icon-green">🏆</span><span>Haftalik turnuvalar &amp; oduller</span></div>
              <div className="auth-perk"><span className="perk-icon icon-purple">🛡</span><span>Anti-troll dogrulanmis sistem</span></div>
            </div>
          </div>
          <div className="auth-left-deco">
            <div className="deco-ring ring1"></div>
            <div className="deco-ring ring2"></div>
            <div className="deco-ring ring3"></div>
            <div className="deco-num">01</div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-header">
            <h3 className="auth-form-title">Hesap Olustur</h3>
            <p className="auth-form-sub">Ucretsiz katil, hemen oynamaya basla</p>
          </div>
          <div className="social-auth-grid">
            <button className="social-auth-btn google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google ile Kaydol
            </button>
            <button className="social-auth-btn facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </button>
            <button className="social-auth-btn twitch">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
              Twitch
            </button>
          </div>
          <div className="auth-divider"><span>veya e-posta ile kaydol</span></div>
          <form className="auth-form" onSubmit={e => e.preventDefault()}>
            <div className="form-row two-col">
              <div className="form-group"><label className="form-label">Ad</label><input type="text" className="form-input" placeholder="Adın" /></div>
              <div className="form-group"><label className="form-label">Soyad</label><input type="text" className="form-input" placeholder="Soyadın" /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Oyuncu Adı (Tag)</label>
              <div className="input-icon-wrap"><span className="input-icon">🎮</span><input type="text" className="form-input with-icon" placeholder="NeonX_Pro" /></div>
            </div>
            <div className="form-group">
              <label className="form-label">E-posta</label>
              <div className="input-icon-wrap"><span className="input-icon">✉</span><input type="email" className="form-input with-icon" placeholder="oyuncu@mail.com" /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Sifre</label>
              <div className="input-icon-wrap">
                <span className="input-icon">🔒</span>
                <input type="password" className="form-input with-icon" placeholder="En az 8 karakter" value={passVal} onChange={e => setPassVal(e.target.value)} />
              </div>
              <div className="password-strength"><div className="strength-fill" style={{ width: sc.w, background: sc.color }}></div></div>
              <div className="strength-label" style={{ color: sc.textColor }}>{sc.text}</div>
            </div>
            <div className="form-check">
              <input type="checkbox" id="terms" className="check-input" />
              <label htmlFor="terms" className="check-label">Kullanım koşullarını ve gizlilik politikasını kabul ediyorum</label>
            </div>
            <button type="submit" className="auth-submit-btn"><span>⚡</span> Hesap Olustur</button>
          </form>
          <div className="auth-switch">
            Zaten hesabın var mı? <button className="auth-switch-btn" onClick={() => { onClose(); setTimeout(onSwitchToLogin, 200) }}>Giris Yap</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginModal({ open, onClose, onSwitchToRegister }: { open: boolean; onClose: () => void; onSwitchToRegister: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`auth-overlay${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>✕</button>
        <div className="auth-left login-left">
          <div className="auth-brand"><div className="logo-icon">⬡</div>SQUAD<span>X</span></div>
          <div className="auth-left-content">
            <div className="auth-left-tag" style={{ color: 'var(--purple)', background: 'var(--purple-dim)', borderColor: 'rgba(180,0,255,0.3)' }}>
              <span className="dot" style={{ background: 'var(--purple)', boxShadow: '0 0 6px var(--purple)' }}></span> Hosgeldin Geri
            </div>
            <h2 className="auth-left-title">TEKRAR<br /><span style={{ color: 'var(--purple)', textShadow: '0 0 40px var(--purple)' }}>SAHAYA</span><br />GIR</h2>
            <p className="auth-left-desc">Takımın seni bekliyor. Hemen giris yap ve oyuna dal.</p>
            <div className="auth-perks">
              <div className="auth-perk"><span className="perk-icon icon-cyan">🔄</span><span>Son aktif kadronuna devam et</span></div>
              <div className="auth-perk"><span className="perk-icon icon-yellow">🔔</span><span>Kaçirdığın bildirimleri gor</span></div>
              <div className="auth-perk"><span className="perk-icon icon-pink">🔥</span><span>Streak'ini koru, XP kazan</span></div>
            </div>
          </div>
          <div className="auth-left-deco">
            <div className="deco-ring ring1" style={{ borderColor: 'rgba(180,0,255,0.2)' }}></div>
            <div className="deco-ring ring2" style={{ borderColor: 'rgba(180,0,255,0.1)' }}></div>
            <div className="deco-ring ring3" style={{ borderColor: 'rgba(180,0,255,0.05)' }}></div>
            <div className="deco-num" style={{ WebkitTextStrokeColor: 'rgba(180,0,255,0.15)' }}>02</div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-header">
            <h3 className="auth-form-title">Giris Yap</h3>
            <p className="auth-form-sub">Hesabına erişmek için giris yap</p>
          </div>
          <div className="social-auth-grid">
            <button className="social-auth-btn google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google ile Giris
            </button>
            <button className="social-auth-btn facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </button>
            <button className="social-auth-btn twitch">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>
              Twitch
            </button>
          </div>
          <div className="auth-divider"><span>veya e-posta ile giris yap</span></div>
          <form className="auth-form" onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">E-posta veya Oyuncu Adı</label>
              <div className="input-icon-wrap"><span className="input-icon">👤</span><input type="text" className="form-input with-icon" placeholder="oyuncu@mail.com" /></div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Sifre
                <button type="button" className="forgot-btn">Sifremi unuttum</button>
              </label>
              <div className="input-icon-wrap"><span className="input-icon">🔒</span><input type="password" className="form-input with-icon" placeholder="Sifreniz" /></div>
            </div>
            <div className="form-check">
              <input type="checkbox" id="remember" className="check-input" />
              <label htmlFor="remember" className="check-label">Beni hatırla</label>
            </div>
            <button type="submit" className="auth-submit-btn login-submit"><span>🎮</span> Giris Yap</button>
          </form>
          <div className="auth-switch">
            Hesabın yok mu? <button className="auth-switch-btn" onClick={() => { onClose(); setTimeout(onSwitchToRegister, 200) }}>Kaydol</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── App ─── */
export default function App() {
  const [matchOpen, setMatchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMatchOpen(false); setFilterOpen(false); setLoginOpen(false); setRegisterOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Navbar
        onOpenMatch={() => setMatchOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onOpenRegister={() => setRegisterOpen(true)}
      />
      <HeroSlider onOpenMatch={() => setMatchOpen(true)} />
      <HeroBelow onOpenMatch={() => setMatchOpen(true)} onOpenFilter={() => setFilterOpen(true)} />
      <GamesSection />
      <WorkflowSection />
      <PlayersSection onOpenMatch={() => setMatchOpen(true)} />
      <Footer />

      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
      <MatchModal open={matchOpen} onClose={() => setMatchOpen(false)} />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => setLoginOpen(true)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => setRegisterOpen(true)}
      />
    </>
  )
}
