/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, MapPin, Users } from 'lucide-react';

interface SavedCitiesPageProps {
  onBack: () => void;
  onPlanNew: () => void;
  onSelectCity: () => void;
  selectedArea: string;
  userPreferences: {
    category: string | null;
    subCategory: string | null;
    details: string;
  };
}

export default function SavedCitiesPage({ onBack, onPlanNew, onSelectCity, selectedArea, userPreferences }: SavedCitiesPageProps) {
  const displayArea = `${selectedArea} (New Delhi)`;
  
  const displayCategory = userPreferences.category || 'Settler';
  const displaySubCategory = userPreferences.subCategory || 'Student';
  const displayDetails = userPreferences.details || 'DTU Delhi engineering collage janakpuri west branch near district centre';

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Saved cites</h1>
        </div>
        
        <button 
          onClick={onPlanNew}
          className="bg-[#E8EBFF] text-[#4355b9] px-6 py-2.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#DDE2FF] transition-all shadow-sm active:scale-95"
        >
          <span className="tracking-tight">Plan new</span>
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 md:py-10">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <Users size={24} className="text-gray-900" />
          <span className="text-[18px] font-bold text-gray-900">{displayCategory.replace('s', '')}</span>
        </div>

        {/* City Card */}
        <motion.button 
          onClick={onSelectCity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0,0,0,0.08)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-[28px] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_4px_30px_rgb(0,0,0,0.03)] border-2 border-gray-100 w-full max-w-[640px] group text-left outline-none gap-6 md:gap-0"
        >
          <div className="flex-grow md:pr-6 min-w-0 order-2 md:order-1">
            <div className="flex items-center gap-2.5 mb-2 overflow-hidden">
              <MapPin size={20} className="text-gray-900 flex-shrink-0" />
              <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{displayArea}</h2>
            </div>
            
            <p className="text-[13px] md:text-[14px] font-bold text-gray-900 mb-2 md:mb-3">{displayCategory.replace('s', '')} : {displaySubCategory}</p>
            
            <p className="text-[13px] md:text-[14px] font-medium text-gray-400 leading-relaxed max-w-[320px]">
              {displayDetails}
            </p>
          </div>

          <div className="w-full md:w-[256px] h-[160px] md:h-[168px] rounded-[20px] overflow-hidden flex-shrink-0 shadow-sm order-1 md:order-2">
            <img 
              src="https://res.cloudinary.com/dvau9scrh/image/upload/v1778595173/ChatGPT_Image_May_12_2026_07_14_01_PM_h1xek7.png" 
              alt="City View" 
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
        </motion.button>
      </main>
    </div>
  );
}
