import React, { useEffect, useState } from 'react';
import { Listing, User } from '../../types';

interface CreateListingModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (listing: Listing) => void;
}

const GAME_OPTIONS = ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Fortnite', 'Apex Legends', 'Dota 2', 'Overwatch 2', 'Rocket League', 'Diğer'];
const RANK_OPTIONS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Immortal', 'Radiant', 'Master Guardian', 'Global Elite', 'Belirsiz'];
const STYLE_OPTIONS = ['Rekabetci', 'Eglenceli', 'Stratejik', 'Agresif', 'Rahat'];
const SIZE_OPTIONS = ['Solo (1)', 'Duo (2)', 'Trio (3)', 'Squad (4+)'];
const LANG_OPTIONS = ['Turkce', 'English', 'Deutsch', 'Espanol', 'Francais'];
const MIC_OPTIONS = ['Zorunlu', 'Tercih Edilir', 'Farketmez'];
const TIME_OPTIONS = ['Sabah (06:00-12:00)', 'Ogle (12:00-18:00)', 'Aksam (18:00-22:00)', 'Gece (22:00-02:00)', 'Her Zaman'];

export default function CreateListingModal({ user, onClose, onSubmit }: CreateListingModalProps) {
  const [form, setForm] = useState({
    game: '', rank: '', style: '', size: '', lang: 'Turkce', mic: '', timeSlot: '', description: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.game || !form.size) return;
    const listing: Listing = {
      id: 'l_' + Date.now(),
      userId: user.id,
      username: user.username,
      userRank: user.rank,
      ...form,
      createdAt: new Date().toISOString(),
    };
    onSubmit(listing);
    onClose();
  };

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="auth-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="create-listing-modal">
        <div className="clm-header">
          <div>
            <h3 className="clm-title">⚡ İlan Oluştur</h3>
            <p className="clm-sub">Oyuncu arayan ilanın yayınlanacak</p>
          </div>
          <button className="auth-close" style={{ position: 'static' }} onClick={onClose}>✕</button>
        </div>
        <form className="clm-body" onSubmit={handleSubmit}>
          <div className="clm-grid">
            <div className="form-group">
              <label className="form-label">Oyun *</label>
              <select className="form-input" value={form.game} onChange={set('game')} required>
                <option value="">Oyun seç...</option>
                {GAME_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Rank</label>
              <select className="form-input" value={form.rank} onChange={set('rank')}>
                <option value="">Rank seç...</option>
                {RANK_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ekip Boyutu *</label>
              <select className="form-input" value={form.size} onChange={set('size')} required>
                <option value="">Boyut seç...</option>
                {SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Oyun Stili</label>
              <select className="form-input" value={form.style} onChange={set('style')}>
                <option value="">Stil seç...</option>
                {STYLE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Dil</label>
              <select className="form-input" value={form.lang} onChange={set('lang')}>
                {LANG_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mikrofon</label>
              <select className="form-input" value={form.mic} onChange={set('mic')}>
                <option value="">Seç...</option>
                {MIC_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Aktif Saat</label>
              <select className="form-input" value={form.timeSlot} onChange={set('timeSlot')}>
                <option value="">Seç...</option>
                {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Açıklama</label>
            <textarea className="form-input" rows={3} placeholder="Kendini ve aradığın oyuncuyu tanıt..." value={form.description} onChange={set('description')} style={{ resize: 'vertical', minHeight: '80px' }}></textarea>
          </div>
          <div className="clm-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Vazgeç</button>
            <button type="submit" className="auth-submit-btn" style={{ flex: 1 }}><span>⚡</span> İlanı Yayınla</button>
          </div>
        </form>
      </div>
    </div>
  );
}
