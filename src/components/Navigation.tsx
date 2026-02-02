import React from 'react';
import logo from '@/assets/icon/portfolio-v2-logo.png';

const Navigation = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className='header'>
      <button onClick={scrollToTop} className='header__logo'>
        <img src={logo} alt='Daniel' />
      </button>
    </header>
  );
};

export const MemoizedNavigation = React.memo(Navigation);

export default MemoizedNavigation;
