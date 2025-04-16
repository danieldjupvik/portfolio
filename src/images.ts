// Import all images that will be used in CSS
import heroDesktop from './assets/img/hero-desktop.jpg';
import heroMobile from './assets/img/hero-mobile.jpg';

// Export the images
export const images = {
  heroMobile,
  heroDesktop,
};

// Add images to CSS variables
const root = document.documentElement;
root.style.setProperty('--hero-mobile-bg', `url(${heroMobile})`);
root.style.setProperty('--hero-desktop-bg', `url(${heroDesktop})`);
