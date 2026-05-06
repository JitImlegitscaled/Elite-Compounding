const CLIENTS = [
  'Meridian Health Rx',
  'Coastal Sterile Labs',
  'SunState Pharmacy',
  'BayCare Compounding',
  'Premier IV Solutions',
];

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Trusted facilities">
      <div className="container">
        <p className="trust-bar-label">Trusted by sterile compounding facilities across Florida</p>
        <div className="trust-logos" role="list">
          {CLIENTS.map(name => (
            <div className="trust-logo" role="listitem" key={name}>{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
