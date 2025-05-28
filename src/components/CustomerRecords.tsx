
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomerRecord } from '../types/Customer';
import { Edit, Eye, LayoutGrid, List } from 'lucide-react';
import EditCustomerDialog from './EditCustomerDialog';

interface CustomerRecordsProps {
  records: CustomerRecord[];
  onUpdate: () => void;
}

const CustomerRecords: React.FC<CustomerRecordsProps> = ({ records, onUpdate }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (customer: CustomerRecord) => {
    setEditingCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingCustomer(null);
  };

  const handleUpdateRecord = () => {
    onUpdate();
    handleCloseEdit();
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl font-semibold mb-2">No customer records found</p>
        <p className="text-sm">Add your first customer record to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            {records.length}
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-800">Customer Records</h3>
            <p className="text-amber-600 text-sm">
              {records.filter(r => r.isReady).length} ready, {records.filter(r => !r.isReady).length} processing
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 bg-white rounded-lg p-1 border border-amber-200">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className={`transition-all duration-200 ${viewMode === 'cards' ? 'bg-amber-600 text-white' : 'hover:bg-amber-50'}`}
          >
            <LayoutGrid size={16} className="mr-1" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={`transition-all duration-200 ${viewMode === 'table' ? 'bg-amber-600 text-white' : 'hover:bg-amber-50'}`}
          >
            <List size={16} className="mr-1" />
            Table
          </Button>
        </div>
      </div>

      {/* Records Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
          {records.slice().reverse().map((record) => (
            <Card 
              key={record.customerId} 
              className="border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-amber-50/30"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      {record.customerId}
                    </div>
                    <div>
                      <span className="text-amber-800 font-bold">{record.customerName}</span>
                      <p className="text-xs text-amber-600">ID: {record.customerId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(record)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-7 transition-all duration-200 hover:scale-105"
                    >
                      <Edit size={12} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant={record.customerType === 'Permanent' ? 'default' : 'secondary'} className="text-xs">
                      {record.customerType === 'Permanent' ? '👤' : '⏰'} {record.customerType}
                    </Badge>
                    <Badge 
                      variant={record.isReady ? 'default' : 'secondary'} 
                      className={`text-xs ${record.isReady ? 'bg-green-600' : 'bg-orange-500 text-white'}`}
                    >
                      {record.isReady ? '✅ Ready' : '⏳ Processing'}
                    </Badge>
                    <Badge variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="text-xs">
                      {record.paymentStatus === 'Paid' ? '✅' : '⏳'} {record.paymentStatus}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-2 rounded shadow-sm">
                      <span className="font-medium text-amber-800">Weight:</span>
                      <p className="font-bold">{record.wheatWeight} kg</p>
                    </div>
                    <div className="bg-white p-2 rounded shadow-sm">
                      <span className="font-medium text-amber-800">Flour:</span>
                      <p className="font-bold">{record.flourType}</p>
                    </div>
                    <div className="bg-white p-2 rounded shadow-sm">
                      <span className="font-medium text-amber-800">Rate:</span>
                      <p className="font-bold">₹{record.ratePerKg}/kg</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded shadow-sm border border-green-200">
                      <span className="font-medium text-green-800">Total:</span>
                      <p className="font-bold text-green-700">₹{record.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto max-h-96 border-2 border-amber-200 rounded-lg">
          <table className="w-full text-sm border-collapse bg-white">
            <thead className="bg-gradient-to-r from-amber-100 to-orange-100 sticky top-0 z-10">
              <tr>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">ID</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Customer</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Type</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Weight</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Flour</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Rate</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Total</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Payment</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Status</th>
                <th className="border border-amber-200 p-3 text-left font-bold text-amber-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.slice().reverse().map((record) => (
                <tr key={record.customerId} className="hover:bg-amber-50 transition-colors duration-200">
                  <td className="border border-amber-200 p-3 font-bold text-amber-700">{record.customerId}</td>
                  <td className="border border-amber-200 p-3 font-medium">{record.customerName}</td>
                  <td className="border border-amber-200 p-3">
                    <Badge variant={record.customerType === 'Permanent' ? 'default' : 'secondary'} className="text-xs">
                      {record.customerType === 'Permanent' ? '👤' : '⏰'} {record.customerType}
                    </Badge>
                  </td>
                  <td className="border border-amber-200 p-3 font-medium">{record.wheatWeight} kg</td>
                  <td className="border border-amber-200 p-3">{record.flourType}</td>
                  <td className="border border-amber-200 p-3 font-medium">₹{record.ratePerKg}</td>
                  <td className="border border-amber-200 p-3 font-bold text-green-700">₹{record.totalPrice.toFixed(2)}</td>
                  <td className="border border-amber-200 p-3">
                    <Badge variant={record.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="text-xs">
                      {record.paymentStatus === 'Paid' ? '✅' : '⏳'} {record.paymentStatus}
                    </Badge>
                  </td>
                  <td className="border border-amber-200 p-3">
                    <Badge 
                      variant={record.isReady ? 'default' : 'secondary'} 
                      className={`text-xs ${record.isReady ? 'bg-green-600' : 'bg-orange-500 text-white'}`}
                    >
                      {record.isReady ? '✅ Ready' : '⏳ Processing'}
                    </Badge>
                  </td>
                  <td className="border border-amber-200 p-3">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(record)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-7 transition-all duration-200 hover:scale-105"
                    >
                      <Edit size={12} className="mr-1" />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditCustomerDialog
        customer={editingCustomer}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        onUpdate={handleUpdateRecord}
      />
    </div>
  );
};

export default CustomerRecords;
