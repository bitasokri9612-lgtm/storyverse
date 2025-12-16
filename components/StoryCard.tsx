import React from 'react';
import { Story, ReactionCounts, StoryCategory } from '../types';
import { Heart, ThumbsUp, ThumbsDown, Smile, Frown, MessageSquare } from 'lucide-react';

interface StoryCardProps {
    story: Story;
    onView: (id: string) => void;
    onReact: (id: string, type: keyof ReactionCounts) => void;
    onAuthorClick?: (authorName: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onView, onReact, onAuthorClick }) => {
    // Helper for category color
    const getCategoryColor = (cat: StoryCategory) => {
        switch (cat) {
            case StoryCategory.HORROR: return 'bg-red-900/50 text-red-200 border-red-700';
            case StoryCategory.LOVE: return 'bg-pink-900/50 text-pink-200 border-pink-700';
            case StoryCategory.COMEDY: return 'bg-yellow-900/50 text-yellow-200 border-yellow-700';
            default: return 'bg-brand-900/50 text-brand-200 border-brand-700';
        }
    };

    const handleAuthorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAuthorClick) {
            onAuthorClick(story.author);
        }
    };

    return (
        <div className="bg-dark-800 rounded-xl border border-white/5 overflow-hidden hover:border-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/10 flex flex-col h-full group">
            <div className="flex-1 cursor-pointer" onClick={() => onView(story.id)}>
                {/* Cover Image Section */}
                {story.coverImage ? (
                    <div className="h-48 w-full overflow-hidden relative">
                        <img 
                            src={story.coverImage} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(story.category)}`}>
                                {story.category}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="pt-6 px-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(story.category)}`}>
                                {story.category}
                            </span>
                        </div>
                    </div>
                )}

                <div className="p-6 pt-4">
                    {!story.coverImage && <span className="text-slate-500 text-xs block mb-2">{story.date}</span>}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">{story.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                        {story.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                        <div 
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer"
                            onClick={handleAuthorClick}
                        ></div>
                        <span 
                            className="text-sm text-slate-300 hover:text-white hover:underline cursor-pointer"
                            onClick={handleAuthorClick}
                        >
                            By {story.author}
                        </span>
                        {story.coverImage && <span className="text-slate-500 text-xs ml-auto">{story.date}</span>}
                    </div>
                </div>
            </div>

            <div className="bg-dark-900/50 p-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <button onClick={() => onReact(story.id, 'love')} className="group flex items-center gap-1 text-xs text-slate-400 hover:text-pink-500 transition-colors">
                            <Heart size={16} className="group-hover:fill-pink-500" /> {story.reactions.love}
                        </button>
                        <button onClick={() => onReact(story.id, 'like')} className="group flex items-center gap-1 text-xs text-slate-400 hover:text-blue-500 transition-colors">
                            <ThumbsUp size={16} className="group-hover:fill-blue-500" /> {story.reactions.like}
                        </button>
                        <button onClick={() => onReact(story.id, 'laugh')} className="group flex items-center gap-1 text-xs text-slate-400 hover:text-yellow-500 transition-colors">
                            <Smile size={16} className="group-hover:text-yellow-400" /> {story.reactions.laugh}
                        </button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MessageSquare size={16} /> {story.comments.length}
                    </div>
                </div>
            </div>
        </div>
    );
};