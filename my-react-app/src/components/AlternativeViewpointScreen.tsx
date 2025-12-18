import { ArrowLeft, ArrowRight, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AnalyzedContent, AlternativeContent } from '../App';
import { DiversePerspectiveCard } from './DiversePerspectiveCard';

interface AlternativeViewpointScreenProps {
  originalContent: AnalyzedContent;
  onViewAlternative: (content: AlternativeContent) => void;
  onBack: () => void;
}

export function AlternativeViewpointScreen({ 
  originalContent, 
  onViewAlternative, 
  onBack 
}: AlternativeViewpointScreenProps) {
  // Generate mock alternative content with higher neutrality scores
  const alternativeContents: AlternativeContent[] = [
    {
      id: '1',
      title: 'Economic Policy Analysis: A Balanced Perspective',
      source: 'Independent Economics Review',
      biasScore: 1,
      neutralityScore: 86,
      reason: 'High neutrality score (86/100) with objective economic data and multiple expert opinions',
      summary: 'This article presents comprehensive economic analysis from various perspectives, including both potential benefits and drawbacks of the new policy, supported by data from multiple sources.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      topic: 'politics'
    },
    {
      id: '2',
      title: 'Policy Impact: What the Data Shows',
      source: 'Data Science News',
      biasScore: -1,
      neutralityScore: 89,
      reason: 'Excellent neutrality (89/100) with pure data analysis and minimal emotional framing',
      summary: 'An in-depth look at historical data and statistical models predicting the policy\'s impact on different economic sectors and demographic groups.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      topic: 'politics'
    },
    {
      id: '3',
      title: 'Understanding the Economic Debate',
      source: 'Neutral News Network',
      biasScore: 0,
      neutralityScore: 92,
      reason: 'Outstanding neutrality (92/100) presenting all sides without partisan language',
      summary: 'A comprehensive overview that examines arguments from economists across the political spectrum, letting readers draw their own conclusions.',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
      topic: 'politics'
    }
  ];

  // Sort alternatives by neutrality score (highest first)
  const sortedAlternatives = [...alternativeContents].sort((a, b) => b.neutralityScore - a.neutralityScore);

  const currentScore = originalContent.neutralityScore;
  const targetScore = 80; // Target for "good neutrality"
  const averageAlternativeScore = Math.round(
    sortedAlternatives.reduce((sum, content) => sum + content.neutralityScore, 0) / sortedAlternatives.length
  );

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
            <h1 className="text-gray-900">Balanced Perspectives</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Progress Card */}
        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 mb-6 text-white"
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5" />
            <h2>Neutrality Improvement Goal</h2>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-white/80 mb-1">Current Content</p>
              <div className="text-3xl">{currentScore}/100</div>
            </div>
            <ArrowRight className="w-8 h-8 text-white/60" />
            <div>
              <p className="text-sm text-white/80 mb-1">Target Range</p>
              <div className="text-3xl">{targetScore}+</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-sm">
              The recommended content below averages <strong>{averageAlternativeScore}/100</strong> in neutrality. 
              Reading these perspectives helps you build a more balanced understanding.
            </p>
          </div>
        </motion.div>

        {/* Original Content Reference */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-6 border-l-4 border-orange-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-orange-600 mb-2">ORIGINAL CONTENT</p>
          <h3 className="text-sm text-gray-900 mb-1">{originalContent.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">{originalContent.source}</span>
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
              Neutrality: {originalContent.neutralityScore}/100
            </span>
            {originalContent.neutralityScore < 60 && (
              <span className="text-xs text-orange-600">⚠ Low neutrality</span>
            )}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-gray-900">Higher Neutrality Content</h2>
        </motion.div>

        <motion.p 
          className="text-sm text-gray-600 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          These perspectives were selected based on their high neutrality scores and balanced framing
        </motion.p>

        {/* Alternative Content Cards */}
        <div className="space-y-4">
          {sortedAlternatives.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <DiversePerspectiveCard
                content={content}
                onClick={() => onViewAlternative(content)}
              />
            </motion.div>
          ))}
        </div>

        {/* Info Footer */}
        <motion.div 
          className="mt-8 p-4 bg-blue-50 rounded-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-gray-700">
            <strong>Pro Tip:</strong> Higher neutrality scores indicate content with less manipulative language. 
            You don&apos;t need to agree with all perspectives—the goal is to understand different viewpoints 
            to make more informed decisions.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}