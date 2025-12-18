import { motion } from 'motion/react';
import { Shield, X, Zap } from 'lucide-react';

interface InitialNotificationProps {
  onDismiss: () => void;
}

export function InitialNotification({ onDismiss }: InitialNotificationProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div 
        className="max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Animated top border */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <motion.div 
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-300" />
                <h3 className="text-white">BalanceFeed Active</h3>
              </div>
              <p className="text-sm text-white/90 mb-3">
                We&apos;re analyzing content bias in real-time to help you stay informed with balanced perspectives
              </p>
              
              {/* Features */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Real-time bias detection</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Emotional manipulation alerts</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Alternative viewpoint suggestions</span>
                </div>
              </div>

              {/* Action hint */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-xs text-white/90">
                  <strong>Tip:</strong> Tap the bias indicator to view detailed analysis
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={onDismiss}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
