import { Bike, PersonStanding, Bus, Train } from 'lucide-react';
import { motion } from 'motion/react';

interface RecommendationCardProps {
  title: string;
  price: string;
  description: string;
  badge: string;
  type: 'best' | 'budget' | 'metro';
  icons: string[];
}

export default function RecommendationCard({ title, price, description, badge, type, icons }: RecommendationCardProps) {
  const isBest = type === 'best';
  const isBudget = type === 'budget';
  const isMetro = type === 'metro';

  const badgeColor = isBest ? 'bg-green-500' : isMetro ? 'bg-blue-600' : isBudget ? 'bg-amber-500' : 'bg-gray-200 text-gray-700';
  const priceColor = 'text-gray-500';
  const borderColor = isBest ? 'border-green-500 border-2' : 'border-gray-100';

  return (
    <div
      className={`bg-white rounded-3xl p-6 card-shadow relative overflow-hidden flex flex-col h-full border ${borderColor}`}
    >
      <div className={`absolute top-0 right-0 ${badgeColor} text-white text-[9px] px-4 py-1.5 rounded-bl-xl font-extrabold uppercase tracking-widest shadow-sm`}>
        {badge}
      </div>
      
      <div className="flex justify-between items-start mb-4 pr-16 gap-5">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap">{title}</h3>
          <p className={`text-lg font-extrabold ${priceColor} mt-0.5`}>{price}</p>
        </div>
        <div className="flex gap-2">
          {icons.includes('bike') && <div className="p-1.5 bg-gray-50 rounded-lg"><Bike size={18} className="text-gray-400" /></div>}
          {icons.includes('walk') && <div className="p-1.5 bg-gray-50 rounded-lg"><PersonStanding size={18} className="text-gray-400" /></div>}
          {icons.includes('bus') && <div className="p-1.5 bg-gray-50 rounded-lg"><Bus size={18} className="text-gray-400" /></div>}
          {icons.includes('metro') && <div className="p-1.5 bg-gray-50 rounded-lg"><Train size={18} className="text-gray-400" /></div>}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
