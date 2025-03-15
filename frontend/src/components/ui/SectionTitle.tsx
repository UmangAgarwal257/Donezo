import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

const SectionTitle = ({ 
  children, 
  className = '', 
  centered = true 
}: SectionTitleProps) => {
  return (
    <h2 
      className={`text-3xl md:text-4xl font-bold mb-12 text-white animate-slide-up ${centered ? 'text-center' : ''} ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle; 