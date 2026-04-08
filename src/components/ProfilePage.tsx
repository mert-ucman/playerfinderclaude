import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Listing, User } from '../types';
import CustomSelect from './CustomSelect';

interface ProfilePageProps {
  user: User;
  listings: Listing[];
  onUpdateUser: (updates: Partial<User>) => void;
  onDeleteListing: (id: string) => void;
  onGoHome: () => void;
}

const GAME_OPTIONS = ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Fortnite', 'Apex Legends', 'Dota 2', 'Overwatch 2', 'Rocket League'];
const RANK_OPTIONS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant', 'Master Guardian', 'Global Elite', 'Champion', 'Belirsiz'];
const REGION_OPTIONS = ['TR', 'EUW', 'EUNE', 'NA', 'BR', 'OCE'];

type Tab = 'account' | 'security' | 'games' | 'listings';

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
  if (diff < 86400) return Math.floor(diff / 3600) + ' sa önce';
  return Math.floor(diff / 86400) + ' gün önce';
}

export default function ProfilePage({ user, listings, onUpdateUser, onDeleteListing, onGoHome }: ProfilePageProps) {
  const [tab, setTab] = useState<Tab>('account');
  const [saved, setSaved] = useState(false);

  // Account tab form
  const [accForm, setAccForm] = useState({
    username: user.username, firstName: user.firstName, lastName: user.lastName,
    email: user.email, bio: user.bio, region: user.region,
  });

  // Security tab form
  const [secForm, setSecForm] = useState({ currentPass: '', newPass: '', confirmPass: '' });
  const [secMsg, setSecMsg] = useState('');

  // Games tab
  const [selectedGames, setSelectedGames] = useState<string[]>(user.games);
  const [primaryGame, setPrimaryGame] = useState(user.primaryGame);
  const [rank, setRank] = useState(user.rank);

  const setAcc = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setAccForm(p => ({ ...p, [k]: e.target.value }));

  const saveAccount = () => {
    onUpdateUser({ ...accForm });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveGames = () => {
    onUpdateUser({ games: selectedGames, primaryGame, rank });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleGame = (g: string) => setSelectedGames(prev =>
    prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
  );

  const savePassword = () => {
    if (!secForm.newPass || secForm.newPass !== secForm.confirmPass) {
      setSecMsg('Şifreler eşleşmiyor.'); return;
    }
    if (secForm.newPass.length < 6) { setSecMsg('Şifre en az 6 karakter olmalı.'); return; }
    setSecMsg('Şifre güncellendi! ✓');
    setSecForm({ currentPass: '', newPass: '', confirmPass: '' });
  };

  const myListings = listings.filter(l => l.userId === user.id);
  const initials = (user.firstName?.[0] || user.username[0] || '?').toUpperCase();

  return (
    <div className="page-wrapper">
      <div className="profile-page">
        {/* Back */}
        <button className="profile-back-btn" onClick={onGoHome}>← Ana Sayfa</button>

        <div className="profile-layout">
          {/* Left: Profile Card */}
          <aside className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">{initials}</div>
                <div className="profile-avatar-ring"></div>
              </div>
              <div className="profile-username">{user.username}</div>
              {user.primaryGame && <div className="profile-primary-game">🎮 {user.primaryGame}</div>}
              <div className="profile-rank-badge">{user.rank}</div>
              {user.bio && <p className="profile-bio">{user.bio}</p>}
              <div className="profile-stats">
                <div className="pstat"><span className="pstat-val">{myListings.length}</span><span className="pstat-label">İlan</span></div>
                <div className="pstat"><span className="pstat-val">{user.games.length}</span><span className="pstat-label">Oyun</span></div>
                <div className="pstat"><span className="pstat-val">{user.region}</span><span className="pstat-label">Bölge</span></div>
              </div>
              <div className="profile-joined">Katılım: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</div>
            </div>
          </aside>

          {/* Right: Tabs */}
          <div className="profile-content">
            <div className="profile-tabs">
              {(['account', 'security', 'games', 'listings'] as Tab[]).map(t => (
                <button key={t} className={`profile-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'account' ? '👤 Hesabım' : t === 'security' ? '🔒 Güvenlik' : t === 'games' ? '🎮 Oyunlarım' : '📋 İlanlarım'}
                </button>
              ))}
            </div>

            <div className="profile-tab-content">
              {/* ACCOUNT TAB */}
              {tab === 'account' && (
                <div className="profile-section">
                  <h4 className="profile-section-title">Hesap Bilgileri</h4>
                  <div className="profile-form-grid">
                    <div className="form-group">
                      <label className="form-label">Ad</label>
                      <input className="form-input" value={accForm.firstName} onChange={setAcc('firstName')} placeholder="Adın" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Soyad</label>
                      <input className="form-input" value={accForm.lastName} onChange={setAcc('lastName')} placeholder="Soyadın" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Oyuncu Adı</label>
                      <input className="form-input" value={accForm.username} onChange={setAcc('username')} placeholder="NeonX_Pro" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-posta</label>
                      <input className="form-input" type="email" value={accForm.email} onChange={setAcc('email')} placeholder="oyuncu@mail.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bölge</label>
                      <CustomSelect
                        value={accForm.region}
                        onChange={v => setAccForm(p => ({ ...p, region: v }))}
                        options={REGION_OPTIONS}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label className="form-label">Biyografi</label>
                    <textarea className="form-input" rows={3} value={accForm.bio} onChange={setAcc('bio')} placeholder="Kendini anlat..." style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div className="profile-save-row">
                    {saved && <span className="save-success">✓ Kaydedildi</span>}
                    <button className="btn-primary" onClick={saveAccount}>Kaydet</button>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {tab === 'security' && (
                <div className="profile-section">
                  <h4 className="profile-section-title">Şifre Değiştir</h4>
                  <div className="form-group">
                    <label className="form-label">Mevcut Şifre</label>
                    <input className="form-input" type="password" value={secForm.currentPass} onChange={e => setSecForm(p => ({ ...p, currentPass: e.target.value }))} placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Yeni Şifre</label>
                    <input className="form-input" type="password" value={secForm.newPass} onChange={e => setSecForm(p => ({ ...p, newPass: e.target.value }))} placeholder="En az 6 karakter" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Yeni Şifre (Tekrar)</label>
                    <input className="form-input" type="password" value={secForm.confirmPass} onChange={e => setSecForm(p => ({ ...p, confirmPass: e.target.value }))} placeholder="Tekrar girin" />
                  </div>
                  {secMsg && <div style={{ color: secMsg.includes('✓') ? 'var(--green)' : 'var(--red)', marginBottom: '12px', fontSize: '14px' }}>{secMsg}</div>}
                  <button className="btn-primary" onClick={savePassword}>Şifreyi Güncelle</button>
                </div>
              )}

              {/* GAMES TAB */}
              {tab === 'games' && (
                <div className="profile-section">
                  <h4 className="profile-section-title">Oyunlarım</h4>
                  <div className="form-group">
                    <label className="form-label">Oynadığın Oyunlar</label>
                    <div className="game-chips">
                      {GAME_OPTIONS.map(g => (
                        <button
                          key={g} type="button"
                          className={`fp-chip${selectedGames.includes(g) ? ' active' : ''}`}
                          onClick={() => toggleGame(g)}
                        >{g}</button>
                      ))}
                    </div>
                  </div>
                  <div className="profile-form-grid" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Ana Oyun</label>
                      <CustomSelect
                        value={primaryGame}
                        onChange={setPrimaryGame}
                        options={selectedGames}
                        placeholder="Seç..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rank / Seviye</label>
                      <CustomSelect
                        value={rank}
                        onChange={setRank}
                        options={RANK_OPTIONS}
                      />
                    </div>
                  </div>
                  <div className="profile-save-row">
                    {saved && <span className="save-success">✓ Kaydedildi</span>}
                    <button className="btn-primary" onClick={saveGames}>Kaydet</button>
                  </div>
                </div>
              )}

              {/* MY LISTINGS TAB */}
              {tab === 'listings' && (
                <div className="profile-section">
                  <h4 className="profile-section-title">İlanlarım</h4>
                  {myListings.length === 0 ? (
                    <div className="mp-empty">Henüz ilan açmadın.<br /><span>Oyuncu ara sayfasından ilan oluştur!</span></div>
                  ) : (
                    <div className="my-listings-list">
                      {myListings.map(l => (
                        <div key={l.id} className="my-listing-item">
                          <div className="my-listing-info">
                            <span className="my-listing-game">{l.game}</span>
                            <span className="my-listing-tags">
                              {l.rank && <span className="listing-tag">{l.rank}</span>}
                              {l.size && <span className="listing-tag">{l.size}</span>}
                              {l.style && <span className="listing-tag">{l.style}</span>}
                            </span>
                            {l.description && <p className="my-listing-desc">{l.description}</p>}
                            <span className="my-listing-time">{timeAgo(l.createdAt)}</span>
                          </div>
                          <button className="my-listing-delete" onClick={() => onDeleteListing(l.id)}><X size={13} /> Kaldır</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
