import { useEffect } from 'react';
import { useDeckStore } from '../store/useDeckStore';
import { useToolsStore } from '../store/useToolsStore';

export function useKeyboardNavigation() {
  const {
    nextSlide, prevSlide, toggleOverview, toggleNotes, toggleShortcuts
  } = useDeckStore();

  const { toggleWhiteboard, toggleSpotlight } = useToolsStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement ||
        document.activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'w':
        case 'W':
          e.preventDefault();
          toggleWhiteboard();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          toggleSpotlight();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          toggleNotes();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          toggleOverview();
          break;
        case '?':
          e.preventDefault();
          toggleShortcuts();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleOverview, toggleNotes, toggleShortcuts, toggleWhiteboard, toggleSpotlight]);
}
