import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterPanelProps {
  onClose: () => void;
}

const filterGroups = [
  { label: 'Oyun Adi', key: 'game', chips: ['Valorant', 'CS2', 'PUBG', 'League of Legends', 'Apex Legends', 'Fortnite', 'Overwatch 2', 'Dota 2', 'Minecraft', 'GTA Online'] },
  { label: 'Oyun Turu', key: 'genre', chips: ['FPS', 'Battle Royale', 'MOBA', 'RPG', 'Strateji', 'Spor', 'Sandbox'] },
  { label: 'Oyuncu Dili', key: 'lang', chips: ['🇹🇷 Turkce', '🇬🇧 English', '🇩🇪 Deutsch', '🇪🇸 Espanol', '🇫🇷 Francais', '🇷🇺 Russca'] },
  { label: 'Oyun Stili', key: 'style', chips: ['Rekabetci', 'Eglenceli', 'Stratejik', 'Agresif', 'Rahat'] },
  { label: 'Ekip Boyutu', key: 'size', chips: ['Solo (1)', 'Duo (2)', 'Trio (3)', 'Squad (4+)'] },
  { label: 'Mikrofon', key: 'mic', chips: ['Zorunlu', 'Tercih Edilir', 'Farketmez'] },
];

export default function FilterPanel({ onClose }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({});

  const toggle = (key: string, val: string) => {
    setFilters(prev => {
      const next = { ...prev };
      if (!next[key]) next[key] = new Set();
      else next[key] = new Set(next[key]);
      if (next[key].has(val)) next[key].delete(val);
      else next[key].add(val);
      return next;
    });
  };

  const clear = () => setFilters({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <div className="filter-panel-overlay open" onClick={onClose}></div>
      <div className="filter-panel open">
        <div className="fp-header">
          <div className="fp-title">▼ FILTRELEME SECENEKLERI</div>
          <button className="fp-close" onClick={onClose}><X size={15} strokeWidth={2.5} /></button>
        </div>
        <div className="fp-body">
          {filterGroups.map(g => (
            <div className="fp-group" key={g.key}>
              <div className="fp-group-label">{g.label}</div>
              <div className="fp-chips">
                {g.chips.map(chip => (
                  <button
                    key={chip}
                    className={`fp-chip${filters[g.key]?.has(chip) ? ' selected' : ''}`}
                    onClick={() => toggle(g.key, chip)}
                  >{chip}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="fp-footer">
          <button className="fp-clear-btn" onClick={clear}>Temizle</button>
          <button className="fp-apply-btn" onClick={onClose}>Filtreleri Uygula</button>
        </div>
      </div>
    </>
  );
}
