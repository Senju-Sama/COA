import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface KaTeXBlockProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export const KaTeXBlock: React.FC<KaTeXBlockProps> = ({ formula, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    }
  }, [formula, block]);

  if (block) {
    return (
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={`bg-surface-inset border-structural p-4 my-4 overflow-x-auto ${className}`}
      />
    );
  }

  return <span ref={containerRef as React.RefObject<HTMLSpanElement>} className={className} />;
};
