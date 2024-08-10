"use client";

import { useEffect, useRef } from "react";

export const FitText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      const textElement = textRef.current;
      if (!container || !textElement) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      let fontSize = 100; // Start with a large font size
      textElement.style.fontSize = `${fontSize}px`;

      // Reduce font size until text fits within container
      while (
        (textElement.scrollHeight > containerHeight ||
          textElement.scrollWidth > containerWidth) &&
        fontSize > 1
      ) {
        fontSize--;
        textElement.style.fontSize = `${fontSize}px`;
      }
    };

    resizeText();
    window.addEventListener("resize", resizeText);

    return () => window.removeEventListener("resize", resizeText);
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100px", // Adjust this to your needs
        overflow: "hidden",
      }}
    >
      <div
        className="font-swearDisplay font-bold"
        ref={textRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {text}
      </div>
    </div>
  );
};
