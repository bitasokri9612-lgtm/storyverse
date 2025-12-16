import React, { useState } from 'react';
import { Story, ReactionCounts } from '../types';
import { Heart, ThumbsUp, Smile, Frown, ThumbsDown, ArrowLeft, Send } from 'lucide-react';

interface StoryReaderProps {
    story: Story;
    onBack: () => void;
    onReact: (id: string, type: keyof ReactionCounts) => void;
    onComment: (id: string, text: string) => void;
    onAuthorClick?: (authorName: string) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ story, onBack, onReact, onComment, onAuthorClick }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(story.id, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft size={20} /> Back to Stories
            </button>

            <article className="bg-dark-800 rounded-2xl border border-white/10 shadow-2xl mb-8 overflow-hidden">
                {/* Cover Image */}
                {story.coverImage && (
                    <div className="w-full h-64 md:h-96 relative">
                        <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent"></div>
                    </div>
                )}

                <div className={`p-8 ${story.coverImage ? '-mt-20 relative z-10' : ''}`}>
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">{story.title}</h1>
                        {story.isAnimated && (
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full text-xs font-bold uppercase tracking-wide animate-pulse whitespace-nowrap ml-4">
                                Animated Winner
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                        <div 
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer transform hover:scale-105 transition-transform"
                            onClick={() => onAuthorClick && onAuthorClick(story.author)}
                        >
                            {story.author.charAt(0)}
                        </div>
                        <div>
                            <p 
                                className="text-white font-medium hover:text-brand-400 cursor-pointer transition-colors"
                                onClick={() => onAuthorClick && onAuthorClick(story.author)}
                            >
                                {story.author}
                            </p>
                            <p className="text-slate-500 text-sm">{story.date} • {story.category}</p>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {story.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h3 className="text-center text-slate-400 mb-6 text-sm uppercase tracking-widest">How did this make you feel?</h3>
                        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                            {[
                                { id: 'love', icon: Heart, count: story.reactions.love, color: 'hover:text-pink-500 hover:bg-pink-500/10' },
                                { id: 'like', icon: ThumbsUp, count: story.reactions.like, color: 'hover:text-blue-500 hover:bg-blue-500/10' },
                                { id: 'laugh', icon: Smile, count: story.reactions.laugh, color: 'hover:text-yellow-500 hover:bg-yellow-500/10' },
                                { id: 'cry', icon: Frown, count: story.reactions.cry, color: 'hover:text-cyan-500 hover:bg-cyan-500/10' },
                                { id: 'dislike', icon: ThumbsDown, count: story.reactions.dislike, color: 'hover:text-red-500 hover:bg-red-500/10' },
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    onClick={() => onReact(story.id, btn.id as keyof ReactionCounts)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${btn.color} text-slate-400 group`}
                                >
                                    <btn.icon size={32} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold">{btn.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <div className="bg-dark-800 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Comments ({story.comments.length})</h3>
                
                <form onSubmit={handleCommentSubmit} className="flex gap-4 mb-8">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button 
                        type="submit"
                        className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-lg transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>

                <div className="space-y-6">
                    {story.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-dark-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-400">
                                {comment.author.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-medium text-sm">{comment.author}</span>
                                    <span className="text-slate-600 text-xs">{comment.date}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    {story.comments.length === 0 && (
                        <p className="text-slate-600 text-center italic">No comments yet. Be the first!</p>
                    )}
                </div>
            </div>
        </div>
    );
};