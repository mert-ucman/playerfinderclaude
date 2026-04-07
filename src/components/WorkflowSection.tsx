import React from 'react';

export default function WorkflowSection() {
  const steps = [
    { num: '01', icon: '🎮', title: 'Oyununu Seç', desc: "128'den fazla desteklenen oyun arasından kendine uygun olanı seç. Birden fazla seçim yapabilirsin." },
    { num: '02', icon: '⚙', title: 'Profilini Oluştur', desc: 'Rank, bölge, dil ve oyun saatini belirle. Akıllı algoritmamız sana en uygun oyuncuları getirir.' },
    { num: '03', icon: '⚡', title: 'Anında Eşleş', desc: 'Ortalama 12 saniyede takım arkadaşı bul. Gerçek zamanlı bildirimlerle hiçbir fırsatı kaçırma.' },
    { num: '04', icon: '🤝', title: 'Takim Kur & Yuksel', desc: 'Takim arkadaşlarınla sıralamalarda yuksel, klanını buyut, liderlik tablosunda adını tarihe yaz.' },
  ];

  return (
    <section className="section workflow-section">
      <div className="section-header">
        <span className="section-badge badge-purple">⚡ Workflow</span>
        <h3 className="section-title">4 Adımda Takımını Bul</h3>
        <div className="section-line"></div>
      </div>
      <div className="workflow-grid">
        {steps.map((s, i) => (
          <div className="workflow-step" key={i}>
            <span className="step-number">{s.num}</span>
            <div className="step-icon-wrap">{s.icon}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
