import { create } from 'zustand';

export type DrawingTool = 'pen' | 'highlighter' | 'eraser';

interface ToolsState {
  isWhiteboardActive: boolean;
  activeTool: DrawingTool;
  strokeColor: string;
  strokeWidth: number;
  isSpotlightActive: boolean;
  isAudioMuted: boolean;
  theme: 'dark' | 'light';
  toggleWhiteboard: () => void;
  setTool: (tool: DrawingTool) => void;
  setColor: (color: string) => void;
  toggleSpotlight: () => void;
  toggleAudio: () => void;
  toggleTheme: () => void;
}

export const useToolsStore = create<ToolsState>((set) => ({
  isWhiteboardActive: false,
  activeTool: 'pen',
  strokeColor: '#f59e0b', // Default amber
  strokeWidth: 4,
  isSpotlightActive: false,
  isAudioMuted: true, // Default muted for safety
  theme: 'dark', // Default dark

  toggleWhiteboard: () => set((state) => ({
    isWhiteboardActive: !state.isWhiteboardActive,
    isSpotlightActive: state.isWhiteboardActive ? state.isSpotlightActive : false // turn off spotlight if opening whiteboard
  })),
  setTool: (tool) => set({ activeTool: tool }),
  setColor: (color) => set({ strokeColor: color }),

  toggleSpotlight: () => set((state) => ({
    isSpotlightActive: !state.isSpotlightActive,
    isWhiteboardActive: state.isSpotlightActive ? state.isWhiteboardActive : false // turn off whiteboard if opening spotlight
  })),

  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
}));
