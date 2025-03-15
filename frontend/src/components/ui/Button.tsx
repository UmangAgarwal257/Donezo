"use client";

import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: 'arrow' | 'send' | null;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button = ({ 
  onClick, 
  children, 
  icon = null, 
  className = '', 
  fullWidth = false
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        w-full px-6 py-3 rounded-xl
        bg-[#b4b2b21a] border border-neutral-500/20
        text-neutral-400 font-medium
        transition-all duration-300
        hover:border-neutral-500/40 hover:bg-neutral-500/5
        flex items-center justify-center gap-2
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
      {icon === 'arrow' && <ArrowRight size={16} />}
      {icon === 'send' && <Send size={16} />}
    </div>
  );
};

export default Button;