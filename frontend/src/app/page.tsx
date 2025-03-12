"use client";

import { Contact, Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import Navbar from "./_components/navbar";
import Recipients from "../components/Recipients";
import { useState } from "react";

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
    <div className="relative flex flex-col gap-24 w-full h-screen overflow-hidden">
      <Image
        src="/vector.png"
        alt="hero"
        width={800}
        height={600}
        className="bottom-[-100px] absolute w-full h-full z-0"
      />
      <Navbar />
      <main className="flex flex-col flex-1 justify-center items-center gap-16 w-full relative z-10">
        <div className="flex flex-col md:justify-center items-center gap-10 w-full overflow-y-hidden">
          <div
            className="bottom-[30px] absolute flex items-center gap-3 px-6 py-3 border border-[#252525] rounded-[24px] z-20"
            style={{
              background:
                "linear-gradient(to bottom, #535050 0%, rgba(34, 34, 35, 0.6) 99.75%)",
            }}
          >
            <Link href="https://github.com/Mihir2423/mail0">
              <Github size={18} />
            </Link>
            <Link href="https://x.com/mihir___dev">
              <FaTwitter size={18} />
            </Link>
            <Link href="https://mihircodes.in">
              <Contact size={18} />
            </Link>
          </div>
          <h1 className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 mx-2 font-medium text-[40px] text-transparent md:text-[72px] text-center leading-[60px] md:leading-[82px] relative z-10">
            Weekly Updates in <br /> Tech Leaders&apos; Style
          </h1>
          <div className="flex justify-center items-center gap-[24px] md:gap-12 mx-2 px-3 md:px-8 py-2 border-neutral-400 border-t border-b border-dashed font-medium text-neutral-400 max-md:text-[10px] relative z-10">
            <span className="relative text-center">
              Elon Musk Style
              <span className="top-1/2 right-[-12px] md:right-[-24px] absolute border-neutral-400 border-r border-dashed h-[101px] -translate-y-1/2" />
            </span>
            <div className="relative flex flex-col justify-center items-center gap-1">
              <span className="top-1/2 right-[-12px] md:right-[-24px] absolute border-neutral-400 border-r border-dashed h-[101px] -translate-y-1/2" />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Mail size={12} className="translate-y-[0.5px]" />
                  <span className="font-regular text-[12px]">Weekly</span>
                </div>
                <span className="font-medium text-[12px]">Updates</span>
              </div>
              <span className="text-center">Automated Reminders</span>
            </div>
            <span>Steve Jobs Style</span>
          </div>
          <div className="flex flex-col items-center gap-6 relative z-20">
            <button
              onClick={handleGetStarted}
              type="button"
              style={{
                background:
                  "linear-gradient(180deg, #222223 0%, rgba(34, 34, 35, 0.6) 68.75%)",
              }}
              className="px-6 py-3 border border-[#6c6c6c] rounded-lg hover:border-white/40 transition-colors text-lg cursor-pointer relative z-20"
            >
              Get Started
            </button>
            <p className="text-neutral-400 text-sm">
              Send weekly updates and reminders in the style of tech visionaries
            </p>
          </div>
          <div className="hidden relative md:flex justify-center items-center bg-[#b4b2b21a] backdrop-blur-lg md:p-4 md:border border-neutral-400 md:rounded-[32px] z-10">
            <Image
              src={"/mail.png"}
              alt="hero"
              width={800}
              height={600}
              className="rounded-[16px] w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}