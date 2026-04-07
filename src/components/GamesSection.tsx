import React from 'react';

const games = [
  {
    name: 'VALORANT', players: '12,847', genre: 'FPS', rank: '#1',
    image: 'https://www.riotgames.com/darkroom/900/907ad200ce2591f4a142ec00cd875d89:d1186f97ea7fe19ae99ebb897e4f1222/val-homepage-productcard-v26a2.png',
  },
  {
    name: 'PUBG', players: '9,321', genre: 'BR', rank: '#2',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_600x900.jpg',
  },
  {
    name: 'CS2', players: '8,650', genre: 'FPS', rank: '#3',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/library_600x900.jpg',
  },
  {
    name: 'LEAGUE OF LEGENDS', players: '7,200', genre: 'MOBA', rank: '#4',
    image: 'https://www.riotgames.com/darkroom/900/f71cfae596f1cecf986b0d8b9aec4ca2:c095db82a08df4596cdeed991ac24c18/league-homepage-productcard-2.png',
  },
  {
    name: 'FORTNITE', players: '6,980', genre: 'BR', rank: '',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202603/1715/7b4692ec39e135e3688f0fa5a4c4993af4ebb3e32394fca5.jpg',
  },
  {
    name: 'APEX LEGENDS', players: '5,140', genre: 'BR', rank: '',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/library_600x900.jpg',
  },
];

export default function GamesSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge badge-cyan">🎮 Popüler Oyunlar</span>
        <h3 className="section-title">Şu An En Çok Oynananlar</h3>
        <div className="section-line"></div>
        <span className="section-count">128 / OYUN</span>
      </div>
      <div className="games-grid">
        {games.map((g, i) => (
          <div className="game-card" key={i}>
            <img src={g.image} alt={g.name} className="game-image" />
            <div className="game-gradient"></div>
            <div className="game-overlay"></div>
            {g.rank && <div className="game-rank">{g.rank}</div>}
            <button className="game-join-btn">KATIL</button>
            <div className="game-info">
              <div className="game-name">{g.name}</div>
              <div className="game-meta">
                <span className="game-players">🟢 {g.players} çevrimiçi</span>
                <span className="game-genre-tag">{g.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
