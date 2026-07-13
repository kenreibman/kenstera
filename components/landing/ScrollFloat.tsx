"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
}

export default function ScrollFloat({ children }: ScrollFloatProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  const split = useMemo(
    () =>
      children.split("\n").map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block" }}>
          {line.split(" ").map((word, wordIndex, words) => (
            <span
              key={wordIndex}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="char">
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="char">{" "}</span>
              )}
            </span>
          ))}
        </span>
      )),
    [children]
  );

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".char"),
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          transformOrigin: "50% 0%",
        },
        {
          opacity: 0,
          yPercent: 250,
          scaleY: 1.2,
          scaleX: 0.9,
          stagger: 0.05,
          ease: "power2.inOut",
          duration: 1,
          force3D: true,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=1000",
            scrub: 1.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children]);

  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-end p-4 md:p-8 pointer-events-none">
      <h1
        ref={textRef}
        aria-label={children.replace(/\n/g, " ")}
        className="scroll-float-text font-dirtyline text-white"
        style={{
          fontSize: "clamp(3rem, 15vw, 317px)",
          lineHeight: 0.85,
          letterSpacing: "0",
        }}
      >
        <span aria-hidden="true">{split}</span>
      </h1>
    </div>
  );
}
