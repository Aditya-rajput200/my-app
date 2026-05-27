"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    if (!dot || !ring) return;

    let animFrame: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);

      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      animFrame = requestAnimationFrame(animate);
    }

    animFrame = requestAnimationFrame(animate);

    function onMove(e: MouseEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    }

    function onEnterHover() {
      ring.classList.add("hovering");
      dot.style.opacity = "0";
    }

    function onLeaveHover() {
      ring.classList.remove("hovering");
      dot.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove);

    const hoverables = document.querySelectorAll(
      "a, button, .magnetic-btn, [data-cursor-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, .magnetic-btn, [data-cursor-hover]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnterHover);
          el.removeEventListener("mouseleave", onLeaveHover);
          el.addEventListener("mouseenter", onEnterHover);
          el.addEventListener("mouseleave", onLeaveHover);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
