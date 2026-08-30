import React, { useState } from 'react';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { TechnicalButton } from '../common/TechnicalButton';

interface QuizQuestionCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question, options, correctIndex, explanation, onAnswer, onNext, isLast
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { playChime, playError } = useAudioFeedback();

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === correctIndex;
    onAnswer(isCorrect);
    if (isCorrect) playChime();
    else playError();
  };

  const isAnswered = selected !== null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-surface-elevated border-structural p-8 flex flex-col">
        <h3 className="font-sans text-2xl font-semibold tracking-tight text-text-primary mb-8 leading-tight">
          {question}
        </h3>

        <div className="flex flex-col gap-4">
          {options.map((opt, i) => {
            let stateClass = "bg-surface-inset border-structural text-text-secondary hover:bg-surface-base hover:text-text-primary";

            if (isAnswered) {
              if (i === correctIndex) {
                stateClass = "bg-hw-data/10 border-hw-data text-hw-data";
              } else if (i === selected) {
                stateClass = "bg-hw-interrupt/10 border-hw-interrupt text-hw-interrupt";
              } else {
                stateClass = "bg-surface-inset border-structural text-text-muted opacity-50";
              }
            }

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(i)}
                className={`text-left p-4 transition-all duration-200 font-sans text-lg border ${stateClass}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm opacity-50">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 p-6 bg-surface-base border-structural-l border-hw-control animate-in fade-in slide-in-from-bottom-4">
            <h4 className="font-mono text-xs text-hw-control uppercase tracking-widest mb-2">Rationale</h4>
            <p className="text-text-secondary leading-relaxed">{explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        {isAnswered && (
          <TechnicalButton variant="primary" onClick={onNext}>
            {isLast ? 'VIEW SUMMARY' : 'NEXT QUESTION'}
          </TechnicalButton>
        )}
      </div>
    </div>
  );
};
