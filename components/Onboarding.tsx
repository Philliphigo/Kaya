import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col h-full bg-primary-light relative overflow-hidden p-6">
      <div className="mt-12 text-center z-10">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Timezy</h1>
      </div>

      {/* Illustration Placeholder Area - Simulating the vector art in the design */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50 top-1/4 left-1/2 transform -translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-2 rounded-2xl shadow-lg mb-[-20px] z-20 animate-bounce">
                <span className="font-bold text-sm px-4 py-1">Join</span>
            </div>
            <img 
                src="https://img.freepik.com/free-vector/customer-support-illustration_23-2148889374.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123" 
                alt="Productivity Illustration" 
                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-xl"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/400/400";
                }}
            />
        </div>
      </div>

      <div className="mb-8 z-10">
        <h2 className="text-3xl font-bold text-primary mb-4 leading-tight">
          Schedule Smarter,<br />
          Work Better
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          You can check and handle your project schedules in a more convenient way with AI assistance.
        </p>
        
        <button 
          onClick={onComplete}
          className="w-full bg-primary text-white py-4 rounded-3xl font-semibold text-lg shadow-lg hover:bg-green-900 transition-colors flex items-center justify-center gap-2"
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default Onboarding;