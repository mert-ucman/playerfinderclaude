import React, { useEffect, useState } from 'react';
import { MatchData } from '../../types';

interface MatchModalProps {
  onClose: () => void;
}

const mmGames = ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Apex Legends', 'Fortnite', 'Overwatch 2', 'Dota 2'];
const mmRanks = ['Yeni Basliyor', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master+'];
const mmSizes = ['Duo (2 kisi)', 'Trio (3 kisi)', 'Tam Squad (4+)'];
const mmStyles = ['🏆 Rekabetci', '😄 Rahat', '🧠 Stratejik', '🔥 Agresif'];
const mmLangs = ['🇹🇷 Turkce', '🇬🇧 English', 'Fark etmez'];
const mmMics = ['🎤 Zorunlu', 'Tercih Edilir', 'Farketmez'];
const mmTimes = ['🌅 Sabah (06-12)', '🌞 Ogle (12-18)', '🌇 Aksam (18-24)', '🌙 Gece (00-06)'];
const mmAges = ['14–17', '18–21', '22–27', '28+', 'Fark etmez'];

export default function MatchModal({ onClose }: MatchModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<MatchData>({});
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [timer, setTimer] = useState(0);

  const sel = (key: keyof MatchData, val: string) => setData(d => ({ ...d, [key]: val }));

  const reset = () => {
    setStep(1); setData({}); setSearching(false); setFound(false); setTimer(0);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleNext = () => {
    if (step < 3) { setStep(s => s + 1); }
    else {
      setSearching(true);
      let t = 0;
      const iv = setInterval(() => {
        t++;
        setTimer(t);
        if (t >= 4) { clearInterval(iv); setSearching(false); setFound(true); }
      }, 1000);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button className={`mm-chip${active ? ' sel' : ''}`} onClick={onClick}>{label}</button>
  );

  return (
    <div className="match-overlay open" onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
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
                    {[
                      { av: 'NX', nm: 'NeonX', rk: 'Diamond', bg: 'rgba(0,245,255,0.15)', color: 'var(--cyan)' },
                      { av: 'SG', nm: 'ShadowG', rk: 'Platinum', bg: 'rgba(180,0,255,0.15)', color: 'var(--purple)' },
                      { av: 'CY', nm: 'CyberY', rk: 'Gold', bg: 'rgba(0,255,135,0.12)', color: 'var(--green)' },
                    ].map((fp, i) => (
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
  );
}
