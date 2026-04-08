import { useState } from 'react';
import { Listing } from '../types';

const KEY = 'squad4game_listings';

const MOCK: Listing[] = [
  { id: 'l1', userId: 'u_neonx', username: 'NeonX_Pro', userRank: 'Diamond II', game: 'Valorant', rank: 'Diamond', style: 'Rekabetci', size: 'Duo (2)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Gece (22:00-02:00)', description: 'Diamond/Immortal arası ciddi bir duo arıyorum. Main Jett/Raze oynuyorum, iletişim şart.', createdAt: new Date(Date.now() - 3 * 60000).toISOString() },
  { id: 'l2', userId: 'u_frag', username: 'FragMaster_TR', userRank: 'Global Elite', game: 'CS2', rank: 'Global Elite', style: 'Rekabetci', size: 'Squad (4+)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Aksam (18:00-22:00)', description: 'Faceit seviyesinde CS2 ekibi kuruyorum. Premier oynayan, maç başı 20+ kill atan arkadaşlar.', createdAt: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: 'l3', userId: 'u_battle', username: 'BattleKing47', userRank: 'Platinum', game: 'PUBG', rank: 'Platinum', style: 'Eglenceli', size: 'Squad (4+)', lang: 'Turkce', mic: 'Tercih Edilir', timeSlot: 'Gece (22:00-02:00)', description: 'Eğlenceli PUBG squad arıyorum, stres yok sadece tavuk akşamları.', createdAt: new Date(Date.now() - 28 * 60000).toISOString() },
  { id: 'l4', userId: 'u_midlane', username: 'MidLane_TR', userRank: 'Gold II', game: 'League of Legends', rank: 'Gold', style: 'Rekabetci', size: 'Duo (2)', lang: 'Turkce', mic: 'Farketmez', timeSlot: 'Ogle (12:00-18:00)', description: 'Gold/Plat duo arıyorum, main mid/jng. Bot lane tercihli ama her pozisyon olur.', createdAt: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 'l5', userId: 'u_apex1', username: 'ApexHunter_TR', userRank: 'Platinum IV', game: 'Apex Legends', rank: 'Platinum', style: 'Rekabetci', size: 'Trio (3)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Gece (22:00-02:00)', description: 'Ranked trio için 2 kişi arıyoruz. Pathfinder main, rotasyon bilgisi olan.', createdAt: new Date(Date.now() - 62 * 60000).toISOString() },
  { id: 'l6', userId: 'u_silent', username: 'SilentSniper99', userRank: 'Immortal I', game: 'Valorant', rank: 'Immortal', style: 'Stratejik', size: 'Duo (2)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Gece (22:00-02:00)', description: 'Immortal+ duo/trio arıyorum. Sentry/Sage main, call atabilen, stratejik oynayan.', createdAt: new Date(Date.now() - 90 * 60000).toISOString() },
  { id: 'l7', userId: 'u_rushb', username: 'RushB_Only', userRank: 'Master Guardian Elite', game: 'CS2', rank: 'Master Guardian', style: 'Agresif', size: 'Trio (3)', lang: 'Turkce', mic: 'Tercih Edilir', timeSlot: 'Sabah (06:00-12:00)', description: 'Premier oynamak isteyen 2 kişi arıyorum. Entry fragger tercihli, tek yumruk taktiği.', createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: 'l8', userId: 'u_chicken', username: 'ChickenDinner_Pro', userRank: 'Diamond', game: 'PUBG', rank: 'Diamond', style: 'Stratejik', size: 'Duo (2)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Aksam (18:00-22:00)', description: 'PUBG\'de duo rank push için partner arıyorum. Akşam saatlerinde aktifim.', createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
  { id: 'l9', userId: 'u_adc', username: 'ADC_Main_TR', userRank: 'Platinum I', game: 'League of Legends', rank: 'Platinum', style: 'Rekabetci', size: 'Duo (2)', lang: 'Turkce', mic: 'Tercih Edilir', timeSlot: 'Aksam (18:00-22:00)', description: 'ADC main olarak support arıyorum. Ezreal/Jinx oynuyorum, iyi sinerjiler istiyorum.', createdAt: new Date(Date.now() - 240 * 60000).toISOString() },
  { id: 'l10', userId: 'u_fort1', username: 'ZeroBuilds_TR', userRank: 'Champion', game: 'Fortnite', rank: 'Champion', style: 'Rekabetci', size: 'Duo (2)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Gece (22:00-02:00)', description: 'Zero Build ranked duo arıyorum. Agresif oynayan, pozisyon bilen biri.', createdAt: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: 'l11', userId: 'u_legacy', username: 'LegacyPRO', userRank: 'Diamond II', game: 'Apex Legends', rank: 'Diamond', style: 'Rekabetci', size: 'Squad (4+)', lang: 'Turkce', mic: 'Zorunlu', timeSlot: 'Gece (22:00-02:00)', description: 'Masters push için 2 kişi arıyoruz. Lifeline veya Bangalore main tercihli.', createdAt: new Date(Date.now() - 360 * 60000).toISOString() },
  { id: 'l12', userId: 'u_val3', username: 'CyberPunk_VAL', userRank: 'Platin III', game: 'Valorant', rank: 'Platinum', style: 'Eglenceli', size: 'Squad (4+)', lang: 'Turkce', mic: 'Farketmez', timeSlot: 'Aksam (18:00-22:00)', description: 'Hafta sonu unranked squad arıyorum, eğlenceliyim ve tatlıyım. Bronze friendly :)', createdAt: new Date(Date.now() - 420 * 60000).toISOString() },
];

function load(): Listing[] {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch { /* ignore */ }
  localStorage.setItem(KEY, JSON.stringify(MOCK));
  return MOCK;
}

export function useListings() {
  const [listings, setListings] = useState<Listing[]>(load);

  const addListing = (l: Listing) => {
    setListings(prev => {
      const next = [l, ...prev];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const deleteListing = (id: string) => {
    setListings(prev => {
      const next = prev.filter(l => l.id !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  return { listings, addListing, deleteListing };
}
