
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { DollarSign, TrendingUp } from 'lucide-react';

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
    <div className="space-y-4">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-green-800">
              <DollarSign size={16} className="mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">₹{totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-blue-800">
              <TrendingUp size={16} className="mr-2" />
              Paid Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700">₹{paidAmount.toFixed(2)}</p>
            <p className="text-xs text-blue-600">{paidTransactions.length} transactions</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-orange-800">
              <DollarSign size={16} className="mr-2" />
              Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-700">₹{pendingAmount.toFixed(2)}</p>
            <p className="text-xs text-orange-600">{pendingTransactions.length} transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-amber-800">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No transactions found</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {records.slice().reverse().map((record) => (
                <div key={record.customerId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">ID: {record.customerId}</span>
                      <span className="text-sm text-gray-600">- {record.customerName}</span>
                      <Badge variant={record.customerType === 'Regular' ? 'default' : 'secondary'} className="text-xs">
                        {record.customerType}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {record.wheatWeight}kg {record.flourType} @ ₹{record.ratePerKg}/kg
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{record.totalPrice.toFixed(2)}</p>
                    <Badge variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="text-xs">
                      {record.paymentStatus}
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
