import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import { ViewState, User, DayActivity } from './types';
import { Home, Calendar, User as UserIcon, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);

  const user: User = {
    name: "Zevanya Casey",
    avatar: "https://i.pravatar.cc/300?u=zevanya"
  };

  const activityData: DayActivity[] = [
    { day: 'Sun', hours: 4 },
    { day: 'Mon', hours: 6 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 8 }, // Active
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 7 },
    { day: 'Sat', hours: 2 },
  ];

  const renderContent = () => {
    switch (view) {
      case ViewState.ONBOARDING:
        return <Onboarding onComplete={() => setView(ViewState.DASHBOARD)} />;
      case ViewState.DASHBOARD:
        return (
          <Dashboard 
            user={user} 
            activityData={activityData} 
            onNavigate={(v) => setView(v as ViewState)} 
          />
        );
      case ViewState.CALENDAR:
        return (
          <CalendarView 
            onBack={() => setView(ViewState.DASHBOARD)} 
            events={[]} // Passing empty for visual mock, actual data hardcoded in component for this demo
          />
        );
      default:
        return <div>Unknown View</div>;
    }
  };

  return (
    // Outer container to simulate mobile frame on desktop
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 font-sans">
      <div className="w-full max-w-md h-full max-h-[900px] bg-primary-light relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {renderContent()}
        </div>

        {/* Bottom Navigation - Only show if not onboarding */}
        {view !== ViewState.ONBOARDING && (
          <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md py-4 px-8 flex justify-between items-center rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50">
             <button 
              onClick={() => setView(ViewState.DASHBOARD)}
              className={`transition-colors ${view === ViewState.DASHBOARD ? 'text-primary' : 'text-gray-300'}`}
            >
              <Home size={24} fill={view === ViewState.DASHBOARD ? "currentColor" : "none"} />
             </button>
             
             <button 
              onClick={() => setView(ViewState.CALENDAR)}
              className={`transition-colors ${view === ViewState.CALENDAR ? 'text-primary' : 'text-gray-300'}`}
            >
              <Calendar size={24} fill={view === ViewState.CALENDAR ? "currentColor" : "none"} />
             </button>

             <button className="text-gray-300 hover:text-primary transition-colors">
               <UserIcon size={24} />
             </button>

             <button className="text-gray-300 hover:text-primary transition-colors">
               <Settings size={24} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;