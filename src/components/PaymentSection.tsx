
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
      <Label htmlFor="paymentMethod" className="text-purple-700 font-bold mb-3 block group-hover:text-purple-800 transition-colors text-lg">
        💳 Payment Method
      </Label>
      <Select
        value={paymentMethod}
        onValueChange={(value: any) => setPaymentMethod(value)}
      >
        <SelectTrigger className="border-3 border-purple-200 focus:border-purple-400 hover:border-purple-300 transition-colors duration-300 rounded-2xl shadow-lg focus:shadow-xl h-14 text-lg bg-white/80 backdrop-blur-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-purple-200 rounded-2xl shadow-2xl">
          <SelectItem value="Cash" className="hover:bg-green-50 transition-colors py-4 text-lg rounded-xl m-1">
            <span className="flex items-center gap-3">
              <span className="text-green-600 text-2xl">💰</span>
              Cash Payment
            </span>
          </SelectItem>
          <SelectItem value="Borrow" className="hover:bg-orange-50 transition-colors py-4 text-lg rounded-xl m-1">
            <span className="flex items-center gap-3">
              <span className="text-orange-600 text-2xl">📝</span>
              Credit / Borrow
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentSection;
