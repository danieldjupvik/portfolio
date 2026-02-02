import { useEffect, useRef, useState } from 'react';

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const ringPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const initialized = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      if (!initialized.current) {
        ringPos.current = { x: e.clientX, y: e.clientY };
        initialized.current = true;
      }

      if (!isVisible) setIsVisible(true);

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, input, textarea, select, [role="button"], .link');
      setIsHovering(!!interactive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    let rafId: number;

    const animate = () => {
      // Ring trails behind with faster lerp
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.25;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.25;

      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  const stateClass = isClicking ? 'is-clicking' : isHovering ? 'is-hovering' : '';

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? 'is-visible' : ''} ${stateClass}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? 'is-visible' : ''} ${stateClass}`}
      />
    </>
  );
};
