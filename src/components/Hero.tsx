import React, { useEffect, useState, useRef, useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    // Start typewriter after intro animation completes
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += 0.006;
    const time = timeRef.current;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, width, height);

    // Left side orb - stays on left side (0.05 to 0.25 of width)
    const blob1X = width * (0.15 + Math.sin(time) * 0.1);
    const blob1Y = height * (0.4 + Math.sin(time * 0.8) * 0.25);

    const gradient1 = ctx.createRadialGradient(
      blob1X, blob1Y, 0,
      blob1X, blob1Y, width * 0.45
    );
    gradient1.addColorStop(0, 'rgba(116, 247, 217, 0.15)');
    gradient1.addColorStop(0.4, 'rgba(116, 247, 217, 0.05)');
    gradient1.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    // Right side orb - stays on right side (0.75 to 0.95 of width)
    const blob2X = width * (0.85 + Math.cos(time * 0.7) * 0.1);
    const blob2Y = height * (0.6 + Math.sin(time * 0.9) * 0.25);

    const gradient2 = ctx.createRadialGradient(
      blob2X, blob2Y, 0,
      blob2X, blob2Y, width * 0.4
    );
    gradient2.addColorStop(0, 'rgba(116, 247, 217, 0.12)');
    gradient2.addColorStop(0.5, 'rgba(116, 247, 217, 0.03)');
    gradient2.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <div className='hero' id='home'>
      <canvas ref={canvasRef} className='hero__canvas' />

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
