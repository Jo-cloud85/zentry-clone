import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title, containerClass
}) => {
  // to help animate the title
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: 'play none none reverse'
        }
      });

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      })
    }, containerRef)

    return () => ctx.revert(); //to clean up upon unmounting of this component
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`animated-title ${containerClass}`}
    >
      {title.split('<br />').map((line, index) => (
        <div 
          key={index} 
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(' ').map((word, i) => (
            <span 
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{__html: word}}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle;

/*
dangerouslySetInnerHTML is a feature in React that allows you to set HTML content directly within a component. 
It is called "dangerous" because it can expose your application to cross-site scripting (XSS) attacks if not used carefully. 
This feature should be used sparingly and only when absolutely necessary.

In React, you typically render content using JSX, which automatically escapes any HTML to prevent security vulnerabilities. 
However, if you need to render raw HTML (e.g., from a trusted source), you can use dangerouslySetInnerHTML.
*/