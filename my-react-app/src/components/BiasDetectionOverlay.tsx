import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, TrendingUp, Brain, ChevronUp, X, Zap } from 'lucide-react';
import { useState } from 'react';
import type { SocialPost } from '../App';

interface BiasDetectionOverlayProps {
  post: SocialPost;
  onViewFullAnalysis: () => void;
  onDismiss: () => void;
}

export function BiasDetectionOverlay({ post, onViewFullAnalysis, onDismiss }: BiasDetectionOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getNeutralityLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'green', bgColor: 'bg-green-500' };
    if (score >= 60) return { level: 'Moderate', color: 'blue', bgColor: 'bg-blue-500' };
    if (score >= 40) return { level: 'Low', color: 'yellow', bgColor: 'bg-yellow-500' };
    return { level: 'Very Low', color: 'red', bgColor: 'bg-red-500' };
  };

  const neutralityInfo = getNeutralityLevel(post.neutralityScore);
  const isLowNeutrality = post.neutralityScore < 50;

  return (
    <>
      {/* Floating Mini Indicator */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-24 left-4 z-40"
            initial={{ scale: 0, x: -50 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={`${neutralityInfo.bgColor} rounded-full p-3 shadow-2xl flex items-center gap-2 pr-4`}
              animate={{ 
                boxShadow: isLowNeutrality 
                  ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                  : ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs text-white/90">Neutrality</div>
                <div className="text-white">{post.neutralityScore}/100</div>
              </div>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronUp className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Analysis Card */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Analysis Card */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-5 h-5 text-purple-600" />
                      </motion.div>
                      <h3 className="text-gray-900">AI Bias Analysis</h3>
                    </div>
                    <button 
                      onClick={onDismiss}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Real-time content analysis for @{post.username}
                  </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                  {/* Neutrality Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-900">Neutrality Score</span>
                      </div>
                      <div className={`text-3xl text-${neutralityInfo.color}-600`}>
                        {post.neutralityScore}
                        <span className="text-sm text-gray-500">/100</span>
                      </div>
                    </div>

                    {/* Neutrality Progress Bar */}
                    <div className="relative h-4 bg-gray-200 rounded-full mb-2 overflow-hidden">
                      <motion.div 
                        className={`h-full ${neutralityInfo.bgColor} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${post.neutralityScore}%` }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>High Manipulation</span>
                      <span>Neutral</span>
                    </div>

                    <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-2">
                      Higher scores indicate greater linguistic neutrality and lower manipulation risk
                    </p>
                  </div>

                  {/* Neutrality Level Badge */}
                  <div className={`bg-${neutralityInfo.color}-50 border border-${neutralityInfo.color}-200 rounded-xl p-4 mb-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${neutralityInfo.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-${neutralityInfo.color}-900 mb-1`}>
                          {neutralityInfo.level} Neutrality
                        </h4>
                        <p className={`text-sm text-${neutralityInfo.color}-700`}>
                          {isLowNeutrality 
                            ? 'This content shows signs of manipulation. Consider viewing alternative perspectives.'
                            : 'This content maintains reasonable neutrality. Balanced viewpoints are still recommended.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Layer Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-900 mb-3 text-sm">Analysis Layers:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Universal Criteria</span>
                        <span className="text-blue-600">{post.layer1.overall}/100</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Topic-Specific ({post.topic})</span>
                        <span className="text-purple-600">{post.layer2.score}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Emotional State */}
                  <div className="bg-purple-50 rounded-xl p-4 mb-4">
                    <h4 className="text-gray-900 mb-2">Emotional Tone</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700">{post.emotionalState}</span>
                          <span className="text-purple-600">{post.layer1.emotionalIntensity}%</span>
                        </div>
                        <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${post.layer1.emotionalIntensity}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Content may trigger <strong>{post.emotionalState.toLowerCase()}</strong>, affecting judgment
                    </p>
                  </div>

                  {/* Flagged Phrases Preview */}
                  {post.flaggedPhrases.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                      <h4 className="text-orange-900 mb-2 text-sm">
                        {post.flaggedPhrases.length} Manipulative {post.flaggedPhrases.length === 1 ? 'Phrase' : 'Phrases'} Detected
                      </h4>
                      <p className="text-xs text-orange-700">
                        View full analysis for detailed breakdown
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    onClick={onViewFullAnalysis}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl shadow-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    View Full Neutrality Analysis
                  </motion.button>

                  <p className="text-center text-xs text-gray-500 mt-3">
                    Powered by BalanceFeed AI
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}