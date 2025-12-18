import { AlertCircle, Flame, Frown, Heart, Zap } from 'lucide-react';

interface EmotionalIndicatorProps {
  emotion: string;
}

export function EmotionalIndicator({ emotion }: EmotionalIndicatorProps) {
  const emotionConfig = {
    'Anger': {
      icon: Flame,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      message: 'This content may induce anger, which could affect your judgment',
      intensity: 85
    },
    'Anxiety': {
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      message: 'This content may create anxiety or fear, influencing your perception',
      intensity: 70
    },
    'Agreement': {
      icon: Heart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      message: 'This content reinforces existing beliefs, potentially creating confirmation bias',
      intensity: 60
    },
    'Urgency': {
      icon: Zap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      message: 'This content creates a sense of urgency, which may pressure quick judgments',
      intensity: 75
    },
    'Sadness': {
      icon: Frown,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      message: 'This content may evoke sadness or sympathy, affecting objectivity',
      intensity: 65
    }
  };

  const config = emotionConfig[emotion as keyof typeof emotionConfig] || emotionConfig['Anxiety'];
  const Icon = config.icon;

  return (
    <div className={`border ${config.border} ${config.bg} rounded-xl p-4`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900">Detected Emotion</h3>
            <span className={`text-sm ${config.color}`}>{emotion}</span>
          </div>
          <p className="text-sm text-gray-600">{config.message}</p>
        </div>
      </div>

      {/* Emotional Intensity Bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>Emotional Intensity</span>
          <span>{config.intensity}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.color.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
            style={{ width: `${config.intensity}%` }}
          />
        </div>
      </div>

      {/* Warning */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <strong>Tip:</strong> High emotional content can cloud critical thinking. Take a moment to consider multiple perspectives.
        </p>
      </div>
    </div>
  );
}
