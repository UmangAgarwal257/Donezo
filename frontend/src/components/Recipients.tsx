"use client";

import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import Image from 'next/image';
import Navbar from '../app/_components/navbar';
import { emailLogApi, SendEmailOptions } from '../services/api';
import toast from 'react-hot-toast';

interface RecipientsProps {
  onBack?: () => void;
}

const Recipients = ({ onBack }: RecipientsProps) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [nextEmailDate, setNextEmailDate] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<SendEmailOptions>({
    style: 'elonMusk',
    type: 'weeklyCheck'
  });

  const formatNextEmailDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName) {
      toast.error('Please enter both email and name');
      return;
    }
    try {
      const response = await emailLogApi.sendTestEmail({
        style: selectedTemplate.style,
        recipient: {
          email: userEmail,
          name: userName
        }
      });
      
      if (response.nextEmailDate) {
        setNextEmailDate(response.nextEmailDate);
      }
      
      toast.success('Successfully registered for weekly reviews!');
      setIsRegistered(true);
    } catch (err) {
      console.error('Failed to register:', err);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="relative flex flex-col gap-24 w-full h-screen overflow-hidden">
      <Image
        src="/vector.png"
        alt="hero"
        width={800}
        height={600}
        className="bottom-[-100px] absolute w-full h-full"
      />
      <Navbar onBack={onBack} showBackButton={true} />
      <main className="flex flex-col flex-1 justify-start items-center gap-16 w-full max-w-4xl mx-auto px-4 pt-8">
        <div className="flex flex-col items-center gap-10 w-full">
          <h1 className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 font-medium text-[40px] text-transparent md:text-[72px] text-center leading-[60px] md:leading-[82px]">
            {isRegistered ? 'You&apos;re All Set! 🚀' : 'Get Weekly Reviews'}
          </h1>

          <div className="w-full space-y-4 bg-[#b4b2b21a] backdrop-blur-lg p-6 border border-neutral-400 rounded-[32px]">
            {!isRegistered ? (
              <>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <h3 className="text-lg font-semibold">Email Style</h3>
                  <div className="flex gap-4 p-2">
                    <select
                      value={selectedTemplate.style}
                      onChange={(e) => setSelectedTemplate(prev => ({ ...prev, style: e.target.value as 'elonMusk' | 'steveJobs' }))}
                      className="bg-[#28282A] px-3 py-2 border border-[#6c6c6c] rounded-lg outline-none text-white"
                    >
                      <option value="elonMusk">Elon Musk Style</option>
                      <option value="steveJobs">Steve Jobs Style</option>
                    </select>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    className="flex items-center justify-between p-4 border border-neutral-400 rounded-xl backdrop-blur-sm"
                    style={{
                      background: "linear-gradient(180deg, rgba(34, 34, 35, 0.4) 0%, rgba(34, 34, 35, 0.2) 100%)"
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Mail size={18} className="text-neutral-400" />
                      <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="flex-1 bg-[#28282A] px-3 py-2 border-0 rounded-md outline-none placeholder:font-medium text-white placeholder:text-[#9B9A9E]"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="flex-1 bg-[#28282A] px-3 py-2 border-0 rounded-md outline-none placeholder:font-medium text-white placeholder:text-[#9B9A9E]"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="p-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors ml-4"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={32} className="text-green-400" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-white">Registration Complete!</h3>
                  <p className="text-neutral-300">
                    Your first weekly review email is scheduled for:
                  </p>
                  <div className="mt-6 p-4 bg-[#28282A] rounded-lg">
                    <p className="text-sm text-neutral-400">
                      📅 Next Email: {nextEmailDate ? formatNextEmailDate(nextEmailDate) : 'Next Monday at 9 AM UTC'}<br />
                      📧 Email Style: {selectedTemplate.style === 'elonMusk' ? 'Elon Musk' : 'Steve Jobs'}<br />
                      ✉️ Sending to: {userEmail}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 mt-4">
                    After that, you&apos;ll receive weekly reviews every Monday at 9 AM UTC
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipients; 