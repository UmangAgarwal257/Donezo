"use client"

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  className?: string;
}

const examples = [
  {
    id: 1,
    image: '/elon.png',
    title: 'Elon Musk Style',
    description: 'Direct, action-focused accountability checks'
  },
  {
    id: 2,
    image: '/steve.png',
    title: 'Steve Jobs Style',
    description: 'Visionary, inspiring weekly reviews'
  }
];

export function Carousel({ className = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-[#0B1120] p-4 md:p-8">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              <div className="relative w-full max-h-[600px] overflow-hidden rounded-lg">
                <Image
                  src={examples[currentIndex].image}
                  alt={examples[currentIndex].title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Absolute positioned on sides */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            aria-label="Previous example"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            aria-label="Next example"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {examples[currentIndex].title}
          </h3>
          <p className="mt-2 text-neutral-400">
            {examples[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
