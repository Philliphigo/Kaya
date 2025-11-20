import React, { useState, useEffect } from 'react';
import { Bell, Grid, ShoppingBag, Disc, Clock, CheckCircle, Plus, ArrowRight, X, Calendar as CalendarIcon, BellRing } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User, DayActivity, Task } from '../types';

interface DashboardProps {
  user: User;
  tasks: Task[];
  activityData: DayActivity[];
  onNavigate: (view: string) => void;
  onAddTask: (task: Task) => void;
  onShowNotifications: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, tasks, activityData, onNavigate, onAddTask, onShowNotifications }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Filter Modal State
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState<'all'|'work'|'active'|'done'>('all');

  // Add Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("09:00");
  const [newTaskCategory, setNewTaskCategory] = useState("work");
  const [newTaskReminder, setNewTaskReminder] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Computed Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const ongoingTasks = tasks.filter(t => t.status === 'in-progress').length;
  const workTasks = tasks.filter(t => t.category === 'work').length;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleConfirmAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      userId: user.id,
      title: newTaskTitle,
      description: "",
      startTime: newTaskTime,
      date: currentTime.getDate(),
      category: newTaskCategory as any,
      status: 'todo',
      duration: '1h',
      reminderMinutes: newTaskReminder > 0 ? newTaskReminder : undefined
    };
    onAddTask(task);
    setShowAddModal(false);
    setNewTaskTitle("");
    setNewTaskReminder(0);
  };

  const openFilter = (type: 'all'|'work'|'active'|'done') => {
    setFilterType(type);
    setShowFilterModal(true);
  };

  const getFilteredTasks = () => {
      switch(filterType) {
          case 'work': return tasks.filter(t => t.category === 'work');
          case 'active': return tasks.filter(t => t.status === 'in-progress' || t.status === 'todo');
          case 'done': return tasks.filter(t => t.status === 'done');
          default: return tasks;
      }
  };

  return (
    <div className="flex flex-col h-full bg-primary-light dark:bg-gray-900 p-6 overflow-y-auto no-scrollbar pb-24 relative transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <span className="animate-pulse-slow text-yellow-500">☀</span> {getGreeting()}
          </div>
          <h1 className="text-2xl font-bold text-primary dark:text-white">{user.name}</h1>
        </div>
        <div className="flex gap-3">
            <div className="hidden sm:block text-right mr-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">{currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</div>
                <div className="text-sm font-bold text-primary dark:text-green-400">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
          <button 
            onClick={onShowNotifications}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell size={20} className="text-primary dark:text-green-400" />
          </button>
          <button 
            onClick={() => openFilter('all')}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Grid size={20} className="text-primary dark:text-green-400" />
          </button>
        </div>
      </div>

      {/* Create Task CTA */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl p-4 mb-6 flex items-center justify-between shadow-sm cursor-pointer active:scale-95 transition-all hover:shadow-md animate-slide-up"
        onClick={() => setShowAddModal(true)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary dark:bg-green-600 text-white p-3 rounded-full shadow-lg shadow-green-900/20">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="font-bold text-primary dark:text-white">Create New Task</h3>
            <p className="text-xs text-gray-400">Add to your schedule</p>
          </div>
        </div>
        <div className="text-primary dark:text-green-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-full">
            <ArrowRight size={16} />
        </div>
      </div>

      {/* Summary Grid */}
      <h2 className="font-bold text-primary dark:text-white mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>Summary</h2>
      <div className="grid grid-cols-2 gap-4 mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
        {/* Card 1 */}
        <div onClick={() => openFilter('work')} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95">
          <div className="bg-green-50 dark:bg-green-900/30 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <ShoppingBag size={18} className="text-primary dark:text-green-400" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Work</span>
            <span className="text-2xl font-bold text-primary dark:text-white">{workTasks}</span>
          </div>
        </div>
        {/* Card 2 */}
        <div onClick={() => openFilter('all')} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95">
          <div className="bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <Disc size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="text-2xl font-bold text-primary dark:text-white">{totalTasks}</span>
          </div>
        </div>
        {/* Card 3 */}
        <div onClick={() => openFilter('active')} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95">
          <div className="bg-purple-50 dark:bg-purple-900/30 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <Clock size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Active</span>
            <span className="text-2xl font-bold text-primary dark:text-white">{ongoingTasks}</span>
          </div>
        </div>
        {/* Card 4 */}
        <div onClick={() => openFilter('done')} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 w-10 h-10 rounded-full flex items-center justify-center mb-3">
            <CheckCircle size={18} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm">Done</span>
            <span className="text-2xl font-bold text-primary dark:text-white">{completedTasks}</span>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm flex-1 min-h-[250px] animate-slide-up" style={{animationDelay: '0.3s'}}>
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="bg-primary dark:bg-green-600 text-white p-2 rounded-full">
                    <span className="text-xs">🏃</span>
                </div>
                <div>
                    <h3 className="font-bold text-primary dark:text-white">Activity</h3>
                    <p className="text-xs text-gray-400">Weekly Overview</p>
                </div>
            </div>
            <button onClick={() => onNavigate('CALENDAR')} className="text-primary dark:text-green-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <CalendarIcon size={20}/>
            </button>
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
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', backgroundColor: '#fff', color: '#000'}}
                    />
                    <Bar dataKey="hours" radius={[10, 10, 10, 10]}>
                        {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.day === 'Wed' ? '#153e28' : '#e5e7eb'} className="dark:opacity-80" />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Details Modal */}
      {showFilterModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 animate-slide-up shadow-2xl h-[60vh] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-primary dark:text-white capitalize">{filterType} Tasks</h3>
                        <span className="bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2 py-1 rounded-full text-primary dark:text-white">{getFilteredTasks().length}</span>
                      </div>
                      <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-full">
                          <X size={20} />
                      </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                      {getFilteredTasks().length === 0 ? (
                          <div className="text-center text-gray-400 mt-10">No tasks found in this category.</div>
                      ) : (
                          getFilteredTasks().map(t => (
                            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-primary dark:border-green-500">
                                <div>
                                    <div className={`font-bold text-sm ${t.status === 'done' ? 'line-through opacity-50' : ''} text-primary dark:text-white`}>{t.title}</div>
                                    <div className="text-xs text-gray-400">{t.startTime} • {t.category}</div>
                                </div>
                                {t.status === 'done' && <CheckCircle size={16} className="text-green-500"/>}
                            </div>
                          ))
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 animate-slide-up shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-primary dark:text-white">Add New Task</h3>
                      <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-full">
                          <X size={20} />
                      </button>
                  </div>

                  {/* Manual Entry */}
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Task Title</label>
                          <input 
                            type="text" 
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="e.g. Meeting with Design Team"
                            className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-primary dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                          />
                      </div>
                      <div className="flex gap-4">
                          <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Time</label>
                              <input 
                                type="time" 
                                value={newTaskTime}
                                onChange={(e) => setNewTaskTime(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-primary dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                              />
                          </div>
                          <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Category</label>
                              <select 
                                value={newTaskCategory}
                                onChange={(e) => setNewTaskCategory(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-primary dark:text-white outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                  <option value="work">Work</option>
                                  <option value="personal">Personal</option>
                                  <option value="meeting">Meeting</option>
                                  <option value="health">Health</option>
                              </select>
                          </div>
                      </div>

                      {/* Reminder Selector */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Reminder</label>
                        <div className="relative">
                            <BellRing size={16} className="absolute left-3 top-3.5 text-gray-400" />
                            <select 
                                value={newTaskReminder}
                                onChange={(e) => setNewTaskReminder(parseInt(e.target.value))}
                                className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 pl-10 text-primary dark:text-white outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                            >
                                <option value="0">No Reminder</option>
                                <option value="5">5 minutes before</option>
                                <option value="15">15 minutes before</option>
                                <option value="30">30 minutes before</option>
                                <option value="60">1 hour before</option>
                            </select>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleConfirmAddTask()}
                        disabled={!newTaskTitle}
                        className="w-full bg-primary dark:bg-green-600 text-white font-bold py-4 rounded-2xl mt-2 shadow-lg hover:bg-green-900 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                          Add Task
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Dashboard;