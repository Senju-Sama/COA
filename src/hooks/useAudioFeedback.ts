import { useRef, useCallback } from 'react';
import { useToolsStore } from '../store/useToolsStore';

export function useAudioFeedback() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { isAudioMuted } = useToolsStore();

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playSound = useCallback((type: 'click' | 'toggle' | 'chime' | 'error') => {
    if (isAudioMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'click':
        // Slide Change: Low-frequency subtle click (120Hz, 20ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.02);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
        break;
      case 'toggle':
        // Tool Toggle: Soft resonant beep (440Hz, 30ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
        break;
      case 'chime':
        // Quiz Correct: Distinct harmonic chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case 'error':
        // Quiz Incorrect: Subtle low alert
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
    }
  }, [isAudioMuted, initAudio]);

  return {
    playClick: () => playSound('click'),
    playToggle: () => playSound('toggle'),
    playChime: () => playSound('chime'),
    playError: () => playSound('error'),
  };
}
