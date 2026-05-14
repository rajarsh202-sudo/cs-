import { ChevronLeft, Sparkles } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Housing & Area Selection</h1>
      </div>
      <button className="bg-[#E8EBFF] text-[#4355b9] px-6 py-2.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#DDE2FF] transition-all shadow-sm">
        <Sparkles size={20} fill="currentColor" className="opacity-80" />
        <span className="tracking-tight">AI Guide</span>
      </button>
    </header>
  );
}
