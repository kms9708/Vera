interface BiasScoreMeterProps {
  score: number;
}

export function BiasScoreMeter({ score }: BiasScoreMeterProps) {
  // Calculate position on the scale (0-100%)
  const position = ((score + 10) / 20) * 100;
  
  // Determine color based on bias level
  const getColor = () => {
    if (score <= -7) return 'text-red-600';
    if (score <= -4) return 'text-orange-600';
    if (score >= 7) return 'text-blue-600';
    if (score >= 4) return 'text-sky-600';
    return 'text-green-600';
  };

  const getLabel = () => {
    if (score <= -7) return 'Extreme Left-Leaning';
    if (score <= -4) return 'Left-Leaning';
    if (score >= 7) return 'Extreme Right-Leaning';
    if (score >= 4) return 'Right-Leaning';
    return 'Neutral/Balanced';
  };

  return (
    <div>
      {/* Score Display */}
      <div className="text-center mb-6">
        <div className={`text-5xl mb-2 ${getColor()}`}>
          {score > 0 ? '+' : ''}{score}
        </div>
        <p className="text-gray-600">{getLabel()}</p>
      </div>

      {/* Visual Scale */}
      <div className="relative">
        {/* Background gradient bar */}
        <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 mb-2" />
        
        {/* Neutral zone indicator */}
        <div 
          className="absolute top-0 h-3 bg-green-500/30 border-2 border-green-500"
          style={{ 
            left: '35%', 
            width: '30%',
            borderRadius: '0.75rem'
          }}
        />

        {/* Score pointer */}
        <div 
          className="absolute top-0 -mt-1 transition-all duration-500"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-5 h-5 bg-white border-3 border-gray-800 rounded-full shadow-lg" />
          <div className="w-0.5 h-8 bg-gray-800 mx-auto" />
        </div>

        {/* Scale markers */}
        <div className="flex justify-between text-xs text-gray-500 mt-10">
          <div className="text-center">
            <div>-10</div>
            <div className="text-xs text-gray-400 mt-1">Extreme<br/>Left</div>
          </div>
          <div className="text-center">
            <div>-3</div>
          </div>
          <div className="text-center">
            <div>0</div>
            <div className="text-xs text-green-600 mt-1">Neutral</div>
          </div>
          <div className="text-center">
            <div>+3</div>
          </div>
          <div className="text-center">
            <div>+10</div>
            <div className="text-xs text-gray-400 mt-1">Extreme<br/>Right</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          The green zone (-3 to +3) represents balanced, neutral content
        </p>
      </div>
    </div>
  );
}
