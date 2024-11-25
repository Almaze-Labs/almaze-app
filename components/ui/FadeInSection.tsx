import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  direction = 'up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10'
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${directionClasses[direction]} 
        ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0'}
        ${className}`}
    >
      {children}
    </div>
  );
};
