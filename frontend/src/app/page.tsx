"use client";

import { Target, Zap, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./_components/navbar";
import Recipients from "../components/Recipients";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FeatureCard from "../components/ui/FeatureCard";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import { Spotlight } from "../components/ui/Spotlight";
import { AceternityGrid } from "../components/ui/aceternity-grid";

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

  // Add scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    setShowRecipients(false);
    window.scrollTo(0, 0);
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
    <div className="relative flex flex-col w-full overflow-x-hidden min-h-screen">
      <AceternityGrid />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      <Navbar/>
      
      {/* Hero Section */}
      <AnimatePresence>
        <motion.main
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col justify-start items-center w-full relative z-10 min-h-screen pt-32 md:pt-40"
        >
          <div className="relative flex flex-col items-center gap-10 w-full overflow-y-hidden px-4 max-w-6xl mx-auto">
            
            <motion.h1
              variants={fadeInUp}
              className="bg-clip-text bg-gradient-to-br from-white via-30% via-white to-white/30 mx-2 font-medium text-[40px] text-transparent md:text-[72px] text-center leading-[60px] md:leading-[82px] relative z-10"
            >
              Stay Accountable & <br /> Achieve More
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto flex w-full max-w-md items-center justify-center relative z-20 mt-4"
            >
              <Button onClick={handleGetStarted} withMovingBorder className="bg-[#1a1a1a]" icon="arrow" fullWidth>
                Start Your Journey
              </Button>
            </motion.div>
            
            <motion.p
              variants={fadeInUp}
              className="text-neutral-400 text-lg text-center max-w-md mx-auto"
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
      <Section className="relative z-10">
        <div className="max-w-[600px] mx-auto">
          <Card className="bg-[#0B1120] p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Make Every Monday Count
            </h2>
            <p className="text-neutral-300 mb-8 mx-auto text-lg">
              Join ambitious professionals who use our weekly check-ins to stay accountable and achieve their goals faster.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleGetStarted} 
                withMovingBorder 
                icon="send"
                className="bg-[#1a1a1a] w-full text-white"
              >
                Begin Your Journey
              </Button>
            </div>
          </Card>
        </div>
      </Section>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 py-8 border-t border-blue-500/20"
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