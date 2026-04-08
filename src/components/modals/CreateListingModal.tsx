import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Listing, User } from '../../types';
import CustomSelect from '../CustomSelect';

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

  const setField = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

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
          <button className="auth-close" style={{ position: 'static' }} onClick={onClose}><X size={16} strokeWidth={2.5} /></button>
        </div>
        <form className="clm-body" onSubmit={handleSubmit}>
          <div className="clm-grid">
            <div className="form-group">
              <label className="form-label">Oyun *</label>
              <CustomSelect value={form.game} onChange={setField('game')} options={GAME_OPTIONS} placeholder="Oyun seç..." />
            </div>
            <div className="form-group">
              <label className="form-label">Rank</label>
              <CustomSelect value={form.rank} onChange={setField('rank')} options={RANK_OPTIONS} placeholder="Rank seç..." />
            </div>
            <div className="form-group">
              <label className="form-label">Ekip Boyutu *</label>
              <CustomSelect value={form.size} onChange={setField('size')} options={SIZE_OPTIONS} placeholder="Boyut seç..." />
            </div>
            <div className="form-group">
              <label className="form-label">Oyun Stili</label>
              <CustomSelect value={form.style} onChange={setField('style')} options={STYLE_OPTIONS} placeholder="Stil seç..." />
            </div>
            <div className="form-group">
              <label className="form-label">Dil</label>
              <CustomSelect value={form.lang} onChange={setField('lang')} options={LANG_OPTIONS} />
            </div>
            <div className="form-group">
              <label className="form-label">Mikrofon</label>
              <CustomSelect value={form.mic} onChange={setField('mic')} options={MIC_OPTIONS} placeholder="Seç..." />
            </div>
            <div className="form-group">
              <label className="form-label">Aktif Saat</label>
              <CustomSelect value={form.timeSlot} onChange={setField('timeSlot')} options={TIME_OPTIONS} placeholder="Seç..." />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Açıklama</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Kendini ve aradığın oyuncuyu tanıt..."
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              style={{ resize: 'vertical', minHeight: '80px' }}
            ></textarea>
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
