
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomerDetailsSectionProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerType: 'Permanent' | 'Temporary';
  setCustomerType: (value: 'Permanent' | 'Temporary') => void;
}

const CustomerDetailsSection: React.FC<CustomerDetailsSectionProps> = ({
  customerName,
  setCustomerName,
  customerType,
  setCustomerType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <Label htmlFor="customerName" className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
          Customer Name *
        </Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border-2 border-amber-200 focus:border-amber-500 hover:border-amber-400 transition-colors duration-200 rounded-lg shadow-sm focus:shadow-md"
          placeholder="Enter customer name"
        />
      </div>
      
      <div className="group">
        <Label htmlFor="customerType" className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
          Customer Type
        </Label>
        <Select
          value={customerType}
          onValueChange={(value: any) => setCustomerType(value)}
        >
          <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500 hover:border-amber-400 transition-colors duration-200 rounded-lg shadow-sm focus:shadow-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-amber-200 rounded-lg shadow-lg">
            <SelectItem value="Permanent" className="hover:bg-amber-50 transition-colors">
              <span className="flex items-center gap-2">
                <span className="text-green-600">👤</span>
                Permanent
              </span>
            </SelectItem>
            <SelectItem value="Temporary" className="hover:bg-amber-50 transition-colors">
              <span className="flex items-center gap-2">
                <span className="text-blue-600">⏰</span>
                Temporary
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomerDetailsSection;
