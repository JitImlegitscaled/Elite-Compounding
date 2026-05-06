const STATS = [
  { number: '100%', label: 'Audit Pass Rate', style: undefined },
  { number: '24hr',  label: 'Response Guarantee', style: undefined },
  { number: '503A/503B', label: 'Both Pathways Served', style: { fontSize: 'clamp(26px,2.8vw,44px)', lineHeight: '1.15' } as React.CSSProperties },
  { number: '0',    label: 'Uncorrected Citations', style: undefined },
];

export function Stats() {
  return (
    <section className="stats" aria-label="Company statistics">
      <div className="stats-dots" aria-hidden="true" />
      <div className="stats-glow" aria-hidden="true" />
      <div className="container">
        <div className="stats-grid" role="list" data-stagger-children="">
          {STATS.map((stat, i) => (
            <div className="stat-item reveal" role="listitem" key={i}>
              {stat.number === '503A/503B' ? (
                <div className="stat-number" style={stat.style}>
                  503A<br />503B
                </div>
              ) : (
                <div className="stat-number" style={stat.style}>{stat.number}</div>
              )}
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
