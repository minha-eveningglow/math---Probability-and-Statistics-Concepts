import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  show: boolean;
}

export function ScrollIndicator({ show }: ScrollIndicatorProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-white/90 backdrop-blur rounded-full px-6 py-3 shadow-lg flex items-center gap-2"
      >
        <span className="text-sm font-medium text-gray-700">스크롤하여 계속</span>
        <ChevronDown className="w-5 h-5 text-indigo-600" />
      </motion.div>
    </motion.div>
  );
}
