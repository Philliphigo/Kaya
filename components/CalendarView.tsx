import React, { useEffect, useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { CalendarEvent, User } from '../types';
import { analyzeSchedule } from '../services/geminiService';

interface CalendarViewProps {
  onBack: () => void;
  events: CalendarEvent[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ onBack, events }) => {
  const [selectedDate, setSelectedDate] = useState(18);
  const [aiInsight, setAiInsight] = useState<string>("");

  const days = [
    { day: 'Sun', date: 15 },
    { day: 'Mon', date: 16 },
    { day: 'Tue', date: 17 },
    { day: 'Wed', date: 18 },
    { day: 'Thu', date: 19 },
    { day: 'Fri', date: 20 },
    { day: 'Sat', date: 21 },
  ];

  useEffect(() => {
    const fetchInsight = async () => {
        const insight = await analyzeSchedule(events);
        setAiInsight(insight);
    };
    fetchInsight();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full bg-primary-light p-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={20} className="text-primary" />
        </button>
        <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <span className="text-sm font-bold text-primary">October</span>
            <CalendarIcon size={14} className="text-primary"/>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary leading-tight">
            Your Daily<br/>
            Planner, Calender.
        </h1>
      </div>

      {/* Date Strip */}
      <div className="flex justify-between mb-8 overflow-x-auto no-scrollbar pb-2">
        {days.map((item) => {
            const isSelected = item.date === selectedDate;
            return (
                <div 
                    key={item.date}
                    onClick={() => setSelectedDate(item.date)}
                    className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${isSelected ? 'scale-110' : 'opacity-60'}`}
                >
                    <span className="text-xs text-gray-500">{item.day}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${isSelected ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                        {item.date}
                    </div>
                </div>
            );
        })}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-primary">Wednesday</h2>
        <span className="text-xs text-gray-500">35 Visitors</span>
      </div>

      {/* AI Insight Banner */}
      {aiInsight && (
          <div className="bg-green-100 border border-green-200 text-primary text-xs p-3 rounded-xl mb-4 animate-fade-in">
              ✨ AI Insight: {aiInsight}
          </div>
      )}

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-6 pb-24">
        
        {/* Event 1 */}
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 pt-2 min-w-[40px]">
                <span className="text-xs font-bold text-primary">08:00</span>
                <span className="text-[10px] text-gray-400">AM</span>
            </div>
            <div className="flex-1 bg-pink-100 p-4 rounded-2xl flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?u=floyd" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white" />
                <div>
                    <h3 className="font-bold text-primary text-sm">Floyd Miles</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={10} />
                        <span>8:00 - 8:15 am</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Event 2 */}
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 pt-2 min-w-[40px]">
                <span className="text-xs font-bold text-primary">08:30</span>
                <span className="text-[10px] text-gray-400">AM</span>
            </div>
            <div className="flex-1 bg-yellow-100 p-4 rounded-2xl flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?u=logan" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white" />
                <div>
                    <h3 className="font-bold text-primary text-sm">Logan Anderson</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={10} />
                        <span>8:15 - 8:30 am</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Empty Slot */}
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 pt-2 min-w-[40px]">
                <span className="text-xs font-bold text-primary">09:00</span>
                <span className="text-[10px] text-gray-400">AM</span>
            </div>
            <div className="flex-1 h-16 flex items-center">
                 <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                    <span className="absolute -top-3 left-4 bg-primary-light px-2 text-xs text-gray-400">Having breakfast</span>
                 </div>
            </div>
        </div>

        {/* Event 3 */}
        <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1 pt-2 min-w-[40px]">
                <span className="text-xs font-bold text-primary">10:00</span>
                <span className="text-[10px] text-gray-400">AM</span>
            </div>
            <div className="flex-1 bg-gray-200 p-4 rounded-2xl flex items-center gap-4 opacity-70">
                <img src="https://i.pravatar.cc/150?u=meeting" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white grayscale" />
                <div>
                    <h3 className="font-bold text-primary text-sm">Meeting Client</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={10} />
                        <span>9:00 - 10:00 am</span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Event 4 */}
        <div className="flex gap-4">
             <div className="flex flex-col items-center gap-1 pt-2 min-w-[40px]">
                 <span className="text-xs font-bold text-primary">10:30</span>
                 <span className="text-[10px] text-gray-400">AM</span>
             </div>
             <div className="flex-1 bg-cyan-100 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-300 flex items-center justify-center text-white text-xs font-bold">DM</div>
                 <div>
                     <h3 className="font-bold text-primary text-sm">Daily Meeting</h3>
                     <div className="flex items-center gap-1 text-gray-500 text-xs">
                         <Clock size={10} />
                         <span>10:00 - 11:00 am</span>
                     </div>
                 </div>
             </div>
         </div>

      </div>
    </div>
  );
};

export default CalendarView;