import React, { useEffect, useRef } from 'react';
import { NeatGradient, NeatConfig } from "@firecms/neat";

interface NeatGradientComponentProps extends Partial<NeatConfig> {
  className?: string;
}

const NeatGradientComponent: React.FC<NeatGradientComponentProps> = ({ className, ...config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    return () => {
      if (gradientRef.current) {
        gradientRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
};

export default NeatGradientComponent;