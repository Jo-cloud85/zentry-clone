import AnimatedTitle from "./AnimatedTitle";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";
import { useMorphEffect } from "./hooks/useMorphEffect";

interface MorphImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MorphImage: React.FC<MorphImageProps> = ({ src, alt, className = '' }) => {
  const { elementRef, handleMouseLeave, handleMouseMove } = useMorphEffect();

  return (
    <img 
      ref={elementRef as React.RefObject<HTMLImageElement>}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
      onMouseEnter={handleMouseLeave}
      onMouseMove={handleMouseMove}
      src={src}
      alt={alt}
      className={className}
    />
  );
};

const Story = () => {
  return (
    <section
      id="story"
      className="min-h-dvh w-screen bg-black text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>
        {/* Main */}
        <div className="relative size-full">
          <AnimatedTitle 
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>" 
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <MorphImage 
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-container"
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>
        {/* Right corner text & button */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite opportunities.
            </p>
            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story;