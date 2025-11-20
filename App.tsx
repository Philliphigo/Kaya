import React, { useState, useEffect, useMemo, useRef } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import Auth from './components/Auth';
import { ViewState, User, DayActivity, Task, AppSettings } from './types';
import { Home, Calendar, User as UserIcon, Settings, LogOut, Bell, Moon, RefreshCw, Shield, ChevronRight, ChevronLeft, Edit2, Check, X, CreditCard, Heart, Lock, Wallet, Camera, AlertCircle } from 'lucide-react';

// --- Donate Modal Component ---
const DonateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [amount, setAmount] = useState(5);
    const [method, setMethod] = useState('card');

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 animate-slide-up shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary dark:text-white flex items-center gap-2">
                        <Heart className="text-red-500" fill="currentColor" size={20}/> Support Phil
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full dark:text-white">
                        <X size={20} />
                    </button>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
                    Your support helps us keep Phil's servers running!
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    {[5, 10, 20].map((amt) => (
                        <button 
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`py-3 rounded-xl font-bold border-2 transition-all ${amount === amt ? 'border-primary bg-primary/10 text-primary dark:border-green-500 dark:text-green-400' : 'border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                        >
                            ${amt}
                        </button>
                    ))}
                </div>

                <div className="space-y-3 mb-6">
                    <div onClick={() => setMethod('card')} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${method === 'card' ? 'border-primary bg-green-50 dark:bg-green-900/20 dark:border-green-500' : 'border-gray-200 dark:border-gray-700'}`}>
                        <CreditCard size={20} className="text-primary dark:text-white" />
                        <span className="text-sm font-bold text-primary dark:text-white">Credit Card</span>
                    </div>
                    <div onClick={() => setMethod('paypal')} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${method === 'paypal' ? 'border-primary bg-green-50 dark:bg-green-900/20 dark:border-green-500' : 'border-gray-200 dark:border-gray-700'}`}>
                        <Wallet size={20} className="text-blue-600" />
                        <span className="text-sm font-bold text-primary dark:text-white">PayPal</span>
                    </div>
                </div>

                <button onClick={onClose} className="w-full bg-primary dark:bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-900 dark:hover:bg-green-700 transition-colors">
                    Donate ${amount}
                </button>
            </div>
        </div>
    );
};

// --- Privacy Policy Component ---
const PrivacyPolicyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 animate-slide-up shadow-2xl max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary dark:text-white flex items-center gap-2">
                        <Shield size={20}/> Privacy Policy
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full dark:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto no-scrollbar text-sm text-gray-600 dark:text-gray-300 space-y-4 pr-2">
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                    <p>Welcome to the Phil Reminder App. We respect your privacy and are committed to protecting your personal data.</p>
                    <h4 className="font-bold text-primary dark:text-white">1. Data Collection</h4>
                    <p>We collect task data and profile information locally on your device. Your personal data remains on your device and is not sent to any server.</p>
                    <h4 className="font-bold text-primary dark:text-white">2. Usage</h4>
                    <p>Your data is used solely to provide task management and scheduling features.</p>
                    <h4 className="font-bold text-primary dark:text-white">3. Security</h4>
                    <p>We implement standard security measures. However, please note that no method of transmission over the internet is 100% secure.</p>
                    <p>By using this app, you agree to the collection and use of information in accordance with this policy.</p>
                </div>
                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                    <button onClick={onClose} className="w-full bg-gray-100 dark:bg-gray-700 text-primary dark:text-white py-3 rounded-xl font-bold">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Notifications View Component ---
const NotificationsModal: React.FC<{ onClose: () => void, notifications: {id: string, msg: string, time: string}[] }> = ({ onClose, notifications }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6 animate-slide-up shadow-2xl h-[50vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary dark:text-white flex items-center gap-2">
                        <Bell size={20}/> Notifications
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full dark:text-white">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Bell size={40} className="mb-2 opacity-20" />
                            <p>No new notifications</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <div key={n.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-l-4 border-primary dark:border-green-500">
                                <div className="bg-white dark:bg-gray-800 p-2 rounded-full h-fit">
                                    <AlertCircle size={16} className="text-primary dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary dark:text-white">{n.msg}</p>
                                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Profile View Component ---
interface ProfileViewProps {
    user: User;
    tasks: Task[];
    onUpdateUser: (user: User) => void;
    onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, tasks, onUpdateUser, onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user.name);
    const [editRole, setEditRole] = useState(user.role);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const handleSave = () => {
        onUpdateUser({ ...user, name: editName, role: editRole });
        setIsEditing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onUpdateUser({ ...user, avatar: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="h-full flex flex-col p-6 animate-fade-in overflow-y-auto no-scrollbar bg-primary-light dark:bg-gray-900 transition-colors duration-500">
             {/* Header with Back Button */}
             <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <ChevronLeft size={20} className="text-primary dark:text-white" />
                </button>
                <h2 className="text-xl font-bold text-primary dark:text-white">My Profile</h2>
            </div>

            {/* Hidden File Input for Avatar Upload */}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />

            <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer" onClick={triggerFileSelect}>
                    <div className="w-32 h-32 rounded-full bg-green-200 dark:bg-green-900 mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg relative">
                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover transition-opacity group-hover:opacity-70" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera size={32} className="text-white drop-shadow-lg" />
                        </div>
                    </div>
                    <button 
                        className="absolute bottom-4 right-0 bg-primary dark:bg-green-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform z-10"
                    >
                        <Edit2 size={14} />
                    </button>
                </div>

                {isEditing ? (
                    <div className="w-full max-w-xs flex flex-col gap-3 mb-2 animate-fade-in">
                        <input 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)}
                            className="text-center text-xl font-bold text-primary dark:text-white bg-white dark:bg-gray-800 border-b-2 border-primary/20 dark:border-green-500/50 rounded-t-lg outline-none py-2"
                            placeholder="Name"
                        />
                        <input 
                            value={editRole} 
                            onChange={(e) => setEditRole(e.target.value)}
                            className="text-center text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 rounded-t-lg outline-none py-2"
                            placeholder="Role"
                        />
                        <div className="flex justify-center gap-2 mt-2">
                            <button onClick={handleSave} className="bg-primary dark:bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                                <Check size={14} /> Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm">
                                <X size={14} /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center group cursor-pointer" onClick={() => setIsEditing(true)}>
                        <h2 className="text-2xl font-bold text-primary dark:text-white flex items-center justify-center gap-2">
                            {user.name} 
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">{user.role}</p>
                        <p className="text-xs text-primary/50 dark:text-green-400/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Tap to edit name</p>
                    </div>
                )}
            </div>

            <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm animate-slide-up transition-colors" style={{animationDelay: '0.1s'}}>
                <h3 className="font-bold text-primary dark:text-white mb-4">Statistics</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full text-blue-600 dark:text-blue-400">
                                <Check size={16} />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">Total Tasks</span>
                        </div>
                        <span className="font-bold text-primary dark:text-white text-lg">{totalTasks}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-full text-yellow-600 dark:text-yellow-400">
                                <Shield size={16} />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">Completion Rate</span>
                        </div>
                        <span className="font-bold text-primary dark:text-white text-lg">{completionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full text-purple-600 dark:text-purple-400">
                                <Calendar size={16} />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">Member Since</span>
                        </div>
                        <span className="font-bold text-primary dark:text-white text-lg">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Settings View Component ---
interface SettingsViewProps {
    settings: AppSettings;
    onToggle: (key: keyof AppSettings) => void;
    onShowPrivacy: () => void;
    onShowDonate: () => void;
    onLogout: () => void;
    onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onToggle, onShowPrivacy, onShowDonate, onLogout, onBack }) => {
    const settingItems = [
        { key: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { key: 'darkMode', label: 'Dark Mode', icon: <Moon size={18} /> },
        { key: 'calendarSync', label: 'Calendar Sync', icon: <RefreshCw size={18} /> },
        { key: 'soundEffects', label: 'Sound Effects', icon: <Shield size={18} /> },
    ];

    return (
        <div className="h-full p-6 animate-fade-in overflow-y-auto no-scrollbar pb-24 bg-primary-light dark:bg-gray-900 transition-colors duration-500">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-6">
                <button onClick={onBack} className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <ChevronLeft size={20} className="text-primary dark:text-white" />
                </button>
                <h2 className="text-xl font-bold text-primary dark:text-white">Settings</h2>
            </div>
            
            {/* Donate Banner */}
            <div onClick={onShowDonate} className="bg-gradient-to-r from-primary to-green-800 dark:from-green-700 dark:to-green-900 p-4 rounded-2xl mb-6 flex items-center justify-between shadow-lg cursor-pointer active:scale-95 transition-transform text-white">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Heart size={20} fill="currentColor" className="text-white" />
                    </div>
                    <div>
                        <div className="font-bold">Support Phil</div>
                        <div className="text-xs opacity-80">Donate to help us grow</div>
                    </div>
                </div>
                <ChevronRight size={20} />
            </div>

            <div className="space-y-4">
                 {settingItems.map((item) => (
                     <div 
                        key={item.key} 
                        onClick={() => onToggle(item.key as keyof AppSettings)}
                        className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-sm active:scale-95 transition-all cursor-pointer hover:shadow-md"
                     >
                         <div className="flex items-center gap-3 text-primary dark:text-white">
                             <div className="p-2 bg-primary-light dark:bg-gray-700 rounded-full text-primary dark:text-white">
                                {item.icon}
                             </div>
                             <span className="font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                         </div>
                         <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${settings[item.key as keyof AppSettings] ? 'bg-primary dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${settings[item.key as keyof AppSettings] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                         </div>
                     </div>
                 ))}
                 
                 <div onClick={onShowPrivacy} className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-sm active:scale-95 transition-all cursor-pointer mt-8 group">
                    <div className="flex items-center gap-3 text-primary dark:text-white">
                         <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
                            <Lock size={18} />
                         </div>
                         <span className="font-medium text-gray-700 dark:text-gray-200">Privacy Policy</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                 </div>
            </div>
            
            <button 
                onClick={onLogout}
                className="mt-8 w-full flex items-center justify-center gap-2 text-red-500 font-bold px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
    );
};

// --- Notification Toast Component ---
const NotificationToast: React.FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-l-4 border-primary dark:border-green-500 shadow-xl rounded-lg p-4 z-50 animate-slide-up flex items-start gap-3">
            <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full text-primary dark:text-green-400">
                <Bell size={18} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-800 dark:text-white">Reminder</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{title}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <span className="text-xs font-bold">✕</span>
            </button>
        </div>
    );
};

// --- Main App Component ---
const App: React.FC = () => {
  // State for View Navigation
  const [view, setView] = useState<ViewState>(ViewState.AUTH);

  // State for User Auth
  const [user, setUser] = useState<User | null>(() => {
      const savedSession = localStorage.getItem('phil_current_user');
      return savedSession ? JSON.parse(savedSession) : null;
  });

  // Effect to handle initial route based on auth
  useEffect(() => {
      if (user) {
          if (view === ViewState.AUTH) {
            setView(ViewState.DASHBOARD);
          }
      } else {
          setView(ViewState.AUTH);
      }
  }, [user, view]);

  const handleLogin = (loggedInUser: User) => {
      setUser(loggedInUser);
      localStorage.setItem('phil_current_user', JSON.stringify(loggedInUser));
      setView(ViewState.ONBOARDING); 
  };

  const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('phil_current_user');
      setView(ViewState.AUTH);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
      setUser(updatedUser);
      localStorage.setItem('phil_current_user', JSON.stringify(updatedUser));
      const allUsers = JSON.parse(localStorage.getItem('phil_users') || '[]');
      const newUsers = allUsers.map((u: User) => u.email === updatedUser.email ? updatedUser : u);
      localStorage.setItem('phil_users', JSON.stringify(newUsers));
  };

  const [settings, setSettings] = useState<AppSettings>(() => {
      const saved = localStorage.getItem('timezy_settings');
      return saved ? JSON.parse(saved) : {
        notifications: true,
        darkMode: false,
        calendarSync: true,
        soundEffects: true
      };
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
      const saved = localStorage.getItem('timezy_tasks');
      // Initialize empty for robustness, let user add their own
      return saved ? JSON.parse(saved) : [];
  });

  // Computed User Tasks - Filters global task list by User ID
  const userTasks = useMemo(() => {
      if (!user) return [];
      return tasks.filter(t => t.userId === user.id);
  }, [tasks, user]);

  // UI Modals State
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showNotificationsList, setShowNotificationsList] = useState(false);

  // Notification State
  const [notification, setNotification] = useState<string | null>(null);
  const [notifiedTasks, setNotifiedTasks] = useState<Set<string>>(new Set());
  const [notificationsList, setNotificationsList] = useState<{id: string, msg: string, time: string}[]>([]);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('timezy_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('timezy_tasks', JSON.stringify(tasks)); }, [tasks]);

  // Dynamic Activity Data
  const activityData = useMemo(() => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const data = days.map(day => ({ day, hours: 0 }));
      
      userTasks.forEach(task => {
          const hash = task.title.length % 7;
          const durationVal = parseInt(task.duration || '1') || 1;
          data[hash].hours += durationVal;
      });
      
      return data.map(d => ({ ...d, hours: d.hours + Math.floor(Math.random() * 1) })); 
  }, [userTasks]);


  const handleAddTask = (newTask: Task) => {
      // Ensure Task has UserID
      const taskWithUser = { ...newTask, userId: user?.id || '' };
      setTasks([...tasks, taskWithUser]);
  };

  const handleToggleTask = (id: string) => {
      setTasks(tasks.map(t => 
          t.id === id 
              ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } 
              : t
      ));
  };

  const handleDeleteTask = (id: string) => {
      setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleSetting = (key: keyof AppSettings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Check Reminders
  useEffect(() => {
    if (!settings.notifications) return;

    const checkReminders = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        userTasks.forEach(task => {
            if (task.status === 'done' || !task.reminderMinutes || task.date !== now.getDate()) return;
            
            const [h, m] = task.startTime.split(':').map(Number);
            const taskStartMinutes = h * 60 + m;
            const reminderTime = taskStartMinutes - task.reminderMinutes;
            
            if (currentMinutes === reminderTime && !notifiedTasks.has(task.id)) {
                const msg = `Upcoming: ${task.title} starts in ${task.reminderMinutes} mins.`;
                setNotification(msg);
                setNotifiedTasks(prev => new Set(prev).add(task.id));
                
                // Add to list
                setNotificationsList(prev => [{
                    id: Date.now().toString(),
                    msg,
                    time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }, ...prev]);
                
                if (settings.soundEffects) {
                   // Sound Logic Here
                }
            }
        });
    };

    const interval = setInterval(checkReminders, 5000);
    return () => clearInterval(interval);
  }, [userTasks, notifiedTasks, settings.notifications, settings.soundEffects]);

  // Initialize welcome notification
  useEffect(() => {
      if (user && notificationsList.length === 0) {
          setNotificationsList([{
              id: 'welcome', 
              msg: `Welcome to Phil, ${user.name}! Let's get productive.`,
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }]);
      }
  }, [user]);

  const renderContent = () => {
    if (!user && view !== ViewState.AUTH) {
        return <Auth onLogin={handleLogin} />;
    }

    switch (view) {
      case ViewState.AUTH:
          return <Auth onLogin={handleLogin} />;
      case ViewState.ONBOARDING:
        return <Onboarding onComplete={() => setView(ViewState.DASHBOARD)} />;
      case ViewState.DASHBOARD:
        return user ? (
          <Dashboard 
            user={user} 
            tasks={userTasks}
            activityData={activityData} 
            onNavigate={(v) => setView(v as ViewState)} 
            onAddTask={handleAddTask}
            onShowNotifications={() => setShowNotificationsList(true)}
          />
        ) : null;
      case ViewState.CALENDAR:
        return (
          <CalendarView 
            onBack={() => setView(ViewState.DASHBOARD)} 
            tasks={userTasks}
            onToggleStatus={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case ViewState.PROFILE:
        return user ? (
            <ProfileView 
                user={user} 
                tasks={userTasks} 
                onUpdateUser={handleUpdateUser} 
                onBack={() => setView(ViewState.DASHBOARD)}
            />
        ) : null;
      case ViewState.SETTINGS:
        return (
            <SettingsView 
                settings={settings} 
                onToggle={handleToggleSetting} 
                onShowPrivacy={() => setShowPrivacy(true)}
                onShowDonate={() => setShowDonate(true)}
                onLogout={handleLogout}
                onBack={() => setView(ViewState.DASHBOARD)}
            />
        );
      default:
        return <div>Unknown View</div>;
    }
  };

  return (
    <div className={`${settings.darkMode ? 'dark' : ''} w-full h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-900 font-sans transition-colors duration-500`}>
      <div className="w-full max-w-md h-full max-h-[900px] bg-primary-light dark:bg-gray-900 relative shadow-2xl overflow-hidden flex flex-col md:rounded-[40px] md:border-[8px] md:border-gray-800 dark:md:border-gray-700 transition-all duration-500">
        
        {notification && <NotificationToast title={notification} onClose={() => setNotification(null)} />}
        {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
        {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
        {showNotificationsList && <NotificationsModal onClose={() => setShowNotificationsList(false)} notifications={notificationsList} />}

        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>

        {/* Bottom Navigation Bar */}
        {user && view !== ViewState.AUTH && view !== ViewState.ONBOARDING && (
          <div className="absolute bottom-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md py-4 px-8 flex justify-between items-center rounded-t-[32px] shadow-[0_-5px_30px_rgba(0,0,0,0.05)] dark:shadow-black/50 z-40 transition-colors duration-500">
             <button 
              onClick={() => setView(ViewState.DASHBOARD)}
              className={`transition-all duration-300 ${view === ViewState.DASHBOARD ? 'text-primary dark:text-green-400 scale-110' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400'}`}
            >
              <Home size={26} fill={view === ViewState.DASHBOARD ? "currentColor" : "none"} strokeWidth={2.5} />
             </button>
             
             <button 
              onClick={() => setView(ViewState.CALENDAR)}
              className={`transition-all duration-300 ${view === ViewState.CALENDAR ? 'text-primary dark:text-green-400 scale-110' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400'}`}
            >
              <Calendar size={26} fill={view === ViewState.CALENDAR ? "currentColor" : "none"} strokeWidth={2.5} />
             </button>

             <button 
                onClick={() => setView(ViewState.PROFILE)}
                className={`transition-all duration-300 ${view === ViewState.PROFILE ? 'text-primary dark:text-green-400 scale-110' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400'}`}
             >
               <UserIcon size={26} fill={view === ViewState.PROFILE ? "currentColor" : "none"} strokeWidth={2.5} />
             </button>

             <button 
                onClick={() => setView(ViewState.SETTINGS)}
                className={`transition-all duration-300 ${view === ViewState.SETTINGS ? 'text-primary dark:text-green-400 scale-110' : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400'}`}
             >
               <Settings size={26} fill={view === ViewState.SETTINGS ? "currentColor" : "none"} strokeWidth={2.5} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;