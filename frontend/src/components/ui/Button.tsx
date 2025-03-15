"use client";

import React from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
  type = 'button',
  fullWidth = false
}: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={`
        w-full px-6 py-3 rounded-xl
        bg-[#b4b2b21a] border border-blue-500/20
        text-blue-400 font-medium
        transition-all duration-300
        hover:border-blue-500/40 hover:bg-blue-500/5
        flex items-center justify-center gap-2
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
      {icon === 'arrow' && <ArrowRight size={16} />}
      {icon === 'send' && <Send size={16} />}
    </motion.button>
  );
};

export default Button;