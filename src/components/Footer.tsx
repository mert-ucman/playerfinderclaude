import React from 'react';

export default function Footer() {
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
  );
}
