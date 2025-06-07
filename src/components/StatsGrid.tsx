
import React from 'react';
import { Users, TrendingUp, Clock, MapPin } from 'lucide-react';
import { CustomerRecord } from '../types/Customer';

interface StatsGridProps {
  records: CustomerRecord[];
  totalRevenue: number;
}

const StatsGrid = ({ records, totalRevenue }: StatsGridProps) => {
  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-50 via-purple-50 to-indigo-100',
      glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.5)]',
      particle: '👥',
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-100',
      glowColor: 'shadow-[0_0_30px_rgba(16,185,129,0.5)]',
      particle: '💰',
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      bgGradient: 'from-amber-50 via-orange-50 to-red-100',
      glowColor: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
      particle: '⚡',
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      gradient: 'from-pink-400 via-rose-500 to-purple-600',
      bgGradient: 'from-pink-50 via-rose-50 to-purple-100',
      glowColor: 'shadow-[0_0_30px_rgba(236,72,153,0.5)]',
      particle: '🏭',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 -mt-16">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-translate-y-4"
        >
          <div className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-4xl p-8 shadow-2xl border-2 border-white/30 hover:${stat.glowColor} transition-all duration-700 overflow-hidden backdrop-blur-xl`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute opacity-30 animate-float text-2xl"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {stat.particle}
                </div>
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-pulse`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-slate-800 group-hover:scale-125 transition-transform duration-500 animate-pulse">
                    {stat.value}
                  </div>
                </div>
              </div>
              <div className="text-slate-700 font-bold text-xl mb-4">{stat.title}</div>
              <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
                <div className={`bg-gradient-to-r ${stat.gradient} h-4 rounded-full transition-all duration-1500 group-hover:w-full shadow-lg animate-pulse`} 
                     style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
