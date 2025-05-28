
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerDetailsSectionProps {
  customerName: string;
  setCustomerName: (value: string) => void;
  ownerName: string;
  setOwnerName: (value: string) => void;
}

const CustomerDetailsSection: React.FC<CustomerDetailsSectionProps> = ({
  customerName,
  setCustomerName,
  ownerName,
  setOwnerName,
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
        <Label htmlFor="ownerName">Owner Name *</Label>
        <Input
          id="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
          className="border-amber-200 focus:border-amber-400"
        />
      </div>
    </div>
  );
};

export default CustomerDetailsSection;
