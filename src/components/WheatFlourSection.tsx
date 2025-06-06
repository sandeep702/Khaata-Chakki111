
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, Wheat, IndianRupee } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="group">
        <Label htmlFor="wheatWeight" className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
          <Scale size={16} className="text-green-500" />
          Weight (kg) *
        </Label>
        <Input
          id="wheatWeight"
          type="number"
          step="0.01"
          min="0"
          value={wheatWeight}
          onChange={(e) => setWheatWeight(e.target.value)}
          required
          className="border-2 border-slate-200 focus:border-green-400 hover:border-slate-300 transition-colors duration-300 rounded-xl shadow-sm focus:shadow-md h-12 text-base bg-white/80 backdrop-blur-sm"
          placeholder="0.00"
        />
      </div>
      
      <div className="group">
        <Label htmlFor="flourType" className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
          <Wheat size={16} className="text-amber-500" />
          Flour Type
        </Label>
        <Select
          value={flourType}
          onValueChange={(value: any) => setFlourType(value)}
        >
          <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400 hover:border-slate-300 transition-colors duration-300 rounded-xl shadow-sm focus:shadow-md h-12 text-base bg-white/80 backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 rounded-xl shadow-xl">
            <SelectItem value="Atta" className="hover:bg-orange-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-lg">🌾</span>
                Atta
              </span>
            </SelectItem>
            <SelectItem value="Besan" className="hover:bg-yellow-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-lg">🟡</span>
                Besan
              </span>
            </SelectItem>
            <SelectItem value="Multigrain" className="hover:bg-green-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-lg">🌿</span>
                Multigrain
              </span>
            </SelectItem>
            <SelectItem value="Other" className="hover:bg-gray-50 transition-colors py-3 text-base rounded-lg m-1 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="text-lg">📦</span>
                Other
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="group">
        <Label className="text-slate-700 font-semibold mb-3 block group-hover:text-slate-800 transition-colors text-sm flex items-center gap-2">
          <IndianRupee size={16} className="text-green-500" />
          Rate per Kg
        </Label>
        <div className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center h-12 flex items-center justify-center shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-700">₹2.00</span>
            <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">Fixed Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheatFlourSection;
