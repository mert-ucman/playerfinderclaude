import React, { useEffect, useState } from 'react';
import { X, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  onOpenMatch: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  user: User | null;
  onGoProfile: () => void;
  onOpenMessages: () => void;
  onLogout: () => void;
  unreadCount: number;
  onGoSearch: (q: string) => void;
}

export default function Navbar({
  onOpenMatch, onOpenLogin, onOpenRegister,
  user, onGoProfile, onOpenMessages, onLogout, unreadCount, onGoSearch,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const initials = user ? (user.username[0] || '?').toUpperCase() : '';

  return (
    <>
      <nav className="navbar">
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); }}>
          <div className="logo-icon">⬡</div>
          SQUAD4<span>GAME</span>
        </a>

        <ul className="nav-links nav-links-left nav-desktop-only">
          <li><a href="#" onClick={e => { e.preventDefault(); onGoSearch(''); }}>Kesfet</a></li>
          <li><a href="#">Oyunlar</a></li>
        </ul>

        <button className="nav-esles-btn nav-desktop-only" onClick={onOpenMatch}>
          <span className="nav-esles-pulse"></span>
          <span className="nav-esles-icon">⚡</span>
          <span className="nav-esles-text">ESLES</span>
          <span className="nav-esles-count">2.347</span>
        </button>

        <ul className="nav-links nav-links-right nav-desktop-only">
          <li><a href="#">Liderlik</a></li>
          <li><a href="#">Topluluk</a></li>
        </ul>

        <div className="nav-actions nav-desktop-only">
          <div className="nav-ping" title="2.347 cevrimici"></div>
          {user ? (
            <>
              <button className="nav-messages-btn" onClick={onOpenMessages} title="Mesajlar">
                💬
                {unreadCount > 0 && <span className="nav-unread-badge">{unreadCount}</span>}
              </button>
              <button className="nav-avatar-btn" onClick={onGoProfile} title={user.username}>
                {initials}
              </button>
              <button className="btn-ghost nav-logout-btn" onClick={() => setShowLogoutConfirm(true)}>
                <LogOut size={14} /> Çıkış
              </button>
            </>
          ) : (
            <>
              <button className="btn-ghost" onClick={onOpenLogin}>Giris Yap</button>
              <button className="btn-primary" onClick={onOpenRegister}>Kaydol</button>
            </>
          )}
        </div>

        <div className="nav-mobile-right">
          <div className="nav-ping"></div>
          {user && (
            <button className="nav-messages-btn" onClick={onOpenMessages}>
              💬
              {unreadCount > 0 && <span className="nav-unread-badge">{unreadCount}</span>}
            </button>
          )}
          <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menüyü aç/kapat">
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
            <span className={`ham-line${menuOpen ? ' open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {menuOpen && <div className="mobile-menu-overlay" onClick={close}></div>}

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <a href="#" className="nav-logo" onClick={close}><div className="logo-icon">⬡</div>SQUAD4<span>GAME</span></a>
          <button className="mobile-menu-close" onClick={close}><X size={18} strokeWidth={2.5} /></button>
        </div>
        <div className="mobile-menu-body">
          {user && (
            <div className="mobile-user-info">
              <div className="nav-avatar-btn" style={{ cursor: 'default' }}>{initials}</div>
              <span className="mobile-username">{user.username}</span>
            </div>
          )}
          <button className="nav-esles-btn mobile-esles" onClick={() => { onOpenMatch(); close(); }}>
            <span className="nav-esles-pulse"></span><span className="nav-esles-icon">⚡</span>
            <span className="nav-esles-text">ESLES</span><span className="nav-esles-count">2.347</span>
          </button>
          <ul className="mobile-nav-links">
            <li><a href="#" onClick={() => { onGoSearch(''); close(); }}>Kesfet</a></li>
            <li><a href="#" onClick={close}>Oyunlar</a></li>
            <li><a href="#" onClick={close}>Liderlik</a></li>
            <li><a href="#" onClick={close}>Topluluk</a></li>
            {user && <li><a href="#" onClick={() => { onGoProfile(); close(); }}>Profilim</a></li>}
          </ul>
          <div className="mobile-auth-btns">
            {user ? (
              <button className="btn-ghost" style={{ width: '100%' }} onClick={() => { setShowLogoutConfirm(true); close(); }}>Çıkış Yap</button>
            ) : (
              <>
                <button className="btn-ghost" style={{ width: '100%' }} onClick={() => { onOpenLogin(); close(); }}>Giris Yap</button>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => { onOpenRegister(); close(); }}>Kaydol</button>
              </>
            )}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="logout-confirm" onClick={e => e.stopPropagation()}>
            <div className="lc-icon"><LogOut size={28} /></div>
            <div className="lc-title">Çıkış Yap</div>
            <p className="lc-text">Hesabından çıkılacaktır.<br />Onaylıyor musunuz?</p>
            <div className="lc-btns">
              <button className="lc-cancel" onClick={() => setShowLogoutConfirm(false)}>Vazgeç</button>
              <button className="lc-confirm" onClick={() => { onLogout(); setShowLogoutConfirm(false); }}>
                <LogOut size={14} /> Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
