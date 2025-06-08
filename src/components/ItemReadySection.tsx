
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ItemReadySectionProps {
  isReady: boolean;
  setIsReady: (value: boolean) => void;
}

const ItemReadySection: React.FC<ItemReadySectionProps> = ({
  isReady,
  setIsReady,
}) => {
  return (
    <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 p-8 rounded-2xl border-2 border-emerald-200 shadow-lg backdrop-blur-sm relative overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      <div className="flex items-center justify-center space-x-6 group relative z-10">
        <Checkbox
          id="isReady"
          checked={isReady}
          onCheckedChange={(checked) => setIsReady(!!checked)}
          className="border-3 border-emerald-500 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all duration-300 hover:scale-110 w-6 h-6"
        />
        <Label 
          htmlFor="isReady" 
          className="text-xl font-bold text-emerald-800 group-hover:text-emerald-900 transition-colors cursor-pointer flex items-center gap-4"
        >
          <span className="text-4xl">{isReady ? '✅' : '⏳'}</span>
          <span>Item is {isReady ? 'ready for pickup' : 'still processing'}</span>
        </Label>
      </div>
    </div>
  );
};

export default ItemReadySection;
