import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
  withGlow?: boolean;
}

const Card = ({ 
  children, 
  className = '', 
  withBorder = true,
  withGlow = false
}: CardProps) => {
  if (withGlow) {
    return (
      <div className="relative p-[1.5px] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-[conic-gradient(#3b82f6_20deg,#60a5fa_60deg,#93c5fd_120deg,#3b82f6_180deg)] animate-border-spin"></div>
        <div className={`relative bg-[#0a0a0a]/80 backdrop-blur-md p-6 rounded-2xl ${className}`}>
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-[#0a0a0a]/60 backdrop-blur-sm p-6 rounded-xl ${withBorder ? 'border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card; 