import React, { useEffect, useRef, useState } from 'react';

interface HeroSliderProps {
  onOpenMatch: () => void;
}

export default function HeroSlider({ onOpenMatch }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);

  const goTo = (idx: number) => {
    const next = ((idx % 3) + 3) % 3;
    setCurrent(next);
    if (progressRef.current) {
      progressRef.current.style.animation = 'none';
      void progressRef.current.offsetWidth;
      progressRef.current.style.animation = 'progress-bar 5s linear infinite';
    }
  };

  const resetAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % 3), 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % 3), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  return (
    <div className="slider-wrapper">
      <div
        className="slides"
        ref={slidesRef}
        onTouchStart={e => { touchStartRef.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = touchStartRef.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
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

      <button className="slider-arrow prev" onClick={() => { goTo(current - 1); resetAuto(); }} aria-label="Önceki">←</button>
      <button className="slider-arrow next" onClick={() => { goTo(current + 1); resetAuto(); }} aria-label="Sonraki">→</button>

      <div className="slider-dots">
        {[0, 1, 2].map(i => (
          <div key={i} className={`dot${current === i ? ' active' : ''}`} onClick={() => { goTo(i); resetAuto(); }}></div>
        ))}
      </div>

      <div className="slider-progress" ref={progressRef}></div>
    </div>
  );
}
