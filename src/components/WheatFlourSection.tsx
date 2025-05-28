
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WheatFlourSectionProps {
  wheatWeight: string;
  setWheatWeight: (value: string) => void;
  flourType: 'Atta' | 'Maida' | 'Besan' | 'Multigrain' | 'Other';
  setFlourType: (value: 'Atta' | 'Maida' | 'Besan' | 'Multigrain' | 'Other') => void;
  ratePerKg: string;
  setRatePerKg: (value: string) => void;
  totalPrice: number;
}

const WheatFlourSection: React.FC<WheatFlourSectionProps> = ({
  wheatWeight,
  setWheatWeight,
  flourType,
  setFlourType,
  ratePerKg,
  setRatePerKg,
  totalPrice,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="wheatWeight">Weight of Wheat (kg) *</Label>
          <Input
            id="wheatWeight"
            type="number"
            step="0.01"
            min="0"
            value={wheatWeight}
            onChange={(e) => setWheatWeight(e.target.value)}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
        
        <div>
          <Label htmlFor="flourType">Type of Flour</Label>
          <Select
            value={flourType}
            onValueChange={(value: any) => setFlourType(value)}
          >
            <SelectTrigger className="border-amber-200 focus:border-amber-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Atta">Atta</SelectItem>
              <SelectItem value="Maida">Maida</SelectItem>
              <SelectItem value="Besan">Besan</SelectItem>
              <SelectItem value="Multigrain">Multigrain</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ratePerKg">Rate per Kg (₹) *</Label>
          <Input
            id="ratePerKg"
            type="number"
            step="0.01"
            min="0"
            value={ratePerKg}
            onChange={(e) => setRatePerKg(e.target.value)}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <Label className="text-lg font-semibold text-amber-800">
          Total Price: ₹{totalPrice.toFixed(2)}
        </Label>
      </div>
    </>
  );
};

export default WheatFlourSection;
