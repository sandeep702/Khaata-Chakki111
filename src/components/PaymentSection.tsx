
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';

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
      <Label htmlFor="paymentMethod" className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
        <CreditCard size={16} className="text-purple-500" />
        Payment Method
      </Label>
      <Select
        value={paymentMethod}
        onValueChange={(value: any) => setPaymentMethod(value)}
      >
        <SelectTrigger className="border-2 border-slate-200 focus:border-purple-400 hover:border-slate-300 transition-colors duration-300 rounded-xl shadow-sm focus:shadow-md h-12 text-base bg-white/80 backdrop-blur-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 rounded-xl shadow-xl">
          <SelectItem value="Cash" className="hover:bg-green-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
            <span className="flex items-center gap-3">
              <span className="text-green-600 text-lg">💰</span>
              Cash Payment
            </span>
          </SelectItem>
          <SelectItem value="Borrow" className="hover:bg-orange-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
            <span className="flex items-center gap-3">
              <span className="text-orange-600 text-lg">📝</span>
              Credit / Borrow
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentSection;
