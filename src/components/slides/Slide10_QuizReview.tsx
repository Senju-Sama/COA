import React, { useState } from 'react';
import { QuizQuestionCard } from '../quiz/QuizQuestionCard';
import { QuizSummary } from '../quiz/QuizSummary';

export const Slide10_QuizReview: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Small internal quiz state just for this slide
  const questions = [
    {
      q: "Which I/O approach requires the CPU to execute a busy-wait loop to check device status?",
      opts: ["Interrupt-Driven I/O", "Programmed I/O (Polling)", "Direct Memory Access (DMA)", "Cycle Stealing"],
      ans: 1,
      exp: "Programmed I/O (Polling) forces the CPU to continuously read the status register, wasting cycles."
    },
    {
      q: "What does the DMA Controller do in 'Burst Mode'?",
      opts: ["Interleaves transfers with the CPU.", "Uses interrupts for every byte.", "Monopolizes the system bus until the block is fully transferred.", "Only transfers data during CPU idle cycles."],
      ans: 2,
      exp: "In Burst Mode, the DMAC takes control of the bus and holds it until the entire transfer is complete, blocking the CPU."
    },
    {
      q: "In a Memory-Mapped I/O architecture, how does the CPU write to a peripheral device?",
      opts: ["Using the OUT instruction.", "By sending an interrupt.", "Using standard memory STORE/MOV instructions.", "Using a dedicated I/O bus."],
      ans: 2,
      exp: "Memory-Mapped I/O maps device registers to standard memory addresses, so the CPU uses normal memory instructions."
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setIsDone(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setIsDone(false);
  };

  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Module Assessment
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            This concludes the module on Computer Architecture & Peripheral Subsystems. Use the interactive quiz on the right to test your knowledge.
          </p>

          <div className="bg-surface-elevated border-structural p-5 space-y-4">
            <h4 className="font-sans font-semibold text-text-primary">Key Takeaways</h4>
            <ul className="space-y-2 font-mono text-xs list-disc pl-4 text-text-secondary marker:text-hw-control">
              <li>I/O interfaces abstract complex peripherals from the CPU.</li>
              <li>Polling wastes cycles; Interrupts enable multi-tasking.</li>
              <li>DMA is essential for high-throughput block transfers.</li>
              <li>Bus arbitration manages contention in shared architectures.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Pane: Quiz Container */}
      <div className="flex-1">
        {isDone ? (
          <QuizSummary score={score} total={questions.length} onReset={reset} />
        ) : (
          <QuizQuestionCard
            key={currentQ} // force remount on question change for fresh state
            question={questions[currentQ].q}
            options={questions[currentQ].opts}
            correctIndex={questions[currentQ].ans}
            explanation={questions[currentQ].exp}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLast={currentQ === questions.length - 1}
          />
        )}
      </div>
    </div>
  );
};
