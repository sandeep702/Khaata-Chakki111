
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomerRecord } from '../types/Customer';

interface CustomerRecordsProps {
  records: CustomerRecord[];
}

const CustomerRecords: React.FC<CustomerRecordsProps> = ({ records }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No customer records found</p>
        <p className="text-sm">Add your first customer record to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-amber-800">
          Total Records: {records.length}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="text-xs"
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="text-xs"
          >
            Table
          </Button>
        </div>
      </div>

      {/* Records Display */}
      {viewMode === 'cards' ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {records.slice().reverse().map((record) => (
            <Card key={record.customerId} className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex justify-between items-center">
                  <span className="text-amber-800">ID: {record.customerId}</span>
                  <Badge variant={record.isReady ? 'default' : 'secondary'}>
                    {record.isReady ? '✓ Ready' : '⏳ Processing'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Customer:</span>
                    <p className="truncate">{record.customerName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Owner:</span>
                    <p className="truncate">{record.ownerName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span>
                    <p>{record.wheatWeight} kg</p>
                  </div>
                  <div>
                    <span className="font-medium">Flour:</span>
                    <p>{record.flourType}</p>
                  </div>
                  <div>
                    <span className="font-medium">Total:</span>
                    <p className="font-bold text-amber-700">₹{record.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Payment:</span>
                    <div className="flex gap-1">
                      <Badge variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="text-xs">
                        {record.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-amber-100 sticky top-0">
              <tr>
                <th className="border border-amber-200 p-2 text-left">ID</th>
                <th className="border border-amber-200 p-2 text-left">Customer</th>
                <th className="border border-amber-200 p-2 text-left">Weight</th>
                <th className="border border-amber-200 p-2 text-left">Flour</th>
                <th className="border border-amber-200 p-2 text-left">Rate</th>
                <th className="border border-amber-200 p-2 text-left">Total</th>
                <th className="border border-amber-200 p-2 text-left">Payment</th>
                <th className="border border-amber-200 p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.slice().reverse().map((record) => (
                <tr key={record.customerId} className="hover:bg-amber-50">
                  <td className="border border-amber-200 p-2">{record.customerId}</td>
                  <td className="border border-amber-200 p-2">{record.customerName}</td>
                  <td className="border border-amber-200 p-2">{record.wheatWeight} kg</td>
                  <td className="border border-amber-200 p-2">{record.flourType}</td>
                  <td className="border border-amber-200 p-2">₹{record.ratePerKg}</td>
                  <td className="border border-amber-200 p-2 font-bold">₹{record.totalPrice.toFixed(2)}</td>
                  <td className="border border-amber-200 p-2">
                    <Badge variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                      {record.paymentStatus}
                    </Badge>
                  </td>
                  <td className="border border-amber-200 p-2">
                    <Badge variant={record.isReady ? 'default' : 'secondary'}>
                      {record.isReady ? 'Ready' : 'Processing'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerRecords;
