/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Star, Plus, UtensilsCrossed, WashingMachine, UserCheck, ShoppingBag, FerrisWheel, Camera } from 'lucide-react';
import { servicesData, lifestyleData } from '../data';

interface CityDetailPageProps {
  onBack: () => void;
  servicesBookmarked: string[];
  lifestyleBookmarked: string[];
  onAddMore: (type: 'services' | 'lifestyle', category?: string) => void;
  selectedArea: string;
  userPreferences: {
    category: string | null;
    subCategory: string | null;
    details: string;
  };
}

export default function CityDetailPage({ onBack, servicesBookmarked, lifestyleBookmarked, onAddMore, selectedArea, userPreferences }: CityDetailPageProps) {
  const displayCategory = userPreferences.category || 'Settler';
  const displaySubCategory = userPreferences.subCategory || 'Student';
  const displayDetails = userPreferences.details || 'DTU Delhi engineering collage janakpuri west branch near district centre';
  
  const getBookmarkedItems = (ids: string[], source: any[]) => {
    return source.filter(item => ids.includes(item.id));
  };

  const services = getBookmarkedItems(servicesBookmarked, servicesData);
  const lifestyle = getBookmarkedItems(lifestyleBookmarked, lifestyleData);

  const housingInfo = {
    'Vikaspuri': { rent: '₹ 8k–15k' },
    'Shiv vihar': { rent: '₹ 5k–10k' },
    'Rajouri garden': { rent: '₹ 10k–18k' }
  }[selectedArea] || { rent: '₹ 8k–15k' };

  const renderSection = (title: string, items: any[], icon: React.ReactNode, type: 'services' | 'lifestyle', category: string) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6 text-gray-500">
        {icon}
        <span className="text-[17px] font-bold">{title}</span>
      </div>
      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-[20px] md:rounded-[24px] p-2.5 md:p-3 pr-4 md:pr-6 flex items-center gap-3 md:gap-4 shadow-sm border border-gray-100/50 min-w-[180px] md:min-w-[200px] flex-grow md:flex-grow-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-gray-900">{item.name}</h4>
              <div className="flex items-center gap-1 text-[12px] text-amber-500 font-bold">
                <Star size={12} fill="currentColor" />
                <span>{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
        <button 
          onClick={() => onAddMore(type, category)}
          className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-300 hover:text-[#4355b9] hover:border-[#4355b9] transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans pb-20">
      {/* Dynamic Header with Back Button */}
      <header className="px-4 md:px-8 py-4 md:py-6 flex items-center sticky top-0 z-50 bg-transparent">
        <button 
          onClick={onBack}
          className="p-2 md:p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 hover:bg-white transition-all active:scale-95 text-gray-900"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 -mt-2 md:-mt-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100/50 mb-8 md:mb-10 overflow-hidden w-full gap-6 md:gap-0">
          <div className="flex-grow md:pr-8 order-2 md:order-1">
            <div className="flex items-start gap-3 md:gap-4">
              <MapPin size={24} className="text-gray-900 mt-1 md:mt-1.5 flex-shrink-0" />
              <div>
                <h1 className="text-[26px] md:text-[32px] font-bold text-gray-900 leading-tight mb-1 md:mb-0.5">{selectedArea} (New Delhi)</h1>
                <p className="text-[14px] md:text-[15px] font-bold text-gray-900 mb-2 md:mb-3">{displayCategory.replace('s', '')} : {displaySubCategory}</p>
                <p className="text-[14px] md:text-[15px] font-medium text-gray-400 leading-relaxed max-w-[340px]">
                  {displayDetails}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[320px] h-[160px] md:h-[180px] rounded-[20px] md:rounded-[24px] overflow-hidden flex-shrink-0 md:-mr-2 order-1 md:order-2">
             <img 
               src="https://res.cloudinary.com/dvau9scrh/image/upload/v1778595173/ChatGPT_Image_May_12_2026_07_14_01_PM_h1xek7.png" 
               alt="City Overview" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Selected Housing Card */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 md:pr-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-50 mb-12 md:mb-16 flex flex-col w-full md:w-auto md:inline-flex">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="bg-gray-100 p-2 rounded-lg">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
               </svg>
            </div>
            <span className="text-[17px] md:text-[19px] font-bold text-gray-900">Selected Housing & Area</span>
          </div>
          <div className="md:pl-2">
            <div className="flex flex-col border border-gray-100 rounded-2xl p-4 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[16px] md:text-[17px] font-bold text-gray-900">{selectedArea}</span>
                 <div className="flex gap-1 opacity-20">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                 </div>
              </div>
              <p className="text-[15px] md:text-[16px] font-bold text-gray-900">Avg rent : {housingInfo.rent}</p>
            </div>
          </div>
        </div>

        {/* Sections Spacer */}
        <div className="flex flex-col items-center gap-8 md:gap-12 mt-6 md:mt-10">
           {/* Essential Services */}
           <div className="w-full">
              <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
                 <div className="h-[1px] w-8 md:w-12 bg-gray-200"></div>
                 <span className="text-gray-500 font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm">Essential Services</span>
                 <div className="h-[1px] w-8 md:w-12 bg-gray-200"></div>
              </div>

              {renderSection("Food providers", services.filter(s => s.category === 'food'), <UtensilsCrossed size={18} />, 'services', 'food')}
              {renderSection("Laundry", services.filter(s => s.category === 'laundry'), <WashingMachine size={18} />, 'services', 'laundry')}
              {renderSection("Servant services", services.filter(s => s.category === 'servant'), <UserCheck size={18} />, 'services', 'servant')}
           </div>

           {/* Lifestyle Exploration */}
           <div className="w-full">
              <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
                 <div className="h-[1px] w-8 md:w-12 bg-gray-200"></div>
                 <span className="text-gray-500 font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm">Lifestyle Exploration</span>
                 <div className="h-[1px] w-8 md:w-12 bg-gray-200"></div>
              </div>

              {renderSection("Markets", lifestyle.filter(l => l.category === 'markets'), <ShoppingBag size={18} />, 'lifestyle', 'markets')}
              {renderSection("Fun activities", lifestyle.filter(l => l.category === 'fun'), <FerrisWheel size={18} />, 'lifestyle', 'fun')}
              {renderSection("Attraction spots", lifestyle.filter(l => l.category === 'attractions'), <Camera size={18} />, 'lifestyle', 'attractions')}
           </div>
        </div>
      </main>
    </div>
  );
}
