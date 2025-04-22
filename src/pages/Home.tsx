import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import Overlay from '../components/Overlay';

const Projects = lazy(() => import('../components/Projects'));

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (showOverlay) return <Overlay />;
  return (
    <>
      <Navigation />
      <Hero />
      <Suspense fallback={<div>Loading projects…</div>}>
        <Projects />
      </Suspense>
    </>
  );
};

export default Home;
