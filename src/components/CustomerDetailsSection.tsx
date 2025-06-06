
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Star } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="group">
        <Label htmlFor="customerName" className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
          <User size={16} className="text-blue-500" />
          Customer Name *
        </Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border-2 border-slate-200 focus:border-blue-400 hover:border-slate-300 transition-colors duration-300 rounded-xl shadow-sm focus:shadow-md h-12 text-base bg-white/80 backdrop-blur-sm"
          placeholder="Enter customer name"
        />
      </div>
      
      <div className="group">
        <Label htmlFor="customerType" className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
          <Star size={16} className="text-amber-500" />
          Customer Type
        </Label>
        <Select
          value={customerType}
          onValueChange={(value: any) => setCustomerType(value)}
        >
          <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400 hover:border-slate-300 transition-colors duration-300 rounded-xl shadow-sm focus:shadow-md h-12 text-base bg-white/80 backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 rounded-xl shadow-xl">
            <SelectItem value="Regular" className="hover:bg-blue-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-blue-600 text-lg">⭐</span>
                Regular Customer
              </span>
            </SelectItem>
            <SelectItem value="Temporary" className="hover:bg-amber-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-amber-600 text-lg">🕐</span>
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
