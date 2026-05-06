import { useEffect } from 'react';
import { SCROLL_REVEAL_THRESHOLD, SCROLL_STAGGER } from '../constants/animations';

export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target.hasAttribute('data-stagger-children')) {
            Array.from(entry.target.children).forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * SCROLL_STAGGER}ms`;
              child.classList.add('visible');
            });
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: SCROLL_REVEAL_THRESHOLD, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => {
      if (!el.closest('[data-stagger-children]')) observer.observe(el);
    });
    document.querySelectorAll('[data-stagger-children]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
