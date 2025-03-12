import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const Navbar = ({ onBack, showBackButton }: NavbarProps) => {
  return (
    <header className="relative flex justify-between items-center mx-auto max-md:px-3 py-4 w-full max-w-6xl">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </button>
        )}
        <span className="font-bold text-2xl">Donezo</span>
      </div>
      <nav className="hidden top-1/2 left-1/2 absolute sm:flex justify-between items-center gap-6 text-sm -translate-x-1/2 -translate-y-1/2">
        <Link href="https://x.com/code_kartik">Twitter</Link>
        <Link href="https://www.kartiklabhshetwar.me/">Contact</Link>
      </nav>
      <button
        className="flex items-center gap-2 px-3 py-1 rounded-md"
        style={{
          background:
            "linear-gradient(180deg, #222223 0%, rgba(34, 34, 35, 0.6) 68.75%)",
        }}
      >
        <span>Developers start here </span>
        <ArrowRightIcon size={16} />
      </button>
    </header>
  );
};

export default Navbar;