
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomerDetailsSectionProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerType: 'Regular' | 'Temporary';
  setCustomerType: (value: 'Regular' | 'Temporary') => void;
}

const CustomerDetailsSection: React.FC<CustomerDetailsSectionProps> = ({
  customerName,
  setCustomerName,
  customerType,
  setCustomerType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Label htmlFor="customerName" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
          👤 Customer Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="h-12 rounded-xl border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 text-base"
          placeholder="Enter customer name"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="customerType" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
          🏷️ Customer Type
        </Label>
        <Select
          value={customerType}
          onValueChange={(value: any) => setCustomerType(value)}
        >
          <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 hover:border-orange-300 focus:border-orange-500 transition-colors duration-200 text-base bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
            <SelectItem value="Regular" className="hover:bg-rose-50 transition-colors py-3 text-base rounded-lg m-1">
              <span className="flex items-center gap-3">
                ⭐ Regular Customer
              </span>
            </SelectItem>
            <SelectItem value="Temporary" className="hover:bg-orange-50 transition-colors py-3 text-base rounded-lg m-1">
              <span className="flex items-center gap-3">
                🕐 Temporary Customer
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomerDetailsSection;
