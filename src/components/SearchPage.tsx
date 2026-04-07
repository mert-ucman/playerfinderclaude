import React, { useState } from 'react';
import { Listing, User } from '../types';

interface SearchPageProps {
  query: string;
  listings: Listing[];
  user: User | null;
  onSearch: (q: string) => void;
  onOpenCreateListing: () => void;
  onMessage: (toUserId: string, toUsername: string) => void;
  onGoHome: () => void;
  onOpenLogin: () => void;
}

const GAME_OPTIONS = ['Tümü', 'Valorant', 'CS2', 'PUBG', 'League of Legends', 'Fortnite', 'Apex Legends', 'Dota 2', 'Overwatch 2'];
const RANK_OPTIONS = ['Tümü', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal'];
const STYLE_OPTIONS = ['Tümü', 'Rekabetci', 'Eglenceli', 'Stratejik', 'Agresif', 'Rahat'];
const SIZE_OPTIONS = ['Tümü', 'Solo (1)', 'Duo (2)', 'Trio (3)', 'Squad (4+)'];

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
  if (diff < 86400) return Math.floor(diff / 3600) + ' sa önce';
  return Math.floor(diff / 86400) + ' gün önce';
}

export default function SearchPage({
  query, listings, user, onSearch, onOpenCreateListing, onMessage, onGoHome, onOpenLogin,
}: SearchPageProps) {
  const [searchVal, setSearchVal] = useState(query);
  const [gameFilter, setGameFilter] = useState('Tümü');
  const [rankFilter, setRankFilter] = useState('Tümü');
  const [styleFilter, setStyleFilter] = useState('Tümü');
  const [sizeFilter, setSizeFilter] = useState('Tümü');

  const filtered = listings.filter(l => {
    const q = searchVal.toLowerCase();
    const matchQuery = !q || l.game.toLowerCase().includes(q) || l.username.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
    const matchGame = gameFilter === 'Tümü' || l.game === gameFilter;
    const matchRank = rankFilter === 'Tümü' || l.rank === rankFilter;
    const matchStyle = styleFilter === 'Tümü' || l.style === styleFilter;
    const matchSize = sizeFilter === 'Tümü' || l.size === sizeFilter;
    return matchQuery && matchGame && matchRank && matchStyle && matchSize;
  });

  return (
    <div className="page-wrapper">
      <div className="search-page">
        <div className="sp-header">
          <button className="profile-back-btn" onClick={onGoHome}>← Ana Sayfa</button>
          <div className="sp-search-row">
            <div className="search-box sp-search-box">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Oyun veya oyuncu ara..."
                onKeyDown={e => e.key === 'Enter' && onSearch(searchVal)}
              />
            </div>
            {user ? (
              <button className="btn-primary sp-create-btn" onClick={onOpenCreateListing}>
                <span>⚡</span> İlan Oluştur
              </button>
            ) : (
              <button className="btn-ghost sp-create-btn" onClick={onOpenLogin}>
                Giriş Yap
              </button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="sp-filters">
          <div className="sp-filter-group">
            <span className="sp-filter-label">Oyun:</span>
            {GAME_OPTIONS.map(g => (
              <button key={g} className={`fp-chip${gameFilter === g ? ' active' : ''}`} onClick={() => setGameFilter(g)}>{g}</button>
            ))}
          </div>
          <div className="sp-filter-group">
            <span className="sp-filter-label">Rank:</span>
            {RANK_OPTIONS.map(r => (
              <button key={r} className={`fp-chip${rankFilter === r ? ' active' : ''}`} onClick={() => setRankFilter(r)}>{r}</button>
            ))}
          </div>
          <div className="sp-filter-group">
            <span className="sp-filter-label">Stil:</span>
            {STYLE_OPTIONS.map(s => (
              <button key={s} className={`fp-chip${styleFilter === s ? ' active' : ''}`} onClick={() => setStyleFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="sp-filter-group">
            <span className="sp-filter-label">Ekip:</span>
            {SIZE_OPTIONS.map(s => (
              <button key={s} className={`fp-chip${sizeFilter === s ? ' active' : ''}`} onClick={() => setSizeFilter(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="sp-results-header">
          <span className="sp-results-count">{filtered.length} ilan bulundu</span>
        </div>

        <div className="listings-grid">
          {filtered.length === 0 && (
            <div className="listings-empty">
              <div>🔍</div>
              <p>Aradığın kriterlere uygun ilan bulunamadı.</p>
              {user && <button className="btn-primary" onClick={onOpenCreateListing}>İlan Oluştur</button>}
            </div>
          )}
          {filtered.map(l => (
            <div key={l.id} className="listing-card">
              <div className="listing-card-header">
                <div className="listing-avatar">{l.username[0].toUpperCase()}</div>
                <div className="listing-user-info">
                  <div className="listing-username">{l.username}</div>
                  <div className="listing-user-rank">{l.userRank}</div>
                </div>
                <div className="listing-time">{timeAgo(l.createdAt)}</div>
              </div>
              <div className="listing-game-name">{l.game}</div>
              <div className="listing-tags">
                {l.rank && <span className="listing-tag tag-rank">{l.rank}</span>}
                {l.size && <span className="listing-tag tag-size">{l.size}</span>}
                {l.style && <span className="listing-tag tag-style">{l.style}</span>}
                {l.mic && <span className="listing-tag tag-mic">🎤 {l.mic}</span>}
                {l.lang && <span className="listing-tag tag-lang">🌐 {l.lang}</span>}
                {l.timeSlot && <span className="listing-tag tag-time">🕐 {l.timeSlot}</span>}
              </div>
              {l.description && <p className="listing-desc">{l.description}</p>}
              <div className="listing-footer">
                {user ? (
                  l.userId !== user.id ? (
                    <button className="listing-msg-btn" onClick={() => onMessage(l.userId, l.username)}>
                      💬 Mesaj Gönder
                    </button>
                  ) : (
                    <span className="listing-own-badge">📋 Senin ilanın</span>
                  )
                ) : (
                  <button className="listing-msg-btn" onClick={onOpenLogin}>
                    💬 Mesaj Gönder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
