import dynamic from 'next/dynamic';
import React from 'react';
import { NeatConfig } from "@firecms/neat";

const NeatGradientComponent = dynamic(
  () => import('./NeatGradientComponent'),
  { ssr: false }
);

interface DynamicNeatGradientProps extends Partial<NeatConfig> {
  className?: string;
}

const DynamicNeatGradient: React.FC<DynamicNeatGradientProps> = (props) => {
  return <NeatGradientComponent {...props} />;
};

export default DynamicNeatGradient;