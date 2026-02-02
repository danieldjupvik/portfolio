import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Aurora } from './reactbits';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const typewriterTimer = setTimeout(() => setShowTypewriter(true), 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(typewriterTimer);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='hero' id='home'>
      <div className='hero__aurora'>
        <Aurora
          colorStops={['#0a0a0a', '#74f7d9', '#0a0a0a']}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      <div className='hero__content'>
        <div className={`hero__intro ${isVisible ? 'is-visible' : ''}`}>
          <span className='hero__intro--label'>Frontend Developer</span>
          <h1 className='hero__intro--heading'>
            <span className='hero__intro--line hero__intro--line-1'>
              Hi, I'm
            </span>
            <span className='hero__intro--line hero__intro--line-2'>
              <span className='hero__intro--name'>
                {showTypewriter ? (
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString('Daniel').start();
                    }}
                    options={{
                      cursor: '_',
                      delay: 120,
                    }}
                  />
                ) : (
                  <span className='hero__intro--cursor'>_</span>
                )}
              </span>
              <span className='hero__intro--dot'>.</span>
            </span>
          </h1>
          <p className='hero__intro--tagline'>
            Building digital experiences with code & creativity
          </p>
        </div>

        <div className={`hero__actions ${isVisible ? 'is-visible' : ''}`}>
          <a href='mailto:sockets.might-9b@icloud.com' className='hero__btn hero__btn--primary'>
            <span>Get in touch</span>
            <ArrowRight size={20} />
          </a>
          <button onClick={scrollToProjects} className='hero__btn hero__btn--secondary'>
            View work
          </button>
        </div>
      </div>

      <button onClick={scrollToProjects} className='hero__scroll'>
        <span className='hero__scroll--text'>Scroll</span>
        <ChevronDown size={20} className='hero__scroll--icon' />
      </button>
    </div>
  );
};

export const MemoizedHero = React.memo(Hero);

export default MemoizedHero;
