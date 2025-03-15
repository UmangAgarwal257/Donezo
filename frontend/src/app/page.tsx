"use client";

import { Mail, Target, Zap, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./_components/navbar";
import Recipients from "../components/Recipients";
import { useState } from "react";

// UI Components
import Image from 'next/image';
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FeatureCard from "../components/ui/FeatureCard";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [showRecipients, setShowRecipients] = useState(false);

  const handleBack = () => {
    setShowRecipients(false);
  };

  const handleGetStarted = () => {
    try {
      console.log('Get Started clicked - attempting to show Recipients');
      setShowRecipients(true);
      console.log('showRecipients set to true');
    } catch (error) {
      console.error('Error in handleGetStarted:', error);
    }
  };

  if (showRecipients) {
    return <Recipients onBack={handleBack} />;
  }

  return (
    <div className="relative flex flex-col w-full overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/vector.png"
        alt="hero"
        width={800}
        height={600}
        className="fixed bottom-[-100px] w-full h-full"
      />
      <Navbar/>
      
      {/* Hero Section */}
      <AnimatePresence>
        <motion.main
          variants={stagger}
          initial="initial"
          animate="animate"
          className="min-h-screen flex flex-col justify-center items-center gap-16 w-full relative z-10"
        >
          <div className="flex flex-col md:justify-center items-center gap-10 w-full overflow-y-hidden px-4 max-w-6xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              className="bg-clip-text bg-gradient-to-br from-white via-30% via-white to-white/30 mx-2 font-medium text-[40px] text-transparent md:text-[72px] text-center leading-[60px] md:leading-[82px] relative z-10"
            >
              Stay Accountable & <br /> Achieve More
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="flex justify-center items-center gap-[24px] md:gap-12 mx-2 px-3 md:px-8 py-6 relative z-10 w-full max-w-3xl"
            >
              {/* Animated border background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent backdrop-blur-sm border-t border-b border-blue-500/20" />
              
              {/* Content */}
              <div className="relative flex justify-between items-center w-full text-neutral-300">
                <div className="flex-1 text-center relative">
                  <span className="font-medium">Monday Motivation</span>
                  <motion.span 
                    className="absolute top-1/2 right-0 w-px h-12 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 48 }}
                    transition={{ duration: 1 }}
                  />
                </div>

                <div className="flex-1 relative">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Mail size={14} className="text-blue-400" />
                        <span className="text-sm">Weekly</span>
                      </div>
                      <span className="font-medium text-sm">Progress</span>
                    </div>
                    <span className="text-center text-sm">Tech Leader Style</span>
                  </div>
                  <motion.span 
                    className="absolute top-1/2 right-0 w-px h-12 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 48 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>

                <div className="flex-1 text-center">
                  <span className="font-medium">Goal Tracking</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto flex w-full max-w-md items-center justify-center relative z-20"
            >
              <Button onClick={handleGetStarted} icon="arrow" fullWidth>
                Start Your Journey
              </Button>
            </motion.div>
            
            <motion.p
              variants={fadeInUp}
              className="text-neutral-400 text-sm text-center max-w-md mx-auto"
            >
              Get weekly accountability emails inspired by tech visionaries to keep you focused and motivated
            </motion.p>
          </div>
        </motion.main>
      </AnimatePresence>
      
      {/* Features Section */}
      <Section className="min-h-screen flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Transform Your Monday Mindset</SectionTitle>
        </motion.div>
        
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp}>
            <FeatureCard 
              icon={Target}
              title="Weekly Accountability"
              description="Start your week strong with personalized progress check-ins that keep you focused on your goals."
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <FeatureCard 
              icon={Zap}
              title="Motivational Boost"
              description="Get inspired by communication styles of tech leaders like Elon Musk and Steve Jobs to maintain your momentum."
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <FeatureCard 
              icon={TrendingUp}
              title="Consistent Growth"
              description="Track your progress week by week and build momentum with regular check-ins and reminders."
            />
          </motion.div>
        </motion.div>
      </Section>
      
      {/* CTA Section */}
      <Section className="min-h-screen flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card withGlow className="p-8 md:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
            >
              Make Every Monday Count
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-neutral-300 mb-8 max-w-2xl mx-auto"
            >
              Join ambitious professionals who use our weekly check-ins to stay accountable and achieve their goals faster.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <Button onClick={handleGetStarted} icon="send">
                Begin Your Journey
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </Section>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 py-8 border-t border-blue-500/20 backdrop-blur-sm bg-[#0a0a0a]/30"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Donezo. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}