
import React from 'react';
import { LogOut, Sparkles, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: { email: string } | null;
  onLogout: () => void;
}

const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="relative z-10 bg-gradient-to-r from-black/20 via-purple-900/30 to-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <img 
                  src="/khaata.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                Khaata Chakki
              </h1>
              <p className="text-purple-200 text-xl font-bold flex items-center gap-2">
                <Sparkles className="animate-spin" style={{ animationDuration: '3s' }} />
                Next-Gen Flour Mill Management
                <Heart className="text-red-400 animate-pulse" />
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-50 blur group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-center hover:bg-black/30 transition-all duration-300">
                <div className="text-3xl font-black text-white mb-2 animate-pulse">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm text-purple-200 font-semibold">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-50 blur group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-center min-w-[220px] hover:bg-black/30 transition-all duration-300">
                <p className="text-white font-bold mb-2 text-lg flex items-center justify-center gap-2">
                  <Star className="text-yellow-400 animate-pulse" />
                  Welcome back!
                </p>
                <p className="text-purple-200 text-sm mb-4 truncate">{user?.email}</p>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-white hover:from-red-500/40 hover:to-pink-500/40 transition-all duration-300 text-sm px-6 rounded-2xl group-hover:scale-105"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
