
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
    <div className="space-y-3">
      <Label htmlFor="paymentMethod" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
        💳 Payment Method
      </Label>
      <Select
        value={paymentMethod}
        onValueChange={(value: any) => setPaymentMethod(value)}
      >
        <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 transition-colors duration-200 text-base bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
          <SelectItem value="Cash" className="hover:bg-green-50 transition-colors py-3 text-base rounded-lg m-1">
            <span className="flex items-center gap-3">
              💰 Cash Payment
            </span>
          </SelectItem>
          <SelectItem value="Borrow" className="hover:bg-orange-50 transition-colors py-3 text-base rounded-lg m-1">
            <span className="flex items-center gap-3">
              📝 Credit / Borrow
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentSection;
