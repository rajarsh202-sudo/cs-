/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles, MapPin, Star, Clock, Bookmark, ChevronRight, Store, PartyPopper, Camera, Navigation, Globe } from 'lucide-react';
import { LifestyleItem, lifestyleData } from '../data';

interface LifestylePageProps {
  onBack: () => void;
  onNext: () => void;
  bookmarked: string[];
  onToggleBookmark: (id: string) => void;
  servicesBookmarked: string[];
  hideNext?: boolean;
  initialCategory?: 'markets' | 'fun' | 'attractions';
}


const lifestylePageData = lifestyleData;

export default function LifestylePage({ 
  onBack, 
  onNext, 
  bookmarked, 
  onToggleBookmark, 
  servicesBookmarked, 
  hideNext = false,
  initialCategory = 'markets'
}: LifestylePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'markets' | 'fun' | 'attractions'>(initialCategory);
  const [distanceFilter, setDistanceFilter] = useState<'10k' | '20k' | 'city'>('10k');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const filteredItems = lifestyleData.filter(s => s.category === selectedCategory);

  const marketCount = bookmarked.filter(id => lifestyleData.find(s => s.id === id)?.category === 'markets').length;
  const funCount = bookmarked.filter(id => lifestyleData.find(s => s.id === id)?.category === 'fun').length;
  const attractionCount = bookmarked.filter(id => lifestyleData.find(s => s.id === id)?.category === 'attractions').length;

  // Custom markers for each category
  const marketMarkers = [
    { id: 'm1', top: '35%', left: '25%' },
    { id: 'm2', top: '55%', left: '75%' },
    { id: 'm3', top: '20%', left: '60%' },
  ];

  const funMarkers = [
    { id: 'f1', top: '45%', left: '40%' },
    { id: 'f2', top: '65%', left: '20%' },
    { id: 'f3', top: '15%', left: '80%' },
  ];

  const attractionMarkers = [
    { id: 'a1', top: '25%', left: '15%' },
    { id: 'a2', top: '75%', left: '55%' },
    { id: 'a3', top: '10%', left: '45%' },
  ];


  React.useEffect(() => {
    const updateConstraints = () => {
      if (constraintsRef.current) {
        const containerWidth = constraintsRef.current.offsetWidth;
        const containerHeight = constraintsRef.current.offsetHeight;
        const imageWidth = containerWidth * 2;
        const imageHeight = containerHeight * 2;
        
        setDragConstraints({
          left: -(imageWidth - containerWidth),
          right: 0,
          top: -(imageHeight - containerHeight),
          bottom: 0,
        });
      }
    };

    const timer = setTimeout(updateConstraints, 100);
    window.addEventListener('resize', updateConstraints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [distanceFilter]);

  const mapImage = distanceFilter === 'city'
    ? "https://res.cloudinary.com/dvau9scrh/image/upload/v1778560173/ChatGPT_Image_May_12_2026_09_59_21_AM_crhrlz.png"
    : distanceFilter === '20k' 
      ? "https://res.cloudinary.com/dvau9scrh/image/upload/v1778559454/ChatGPT_Image_May_12_2026_09_46_26_AM_bzdbau.png"
      : "https://res.cloudinary.com/dvau9scrh/image/upload/v1778505464/ChatGPT_Image_May_11_2026_03_55_07_PM_gvml4i.png";

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 text-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Lifestyle Exploration</h1>
        </div>
        <button className="bg-[#E8EBFF] text-[#4355b9] px-6 py-2.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#DDE2FF] transition-all shadow-sm">
          <Sparkles size={20} fill="currentColor" className="opacity-80" />
          <span className="tracking-tight">AI Guide</span>
        </button>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <p className="text-center text-gray-500 font-medium mb-6 md:mb-8 text-sm md:text-base">Discover activities and places around you</p>

        {/* Map Container */}
        <div 
          ref={constraintsRef}
          className="relative w-full aspect-[4/3] md:aspect-[21/7] min-h-[300px] md:min-h-[400px] mb-6 md:mb-8 rounded-[24px] md:rounded-[40px] overflow-hidden border-[3px] md:border-4 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group cursor-grab active:cursor-grabbing bg-gray-50 ring-1 ring-black/5"
        >
          <motion.div 
            drag 
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragMomentum={true}
            initial={{ x: -250, y: -100 }}
            className="absolute top-0 left-0 w-[200%] h-[200%]"
          >
            <img 
              src={mapImage} 
              alt="Map View" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            
            {/* Conditional Markers */}
            {selectedCategory === 'markets' && marketMarkers.map(m => (
              <MapMarker key={m.id} top={m.top} left={m.left} color="#397EFE"><Store size={18} className="text-white" /></MapMarker>
            ))}
            {selectedCategory === 'fun' && funMarkers.map(m => (
              <MapMarker key={m.id} top={m.top} left={m.left} color="#F97316"><PartyPopper size={18} className="text-white" /></MapMarker>
            ))}
            {selectedCategory === 'attractions' && attractionMarkers.map(m => (
              <MapMarker key={m.id} top={m.top} left={m.left} color="#8B5CF6"><Camera size={18} className="text-white" /></MapMarker>
            ))}
          </motion.div>
        </div>

        {/* Distance Filters */}
        <div className="flex overflow-x-auto md:justify-center gap-3 md:gap-4 mb-6 md:mb-8 no-scrollbar px-2 -mx-2 md:mx-0">
          <DistanceButton 
            active={distanceFilter === '10k'} 
            onClick={() => setDistanceFilter('10k')}
            label="Under 10 Km"
            icon={<Navigation size={16} />}
          />
          <DistanceButton 
            active={distanceFilter === '20k'} 
            onClick={() => setDistanceFilter('20k')}
            label="10 to 20 Km"
            icon={<Globe size={16} />}
          />
          <DistanceButton 
            active={distanceFilter === 'city'} 
            onClick={() => setDistanceFilter('city')}
            label="Whole city"
            icon={<MapPin size={16} />}
          />
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto md:justify-center gap-4 md:gap-6 mb-8 md:mb-12 no-scrollbar px-2 -mx-2 md:mx-0">
          <CategoryButton 
            active={selectedCategory === 'markets'} 
            onClick={() => setSelectedCategory('markets')}
            label="Markets"
            icon={<Store size={18} />}
          />
          <CategoryButton 
            active={selectedCategory === 'fun'} 
            onClick={() => setSelectedCategory('fun')}
            label="Fun activities"
            icon={<PartyPopper size={18} />}
          />
          <CategoryButton 
            active={selectedCategory === 'attractions'} 
            onClick={() => setSelectedCategory('attractions')}
            label="Attraction spots"
            icon={<Camera size={18} />}
          />
        </div>

        {/* Lifestyle List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[24px] pt-3 md:pt-4 px-3 md:px-4 pb-2 flex flex-col sm:flex-row gap-4 md:gap-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all group relative"
            >
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#4355b9] text-[9px] md:text-[10px] px-2 md:px-2.5 py-1 rounded-lg font-bold shadow-sm z-10 flex items-center gap-1">
                <MapPin size={10} />
                {item.distance}
              </div>
              
              <div className="w-full sm:w-[160px] h-[160px] md:h-[140px] rounded-[18px] overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                  
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500 mb-2 md:mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span>{item.rating}</span>
                      <span className="text-gray-300 font-medium">(128)</span>
                    </div>
                    {item.category !== 'markets' && (
                      <span className="text-[#10B981] bg-[#10B981]/5 px-2 py-0.5 rounded-md text-[11px]">{item.priceRange}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 md:mb-3">
                    <Clock size={14} />
                    <span>{item.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 md:px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => onToggleBookmark(item.id)}
                    className={`p-2 rounded-xl transition-all ${bookmarked.includes(item.id) ? 'bg-[#4355b9]/10 text-[#4355b9]' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <Bookmark size={22} fill={bookmarked.includes(item.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Shared Footer Style */}
      <footer className="bg-white border-t border-gray-100 p-4 md:p-6 w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 py-1 md:py-2 min-h-[48px] md:min-h-[56px] overflow-x-auto w-full sm:w-auto no-scrollbar">
            <span className="text-gray-400 text-xs md:text-sm font-bold flex-shrink-0">Services :</span>
            <div className="flex gap-2 md:gap-3">
              {marketCount > 0 && <SelectionChip label="Markets" count={marketCount} color="bg-[#10B981]" />}
              {funCount > 0 && <SelectionChip label="Fun activities" count={funCount} color="bg-[#10B981]" />}
              {attractionCount > 0 && <SelectionChip label="Attractions" count={attractionCount} color="bg-[#10B981]" />}
            </div>
          </div>
          <div className="w-full sm:w-auto">
            {hideNext ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="w-full sm:w-auto bg-[#4355b9] hover:bg-[#364494] text-white px-8 md:px-12 py-3 md:py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all text-sm md:text-base"
              >
                Apply
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="w-full sm:w-auto bg-[#4355b9] hover:bg-[#364494] text-white px-8 md:px-12 py-3 md:py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all text-sm md:text-base"
              >
                Next
              </motion.button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

function DistanceButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 md:px-6 py-2.5 rounded-[12px] flex items-center gap-2 md:gap-2.5 transition-all font-bold text-[13px] md:text-sm border-2 flex-shrink-0 ${active ? 'bg-[#4355b9] border-[#4355b9] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function CategoryButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 md:px-5 py-2.5 rounded-full flex items-center gap-2 md:gap-3 border-2 transition-all font-bold text-[13px] md:text-[14px] flex-shrink-0 ${active ? 'bg-white border-gray-900 text-gray-900 shadow-md ring-4 ring-gray-100' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
    >
      <span className={active ? 'text-gray-900' : 'text-gray-500'}>{icon}</span>
      <span>{label}</span>
      <ChevronRight size={16} className={active ? 'text-gray-900' : 'text-gray-400'} />
    </button>
  );
}

function SelectionChip({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className={`flex items-center gap-2 ${color} text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm`}>
      <span className="tracking-tight">{label}</span>
      <span className="bg-white text-[#10B981] px-2 py-0.5 rounded-lg flex items-center justify-center min-w-[20px]">
        {count}
      </span>
    </div>
  );
}

function MapMarker({ top, left, color, children }: { top: string, left: string, color: string, children: React.ReactNode, key?: string | number }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      className="absolute cursor-pointer group"
      style={{ top, left, transform: 'translate(-50%, -100%)' }}
    >
      <div className="relative group flex items-center justify-center" style={{ width: 42, height: 52 }}>
        <svg width="42" height="52" viewBox="0 0 51 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg absolute inset-0">
          <path d="M25.5 3C19.7998 3.0065 14.335 5.28507 10.3043 9.33583C6.27371 13.3866 4.00647 18.8787 4 24.6074C4 43.0964 23.5455 57.0601 24.3786 57.6445C24.7072 57.8759 25.0987 58 25.5 58C25.9013 58 26.2928 57.8759 26.6214 57.6445C27.4545 57.0601 47 43.0964 47 24.6074C46.9935 18.8787 44.7263 13.3866 40.6957 9.33583C36.665 5.28507 31.2002 3.0065 25.5 3Z" fill="white"/>
          <circle cx="25.5" cy="24.5" r="17.5" fill={color}/>
        </svg>
        <div className="relative z-10 -mt-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
