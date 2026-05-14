import React from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MarkerProps {
  name: string;
  price: string;
  status: 'safe' | 'okay' | 'far';
  top: string;
  left: string;
  icons?: string[];
  time?: string;
  selected?: boolean;
  onClick?: () => void;
}

const Marker: React.FC<{ data: MarkerProps & { onClick?: () => void } }> = ({ data }) => {
  const { name, price, status, top, left, icons, time, selected, onClick } = data;
  const borderColor = status === 'safe' ? 'border-green-500' : status === 'okay' ? 'border-amber-400' : 'border-red-500';
  const textColor = status === 'safe' ? 'text-green-600' : status === 'okay' ? 'text-amber-600' : 'text-red-500';
  const bgColor = status === 'safe' ? 'bg-green-50' : status === 'okay' ? 'bg-amber-50' : 'bg-red-50';
  
  // Selection background: border color at 10% opacity
  const selectedBg = status === 'safe' ? 'bg-green-500/10' : status === 'okay' ? 'bg-amber-400/10' : 'bg-red-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: selected ? 1.05 : 1 }}
      whileHover={{ 
        scale: selected ? 1.08 : 1.03, 
        y: -4,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      whileTap={{ 
        scale: 0.97,
        boxShadow: status === 'safe' ? "0 0 30px rgba(34, 197, 94, 0.4)" : 
                   status === 'okay' ? "0 0 30px rgba(251, 191, 36, 0.4)" : 
                   "0 0 30px rgba(239, 68, 68, 0.4)"
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`absolute ${borderColor} border-2 bg-white overflow-hidden px-4 py-3 rounded-[16px] card-shadow z-10 hover:z-20 cursor-pointer ${selected ? (status === 'safe' ? 'ring-4 ring-green-100' : status === 'okay' ? 'ring-4 ring-amber-100' : 'ring-4 ring-red-100') : ''}`}
      style={{ top, left }}
    >
      {/* Background Overlay Layer */}
      {selected && (
        <div 
          className={`absolute inset-0 z-0 pointer-events-none ${
            status === 'safe' ? 'bg-green-500/15' : 
            status === 'okay' ? 'bg-amber-400/15' : 
            'bg-red-500/15'
          }`} 
        />
      )}
      
      <div className="flex flex-col relative z-10">
        <span className="font-bold text-sm text-gray-900">{name}</span>
        <span className={`text-[11px] font-bold ${textColor}`}>{price}</span>
        
        {(icons || time) && (
          <div className="flex items-center gap-2 mt-1.5">
            {icons?.includes('location') && <MapPin size={12} className={textColor} />}
            {icons?.includes('check') && <CheckCircle2 size={12} className={textColor} />}
            {time && (
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>
                {time}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface MapOverlayProps {
  selectedArea: string | null;
  onSelectArea: (name: string | null) => void;
}

export default function MapOverlay({ selectedArea, onSelectArea }: MapOverlayProps) {
  const markers: MarkerProps[] = [
    { name: 'Nilothi', price: '₹ 5k – 10k', status: 'far', top: '80px', left: '160px', icons: ['location', 'check'] },
    { name: 'Shiv vihar', price: '₹ 5k – 10k', status: 'far', top: '280px', left: '80px', icons: ['location'] },
    { name: 'Nawada', price: '₹ 4k – 8k', status: 'far', top: '500px', left: '40px' },
    { name: 'Dwarka', price: '₹ 15k – 25k', status: 'far', top: '570px', left: '180px' },
    { name: 'Vikaspuri', price: '₹ 8k–15k', status: 'safe', top: '305px', left: '280px', icons: ['check'], time: '5 min' },
    { name: 'Uttam Nagar', price: '₹ 6k–12k', status: 'okay', top: '440px', left: '280px' },
    { name: 'Tilak Nagar', price: '₹ 12k–20k', status: 'okay', top: '40px', left: '450px' },
    { name: 'Janakpuri', price: '₹ 10k–18k', status: 'safe', top: '390px', left: '530px', time: '10 min' },
    { name: 'Rajouri garden', price: '₹ 10k–18k', status: 'safe', top: '180px', left: '600px', time: '10 min' },
    { name: 'Dabri Mor', price: '₹ 8k–10k', status: 'okay', top: '520px', left: '460px' },
  ];

  return (
    <div className="relative w-full aspect-[21/9] min-h-[500px] max-h-[650px] bg-white rounded-[32px] overflow-hidden border border-[#1C1C1C]/20 group cursor-grab active:cursor-grabbing">
      <motion.div 
        drag 
        dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
        dragElastic={0.1}
        className="absolute inset-0 w-full h-full"
      >
        {/* Map Background Image */}
        <div className="absolute inset-x-[-20%] inset-y-[-20%] z-0">
          <img 
            src="https://res.cloudinary.com/dvau9scrh/image/upload/v1778267950/Screenshot_2026-05-07_121507_oz78lw.png" 
            alt="Map Background"
            className="w-full h-full object-cover opacity-80 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        </div>

        {/* Map Interactive Grid Pattern Overlay for visual depth */}
        <div className="absolute inset-x-[-20%] inset-y-[-20%] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Centered Interactive Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative w-[850px] h-[650px] shrink-0 transform scale-90 sm:scale-100">
            {/* Markers */}
            {markers.map((marker) => (
              <Marker 
                key={marker.name} 
                data={{ 
                  ...marker, 
                  selected: selectedArea === marker.name,
                  onClick: () => onSelectArea(marker.name)
                }} 
              />
            ))}

            {/* Current Workplace */}
            <div className="absolute z-20 flex flex-col items-center" style={{ top: '290px', left: '490px', transform: 'translate(-50%, -50%)' }}>
              <div className="relative group/work">
                <div className="absolute inset-0 bg-indigo-600 blur-2xl opacity-20 animate-pulse" />
                <div className="bg-[#4169E1] text-white p-4 rounded-[20px] shadow-2xl relative border-4 border-white/50 backdrop-blur-sm">
                  <MapPin size={26} className="fill-white" />
                </div>
                <div className="absolute -bottom-13 left-1/2 -translate-x-1/2 bg-[#1A1A1A] px-5 py-2.5 rounded-xl shadow-xl border border-white/10 whitespace-nowrap text-center">
                  <span className="text-white text-sm font-bold tracking-normal block">Current &nbsp; Workspace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
