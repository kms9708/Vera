import { Share2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AnalyzedContent } from '../App';

interface HomeScreenProps {
  onAnalyze: (content: AnalyzedContent) => void;
}

export function HomeScreen({ onAnalyze }: HomeScreenProps) {
  const mockContents = [
    {
      title: "Breaking: New Economic Policy Announcement",
      source: "News Network X",
      biasScore: -7,
      emotionalState: "Anger",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80"
    },
    {
      title: "Climate Change: The Real Facts",
      source: "Documentary Channel",
      biasScore: 6,
      emotionalState: "Urgency",
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&q=80"
    },
    {
      title: "Tech Industry Layoffs Continue",
      source: "Tech Today",
      biasScore: -5,
      emotionalState: "Anxiety",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">BalanceFeed</h1>
              <p className="text-xs text-gray-500">AI-Powered Bias Analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h2 className="text-gray-900 mb-2">Discover Balanced Perspectives</h2>
          <p className="text-gray-600">
            Share content from any social media platform to analyze bias and explore diverse viewpoints
          </p>
        </motion.div>

        {/* Share Integration Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Share to Analyze</h3>
              <p className="text-sm text-gray-500">
                Tap share on any post or video
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong>How it works:</strong> When viewing content on YouTube, X, or other platforms, tap the share button and select BalanceFeed to instantly analyze bias
            </p>
          </div>
        </motion.div>

        {/* Sample Content */}
        <div className="mb-4">
          <h3 className="text-gray-900 mb-3">Try Sample Content</h3>
          <p className="text-sm text-gray-500 mb-4">
            Tap any example below to see how our AI analyzes bias
          </p>
        </div>

        <div className="space-y-4">
          {mockContents.map((content, index) => (
            <motion.button
              key={index}
              onClick={() => onAnalyze(content)}
              className="w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-3 p-3">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 text-left">
                  <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">
                    {content.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{content.source}</p>
                  <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 rounded-full">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span className="text-xs text-blue-700">Analyze Content</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}