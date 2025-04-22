import { useEffect } from 'react';
import desktopHeroBg from '../assets/img/hero-desktop.jpg';
import mobileHeroBg from '../assets/img/hero-mobile.jpg';

// Component to handle background image loading
const HeroBackground = () => {
  useEffect(() => {
    // Set CSS variables that will be used in the SCSS
    document.documentElement.style.setProperty(
      '--hero-mobile-bg',
      `url(${mobileHeroBg})`
    );
    document.documentElement.style.setProperty(
      '--hero-desktop-bg',
      `url(${desktopHeroBg})`
    );
  }, []);

  // This component doesn't render anything visible
  return null;
};

export { HeroBackground };
