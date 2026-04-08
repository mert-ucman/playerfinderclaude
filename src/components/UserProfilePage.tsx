import React from 'react';
import { Listing } from '../types';

interface UserProfilePageProps {
  userId: string;
  username: string;
  listings: Listing[];
  onGoBack: () => void;
  onMessage: (userId: string, username: string) => void;
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
  if (diff < 86400) return Math.floor(diff / 3600) + ' sa önce';
  return Math.floor(diff / 86400) + ' gün önce';
}

export default function UserProfilePage({ userId, username, listings, onGoBack, onMessage }: UserProfilePageProps) {
  const userListings = listings.filter(l => l.userId === userId);
  const initials = (username[0] || '?').toUpperCase();
  const knownRank = userListings[0]?.userRank || '—';
  const games = [...new Set(userListings.map(l => l.game))];

  return (
    <div className="page-wrapper">
      <div className="profile-page">
        <button className="profile-back-btn" onClick={onGoBack}>← Geri</button>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">{initials}</div>
                <div className="profile-avatar-ring"></div>
              </div>
              <div className="profile-username">{username}</div>
              {games[0] && <div className="profile-primary-game">🎮 {games[0]}</div>}
              <div className="profile-rank-badge">{knownRank}</div>
              <div className="profile-stats">
                <div className="pstat">
                  <span className="pstat-val">{userListings.length}</span>
                  <span className="pstat-label">İlan</span>
                </div>
                <div className="pstat">
                  <span className="pstat-val">{games.length}</span>
                  <span className="pstat-label">Oyun</span>
                </div>
              </div>
              <button
                className="auth-submit-btn"
                style={{ marginTop: '16px', fontSize: '11px', padding: '12px' }}
                onClick={() => onMessage(userId, username)}
              >
                💬 Mesaj Gönder
              </button>
            </div>
          </aside>

          <div className="profile-content">
            <div className="profile-tabs">
              <button className="profile-tab active">📋 İlanları</button>
            </div>
            <div className="profile-tab-content">
              <div className="profile-section">
                <h4 className="profile-section-title">{username} adlı oyuncunun ilanları</h4>
                {userListings.length === 0 ? (
                  <div className="mp-empty">Bu oyuncunun aktif ilanı yok.</div>
                ) : (
                  <div className="my-listings-list">
                    {userListings.map(l => (
                      <div key={l.id} className="my-listing-item">
                        <div className="my-listing-info">
                          <span className="my-listing-game">{l.game}</span>
                          <span className="my-listing-tags">
                            {l.rank && <span className="listing-tag">{l.rank}</span>}
                            {l.size && <span className="listing-tag">{l.size}</span>}
                            {l.style && <span className="listing-tag">{l.style}</span>}
                            {l.timeSlot && <span className="listing-tag">{l.timeSlot}</span>}
                          </span>
                          {l.description && <p className="my-listing-desc">{l.description}</p>}
                          <span className="my-listing-time">{timeAgo(l.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
