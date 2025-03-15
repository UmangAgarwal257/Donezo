import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative group">
      <div className="relative p-6 md:p-8 bg-[#1a1a1a]/80 backdrop-blur-sm border border-neutral-800 rounded-[20px] md:rounded-[32px] overflow-hidden">
        <GlowingEffect 
          blur={20}
          spread={50}
          glow={true}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm md:text-base text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
} 