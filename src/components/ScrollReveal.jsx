import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  blurStrength = 5,
  containerClassName = "",
  textClassName = "",
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;

      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current || window;

    const words = el.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top 80%",
        end: "bottom 55%",
        scrub: true,
      },
    });

    tl.fromTo(
      words,
      {
        opacity: baseOpacity,
        y: 18,
        filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.03,
        ease: "none",
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    blurStrength,
  ]);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`}
    >
      <p className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </p>
    </div>
  );
}