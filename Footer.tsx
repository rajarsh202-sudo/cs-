import { motion } from 'motion/react';

interface FooterProps {
  selectedArea: string | null;
  onNext?: () => void;
}

export default function Footer({ selectedArea, onNext }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 p-6 w-full z-50 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-sm font-bold">
            <span className="text-gray-400">Area : </span>
            <span className="text-black">{selectedArea || 'Select an area'}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="bg-brand-secondary hover:bg-brand-secondary/90 text-white px-12 py-3.5 rounded-2xl font-bold shadow-xl shadow-brand-secondary/20 transition-all text-base tracking-tight"
        >
          Next
        </motion.button>
      </div>
    </footer>
  );
}
