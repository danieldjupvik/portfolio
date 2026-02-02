import React from 'react';
import logo from '../assets/icon/portfolio-v2-logo.png';

const Navigation = () => {
  return (
    <header className='header'>
      <a href='#home' className='header__logo'>
        <img src={logo} alt='Daniel' />
      </a>
    </header>
  );
};

export const MemoizedNavigation = React.memo(Navigation);

export default MemoizedNavigation;
