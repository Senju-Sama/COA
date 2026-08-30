import { useDeckStore } from './store/useDeckStore';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

import { DeckContainer } from './components/deck/DeckContainer';
import { SlideHeader } from './components/deck/SlideHeader';
import { PresenterHUD } from './components/deck/PresenterHUD';
import { OverviewGrid } from './components/deck/OverviewGrid';
import { ShortcutsModal } from './components/deck/ShortcutsModal';
import { WhiteboardOverlay } from './components/tools/WhiteboardOverlay';
import { SpotlightOverlay } from './components/tools/SpotlightOverlay';
import { PresenterNotesDrawer } from './components/tools/PresenterNotesDrawer';

import { Slide01_IntroIO } from './components/slides/Slide01_IntroIO';
import { Slide02_ProgrammedIO } from './components/slides/Slide02_ProgrammedIO';
import { Slide03_InterruptIO } from './components/slides/Slide03_InterruptIO';
import { Slide04_DMAArchitecture } from './components/slides/Slide04_DMAArchitecture';
import { Slide05_BusArbitration } from './components/slides/Slide05_BusArbitration';
import { Slide06_IOInterfaces } from './components/slides/Slide06_IOInterfaces';
import { Slide07_MemoryMappedIO } from './components/slides/Slide07_MemoryMappedIO';
import { Slide08_DeviceControllers } from './components/slides/Slide08_DeviceControllers';
import { Slide09_Performance } from './components/slides/Slide09_Performance';
import { Slide10_QuizReview } from './components/slides/Slide10_QuizReview';

const slides = [
  Slide01_IntroIO,
  Slide02_ProgrammedIO,
  Slide03_InterruptIO,
  Slide04_DMAArchitecture,
  Slide05_BusArbitration,
  Slide06_IOInterfaces,
  Slide07_MemoryMappedIO,
  Slide08_DeviceControllers,
  Slide09_Performance,
  Slide10_QuizReview
];

function App() {
  useKeyboardNavigation();

  const { currentSlide } = useDeckStore();
  const CurrentSlideComponent = slides[currentSlide - 1]; // slides array is 0-indexed, currentSlide is 1-10

  return (
    <DeckContainer>
      <SlideHeader />

      {/* Main Slide Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <CurrentSlideComponent />
      </div>

      <PresenterHUD />

      {/* Overlays */}
      <OverviewGrid />
      <ShortcutsModal />
      <WhiteboardOverlay />
      <SpotlightOverlay />
      <PresenterNotesDrawer />
    </DeckContainer>
  );
}

export default App;
