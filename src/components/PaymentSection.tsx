
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentSectionProps {
  paymentMethod: 'Cash' | 'Borrow';
  setPaymentMethod: (value: 'Cash' | 'Borrow') => void;
  isReady: boolean;
  setIsReady: (value: boolean) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  isReady,
  setIsReady,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select
          value={paymentMethod}
          onValueChange={(value: any) => setPaymentMethod(value)}
        >
          <SelectTrigger className="border-amber-200 focus:border-amber-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="Borrow">Borrow</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2 pt-6">
        <Checkbox
          id="isReady"
          checked={isReady}
          onCheckedChange={(checked) => setIsReady(!!checked)}
        />
        <Label htmlFor="isReady" className="text-sm font-medium">
          Item is ready for pickup
        </Label>
      </div>
    </div>
  );
};

export default PaymentSection;
