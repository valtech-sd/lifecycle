import { useState, useEffect } from 'react';

export default function useIntersection(element) {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: '0.75' }
    );

    element.current && observer.observe(element.current);

    return () => observer.unobserve(element.current);
  }, [element]);

  return isVisible;
}
