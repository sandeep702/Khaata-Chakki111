
import React from 'react';
import { Plus, Search, Database, TrendingUp } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  particles: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs: Tab[] = [
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'from-violet-500 via-purple-600 to-fuchsia-700', particles: '✨' },
    { id: 'search', label: 'Search', icon: Search, color: 'from-cyan-500 via-blue-600 to-indigo-700', particles: '🔍' },
    { id: 'records', label: 'Records', icon: Database, color: 'from-emerald-500 via-green-600 to-teal-700', particles: '📊' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 via-red-600 to-pink-700', particles: '📈' }
  ];

  return (
    <div className="relative mb-12">
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-4xl blur-xl"></div>
      <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-4 px-10 py-8 font-bold transition-all duration-500 relative min-w-0 flex-1 group ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === tab.id && (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} transition-all duration-500`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-float text-xl opacity-20"
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          top: `${10 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        {tab.particles}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="relative z-10 flex items-center gap-4">
                <tab.icon 
                  size={28} 
                  className={`${
                    activeTab === tab.id 
                      ? 'animate-spin' 
                      : 'group-hover:scale-125 group-hover:rotate-12'
                  } transition-transform duration-500`} 
                  style={{ animationDuration: activeTab === tab.id ? '3s' : undefined }}
                />
                <span className="text-xl font-black">{tab.label}</span>
              </div>
              {activeTab !== tab.id && (
                <div className="absolute bottom-0 left-0 w-0 h-2 bg-gradient-to-r from-white to-purple-300 group-hover:w-full transition-all duration-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
