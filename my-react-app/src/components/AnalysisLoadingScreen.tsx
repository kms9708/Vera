import { Brain, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnalysisLoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: MessageSquare, label: 'Analyzing text content', delay: 0 },
    { icon: Eye, label: 'Detecting visual cues', delay: 800 },
    { icon: TrendingUp, label: 'Measuring emotional tone', delay: 1600 },
    { icon: Brain, label: 'Calculating bias score', delay: 2400 }
  ];

  useEffect(() => {
    const timers = steps.map((step, index) => 
      setTimeout(() => setCurrentStep(index), step.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Animated Logo */}
        <motion.div 
          className="mb-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </motion.div>

        <motion.h2 
          className="text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          AI Analysis in Progress
        </motion.h2>
        <motion.p 
          className="text-white/80 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Evaluating content bias, emotional state, and context
        </motion.p>

        {/* Analysis Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep >= index;
            
            return (
              <motion.div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  isActive 
                    ? 'bg-white/20 backdrop-blur-sm scale-100 opacity-100' 
                    : 'bg-white/5 scale-95 opacity-50'
                }`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: isActive ? 1 : 0.5 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? 'bg-white text-purple-600' : 'bg-white/20 text-white/50'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-white transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-50'
                }`}>
                  {step.label}
                </span>
                {isActive && (
                  <motion.div 
                    className="ml-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}