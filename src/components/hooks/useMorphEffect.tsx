import { useRef } from "react";
import gsap from "gsap";

interface MorphHandlers {
  handleMouseLeave: () => void;
  handleMouseMove: (e: { clientX: number; clientY: number }) => void;
  elementRef: React.RefObject<HTMLElement>;
}

export const useMorphEffect = (): MorphHandlers => {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseLeave = () => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.out'
    });
  };

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = e;
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: 'power1.out'
    });
  };

  return { handleMouseLeave, handleMouseMove, elementRef };
};