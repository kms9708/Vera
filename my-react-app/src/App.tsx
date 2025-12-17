import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { SocialMediaFeed } from './components/SocialMediaFeed';
import { InitialNotification } from './components/InitialNotification';
import { BiasDetectionOverlay } from './components/BiasDetectionOverlay';
import { ResultDashboardScreen } from './components/ResultDashboardScreen';
import { AlternativeViewpointScreen } from './components/AlternativeViewpointScreen';
import { ContentPreviewScreen } from './components/ContentPreviewScreen';

export type Screen = 'feed' | 'results' | 'alternatives' | 'preview';

export type ContentTopic = 'politics' | 'medical' | 'social';

export interface Layer1Analysis {
  emotionalIntensity: number; // 0-100
  degreeOfCertainty: number; // 0-100
  evidenceVsImplication: number; // 0-100 (higher = more evidence-based)
  overall: number; // 0-100
}

export interface Layer2Analysis {
  topic: ContentTopic;
  flags: string[];
  score: number; // 0-100
}

export interface FlaggedPhrase {
  text: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalyzedContent {
  title: string;
  source: string;
  biasScore: number; // Legacy -10 to +10 for compatibility
  neutralityScore: number; // 0-100
  emotionalState: string;
  thumbnail?: string;
  topic: ContentTopic;
  layer1: Layer1Analysis;
  layer2: Layer2Analysis;
  flaggedPhrases: FlaggedPhrase[];
}

export interface AlternativeContent {
  id: string;
  title: string;
  source: string;
  biasScore: number; // Legacy
  neutralityScore: number; // 0-100
  reason: string;
  summary: string;
  thumbnail?: string;
  topic?: ContentTopic;
}

export interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  video?: boolean;
  likes: number;
  comments: number;
  biasScore: number; // Legacy
  neutralityScore: number; // 0-100
  emotionalState: string;
  verified?: boolean;
  topic: ContentTopic;
  layer1: Layer1Analysis;
  layer2: Layer2Analysis;
  flaggedPhrases: FlaggedPhrase[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [showInitialNotification, setShowInitialNotification] = useState(true);
  const [currentPost, setCurrentPost] = useState<SocialPost | null>(null);
  const [showBiasOverlay, setShowBiasOverlay] = useState(false);
  const [analyzedContent, setAnalyzedContent] = useState<AnalyzedContent | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<AlternativeContent | null>(null);

  // Show initial notification when app opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialNotification(false);
    }, 5000); // Auto-dismiss after 5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  const handlePostInView = (post: SocialPost) => {
    setCurrentPost(post);
    // Automatically show bias detection after a brief moment
    setTimeout(() => {
      setShowBiasOverlay(true);
    }, 1500);
  };

  const handleViewFullAnalysis = () => {
    if (currentPost) {
      setAnalyzedContent({
        title: currentPost.content,
        source: currentPost.username,
        biasScore: currentPost.biasScore,
        neutralityScore: currentPost.neutralityScore,
        emotionalState: currentPost.emotionalState,
        thumbnail: currentPost.image,
        topic: currentPost.topic,
        layer1: currentPost.layer1,
        layer2: currentPost.layer2,
        flaggedPhrases: currentPost.flaggedPhrases
      });
      setCurrentScreen('results');
    }
  };

  const handleGetBalance = () => {
    setCurrentScreen('alternatives');
  };

  const handleViewAlternative = (alternative: AlternativeContent) => {
    setSelectedAlternative(alternative);
    setCurrentScreen('preview');
  };

  const handleBack = () => {
    if (currentScreen === 'preview') {
      setCurrentScreen('alternatives');
    } else if (currentScreen === 'alternatives') {
      setCurrentScreen('results');
    } else if (currentScreen === 'results') {
      setCurrentScreen('feed');
      setShowBiasOverlay(false);
    }
  };

  const handleDismissNotification = () => {
    setShowInitialNotification(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {currentScreen === 'feed' && (
          <div key="feed" className="relative">
            <SocialMediaFeed 
              onPostInView={handlePostInView}
              currentPost={currentPost}
            />
            
            {/* Initial notification alert */}
            <AnimatePresence>
              {showInitialNotification && (
                <InitialNotification onDismiss={handleDismissNotification} />
              )}
            </AnimatePresence>

            {/* Real-time bias detection overlay */}
            <AnimatePresence>
              {showBiasOverlay && currentPost && (
                <BiasDetectionOverlay 
                  post={currentPost}
                  onViewFullAnalysis={handleViewFullAnalysis}
                  onDismiss={() => setShowBiasOverlay(false)}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        
        {currentScreen === 'results' && analyzedContent && (
          <ResultDashboardScreen 
            key="results"
            content={analyzedContent}
            onGetBalance={handleGetBalance}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'alternatives' && analyzedContent && (
          <AlternativeViewpointScreen 
            key="alternatives"
            originalContent={analyzedContent}
            onViewAlternative={handleViewAlternative}
            onBack={handleBack}
          />
        )}
        
        {currentScreen === 'preview' && selectedAlternative && (
          <ContentPreviewScreen 
            key="preview"
            content={selectedAlternative}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}