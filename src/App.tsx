import { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { VogueCover } from './components/sections/VogueCover';
import { NameAnimation } from './components/sections/NameAnimation';
import { PhotoGallery } from './components/sections/PhotoGallery';
import { GiftBox } from './components/sections/GiftBox';
import { BirthdayCompliments } from './components/sections/BirthdayCompliments';
import { BirthdayWishMaker } from './components/sections/BirthdayWishMaker';
import { FinalWish } from './components/sections/FinalWish';
import { LetterToYou } from './components/sections/LetterToYou';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <Layout>
          <VogueCover />
          <NameAnimation />
          <PhotoGallery />
          <LetterToYou />
          <GiftBox />
          <BirthdayCompliments />
          <BirthdayWishMaker />
          <FinalWish />
        </Layout>
      )}
      <Analytics />
    </>
  );
}

export default App;
