
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { DollarSign, TrendingUp, Clock, Coins } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Warm Revenue Cards */}
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

      {/* Transaction List */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-100 to-slate-100 border-b border-gray-200 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
            <span className="text-3xl">📝</span>
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-9xl mb-8 opacity-40">🌾</div>
              <p className="text-3xl font-bold mb-4">No Records Yet</p>
              <p className="text-xl">Add your first customer to get started</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {records.slice().reverse().map((record) => (
                <div key={record.customerId} className="flex justify-between items-center p-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg shadow-lg">
                        {record.customerId}
                      </div>
                      <div>
                        <span className="font-bold text-xl text-gray-800">{record.customerName}</span>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant={record.customerType === 'Regular' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                            {record.customerType === 'Regular' ? '⭐' : '🕐'} {record.customerType}
                          </Badge>
                          <Badge 
                            variant={record.isReady ? 'default' : 'secondary'} 
                            className={`text-sm px-3 py-1 ${record.isReady ? 'bg-emerald-500' : 'bg-orange-500'}`}
                          >
                            {record.isReady ? '✅ Ready' : '⏳ Processing'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      {record.wheatWeight}kg {record.flourType} @ ₹{record.ratePerKg}/kg
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-3xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      ₹{record.totalPrice.toFixed(2)}
                    </p>
                    <Badge 
                      variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} 
                      className={`text-sm px-4 py-2 ${record.paymentStatus === 'Paid' ? 'bg-emerald-500' : 'bg-red-500'}`}
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
