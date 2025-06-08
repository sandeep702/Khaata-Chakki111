
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { DollarSign, TrendingUp, Clock, Coins, FileText, Calendar, User } from 'lucide-react';

interface AmountSectionProps {
  records: CustomerRecord[];
  totalRevenue: number;
}

const AmountSection: React.FC<AmountSectionProps> = ({ records, totalRevenue }) => {
  const paidTransactions = records.filter(record => record.paymentStatus === 'Paid');
  const pendingTransactions = records.filter(record => record.paymentStatus === 'Pending');
  const paidAmount = paidTransactions.reduce((sum, record) => sum + record.totalPrice, 0);
  const pendingAmount = pendingTransactions.reduce((sum, record) => sum + record.totalPrice, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-white/90">
              <Coins size={28} className="mr-3" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">₹{totalRevenue.toFixed(2)}</p>
            <p className="text-rose-100 text-sm font-medium">Total earnings</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-white/90">
              <TrendingUp size={28} className="mr-3" />
              Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">₹{paidAmount.toFixed(2)}</p>
            <p className="text-emerald-100 text-sm font-medium">{paidTransactions.length} payments</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-white/90">
              <Clock size={28} className="mr-3" />
              Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">₹{pendingAmount.toFixed(2)}</p>
            <p className="text-orange-100 text-sm font-medium">{pendingTransactions.length} pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Transaction History */}
      <Card className="border-0 bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200 p-6">
          <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
            <div className="bg-blue-600 text-white rounded-xl w-12 h-12 flex items-center justify-center">
              <FileText size={24} />
            </div>
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-2xl font-bold mb-2">No Transactions Yet</p>
              <p className="text-lg text-gray-400">Add your first customer to get started</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {records.slice().reverse().map((record, index) => (
                <div 
                  key={`${record.customerId}-${index}`} 
                  className="flex items-center justify-between p-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Customer ID Circle */}
                    <div className="bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {record.customerId}
                    </div>
                    
                    {/* Customer Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-800 transition-colors">
                          {record.customerName}
                        </h3>
                        <div className="flex gap-2">
                          <Badge 
                            variant={record.customerType === 'Regular' ? 'default' : 'secondary'} 
                            className={`text-xs px-2 py-1 ${
                              record.customerType === 'Regular' 
                                ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                : 'bg-orange-100 text-orange-800 border-orange-200'
                            }`}
                          >
                            <User size={12} className="mr-1" />
                            {record.customerType}
                          </Badge>
                          <Badge 
                            variant={record.isReady ? 'default' : 'secondary'} 
                            className={`text-xs px-2 py-1 ${
                              record.isReady 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }`}
                          >
                            {record.isReady ? '✅ Ready' : '⏳ Processing'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium">{record.wheatWeight}kg {record.flourType}</span>
                        <span className="text-gray-400">@</span>
                        <span className="font-medium">₹{record.ratePerKg}/kg</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          <span>{formatDate(record.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount and Payment Status */}
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold text-pink-600 group-hover:scale-110 transition-transform duration-300">
                      ₹{record.totalPrice.toFixed(2)}
                    </div>
                    <Badge 
                      variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} 
                      className={`text-xs px-3 py-1 font-medium ${
                        record.paymentStatus === 'Paid' 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      } transition-colors duration-300`}
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
  );
};

export default AmountSection;
