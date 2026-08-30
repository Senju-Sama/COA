import { create } from 'zustand';

interface DeckState {
  currentSlide: number; // 1 to 10
  totalSlides: number;
  isNotesOpen: boolean;
  isOverviewOpen: boolean;
  isShortcutsOpen: boolean;
  setSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toggleNotes: () => void;
  toggleOverview: () => void;
  toggleShortcuts: () => void;
}

export const useDeckStore = create<DeckState>((set) => ({
  currentSlide: 1,
  totalSlides: 10,
  isNotesOpen: false,
  isOverviewOpen: false,
  isShortcutsOpen: false,
  setSlide: (index) => set((state) => ({
    currentSlide: Math.max(1, Math.min(state.totalSlides, index))
  })),
  nextSlide: () => set((state) => ({
    currentSlide: Math.min(state.totalSlides, state.currentSlide + 1)
  })),
  prevSlide: () => set((state) => ({
    currentSlide: Math.max(1, state.currentSlide - 1)
  })),
  toggleNotes: () => set((state) => ({ isNotesOpen: !state.isNotesOpen })),
  toggleOverview: () => set((state) => ({ isOverviewOpen: !state.isOverviewOpen })),
  toggleShortcuts: () => set((state) => ({ isShortcutsOpen: !state.isShortcutsOpen })),
}));
