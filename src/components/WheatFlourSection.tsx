
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WheatFlourSectionProps {
  wheatWeight: string;
  setWheatWeight: (value: string) => void;
  flourType: 'Atta' | 'Besan' | 'Multigrain' | 'Other';
  setFlourType: (value: 'Atta' | 'Besan' | 'Multigrain' | 'Other') => void;
  totalPrice: number;
}

const WheatFlourSection: React.FC<WheatFlourSectionProps> = ({
  wheatWeight,
  setWheatWeight,
  flourType,
  setFlourType,
  totalPrice,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label htmlFor="wheatWeight" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
            ⚖️ Weight (kg) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="wheatWeight"
            type="number"
            step="0.01"
            min="0"
            value={wheatWeight}
            onChange={(e) => setWheatWeight(e.target.value)}
            required
            className="h-12 rounded-xl border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 transition-colors duration-200 text-base"
            placeholder="0.00"
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="flourType" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
            🌾 Flour Type
          </Label>
          <Select
            value={flourType}
            onValueChange={(value: any) => setFlourType(value)}
          >
            <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200 hover:border-amber-300 focus:border-amber-500 transition-colors duration-200 text-base bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
              <SelectItem value="Atta" className="hover:bg-orange-50 transition-colors py-3 text-base rounded-lg m-1">
                <span className="flex items-center gap-3">
                  🌾 Atta
                </span>
              </SelectItem>
              <SelectItem value="Besan" className="hover:bg-yellow-50 transition-colors py-3 text-base rounded-lg m-1">
                <span className="flex items-center gap-3">
                  🟡 Besan
                </span>
              </SelectItem>
              <SelectItem value="Multigrain" className="hover:bg-green-50 transition-colors py-3 text-base rounded-lg m-1">
                <span className="flex items-center gap-3">
                  🌿 Multigrain
                </span>
              </SelectItem>
              <SelectItem value="Other" className="hover:bg-gray-50 transition-colors py-3 text-base rounded-lg m-1">
                <span className="flex items-center gap-3">
                  📦 Other
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label className="text-slate-700 font-semibold text-sm flex items-center gap-2">
            💰 Rate per Kg
          </Label>
          <div className="h-12 bg-emerald-100 border-2 border-emerald-200 rounded-xl p-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-700">₹2.00</span>
              <span className="text-sm text-emerald-600 font-medium px-2 py-1 bg-emerald-200 rounded-full">Fixed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 p-6 rounded-2xl border-2 border-pink-200 mt-6 transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center">
          <Label className="text-xl font-bold text-slate-800 block mb-3 flex items-center justify-center gap-3">
            <span className="text-2xl">💎</span>
            Total Amount
          </Label>
          <div className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
            ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default WheatFlourSection;
