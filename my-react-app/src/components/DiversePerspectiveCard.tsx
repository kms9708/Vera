import { ChevronRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AlternativeContent } from '../App';

interface DiversePerspectiveCardProps {
  content: AlternativeContent;
  onClick: () => void;
}

export function DiversePerspectiveCard({ content, onClick }: DiversePerspectiveCardProps) {
  const getNeutralityColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-300';
    if (score >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getNeutralityLabel = (score: number) => {
    if (score >= 80) return 'High Neutrality';
    if (score >= 60) return 'Moderate Neutrality';
    if (score >= 40) return 'Low Neutrality';
    return 'Very Low Neutrality';
  };

  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 text-left border border-gray-100 hover:border-purple-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        {content.thumbnail && (
          <img 
            src={content.thumbnail} 
            alt={content.title}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 mb-2 line-clamp-2">
            {content.title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3">{content.source}</p>

          {/* Neutrality Score Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-2 border ${getNeutralityColor(content.neutralityScore)}`}>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{content.neutralityScore}/100</span>
              <span>•</span>
              <span>{getNeutralityLabel(content.neutralityScore)}</span>
            </div>
          </div>

          {/* AI Recommendation Reason */}
          <div className="flex items-start gap-2 bg-purple-50 rounded-lg p-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-purple-900">
              <strong>Why recommended:</strong> {content.reason}
            </p>
          </div>

          {/* View Details Link */}
          <div className="flex items-center gap-1 text-sm text-purple-600">
            <span>View summary</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}