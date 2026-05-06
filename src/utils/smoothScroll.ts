export function smoothScrollTo(href: string): void {
  const target = document.querySelector(href);
  if (!target) return;
  const offset = 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
