import React from 'react';
import { TechnicalButton } from '../common/TechnicalButton';

interface QuizSummaryProps {
  score: number;
  total: number;
  onReset: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({ score, total, onReset }) => {
  const percentage = (score / total) * 100;

  let msg = "Needs Review";
  let color = "text-hw-interrupt";
  if (percentage >= 80) {
    msg = "Mastery Achieved";
    color = "text-hw-data";
  } else if (percentage >= 50) {
    msg = "Proficient";
    color = "text-hw-address";
  }

  return (
    <div className="flex flex-col h-full bg-surface-elevated border-structural p-12 items-center justify-center text-center">
      <div className="font-mono text-sm tracking-widest text-text-muted uppercase mb-4">Module Assessment Complete</div>

      <div className={`font-mono text-8xl font-bold mb-6 ${color}`}>
        {score}<span className="text-4xl text-text-muted">/{total}</span>
      </div>

      <div className={`font-sans text-2xl font-semibold tracking-tight uppercase mb-12 ${color}`}>
        [{msg}]
      </div>

      <TechnicalButton onClick={onReset} variant="secondary">
        RESTART MODULE
      </TechnicalButton>
    </div>
  );
};
