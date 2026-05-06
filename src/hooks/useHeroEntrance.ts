import { useEffect } from 'react';
import { SKELETON_FADE, HERO_STAGGER_DELAY, HERO_ITEM_STAGGER } from '../constants/animations';

export function useHeroEntrance() {
  useEffect(() => {
    const overlay = document.getElementById('skeleton-overlay');
    if (overlay) {
      overlay.style.transition = `opacity ${SKELETON_FADE}ms ease`;
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), SKELETON_FADE);
    }

    const heroEls = [
      document.querySelector('.hero-badge'),
      document.querySelector('.hero-headline'),
      document.querySelector('.hero-sub'),
      document.querySelector('.hero-ctas'),
      document.querySelector('.hero-trust'),
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];
    heroEls.forEach((el, i) => {
      if (!el) return;
      const t = setTimeout(() => {
        el.classList.remove('hero-pre-animate');
        el.classList.add('hero-animate');
      }, HERO_STAGGER_DELAY + i * HERO_ITEM_STAGGER);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);
}
