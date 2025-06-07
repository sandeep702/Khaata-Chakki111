
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { DollarSign, TrendingUp, Clock, Coins, Sparkles, Zap, Heart } from 'lucide-react';

interface AmountSectionProps {
  records: CustomerRecord[];
  totalRevenue: number;
}

const AmountSection: React.FC<AmountSectionProps> = ({ records, totalRevenue }) => {
  const paidTransactions = records.filter(record => record.paymentStatus === 'Paid');
  const pendingTransactions = records.filter(record => record.paymentStatus === 'Pending');
  const paidAmount = paidTransactions.reduce((sum, record) => sum + record.totalPrice, 0);
  const pendingAmount = pendingTransactions.reduce((sum, record) => sum + record.totalPrice, 0);

  return (
    <div className="space-y-10">
      {/* Enhanced Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Revenue Card */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 rounded-4xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
          <Card className="relative border-0 bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(236,72,153,0.4)] rounded-3xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float text-4xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  💎
                </div>
              ))}
            </div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-xl flex items-center text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Coins size={24} />
                </div>
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-3 animate-pulse">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-rose-100 text-lg font-medium flex items-center gap-2">
                <Sparkles className="animate-spin" style={{ animationDuration: '3s' }} />
                Total earnings
                <Heart className="text-red-300 animate-pulse" />
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Collected Amount Card */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 rounded-4xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
          <Card className="relative border-0 bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] rounded-3xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float text-3xl"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  💰
                </div>
              ))}
            </div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-xl flex items-center text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <TrendingUp size={24} />
                </div>
                Collected
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-3 animate-pulse">₹{paidAmount.toFixed(2)}</p>
              <p className="text-emerald-100 text-lg font-medium flex items-center gap-2">
                <Zap className="animate-bounce" />
                {paidTransactions.length} payments
                <Sparkles className="animate-pulse" />
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Outstanding Amount Card */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 rounded-4xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
          <Card className="relative border-0 bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(245,158,11,0.4)] rounded-3xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float text-3xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.25}s`,
                  }}
                >
                  ⏰
                </div>
              ))}
            </div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-xl flex items-center text-white/90">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Clock size={24} />
                </div>
                Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-black mb-3 animate-pulse">₹{pendingAmount.toFixed(2)}</p>
              <p className="text-orange-100 text-lg font-medium flex items-center gap-2">
                <Clock className="animate-pulse" />
                {pendingTransactions.length} pending
                <Sparkles className="animate-spin" style={{ animationDuration: '2s' }} />
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Transaction List */}
      <div className="group relative">
        <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
        <Card className="relative border-0 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl shadow-2xl rounded-4xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border-b-2 border-gray-200 rounded-t-4xl relative overflow-hidden">
            {/* Floating elements in header */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float text-2xl opacity-20"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  📝
                </div>
              ))}
            </div>
            
            <CardTitle className="text-3xl text-gray-800 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl">📊</span>
              </div>
              Transaction History
              <Sparkles className="text-purple-500 animate-spin ml-auto" style={{ animationDuration: '4s' }} />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {records.length === 0 ? (
              <div className="text-center py-24 text-gray-500 relative">
                {/* Floating wheat icons */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float text-6xl opacity-5"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      🌾
                    </div>
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="text-12xl mb-8 opacity-40 animate-pulse">🌾</div>
                  <p className="text-4xl font-black mb-6 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                    No Records Yet
                  </p>
                  <p className="text-2xl flex items-center justify-center gap-3">
                    <Sparkles className="text-purple-500 animate-spin" />
                    Add your first customer to get started
                    <Heart className="text-red-500 animate-pulse" />
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {records.slice().reverse().map((record, index) => (
                  <div 
                    key={record.customerId} 
                    className="flex justify-between items-center p-8 border-b-2 border-gray-100 hover:bg-gradient-to-r hover:from-rose-50 hover:via-purple-50 hover:to-pink-50 transition-all duration-500 group transform hover:scale-[1.02] relative overflow-hidden"
                  >
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-6 mb-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur opacity-75"></div>
                          <div className="relative bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-xl shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            {record.customerId}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-black text-2xl text-gray-800 group-hover:text-purple-700 transition-colors">
                            {record.customerName}
                          </span>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge 
                              variant={record.customerType === 'Regular' ? 'default' : 'secondary'} 
                              className="text-lg px-4 py-2 font-bold hover:scale-110 transition-transform"
                            >
                              {record.customerType === 'Regular' ? '⭐' : '🕐'} {record.customerType}
                            </Badge>
                            <Badge 
                              variant={record.isReady ? 'default' : 'secondary'} 
                              className={`text-lg px-4 py-2 font-bold hover:scale-110 transition-transform ${
                                record.isReady ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'
                              }`}
                            >
                              {record.isReady ? '✅ Ready' : '⏳ Processing'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 font-bold flex items-center gap-2">
                        <span className="text-2xl animate-bounce">🌾</span>
                        {record.wheatWeight}kg {record.flourType} @ ₹{record.ratePerKg}/kg
                        <Sparkles className="text-purple-500 animate-pulse" />
                      </p>
                    </div>
                    
                    <div className="text-right relative z-10">
                      <p className="font-black text-4xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-pulse">
                        ₹{record.totalPrice.toFixed(2)}
                      </p>
                      <Badge 
                        variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} 
                        className={`text-lg px-6 py-3 font-bold hover:scale-110 transition-transform ${
                          record.paymentStatus === 'Paid' 
                            ? 'bg-emerald-500 animate-pulse' 
                            : 'bg-red-500 animate-bounce'
                        }`}
                      >
                        {record.paymentStatus === 'Paid' ? '💰 Paid' : '⏰ Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .rounded-4xl {
          border-radius: 2rem;
        }
      `}</style>
    </div>
  );
};

export default AmountSection;
