import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ 
  children, 
  className = '', 
  id 
}: SectionProps) => {
  return (
    <section 
      id={id}
      className={`relative z-10 py-16 w-full backdrop-blur-sm bg-[#0a0a0a]/30 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default Section; 