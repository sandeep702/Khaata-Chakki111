
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerIdSectionProps {
  useAutoId: boolean;
  setUseAutoId: (value: boolean) => void;
  customerId: string;
  setCustomerId: (value: string) => void;
}

const CustomerIdSection: React.FC<CustomerIdSectionProps> = ({
  useAutoId,
  setUseAutoId,
  customerId,
  setCustomerId,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="auto-id"
          checked={useAutoId}
          onCheckedChange={(checked) => setUseAutoId(!!checked)}
        />
        <Label htmlFor="auto-id" className="text-sm font-medium">
          Auto-generate Customer ID
        </Label>
      </div>
      
      <div>
        <Label htmlFor="customerId">Customer ID</Label>
        <Input
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={useAutoId}
          className="bg-gray-50"
        />
      </div>
    </div>
  );
};

export default CustomerIdSection;
