import React, { useState } from 'react';
import { Bell, Grid, ShoppingBag, Disc, Clock, CheckCircle, Plus, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, DayActivity } from '../types';
import { generateTaskSuggestions } from '../services/geminiService';

interface DashboardProps {
  user: User;
  activityData: DayActivity[];
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activityData, onNavigate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCreateTask = async () => {
    setShowSuggestions(true);
    if (suggestions.length === 0) {
        setIsGenerating(true);
        const tasks = await generateTaskSuggestions("Product Designer");
        setSuggestions(tasks);
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-primary-light p-6 overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
            <span className="animate-pulse text-yellow-500">☀</span> Good Morning
          </div>
          <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-full shadow-sm">
            <Bell size={20} className="text-primary" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-sm">
            <Grid size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Create Task CTA */}
      <div className="bg-white rounded-3xl p-4 mb-6 flex items-center justify-between shadow-sm cursor-pointer active:scale-95 transition-transform" onClick={handleCreateTask}>
        <div className="flex items-center gap-4">
          <div className="bg-primary text-white p-3 rounded-full">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="font-bold text-primary">Create New Task</h3>
            <p className="text-xs text-gray-400">Ask AI to plan your day</p>
          </div>
        </div>
        <div className="text-primary">▶</div>
      </div>

      {/* AI Suggestions Modal Area (Inline for demo) */}
      {showSuggestions && (
        <div className="mb-6 bg-green-100 p-4 rounded-2xl border border-green-200">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-primary flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-600"/> AI Suggestions
                </h4>
                <button onClick={() => setShowSuggestions(false)} className="text-xs text-gray-500">Close</button>
            </div>
            {isGenerating ? (
                <div className="flex items-center justify-center py-4 text-sm text-gray-500">
                    Thinking...
                </div>
            ) : (
                <div className="space-y-2">
                    {suggestions.map((task, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl shadow-sm text-sm flex justify-between items-center">
                            <div>
                                <p className="font-medium text-primary">{task.title}</p>
                                <p className="text-xs text-gray-400">{task.estimatedDuration}</p>
                            </div>
                            <button className="bg-secondary text-primary px-3 py-1 rounded-lg text-xs font-bold">+</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )}

      {/* Summary Grid */}
      <h2 className="font-bold text-primary mb-4">Summary</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <ShoppingBag size={18} className="text-primary" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Project</span>
            <span className="text-2xl font-bold text-primary">150</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <Disc size={18} className="text-blue-600" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Client</span>
            <span className="text-2xl font-bold text-primary">75</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <div className="bg-purple-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <Clock size={18} className="text-purple-600" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Ongoing</span>
            <span className="text-2xl font-bold text-primary">50</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <div className="bg-yellow-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <CheckCircle size={18} className="text-yellow-600" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Done</span>
            <span className="text-2xl font-bold text-primary">100</span>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-3xl p-5 shadow-sm flex-1 min-h-[250px]">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="bg-primary text-white p-2 rounded-full">
                    <span className="text-xs">🏃</span>
                </div>
                <div>
                    <h3 className="font-bold text-primary">Activity</h3>
                    <p className="text-xs text-gray-400">30h 50m on this week</p>
                </div>
            </div>
            <button onClick={() => onNavigate('CALENDAR')} className="text-primary text-2xl">›</button>
        </div>

        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} barSize={20}>
                    <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: '#9ca3af'}} 
                        dy={10}
                    />
                    <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    />
                    <Bar dataKey="hours" radius={[10, 10, 10, 10]}>
                        {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.day === 'Wed' ? '#153e28' : '#e5e7eb'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;