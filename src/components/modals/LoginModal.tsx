import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../../types';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLogin: (user: User) => void;
}

export default function LoginModal({ onClose, onSwitchToRegister, onLogin }: LoginModalProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) { setError('Tüm alanları doldurun.'); return; }
    // Try to find stored user or create demo
    try {
      const stored = localStorage.getItem('squad4game_user');
      if (stored) {
        const u: User = JSON.parse(stored);
        if (u.email === identifier.trim() || u.username === identifier.trim()) {
          onLogin(u); onClose(); return;
        }
      }
    } catch { /* ignore */ }
    // Demo login: create user from identifier
    const user: User = {
      id: 'u_' + Date.now(),
      username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      email: identifier.includes('@') ? identifier : identifier + '@demo.com',
      firstName: '', lastName: '',
      rank: 'Belirsiz', region: 'TR', primaryGame: '',
      games: [], bio: '',
      createdAt: new Date().toISOString(),
    };
    onLogin(user); onClose();
  };

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="auth-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}><X size={16} strokeWidth={2.5} /></button>
        <div className="auth-left login-left">
          <div className="auth-brand"><div className="logo-icon">⬡</div>SQUAD4<span>GAME</span></div>
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
            <button type="button" className="social-auth-btn google"><svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>Google ile Giris</button>
            <button type="button" className="social-auth-btn facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>Facebook</button>
            <button type="button" className="social-auth-btn twitch"><svg width="18" height="18" viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" /></svg>Twitch</button>
          </div>
          <div className="auth-divider"><span>veya e-posta ile giris yap</span></div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">E-posta veya Oyuncu Adı</label>
              <div className="input-icon-wrap"><span className="input-icon">👤</span><input type="text" className="form-input with-icon" placeholder="oyuncu@mail.com" value={identifier} onChange={e => setIdentifier(e.target.value)} /></div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Sifre <button type="button" className="forgot-btn">Sifremi unuttum</button>
              </label>
              <div className="input-icon-wrap"><span className="input-icon">🔒</span><input type="password" className="form-input with-icon" placeholder="Sifreniz" value={password} onChange={e => setPassword(e.target.value)} /></div>
            </div>
            {error && <div style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '8px' }}>{error}</div>}
            <div className="form-check">
              <input type="checkbox" id="remember" className="check-input" />
              <label htmlFor="remember" className="check-label">Beni hatırla</label>
            </div>
            <button type="submit" className="auth-submit-btn login-submit"><span>🎮</span> Giris Yap</button>
          </form>
          <div className="auth-switch">
            Hesabın yok mu? <button type="button" className="auth-switch-btn" onClick={() => { onClose(); setTimeout(onSwitchToRegister, 200); }}>Kaydol</button>
          </div>
        </div>
      </div>
    </div>
  );
}
