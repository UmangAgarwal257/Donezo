"use client";

import { useState, useEffect } from 'react';
import { Send, Check, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../app/_components/navbar';
import { emailLogApi } from '../services/api';
import toast from 'react-hot-toast';

interface RecipientsProps {
  onBack?: () => void;
}

const Recipients = ({ onBack }: RecipientsProps) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userTimezone, setUserTimezone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [nextEmailDate, setNextEmailDate] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<{style: 'elonMusk' | 'steveJobs', type: 'weeklyCheck' | 'reminder'}>({
    style: 'elonMusk',
    type: 'weeklyCheck'
  });

  useEffect(() => {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  const formatNextEmailDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: userTimezone,
      timeZoneName: 'short'
    });
    return formatter.format(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName) {
      toast.error('Please enter both email and name');
      return;
    }
    try {
      const response = await emailLogApi.register({
        style: selectedTemplate.style,
        recipient: {
          email: userEmail,
          name: userName,
          timezone: userTimezone
        }
      });
      
      if (response.nextEmailDate) {
        setNextEmailDate(response.nextEmailDate);
      }
      
      toast.success('You\'re all set for weekly motivation!');
      setIsRegistered(true);
    } catch (err) {
      console.error('Failed to register:', err);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="relative flex flex-col gap-12 md:gap-24 w-full min-h-screen bg-[#0a0a0a]">
      <Navbar onBack={onBack} showBackButton={true} />
      <main className="flex flex-col flex-1 justify-start items-center gap-8 md:gap-16 w-full max-w-4xl mx-auto px-4 pt-4 md:pt-8">
        <div className="flex flex-col items-center gap-6 md:gap-10 w-full">
          <h1 className="text-white font-medium text-[32px] md:text-[40px] lg:text-[72px] text-center leading-[1.2] md:leading-[1.3]">
            {isRegistered ? 'Your Journey Begins! 🚀' : 'Start Your Growth Journey'}
          </h1>

          <div className="w-full space-y-4 bg-[#1a1a1a] p-4 md:p-6 border border-neutral-800 rounded-[20px] md:rounded-[32px]">
            <AnimatePresence mode="wait">
              {!isRegistered ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-start gap-3 mb-6">
                    <h3 className="text-base md:text-lg font-semibold text-white">Choose Your Mentor Style</h3>
                    <div className="w-full">
                      <select
                        value={selectedTemplate.style}
                        onChange={(e) => setSelectedTemplate(prev => ({ ...prev, style: e.target.value as 'elonMusk' | 'steveJobs' }))}
                        className="w-full bg-[#2a2a2a] px-3 py-2 border border-neutral-700 rounded-lg outline-none text-white text-sm md:text-base"
                      >
                        <option value="elonMusk">Elon Musk - Direct & Action-Focused</option>
                        <option value="steveJobs">Steve Jobs - Visionary & Inspiring</option>
                      </select>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 p-4 border border-neutral-700 rounded-xl bg-[#1f1f1f]">
                      <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <Target size={18} className="text-neutral-400" />
                          <input
                            type="email"
                            placeholder="Your Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="flex-1 bg-[#2a2a2a] px-3 py-2 border-0 rounded-md outline-none text-white placeholder:text-neutral-500 text-sm md:text-base"
                            required
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Target size={18} className="text-neutral-400 invisible" />
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="flex-1 bg-[#2a2a2a] px-3 py-2 border-0 rounded-md outline-none text-white placeholder:text-neutral-500 text-sm md:text-base"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full md:w-auto p-3 md:p-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors md:ml-4"
                      >
                        <Send size={16} className="mx-auto" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 py-4 md:py-8"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg md:text-xl font-semibold text-white">Your Weekly Motivation is Set!</h3>
                    <p className="text-sm md:text-base text-neutral-300">
                      Get ready for your first accountability check-in:
                    </p>
                    <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#2a2a2a] rounded-lg">
                      <p className="text-xs md:text-sm text-neutral-400">
                        📅 First Check-in: {nextEmailDate ? formatNextEmailDate(nextEmailDate) : 'Next Monday at 9 AM'}<br />
                        🎯 Mentor Style: {selectedTemplate.style === 'elonMusk' ? 'Elon Musk - Direct & Action-Focused' : 'Steve Jobs - Visionary & Inspiring'}<br />
                        ✉️ Delivering to: {userEmail}
                      </p>
                    </div>
                    <p className="text-xs md:text-sm text-neutral-500 mt-4">
                      Every Monday at 9 AM in your timezone ({userTimezone}), you&apos;ll receive your personalized motivation boost
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipients;