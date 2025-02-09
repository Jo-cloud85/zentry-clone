import { useRef } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import gsap from "gsap";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

interface TextEffectProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextEffect: React.FC<TextEffectProps> = ({ text, className = '', style = {} }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  // Handle Mouse Leave
  const handleMouseLeave = () => {
    const element = textRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0, 
        rotateY: 0,
        ease: 'power1.out'
      })
    }
  }

  // Handle Mouse Move
  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    const { clientX, clientY } = e;
    const element = textRef.current;

    if(!element) return;

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
    })
  }
  
  return (
    <div 
      ref={textRef}
      className={className}
      style={{
        display: 'inline-block',
        cursor: 'default',
        ...style
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {text}
    </div>
  );
};

const Footer = () => {
  

  
  
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
        <TextEffect 
          text="Zentry" 
          className="bento-title special-font
            text-[26vw]
            xs:text-[28vw]
            sm:text-[30vw]
            md:text-[32vw]
            lg:text-[34vw]
            xl:text-[36vw]
            2xl:text-[38vw]
            w-full text-center leading-none"
        />
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Nova 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer