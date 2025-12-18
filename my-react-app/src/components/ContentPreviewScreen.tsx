import { ArrowLeft, BookOpen, ExternalLink, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AlternativeContent } from '../App';

interface ContentPreviewScreenProps {
  content: AlternativeContent;
  onBack: () => void;
}

export function ContentPreviewScreen({ content, onBack }: ContentPreviewScreenProps) {
  const getNeutralityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNeutralityLabel = (score: number) => {
    if (score >= 80) return 'High Neutrality';
    if (score >= 60) return 'Moderate Neutrality';
    if (score >= 40) return 'Low Neutrality';
    return 'Very Low Neutrality';
  };

  const mainArguments = [
    'Presents comprehensive data analysis from multiple economic research institutions',
    'Includes perspectives from economists across the political spectrum',
    'Examines both short-term and long-term policy implications',
    'Provides historical context and comparisons to similar policies in other countries'
  ];

  const keyPoints = [
    {
      title: 'Economic Impact',
      description: 'Analysis shows mixed effects across different sectors, with potential benefits for manufacturing and concerns for service industries.'
    },
    {
      title: 'Expert Consensus',
      description: 'While opinions vary, most economists agree on the need for careful implementation and ongoing monitoring.'
    },
    {
      title: 'Data-Driven Insights',
      description: 'Statistical models suggest moderate impact on GDP growth, with variance depending on global economic conditions.'
    }
  ];

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
            <h1 className="text-gray-900">Content Preview</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Featured Image */}
        {content.thumbnail && (
          <motion.img 
            src={content.thumbnail} 
            alt={content.title}
            className="w-full h-48 object-cover rounded-xl mb-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          />
        )}

        {/* Content Header */}
        <motion.div 
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-gray-900 mb-3">{content.title}</h2>
          <p className="text-gray-600 mb-4">{content.source}</p>

          {/* Neutrality Score Badge */}
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Neutrality Score</span>
              </div>
              <span className={`text-2xl ${getNeutralityColor(content.neutralityScore)}`}>
                {content.neutralityScore}/100
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {getNeutralityLabel(content.neutralityScore)} - Recommended for balanced understanding
            </p>
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-5 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Summary</h3>
          </div>
          <p className="text-gray-700">{content.summary}</p>
        </motion.div>

        {/* Main Arguments */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-5 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-gray-900 mb-4">Main Arguments</h3>
          <ul className="space-y-3">
            {mainArguments.map((argument, index) => (
              <motion.li 
                key={index} 
                className="flex gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 flex-1">{argument}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Key Points */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-5 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-gray-900 mb-4">Key Points</h3>
          <div className="space-y-4">
            {keyPoints.map((point, index) => (
              <motion.div 
                key={index} 
                className="border-l-3 border-purple-500 pl-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <h4 className="text-gray-900 mb-1">{point.title}</h4>
                <p className="text-sm text-gray-600">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Info */}
        <motion.div 
          className="bg-blue-50 rounded-xl p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <p className="text-sm text-gray-700 mb-3">
            <strong>Quick Access:</strong> This summary provides the core arguments without needing to consume the full content, saving you time while ensuring you understand diverse perspectives.
          </p>
          <motion.button 
            className="w-full bg-white text-gray-900 py-3 rounded-lg shadow-sm hover:shadow transition-shadow flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Full Content
          </motion.button>
        </motion.div>

        {/* Engagement Tips */}
        <motion.div 
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h3 className="text-gray-900 mb-3">Critical Thinking Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Compare the evidence presented with the original content</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Look for areas of agreement and disagreement between sources</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Consider what perspectives might still be missing</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">•</span>
              <span>Reflect on how this changes your understanding of the topic</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}