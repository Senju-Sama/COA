import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface DeckContainerProps {
  children: ReactNode;
}

export const DeckContainer: React.FC<DeckContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const targetRatio = 16 / 9;
    const handleResize = () => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;

      // Calculate scale to fit within viewport while maintaining 16:9
      let newScale = 1;
      const currentRatio = innerWidth / innerHeight;

      if (currentRatio > targetRatio) {
        // Window is wider than 16:9, scale based on height
        newScale = (innerHeight * 0.9) / 1080; // Assuming 1920x1080 base design
      } else {
        // Window is taller than 16:9, scale based on width
        newScale = (innerWidth * 0.95) / 1920;
      }

      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#000] flex items-center justify-center overflow-hidden">
      {/*
        We establish a fixed 1920x1080 logical coordinate system for the deck.
        This ensures simulations and absolute positioning always work perfectly,
        while CSS transforms handle scaling to the physical screen.
      */}
      <div
        ref={containerRef}
        className="relative bg-surface-base border-structural shadow-2xl flex flex-col"
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {children}
      </div>
    </div>
  );
};
