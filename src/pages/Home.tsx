import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';

const Projects = lazy(() => import('../components/Projects'));

const Home = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
    </>
  );
};

export default Home;
