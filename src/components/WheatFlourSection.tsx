
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
        <div className="group">
          <Label htmlFor="wheatWeight" className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
            Weight of Wheat (kg) *
          </Label>
          <Input
            id="wheatWeight"
            type="number"
            step="0.01"
            min="0"
            value={wheatWeight}
            onChange={(e) => setWheatWeight(e.target.value)}
            required
            className="border-2 border-amber-200 focus:border-amber-500 hover:border-amber-400 transition-colors duration-200 rounded-lg shadow-sm focus:shadow-md"
            placeholder="0.00"
          />
        </div>
        
        <div className="group">
          <Label htmlFor="flourType" className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
            Type of Flour
          </Label>
          <Select
            value={flourType}
            onValueChange={(value: any) => setFlourType(value)}
          >
            <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500 hover:border-amber-400 transition-colors duration-200 rounded-lg shadow-sm focus:shadow-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-amber-200 rounded-lg shadow-lg">
              <SelectItem value="Atta" className="hover:bg-amber-50 transition-colors">🌾 Atta</SelectItem>
              <SelectItem value="Besan" className="hover:bg-amber-50 transition-colors">🟡 Besan</SelectItem>
              <SelectItem value="Multigrain" className="hover:bg-amber-50 transition-colors">🌿 Multigrain</SelectItem>
              <SelectItem value="Other" className="hover:bg-amber-50 transition-colors">📦 Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="group">
          <Label className="text-amber-800 font-semibold mb-2 block group-hover:text-amber-900 transition-colors">
            Rate per Kg (₹)
          </Label>
          <div className="border-2 border-green-300 bg-green-50 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-green-700">₹2.00</span>
            <p className="text-xs text-green-600">Fixed Rate</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-6 rounded-xl border-2 border-amber-300 shadow-lg transform hover:scale-[1.02] transition-all duration-200">
        <div className="text-center">
          <Label className="text-2xl font-bold text-amber-900 block mb-2">
            💰 Total Price
          </Label>
          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
            ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </>
  );
};

export default WheatFlourSection;
