
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="customerName">Customer Name *</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border-amber-200 focus:border-amber-400"
        />
      </div>
      
      <div>
        <Label htmlFor="customerType">Customer Type</Label>
        <Select
          value={customerType}
          onValueChange={(value: any) => setCustomerType(value)}
        >
          <SelectTrigger className="border-amber-200 focus:border-amber-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Permanent">Permanent</SelectItem>
            <SelectItem value="Temporary">Temporary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomerDetailsSection;
