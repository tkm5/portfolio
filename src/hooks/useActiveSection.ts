'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [sectionIds]);

  return activeSection;
}
