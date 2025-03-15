import React from 'react';
import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  alt?: string;
  opacity?: number;
  width?: number;
  height?: number;
  className?: string;
}

const BackgroundImage = ({ 
  src, 
  alt = "background", 
  opacity = 0.4,
  width = 800,
  height = 600,
  className = "bottom-[-100px] absolute w-full h-full"
}: BackgroundImageProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ opacity }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80"></div>
    </div>
  );
};

export default BackgroundImage;