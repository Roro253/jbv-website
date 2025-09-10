'use client';

import { useEffect } from 'react';

export default function ClickEffect() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const interactive = (event.target as HTMLElement | null)?.closest(
        'a, button, [role="button"]'
      );
      if (!interactive) return;

      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

