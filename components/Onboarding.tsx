import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col h-full bg-primary-light dark:bg-gray-900 relative overflow-hidden p-6 transition-colors duration-500">
      <div className="mt-12 text-center z-10 animate-fade-in">
        <h1 className="text-3xl font-bold text-primary dark:text-green-400 tracking-tight">Phil Reminder</h1>
      </div>

      {/* Illustration Placeholder Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full blur-3xl opacity-50 top-1/4 left-1/2 transform -translate-x-1/2 animate-pulse-slow"></div>
        <div className="relative z-10 flex flex-col items-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg mb-[-20px] z-20 animate-bounce">
                <span className="font-bold text-sm px-4 py-1 text-primary dark:text-green-400">Set Your Goals 🚀</span>
            </div>
            <div className="w-64 h-64 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden relative bg-green-100">
                <img 
                    src="https://img.freepik.com/free-vector/customer-support-illustration_23-2148889374.jpg" 
                    alt="Productivity Illustration" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/400/400";
                    }}
                />
            </div>
        </div>
      </div>

      <div className="mb-8 z-10 animate-slide-up" style={{animationDelay: '0.4s'}}>
        <h2 className="text-3xl font-bold text-primary dark:text-white mb-4 leading-tight">
          Schedule Smarter,<br />
          Work Better
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Check and handle your daily schedules in a more convenient way with Phil, your daily assistant.
        </p>
        
        <button 
          onClick={onComplete}
          className="w-full bg-primary dark:bg-green-600 text-white py-4 rounded-3xl font-semibold text-lg shadow-lg hover:bg-green-900 dark:hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >
          Let's Go
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;