import { ArrowLeft, Target } from 'lucide-react';
import { motion } from 'motion/react';
import type { AnalyzedContent } from '../App';
import { NeutralityScoreAnalysis } from './NeutralityScoreAnalysis';

interface ResultDashboardScreenProps {
  content: AnalyzedContent;
  onGetBalance: () => void;
  onBack: () => void;
}

export function ResultDashboardScreen({ content, onGetBalance, onBack }: ResultDashboardScreenProps) {
  const isLowNeutrality = content.neutralityScore < 50;

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-gray-900">Neutrality Analysis</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Content Info */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-3">
            {content.thumbnail && (
              <img 
                src={content.thumbnail} 
                alt={content.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{content.title}</h3>
              <p className="text-sm text-gray-500">{content.source}</p>
            </div>
          </div>
        </motion.div>

        {/* Neutrality Score Analysis */}
        <NeutralityScoreAnalysis content={content} />

        {/* Action Button */}
        <motion.button
          onClick={onGetBalance}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            {isLowNeutrality ? 'Get Balanced Perspectives' : 'Explore More Viewpoints'}
          </span>
        </motion.button>

        <motion.p 
          className="text-center text-sm text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {isLowNeutrality 
            ? 'Discover diverse perspectives to improve content balance' 
            : 'Continue exploring different viewpoints for a well-rounded understanding'}
        </motion.p>
      </div>
    </motion.div>
  );
}