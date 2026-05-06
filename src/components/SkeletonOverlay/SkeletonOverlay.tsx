export function SkeletonOverlay() {
  return (
    <div id="skeleton-overlay" aria-hidden="true">
      <div className="sk-nav">
        <div className="skeleton-block sk-nav-logo" />
        <div className="sk-nav-links">
          <div className="skeleton-block sk-nav-link" />
          <div className="skeleton-block sk-nav-link" />
          <div className="skeleton-block sk-nav-link" />
          <div className="skeleton-block sk-nav-link" />
        </div>
        <div className="skeleton-block sk-nav-btn" />
      </div>
      <div className="sk-hero">
        <div className="skeleton-block sk-badge" />
        <div className="skeleton-block sk-h1-1" />
        <div className="skeleton-block sk-h1-2" />
        <div className="skeleton-block sk-sub-1" />
        <div className="skeleton-block sk-sub-2" />
        <div className="sk-ctas">
          <div className="skeleton-block sk-btn-1" />
          <div className="skeleton-block sk-btn-2" />
        </div>
        <div className="sk-trust">
          <div className="skeleton-block sk-trust-item" />
          <div className="skeleton-block sk-trust-item" />
          <div className="skeleton-block sk-trust-item" />
        </div>
      </div>
    </div>
  );
}
