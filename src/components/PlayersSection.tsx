import React from 'react';

interface PlayersSectionProps {
  onOpenMatch: (game?: string) => void;
}

const players = [
  { initials: 'NX', name: 'NeonX_Pro', rank: '★ Diamond', rankColor: 'var(--yellow)', game: 'Valorant', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '18+', color: 'var(--green)' }, { label: 'Mikrofon', color: 'var(--purple)' }], avatarBg: 'linear-gradient(135deg,rgba(0,245,255,0.2),rgba(0,245,255,0.05))', btnColor: 'var(--cyan)', btnBorder: 'rgba(0,245,255,0.4)' },
  { initials: 'VK', name: 'VoidKiller', rank: '◆ Platinum', rankColor: '#c0c0c0', game: 'CS2', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '16+', color: 'var(--pink)' }], avatarBg: 'linear-gradient(135deg,rgba(255,0,144,0.2),rgba(255,0,144,0.05))', btnColor: 'var(--pink)', btnBorder: 'rgba(255,0,144,0.4)' },
  { initials: 'SG', name: 'ShadowGrid', rank: '◈ Gold', rankColor: '#cd7f32', game: 'PUBG', tags: [{ label: 'EN', color: 'var(--green)' }, { label: '18+', color: 'var(--cyan)' }], avatarBg: 'linear-gradient(135deg,rgba(0,255,135,0.2),rgba(0,255,135,0.05))', btnColor: 'var(--green)', btnBorder: 'rgba(0,255,135,0.4)' },
  { initials: 'CY', name: 'CyberYuki', rank: '★ Challenger', rankColor: 'var(--yellow)', game: 'League of Legends', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: 'Mikrofon', color: 'var(--purple)' }], avatarBg: 'linear-gradient(135deg,rgba(180,0,255,0.2),rgba(180,0,255,0.05))', btnColor: 'var(--purple)', btnBorder: 'rgba(180,0,255,0.4)' },
  { initials: 'RZ', name: 'R4Z0R_TR', rank: '★ Master', rankColor: 'var(--yellow)', game: 'Apex Legends', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '21+', color: 'var(--yellow)' }], avatarBg: 'linear-gradient(135deg,rgba(255,224,0,0.2),rgba(255,224,0,0.05))', btnColor: 'var(--yellow)', btnBorder: 'rgba(255,224,0,0.4)' },
  { initials: 'GX', name: 'GhostX', rank: '◆ Silver', rankColor: '#c0c0c0', game: 'Fortnite', tags: [{ label: 'TR', color: 'var(--cyan)' }, { label: '14+', color: 'var(--green)' }], avatarBg: 'linear-gradient(135deg,rgba(0,245,255,0.15),rgba(180,0,255,0.15))', btnColor: 'var(--cyan)', btnBorder: 'rgba(0,245,255,0.4)' },
];

export default function PlayersSection({ onOpenMatch }: PlayersSectionProps) {
  return (
    <section className="section community-section">
      <div className="section-header">
        <span className="section-badge badge-green">🟢 Cevrimici Oyuncular</span>
        <h3 className="section-title">Simdi Eslesmeye Hazir</h3>
        <div className="section-line"></div>
        <span className="section-count" style={{ color: 'var(--green)', textShadow: '0 0 8px rgba(0,255,135,0.4)' }}>● 2.347 CANLI</span>
      </div>

      <div className="players-module-grid">
        <div className="player-cards-col">
          <div className="player-card-row">
            {players.map((p, i) => (
              <div className="player-card" key={i}>
                <div className="pc-header">
                  <div className="pc-avatar" style={{ background: p.avatarBg }}>{p.initials}</div>
                  <div className="pc-online-ring"></div>
                </div>
                <div className="pc-body">
                  <div className="pc-name">{p.name}</div>
                  <div className="pc-rank" style={{ color: p.rankColor }}>{p.rank}</div>
                  <div className="pc-game">{p.game}</div>
                  <div className="pc-tags">
                    {p.tags.map((t, j) => (
                      <span key={j} className="pc-tag" style={{ color: t.color }}>{t.label}</span>
                    ))}
                  </div>
                </div>
                <button
                  className="pc-invite-btn"
                  style={{ borderColor: p.btnBorder, color: p.btnColor }}
                  onClick={() => onOpenMatch(p.game)}
                >Davet Et</button>
              </div>
            ))}
          </div>
        </div>

        <div className="module-side">
          <div className="side-widget">
            <div className="widget-title">Anlik Istatistikler</div>
            <div className="mini-stats-grid">
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--cyan)' }}>2.347</div><div className="mini-stat-label">Cevrimici</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--green)' }}>847</div><div className="mini-stat-label">Hazir Squad</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--purple)' }}>128</div><div className="mini-stat-label">Aktif Oyun</div></div>
              <div className="mini-stat"><div className="mini-stat-val" style={{ color: 'var(--yellow)' }}>12sn</div><div className="mini-stat-label">Ort. Eslestirme</div></div>
            </div>
          </div>

          <div className="side-widget">
            <div className="widget-title">En Cok Eslesen</div>
            <div className="leaderboard-list">
              {[
                { rank: '#1', cls: 'gold', name: 'NeonX_Pro', score: '342 eslesme' },
                { rank: '#2', cls: 'silver', name: 'CyberYuki', score: '298 eslesme' },
                { rank: '#3', cls: 'bronze', name: 'R4Z0R_TR', score: '261 eslesme' },
                { rank: '#4', cls: '', name: 'GhostByte', score: '203 eslesme' },
                { rank: '#5', cls: '', name: 'StormBreaker', score: '187 eslesme' },
              ].map((lb, i) => (
                <div className="lb-item" key={i}>
                  <div className={`lb-rank${lb.cls ? ' ' + lb.cls : ''}`}>{lb.rank}</div>
                  <div className="lb-name">{lb.name}</div>
                  <div className="lb-score">{lb.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-cta-card">
            <div className="side-cta-glow"></div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>TAKIM ARIYORUM</div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.5 }}>Tercihlerini belirle, sana en uygun takimi saniyeler icinde bulalim.</p>
            <button className="cta-main" style={{ width: '100%', justifyContent: 'center', fontSize: '11px' }} onClick={() => onOpenMatch()}>⚡ Simdi Esles</button>
          </div>
        </div>
      </div>
    </section>
  );
}
