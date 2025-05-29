
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
    <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 p-10 rounded-3xl border-3 border-emerald-300 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      <div className="flex items-center justify-center space-x-8 group relative z-10">
        <Checkbox
          id="isReady"
          checked={isReady}
          onCheckedChange={(checked) => setIsReady(!!checked)}
          className="border-4 border-emerald-500 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all duration-300 hover:scale-125 w-8 h-8"
        />
        <Label 
          htmlFor="isReady" 
          className="text-2xl font-bold text-emerald-800 group-hover:text-emerald-900 transition-colors cursor-pointer flex items-center gap-6"
        >
          <span className="text-5xl">{isReady ? '✅' : '⏳'}</span>
          <span>Item is {isReady ? 'ready for pickup' : 'still processing'}</span>
        </Label>
      </div>
    </div>
  );
};

export default ItemReadySection;
