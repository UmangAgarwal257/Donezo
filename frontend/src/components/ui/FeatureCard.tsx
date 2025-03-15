import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from './Card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay = "0.2s"
}: FeatureCardProps) => {
  return (
    <div className="animate-slide-up" style={{ animationDelay: delay }}>
      <Card>
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
          <Icon className="text-blue-400" size={20} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-neutral-400">
          {description}
        </p>
      </Card>
    </div>
  );
};

export default FeatureCard; 