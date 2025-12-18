import { motion } from 'motion/react';
import { Brain, AlertCircle, Shield, Eye, Target, BarChart3 } from 'lucide-react';
import type { AnalyzedContent, FlaggedPhrase } from '../App';

interface NeutralityScoreAnalysisProps {
  content: AnalyzedContent;
}

export function NeutralityScoreAnalysis({ content }: NeutralityScoreAnalysisProps) {
  const getNeutralityLevel = (score: number) => {
    if (score >= 80) return { label: 'High Neutrality', color: 'green', gradient: 'from-green-500 to-emerald-600' };
    if (score >= 60) return { label: 'Moderate Neutrality', color: 'blue', gradient: 'from-blue-500 to-cyan-600' };
    if (score >= 40) return { label: 'Low Neutrality', color: 'yellow', gradient: 'from-yellow-500 to-orange-600' };
    return { label: 'High Manipulation Risk', color: 'red', gradient: 'from-red-500 to-rose-600' };
  };

  const neutralityInfo = getNeutralityLevel(content.neutralityScore);

  const getTopicLabel = (topic: string) => {
    switch (topic) {
      case 'politics': return 'Political Content';
      case 'medical': return 'Medical/Scientific Content';
      case 'social': return 'Social/Cultural Content';
      default: return 'General Content';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'low': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Neutrality Score */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-gray-900">Neutrality Score</h2>
        </div>

        {/* Score Circle */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40 mb-4">
            {/* Background circle */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Animated progress circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                initial={{ strokeDasharray: "440", strokeDashoffset: "440" }}
                animate={{ 
                  strokeDashoffset: `${440 - (content.neutralityScore / 100) * 440}`
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`stop-${neutralityInfo.color}-500`} stopOpacity="1" />
                  <stop offset="100%" className={`stop-${neutralityInfo.color}-600`} stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div 
                className={`text-5xl text-${neutralityInfo.color}-600`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {content.neutralityScore}
              </motion.div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
          </div>

          <h3 className={`text-xl text-${neutralityInfo.color}-700 mb-2`}>
            {neutralityInfo.label}
          </h3>
          <p className="text-sm text-gray-600 text-center max-w-xs">
            Higher scores indicate greater linguistic neutrality and lower manipulation risk
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> This score reflects manipulative content, not factual accuracy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Layer 1: Universal Criteria */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">Layer 1: Universal Criteria</h3>
        </div>

        <div className="space-y-4">
          {/* Emotional Intensity */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Emotional Intensity</span>
              <span className="text-gray-900">{content.layer1.emotionalIntensity}/100</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${content.layer1.emotionalIntensity > 70 ? 'bg-red-500' : content.layer1.emotionalIntensity > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${content.layer1.emotionalIntensity}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Measures how much emotional language deviates from neutral phrasing
            </p>
          </div>

          {/* Degree of Certainty */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Degree of Certainty</span>
              <span className="text-gray-900">{content.layer1.degreeOfCertainty}/100</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${content.layer1.degreeOfCertainty > 70 ? 'bg-red-500' : content.layer1.degreeOfCertainty > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${content.layer1.degreeOfCertainty}%` }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Higher values indicate absolute statements without room for nuance
            </p>
          </div>

          {/* Evidence vs Implication */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Evidence-Based Score</span>
              <span className="text-gray-900">{content.layer1.evidenceVsImplication}/100</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${content.layer1.evidenceVsImplication > 70 ? 'bg-green-500' : content.layer1.evidenceVsImplication > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${content.layer1.evidenceVsImplication}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Higher values indicate more evidence-based language vs. implications
            </p>
          </div>

          {/* Layer 1 Overall Score */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Layer 1 Overall</span>
              <div className="flex items-center gap-2">
                <div className="text-xl text-blue-600">{content.layer1.overall}/100</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Topic-Dependent Criteria */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-6 h-6 text-purple-600" />
          <h3 className="text-gray-900">Layer 2: Topic-Dependent Analysis</h3>
        </div>

        {/* Topic Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm">
            <Target className="w-4 h-4" />
            {getTopicLabel(content.topic)}
          </span>
        </div>

        {/* Topic-Specific Flags */}
        <div className="mb-4">
          <h4 className="text-sm text-gray-700 mb-2">Detected Patterns:</h4>
          <div className="space-y-2">
            {content.layer2.flags.map((flag, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                {flag}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Topic-Specific Guidance */}
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm text-purple-900 mb-2">
            {content.topic === 'politics' && 'Political Content Analysis'}
            {content.topic === 'medical' && 'Medical/Scientific Content Analysis'}
            {content.topic === 'social' && 'Social/Cultural Content Analysis'}
          </h4>
          <p className="text-xs text-purple-700">
            {content.topic === 'politics' && 'Analyzed for partisan cues, ideological triggers, and fear-based framing.'}
            {content.topic === 'medical' && 'Analyzed for unsupported claims, fear-based manipulation, and misleading medical information.'}
            {content.topic === 'social' && 'Analyzed for moral judgment words, outrage amplification, and stereotype-driven generalizations.'}
          </p>
        </div>

        {/* Layer 2 Overall Score */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-900">Layer 2 Overall</span>
            <div className="flex items-center gap-2">
              <div className="text-xl text-purple-600">{content.layer2.score}/100</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Score Breakdown Chart */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h3 className="text-gray-900">Score Contribution Breakdown</h3>
        </div>

        <div className="space-y-4">
          {/* Layer 1 Contribution */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Layer 1 Contribution</span>
              <span className="text-blue-600">50%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex items-center">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end px-3"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="text-white text-sm">{content.layer1.overall}</span>
              </motion.div>
            </div>
          </div>

          {/* Layer 2 Contribution */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Layer 2 Contribution</span>
              <span className="text-purple-600">50%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex items-center">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end px-3"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="text-white text-sm">{content.layer2.score}</span>
              </motion.div>
            </div>
          </div>

          {/* Final Combined Score */}
          <div className="pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-900">Final Neutrality Score</span>
              <span className={`text-${neutralityInfo.color}-600`}>100%</span>
            </div>
            <div className="h-10 bg-gray-100 rounded-lg overflow-hidden flex items-center">
              <motion.div 
                className={`h-full bg-gradient-to-r ${neutralityInfo.gradient} flex items-center justify-end px-4`}
                initial={{ width: 0 }}
                animate={{ width: `${content.neutralityScore}%` }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <span className="text-white">{content.neutralityScore}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Flagged Phrases */}
      {content.flaggedPhrases.length > 0 && (
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-gray-900">Flagged Phrases</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            These phrases were identified as potentially manipulative or emotionally charged:
          </p>

          <div className="space-y-3">
            {content.flaggedPhrases.map((phrase, index) => (
              <motion.div
                key={index}
                className={`border rounded-lg p-3 ${getSeverityColor(phrase.severity)}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm">
                    &ldquo;{phrase.text}&rdquo;
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/50">
                    {phrase.severity}
                  </span>
                </div>
                <p className="text-xs opacity-75">
                  {phrase.category}
                </p>
              </motion.div>
            ))}
          </div>

          {content.flaggedPhrases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <p className="text-sm">No manipulative phrases detected</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
