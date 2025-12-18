import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play } from 'lucide-react';
import type { SocialPost } from '../App';

interface SocialMediaFeedProps {
  onPostInView: (post: SocialPost) => void;
  currentPost: SocialPost | null;
}

export function SocialMediaFeed({ onPostInView, currentPost }: SocialMediaFeedProps) {
  const [activePostIndex, setActivePostIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mockPosts: SocialPost[] = [
    {
      id: '1',
      username: 'economic_news_today',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      content: 'BREAKING: New tax policy will destroy small businesses! This is the worst decision ever made. Share to spread awareness! 🚨',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      likes: 15420,
      comments: 892,
      biasScore: -8,
      neutralityScore: 25,
      emotionalState: 'Anger',
      verified: true,
      topic: 'politics',
      layer1: {
        emotionalIntensity: 85, // Very high emotional language
        degreeOfCertainty: 90, // Absolute statements
        evidenceVsImplication: 20, // Mostly implications
        overall: 32
      },
      layer2: {
        topic: 'politics',
        flags: ['Catastrophic language', 'Partisan cues detected', 'Fear-based framing'],
        score: 18
      },
      flaggedPhrases: [
        { text: 'will destroy', category: 'Catastrophic Language', severity: 'high' },
        { text: 'worst decision ever', category: 'Absolute Statement', severity: 'high' },
        { text: 'Share to spread awareness', category: 'Urgency Manipulation', severity: 'medium' }
      ]
    },
    {
      id: '2',
      username: 'climate_truth',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      content: 'The climate crisis is finally being addressed! Revolutionary new green policies announced. This is what progress looks like! 🌍✨',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
      video: true,
      likes: 23100,
      comments: 1456,
      biasScore: 7,
      neutralityScore: 45,
      emotionalState: 'Urgency',
      verified: false,
      topic: 'politics',
      layer1: {
        emotionalIntensity: 70,
        degreeOfCertainty: 75,
        evidenceVsImplication: 40,
        overall: 48
      },
      layer2: {
        topic: 'politics',
        flags: ['Ideological framing', 'Celebratory language', 'Progress narrative'],
        score: 42
      },
      flaggedPhrases: [
        { text: 'finally being addressed', category: 'Emotional Relief Trigger', severity: 'medium' },
        { text: 'Revolutionary', category: 'Exaggeration', severity: 'medium' },
        { text: 'This is what progress looks like', category: 'Moral Judgment', severity: 'low' }
      ]
    },
    {
      id: '3',
      username: 'tech_insider_news',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      content: 'Tech layoffs continue across the industry. Analysis shows complex factors at play including market conditions, company strategies, and economic outlook.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
      likes: 8920,
      comments: 445,
      biasScore: -1,
      neutralityScore: 82,
      emotionalState: 'Neutral',
      verified: true,
      topic: 'social',
      layer1: {
        emotionalIntensity: 25,
        degreeOfCertainty: 40,
        evidenceVsImplication: 85,
        overall: 80
      },
      layer2: {
        topic: 'social',
        flags: ['Balanced perspective', 'Evidence-based language'],
        score: 84
      },
      flaggedPhrases: []
    },
    {
      id: '4',
      username: 'political_voice',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      content: 'They don\'t want you to know the truth about this policy! Wake up people! The mainstream media is lying to you. Do your own research! 😤',
      image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80',
      likes: 19800,
      comments: 2341,
      biasScore: -9,
      neutralityScore: 15,
      emotionalState: 'Anger',
      verified: false,
      topic: 'politics',
      layer1: {
        emotionalIntensity: 95,
        degreeOfCertainty: 98,
        evidenceVsImplication: 10,
        overall: 18
      },
      layer2: {
        topic: 'politics',
        flags: ['Conspiracy framing', 'Enemy narrative', 'Call to action manipulation'],
        score: 12
      },
      flaggedPhrases: [
        { text: 'They don\'t want you to know', category: 'Conspiracy Language', severity: 'high' },
        { text: 'Wake up people', category: 'Emotional Manipulation', severity: 'high' },
        { text: 'mainstream media is lying', category: 'Trust Erosion', severity: 'high' },
        { text: 'Do your own research', category: 'False Authority', severity: 'medium' }
      ]
    },
    {
      id: '5',
      username: 'balanced_news_hub',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      content: 'Recent economic data shows mixed indicators. Experts from various perspectives weigh in on what this means for different sectors.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      likes: 5640,
      comments: 234,
      biasScore: 0,
      neutralityScore: 88,
      emotionalState: 'Neutral',
      verified: true,
      topic: 'politics',
      layer1: {
        emotionalIntensity: 18,
        degreeOfCertainty: 35,
        evidenceVsImplication: 90,
        overall: 86
      },
      layer2: {
        topic: 'politics',
        flags: ['Multiple perspectives', 'Measured language'],
        score: 90
      },
      flaggedPhrases: []
    }
  ];

  useEffect(() => {
    // Trigger analysis when post changes
    if (mockPosts[activePostIndex]) {
      onPostInView(mockPosts[activePostIndex]);
    }
  }, [activePostIndex]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const postHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / postHeight);
    
    if (newIndex !== activePostIndex && newIndex < mockPosts.length) {
      setActivePostIndex(newIndex);
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      onScroll={handleScroll}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {mockPosts.map((post, index) => (
        <div
          key={post.id}
          className="h-screen snap-start relative"
        >
          <SocialPostCard post={post} isActive={activePostIndex === index} />
        </div>
      ))}
    </div>
  );
}

interface SocialPostCardProps {
  post: SocialPost;
  isActive: boolean;
}

function SocialPostCard({ post, isActive }: SocialPostCardProps) {
  return (
    <div className="relative h-full bg-black">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {post.image && (
          <img 
            src={post.image} 
            alt={post.content}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Video Play Icon */}
      {post.video && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </motion.div>
        </div>
      )}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img 
            src={post.avatar} 
            alt={post.username}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-white">{post.username}</span>
              {post.verified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <span className="text-xs text-white/80">2 hours ago</span>
          </div>
        </div>
        <button className="text-white">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
        <motion.button 
          className="flex flex-col items-center"
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-8 h-8 text-white mb-1" />
          <span className="text-xs text-white">{(post.likes / 1000).toFixed(1)}k</span>
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-8 h-8 text-white mb-1" />
          <span className="text-xs text-white">{post.comments}</span>
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          whileTap={{ scale: 0.9 }}
        >
          <Send className="w-8 h-8 text-white mb-1" />
        </motion.button>
        
        <motion.button 
          className="flex flex-col items-center"
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark className="w-8 h-8 text-white mb-1" />
        </motion.button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 z-10">
        <motion.p 
          className="text-white mb-4 pr-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
        >
          {post.content}
        </motion.p>
      </div>
    </div>
  );
}