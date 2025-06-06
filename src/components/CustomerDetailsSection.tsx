
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="group">
        <Label htmlFor="customerName" className="text-rose-700 font-bold mb-3 block group-hover:text-rose-800 transition-colors text-lg">
          👤 Customer Name *
        </Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border-3 border-rose-200 focus:border-rose-400 hover:border-rose-300 transition-colors duration-300 rounded-2xl shadow-lg focus:shadow-xl h-14 text-lg bg-white/80 backdrop-blur-sm"
          placeholder="Enter customer name"
        />
      </div>
      
      <div className="group">
        <Label htmlFor="customerType" className="text-orange-700 font-bold mb-3 block group-hover:text-orange-800 transition-colors text-lg">
          🏷️ Customer Type
        </Label>
        <Select
          value={customerType}
          onValueChange={(value: any) => setCustomerType(value)}
        >
          <SelectTrigger className="border-3 border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-colors duration-300 rounded-2xl shadow-lg focus:shadow-xl h-14 text-lg bg-white/80 backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-orange-200 rounded-2xl shadow-2xl">
            <SelectItem value="Regular" className="hover:bg-rose-50 transition-colors py-4 text-lg rounded-xl m-1">
              <span className="flex items-center gap-3">
                <span className="text-rose-600 text-2xl">⭐</span>
                Regular Customer
              </span>
            </SelectItem>
            <SelectItem value="Temporary" className="hover:bg-orange-50 transition-colors py-4 text-lg rounded-xl m-1">
              <span className="flex items-center gap-3">
                <span className="text-orange-600 text-2xl">🕐</span>
                Temporary Customer
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomerDetailsSection;
