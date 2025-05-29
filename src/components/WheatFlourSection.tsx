
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group">
          <Label htmlFor="wheatWeight" className="text-emerald-700 font-bold mb-3 block group-hover:text-emerald-800 transition-colors text-lg">
            ⚖️ Weight (kg) *
          </Label>
          <Input
            id="wheatWeight"
            type="number"
            step="0.01"
            min="0"
            value={wheatWeight}
            onChange={(e) => setWheatWeight(e.target.value)}
            required
            className="border-3 border-emerald-200 focus:border-emerald-400 hover:border-emerald-300 transition-colors duration-300 rounded-2xl shadow-lg focus:shadow-xl h-14 text-lg bg-white/80 backdrop-blur-sm"
            placeholder="0.00"
          />
        </div>
        
        <div className="group">
          <Label htmlFor="flourType" className="text-amber-700 font-bold mb-3 block group-hover:text-amber-800 transition-colors text-lg">
            🌾 Flour Type
          </Label>
          <Select
            value={flourType}
            onValueChange={(value: any) => setFlourType(value)}
          >
            <SelectTrigger className="border-3 border-amber-200 focus:border-amber-400 hover:border-amber-300 transition-colors duration-300 rounded-2xl shadow-lg focus:shadow-xl h-14 text-lg bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 rounded-2xl shadow-2xl">
              <SelectItem value="Atta" className="hover:bg-orange-50 transition-colors py-4 text-lg rounded-xl m-1">
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🌾</span>
                  Atta
                </span>
              </SelectItem>
              <SelectItem value="Besan" className="hover:bg-yellow-50 transition-colors py-4 text-lg rounded-xl m-1">
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🟡</span>
                  Besan
                </span>
              </SelectItem>
              <SelectItem value="Multigrain" className="hover:bg-green-50 transition-colors py-4 text-lg rounded-xl m-1">
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🌿</span>
                  Multigrain
                </span>
              </SelectItem>
              <SelectItem value="Other" className="hover:bg-gray-50 transition-colors py-4 text-lg rounded-xl m-1">
                <span className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  Other
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="group">
          <Label className="text-green-700 font-bold mb-3 block group-hover:text-green-800 transition-colors text-lg">
            💰 Rate per Kg
          </Label>
          <div className="border-3 border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 text-center h-14 flex items-center justify-center shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-700">₹2.00</span>
              <span className="text-sm text-green-600 font-semibold">Fixed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 p-10 rounded-3xl border-3 border-rose-300 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
        <div className="text-center relative z-10">
          <Label className="text-3xl font-bold text-rose-800 block mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl">💎</span>
            Total Amount
          </Label>
          <div className="text-6xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default WheatFlourSection;
