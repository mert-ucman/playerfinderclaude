import React, { useEffect, useRef, useState } from 'react';

interface HeroBelowProps {
  onOpenMatch: () => void;
  onOpenFilter: () => void;
  onSearch: (q: string) => void;
}

export default function HeroBelow({ onOpenMatch, onOpenFilter, onSearch }: HeroBelowProps) {
  const [searchVal, setSearchVal] = useState('');
  const [countersStarted, setCountersStarted] = useState(false);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        setCountersStarted(true);
        animateCounter(setC1, 52400);
        animateCounter(setC2, 18700);
        animateCounter(setC3, 128);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (barRef.current) obs.observe(barRef.current);
    return () => obs.disconnect();
  }, [countersStarted]);

  function animateCounter(setter: (v: number) => void, target: number) {
    let start = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setter(target); clearInterval(timer); return; }
      setter(Math.floor(start));
    }, 18);
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
          <input
            type="text"
            placeholder="Oyun, oyuncu adi veya klan ara..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch(searchVal)}
          />
        </div>
        <button className="filter-btn" onClick={onOpenFilter}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
          Filtrele
        </button>
        <button className="find-btn" onClick={() => onSearch(searchVal)}>
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
  );
}
