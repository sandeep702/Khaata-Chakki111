
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentSectionProps {
  paymentMethod: 'Cash' | 'Borrow';
  setPaymentMethod: (value: 'Cash' | 'Borrow') => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="group">
      <Label htmlFor="paymentMethod" className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
        Payment Method
      </Label>
      <Select
        value={paymentMethod}
        onValueChange={(value: any) => setPaymentMethod(value)}
      >
        <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500 hover:border-amber-400 transition-colors duration-200 rounded-lg shadow-sm focus:shadow-md">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-amber-200 rounded-lg shadow-lg">
          <SelectItem value="Cash" className="hover:bg-green-50 transition-colors">
            <span className="flex items-center gap-2">
              <span className="text-green-600">💵</span>
              Cash
            </span>
          </SelectItem>
          <SelectItem value="Borrow" className="hover:bg-orange-50 transition-colors">
            <span className="flex items-center gap-2">
              <span className="text-orange-600">📋</span>
              Borrow
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentSection;
