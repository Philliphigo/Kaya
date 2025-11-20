import React, { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock, MoreVertical, Check, Circle, Bell, Trash2, X } from 'lucide-react';
import { Task } from '../types';

interface CalendarViewProps {
  onBack: () => void;
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onBack, tasks, onToggleStatus, onDeleteTask }) => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Generate 7 days centered around today
  const generateDays = () => {
    const today = new Date();
    const daysArr = [];
    for (let i = -3; i <= 3; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        daysArr.push({
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d
        });
    }
    return daysArr;
  };

  const days = generateDays();
  const dailyTasks = tasks.filter(t => t.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'work': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200';
          case 'meeting': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200';
          case 'personal': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200';
          case 'health': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200';
          default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      }
  };

  return (
    <div className="flex flex-col h-full bg-primary-light dark:bg-gray-900 p-6 overflow-hidden animate-fade-in transition-colors duration-500" onClick={() => setActiveMenuId(null)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ChevronLeft size={20} className="text-primary dark:text-white" />
        </button>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <span className="text-sm font-bold text-primary dark:text-white">{new Date().toLocaleDateString('en-US', { month: 'long' })}</span>
            <CalendarIcon size={14} className="text-primary dark:text-white"/>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6 animate-slide-up">
        <h1 className="text-3xl font-bold text-primary dark:text-white leading-tight">
            Your Daily<br/>
            Planner & Schedule.
        </h1>
      </div>

      {/* Date Strip */}
      <div className="flex justify-between mb-8 overflow-x-auto no-scrollbar pb-2 px-1 animate-slide-up" style={{animationDelay: '0.1s'}}>
        {days.map((item) => {
            const isSelected = item.date === selectedDate;
            return (
                <div 
                    key={item.date}
                    onClick={(e) => { e.stopPropagation(); setSelectedDate(item.date); }}
                    className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${isSelected ? 'scale-110' : 'opacity-60 hover:opacity-80'}`}
                >
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.day}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors duration-300 ${isSelected ? 'bg-primary dark:bg-green-600 text-white shadow-green-900/20 shadow-lg' : 'bg-white dark:bg-gray-800 text-primary dark:text-white'}`}>
                        {item.date}
                    </div>
                </div>
            );
        })}
      </div>

      <div className="flex justify-between items-center mb-4 animate-fade-in">
        <h2 className="font-bold text-primary dark:text-white">Tasks ({dailyTasks.length})</h2>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-4 pb-24">
        
        {dailyTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-gray-500 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full mb-2 opacity-50">
                    <CalendarIcon size={24} />
                </div>
                <p className="text-sm">No tasks for this day.</p>
            </div>
        ) : (
            dailyTasks.map((task, index) => (
                <div 
                    key={task.id} 
                    className="flex gap-4 group animate-slide-up relative"
                    style={{animationDelay: `${index * 0.1}s`}}
                >
                    <div className="flex flex-col items-center gap-1 pt-2 min-w-[45px]">
                        <span className="text-xs font-bold text-primary dark:text-white">{task.startTime}</span>
                    </div>
                    <div className={`flex-1 ${getCategoryColor(task.category)} p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md relative`}>
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div 
                                onClick={(e) => { e.stopPropagation(); onToggleStatus(task.id); }}
                                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer border-2 transition-colors ${task.status === 'done' ? 'bg-primary border-primary dark:bg-green-600 dark:border-green-600 text-white' : 'bg-white/50 dark:bg-black/20 border-current'}`}
                            >
                                {task.status === 'done' ? <Check size={14} strokeWidth={3} /> : <Circle size={0} />}
                            </div>
                            <div className="min-w-0">
                                <h3 className={`font-bold text-sm truncate ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>{task.title}</h3>
                                <div className="flex items-center gap-2 opacity-70 text-xs mt-1">
                                    <div className="flex items-center gap-1">
                                        <Clock size={10} />
                                        <span>{task.duration || '1h'}</span>
                                    </div>
                                    <span className="capitalize">• {task.category}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {task.reminderMinutes && (
                                <div className="opacity-60" title={`Reminder set for ${task.reminderMinutes} mins before`}>
                                    <Bell size={14} fill="currentColor" />
                                </div>
                            )}
                            <div className="relative">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuId(activeMenuId === task.id ? null : task.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    <MoreVertical size={16} />
                                </button>
                                
                                {/* Context Menu */}
                                {activeMenuId === task.id && (
                                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 z-20 w-32 animate-fade-in">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteTask(task.id);
                                                setActiveMenuId(null);
                                            }}
                                            className="w-full flex items-center gap-2 text-red-500 text-xs font-bold p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}

        {/* Empty Slot Visual Filler */}
        <div className="flex gap-4 opacity-30 dark:opacity-20">
            <div className="flex flex-col items-center gap-1 pt-2 min-w-[45px]">
                <span className="text-xs font-bold text-primary dark:text-white">--:--</span>
            </div>
            <div className="flex-1 h-16 flex items-center">
                 <div className="w-full border-t-2 border-dashed border-gray-400 relative">
                    <span className="absolute -top-3 left-4 bg-primary-light dark:bg-gray-900 px-2 text-xs text-gray-500 font-medium">Free Time</span>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarView;