/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles, MapPin, Star, Clock, Bookmark, Utensils, Shirt, UserCheck, ChevronRight, Leaf, Martini, Drumstick, WashingMachine } from 'lucide-react';
import { Service, servicesData } from '../data';

interface ServicesPageProps {
  onBack: () => void;
  onNext: () => void;
  bookmarked: string[];
  onToggleBookmark: (id: string) => void;
  lifestyleBookmarked: string[];
  hideNext?: boolean;
  initialCategory?: 'food' | 'laundry' | 'servant';
}


const servicesPageData = servicesData;

export default function ServicesPage({ 
  onBack, 
  onNext, 
  bookmarked, 
  onToggleBookmark, 
  lifestyleBookmarked, 
  hideNext = false,
  initialCategory = 'food'
}: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'food' | 'laundry' | 'servant'>(initialCategory);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const filteredServices = servicesData.filter(s => s.category === selectedCategory);

  const foodCount = bookmarked.filter(id => servicesData.find(s => s.id === id)?.category === 'food').length;
  const laundryCount = bookmarked.filter(id => servicesData.find(s => s.id === id)?.category === 'laundry').length;
  const servantCount = bookmarked.filter(id => servicesData.find(s => s.id === id)?.category === 'servant').length;
  
  // Dummy counts for lifestyle to show in shared footer
  const marketCount = lifestyleBookmarked.length > 0 ? 3 : 0; // Simulated for visual effect if any lifestyle is bookmarked
  const funCount = 0; 
  const attractionCount = 0;

  // Random markers for food providers
  const foodMarkers = React.useMemo(() => [
    { id: 'v1', top: '25%', left: '35%', type: 'veg' },
    { id: 'v2', top: '45%', left: '55%', type: 'veg' },
    { id: 'nv1', top: '30%', left: '75%', type: 'nonveg' },
    { id: 'nv2', top: '60%', left: '25%', type: 'nonveg' },
    { id: 'b1', top: '20%', left: '15%', type: 'bar' },
    { id: 'b2', top: '55%', left: '85%', type: 'bar' },
    { id: 'b3', top: '15%', left: '45%', type: 'bar' },
  ], []);

  // Random markers for laundry providers
  const laundryMarkers = React.useMemo(() => [
    { id: 'l1', top: '15%', left: '25%' },
    { id: 'l2', top: '40%', left: '65%' },
    { id: 'l3', top: '70%', left: '45%' },
    { id: 'l4', top: '25%', left: '80%' },
    { id: 'l5', top: '60%', left: '20%' },
  ], []);

  // Random markers for servant providers
  const servantMarkers = React.useMemo(() => [
    { id: 's1', top: '20%', left: '30%', type: 'servant' },
    { id: 's2', top: '50%', left: '40%', type: 'servant' },
    { id: 's3', top: '65%', left: '75%', type: 'servant' },
    { id: 'h1', top: '35%', left: '20%', type: 'cook' },
    { id: 'h2', top: '75%', left: '55%', type: 'cook' },
  ], []);


  // Calculate constraints based on container and image size
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (constraintsRef.current) {
        const containerWidth = constraintsRef.current.offsetWidth;
        const containerHeight = constraintsRef.current.offsetHeight;
        // The image is 200% of parent width/height in the new implementation below for better coverage
        const imageWidth = containerWidth * 2;
        const imageHeight = containerHeight * 2;
        
        setDragConstraints({
          left: -(imageWidth - containerWidth),
          right: 0,
          top: -(imageHeight - containerHeight),
          bottom: 0,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Essential Services</h1>
        </div>
        <button className="bg-[#E8EBFF] text-[#4355b9] px-6 py-2.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#DDE2FF] transition-all shadow-sm">
          <Sparkles size={20} fill="currentColor" className="opacity-80" />
          <span className="tracking-tight">AI Guide</span>
        </button>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        {/* Description */}
        <p className="text-center text-gray-500 font-medium mb-6 md:mb-8 text-sm md:text-base">Find the trusted and verified services near you</p>

        {/* Map Container */}
        <div 
          ref={constraintsRef}
          className="relative w-full aspect-[4/3] md:aspect-[21/7] min-h-[300px] md:min-h-[400px] mb-8 md:mb-12 rounded-[24px] md:rounded-[40px] overflow-hidden border-[3px] md:border-4 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group cursor-grab active:cursor-grabbing bg-gray-50 ring-1 ring-black/5"
        >
          <motion.div 
            drag 
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragMomentum={true}
            initial={{ x: -300, y: -150 }}
            className="absolute top-0 left-0 w-[200%] h-[200%]"
          >
            <img 
              src="https://res.cloudinary.com/dvau9scrh/image/upload/v1778505464/ChatGPT_Image_May_11_2026_03_55_07_PM_gvml4i.png" 
              alt="Vikaspuri Map" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            {selectedCategory === 'food' && foodMarkers.map((marker) => (
              <motion.div 
                key={marker.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="absolute cursor-pointer group"
                style={{ top: marker.top, left: marker.left, transform: 'translate(-50%, -100%)' }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  {marker.type === 'veg' && <VegMarker />}
                  {marker.type === 'nonveg' && <NonVegMarker />}
                  {marker.type === 'bar' && <BarMarker />}
                </div>
              </motion.div>
            ))}
            {selectedCategory === 'laundry' && laundryMarkers.map((marker) => (
              <motion.div 
                key={marker.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="absolute cursor-pointer group"
                style={{ top: marker.top, left: marker.left, transform: 'translate(-50%, -100%)' }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <LaundryMarker />
                </div>
              </motion.div>
            ))}
            {selectedCategory === 'servant' && servantMarkers.map((marker) => (
              <motion.div 
                key={marker.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="absolute cursor-pointer group"
                style={{ top: marker.top, left: marker.left, transform: 'translate(-50%, -100%)' }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  {marker.type === 'servant' ? <ServantMarker /> : <CookMarker />}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto md:justify-center gap-4 md:gap-6 mb-8 md:mb-12 no-scrollbar px-2 -mx-2 md:mx-0">
          <CategoryButton 
            active={selectedCategory === 'food'} 
            onClick={() => setSelectedCategory('food')}
            label="Food providers"
            icon={<Utensils size={18} />}
          />
          <CategoryButton 
            active={selectedCategory === 'laundry'} 
            onClick={() => setSelectedCategory('laundry')}
            label="Laundry services"
            icon={<Shirt size={18} />}
          />
          <CategoryButton 
            active={selectedCategory === 'servant'} 
            onClick={() => setSelectedCategory('servant')}
            label="Servant services"
            icon={<UserCheck size={18} />}
          />
        </div>

        {/* Service List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[24px] p-3 md:p-4 flex flex-col sm:flex-row gap-4 md:gap-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all group relative overflow-hidden"
            >
              {service.isVeg && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[8px] md:text-[9px] px-3 md:px-4 py-1.5 rounded-bl-xl font-extrabold uppercase tracking-widest shadow-sm z-10">
                  VEG
                </div>
              )}
              {service.isVegNonVeg && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[8px] md:text-[9px] px-3 md:px-4 py-1.5 rounded-bl-xl font-extrabold uppercase tracking-widest shadow-sm z-10">
                  Veg / Non-Veg
                </div>
              )}
              <div className="w-full sm:w-[160px] h-[160px] sm:h-[120px] rounded-[18px] overflow-hidden flex-shrink-0">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span>{service.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Clock size={14} />
                    <span>{service.hours}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => onToggleBookmark(service.id)}
                    className={`p-2 rounded-xl transition-all ${bookmarked.includes(service.id) ? 'bg-[#4355b9]/10 text-[#4355b9]' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    <Bookmark size={22} fill={bookmarked.includes(service.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Services Footer */}
      <footer className="bg-white border-t border-gray-100 p-4 md:p-6 w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 py-1 md:py-2 min-h-[48px] md:min-h-[56px] overflow-x-auto w-full sm:w-auto no-scrollbar">
            <span className="text-gray-400 text-xs md:text-sm font-bold flex-shrink-0">Services :</span>
            <div className="flex gap-2 md:gap-3">
              {foodCount > 0 && <SelectionChip label="Food providers" count={foodCount} color="bg-[#10B981]" />}
              {laundryCount > 0 && <SelectionChip label="Laundry" count={laundryCount} color="bg-[#10B981]" />}
              {servantCount > 0 && <SelectionChip label="Servant" count={servantCount} color="bg-[#10B981]" />}
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

// Custom SVG Markers
const PinShape = ({ color, children }: { color: string, children?: React.ReactNode }) => (
  <div className="relative group flex items-center justify-center" style={{ width: 42, height: 52 }}>
    <svg width="42" height="52" viewBox="0 0 51 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg absolute inset-0">
      <path d="M25.5 3C19.7998 3.0065 14.335 5.28507 10.3043 9.33583C6.27371 13.3866 4.00647 18.8787 4 24.6074C4 43.0964 23.5455 57.0601 24.3786 57.6445C24.7072 57.8759 25.0987 58 25.5 58C25.9013 58 26.2928 57.8759 26.6214 57.6445C27.4545 57.0601 47 43.0964 47 24.6074C46.9935 18.8787 44.7263 13.3866 40.6957 9.33583C36.665 5.28507 31.2002 3.0065 25.5 3Z" fill="white"/>
      <circle cx="25.5" cy="24.5" r="17.5" fill={color}/>
    </svg>
    <div className="relative z-10 -mt-2">
      {children}
    </div>
  </div>
);

const VegMarker = () => (
  <PinShape color="#40BA62">
    <Leaf size={18} className="text-white fill-white/20" strokeWidth={2.5} />
  </PinShape>
);

const NonVegMarker = () => (
  <PinShape color="#D97706">
    <Drumstick size={18} className="text-white fill-white/20" strokeWidth={2.5} />
  </PinShape>
);

const BarMarker = () => (
  <PinShape color="#722F37">
    <Martini size={18} className="text-white fill-white/20" strokeWidth={2.5} />
  </PinShape>
);

const LaundryMarker = () => (
  <PinShape color="#397EFE">
    <WashingMachine size={18} className="text-white fill-white/20" strokeWidth={2.5} />
  </PinShape>
);

const ServantMarker = () => (
  <svg width="42" height="52" viewBox="0 0 51 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
    <path d="M25.5 3C19.7998 3.0065 14.335 5.28507 10.3043 9.33583C6.27371 13.3866 4.00647 18.8787 4 24.6074C4 43.0964 23.5455 57.0601 24.3786 57.6445C24.7072 57.8759 25.0987 58 25.5 58C25.9013 58 26.2928 57.8759 26.6214 57.6445C27.4545 57.0601 47 43.0964 47 24.6074C46.9935 18.8787 44.7263 13.3866 40.6957 9.33583C36.665 5.28507 31.2002 3.0065 25.5 3Z" fill="white"/>
    <circle cx="25.5" cy="24.5" r="17.5" fill="#397EFE"/>
    <path d="M35.6489 31.6246C35.5831 31.7387 35.4884 31.8334 35.3743 31.8992C35.2603 31.965 35.1309 31.9997 34.9992 31.9996H16.9992C16.8676 31.9995 16.7384 31.9647 16.6245 31.8989C16.5106 31.833 16.416 31.7383 16.3503 31.6243C16.2846 31.5103 16.25 31.381 16.25 31.2494C16.25 31.1178 16.2847 30.9886 16.3505 30.8746C17.7783 28.4062 19.9786 26.6362 22.5464 25.7971C21.2763 25.041 20.2894 23.8888 19.7375 22.5176C19.1855 21.1463 19.0989 19.6317 19.4911 18.2065C19.8832 16.7813 20.7323 15.5242 21.908 14.6282C23.0837 13.7323 24.521 13.2471 25.9992 13.2471C27.4774 13.2471 28.9147 13.7323 30.0905 14.6282C31.2662 15.5242 32.1153 16.7813 32.5074 18.2065C32.8995 19.6317 32.813 21.1463 32.261 22.5176C31.709 23.8888 30.7222 25.041 29.452 25.7971C32.0199 26.6362 34.2202 28.4062 35.648 30.8746C35.714 30.9886 35.7488 31.1178 35.7489 31.2495C35.7491 31.3811 35.7146 31.5105 35.6489 31.6246Z" fill="white"/>
  </svg>
);

const CookMarker = () => (
  <svg width="42" height="52" viewBox="0 0 51 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
    <path d="M25.5 3C19.7998 3.0065 14.335 5.28507 10.3043 9.33583C6.27371 13.3866 4.00647 18.8787 4 24.6074C4 43.0964 23.5455 57.0601 24.3786 57.6445C24.7072 57.8759 25.0987 58 25.5 58C25.9013 58 26.2928 57.8759 26.6214 57.6445C27.4545 57.0601 47 43.0964 47 24.6074C46.9935 18.8787 44.7263 13.3866 40.6957 9.33583C36.665 5.28507 31.2002 3.0065 25.5 3Z" fill="white"/>
    <circle cx="25.5" cy="24.5" r="17.5" fill="#F97316"/>
    <g transform="translate(13.5, 12.5)">
      <path d="M22.5007 10.5002C22.4992 9.10823 21.9456 7.77374 20.9614 6.78949C19.9771 5.80525 18.6426 5.25165 17.2507 5.25016C17.0847 5.25016 16.9188 5.25954 16.7548 5.27454C16.3314 4.37105 15.6594 3.60689 14.8175 3.07158C13.9755 2.53626 12.9984 2.25195 12.0007 2.25195C11.003 2.25195 10.0259 2.53626 9.1839 3.07158C8.34193 3.60689 7.66993 4.37105 7.24662 5.27454C7.08256 5.25954 6.91662 5.25016 6.75069 5.25016C5.55892 5.25045 4.40271 5.65621 3.47213 6.40074C2.54155 7.14528 1.89197 8.18427 1.63019 9.34693C1.3684 10.5096 1.50998 11.7267 2.03165 12.7983C2.55333 13.8698 3.42405 14.7319 4.50069 15.243V19.5002C4.50069 19.898 4.65872 20.2795 4.94003 20.5608C5.22133 20.8421 5.60286 21.0002 6.00069 21.0002H18.0007C18.3985 21.0002 18.78 20.8421 19.0613 20.5608C19.3427 20.2795 19.5007 19.898 19.5007 19.5002V15.243C20.3976 14.8164 21.1554 14.1446 21.6863 13.3052C22.2172 12.4659 22.4996 11.4933 22.5007 10.5002ZM14.2732 13.3183L15.0232 10.3183C15.0742 10.1283 15.1977 9.96597 15.3672 9.86623C15.5367 9.76648 15.7387 9.73732 15.9295 9.78502C16.1203 9.83273 16.2847 9.95348 16.3874 10.1213C16.49 10.289 16.5226 10.4904 16.4782 10.682L15.7282 13.682C15.6876 13.8443 15.594 13.9883 15.4622 14.0913C15.3304 14.1942 15.1679 14.2501 15.0007 14.2502C14.9391 14.2501 14.8777 14.2425 14.8179 14.2277C14.6251 14.1792 14.4595 14.0562 14.3574 13.8857C14.2552 13.7152 14.225 13.5111 14.2732 13.3183ZM11.2507 10.5002C11.2507 10.3012 11.3297 10.1105 11.4704 9.96983C11.611 9.82918 11.8018 9.75016 12.0007 9.75016C12.1996 9.75016 12.3904 9.82918 12.531 9.96983C12.6717 10.1105 12.7507 10.3012 12.7507 10.5002V13.5002C12.7507 13.6991 12.6717 13.8898 12.531 14.0305C12.3904 14.1711 12.1996 14.2502 12.0007 14.2502C11.8018 14.2502 11.611 14.1711 11.4704 14.0305C11.3297 13.8898 11.2507 13.6991 11.2507 13.5002V10.5002ZM8.06881 9.77266C8.26176 9.72445 8.46595 9.75485 8.63648 9.85717C8.80701 9.95949 8.92992 10.1254 8.97819 10.3183L9.72819 13.3183C9.77639 13.5112 9.74599 13.7154 9.64367 13.886C9.54135 14.0565 9.37549 14.1794 9.18256 14.2277C9.12124 14.2429 9.05825 14.2505 8.99506 14.2502C8.82798 14.2499 8.66575 14.1939 8.53413 14.091C8.4025 13.9881 8.30902 13.8441 8.2685 13.682L7.5185 10.682C7.4947 10.5862 7.49007 10.4866 7.50487 10.3889C7.51968 10.2913 7.55362 10.1975 7.60475 10.113C7.65588 10.0285 7.7232 9.95497 7.80283 9.89656C7.88247 9.83815 7.97286 9.79605 8.06881 9.77266ZM18.0007 19.5002H6.00069V15.6958C6.24905 15.732 6.4997 15.7502 6.75069 15.7502H17.2507C17.5017 15.7502 17.7523 15.732 18.0007 15.6958V19.5002Z" fill="white"/>
    </g>
  </svg>
);
