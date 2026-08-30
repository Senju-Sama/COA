import React, { useEffect, useState } from 'react';
import { useToolsStore } from '../../store/useToolsStore';

export const SpotlightOverlay: React.FC = () => {
  const { isSpotlightActive } = useToolsStore();
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (!isSpotlightActive) return;

    // Track mouse globally relative to viewport, not just the container
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSpotlightActive]);

  if (!isSpotlightActive) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`
      }}
    />
  );
};
