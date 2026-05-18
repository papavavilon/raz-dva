import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function getScrollContainer() {
  return document.scrollingElement || document.documentElement;
}

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const scroll = () => {
      if (hash) {
        const el = document.getElementById(hash.replace('#', ''));

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        return;
      }

      const container = getScrollContainer();

      container.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scroll);
    });
  }, [pathname, hash]);

  return null;
}
