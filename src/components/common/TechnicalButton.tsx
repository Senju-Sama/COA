import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';

interface TechnicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const TechnicalButton: React.FC<TechnicalButtonProps> = ({
  children, active = false, variant = 'secondary', className = '', onClick, ...props
}) => {
  const { playClick } = useAudioFeedback();

  const baseClasses = "relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-1 focus:ring-hw-control";

  let variantClasses = "";
  if (variant === 'secondary') {
    variantClasses = active
      ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 border-structural"
      : "bg-surface-inset text-text-secondary border-structural hover:text-text-primary hover:bg-zinc-200 dark:hover:bg-zinc-800";
  } else if (variant === 'primary') {
    variantClasses = "bg-hw-control text-white border border-hw-control hover:bg-cyan-600";
  } else if (variant === 'danger') {
    variantClasses = "bg-hw-interrupt text-white border border-hw-interrupt hover:bg-red-600";
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {/* Decorative tech corners could go here, but keeping it strict 0px border for now */}
      {children}
    </button>
  );
};
