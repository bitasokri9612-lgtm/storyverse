import React from 'react';
import { Story, Author } from '../types';
import { Trophy, Medal, Crown, Star } from 'lucide-react';

interface LeaderboardProps {
    topStories: Story[];
    topAuthors: Author[];
    onAuthorClick?: (authorName: string) => void;
    onStoryClick?: (id: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ topStories, topAuthors, onAuthorClick, onStoryClick }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                <Trophy className="text-yellow-500" size={32} />
                Hall of Fame
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Stories */}
                <div className="bg-dark-800 rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Crown className="text-brand-400" size={24} />
                        Monthly Top Stories
                    </h2>
                    <div className="space-y-4">
                        {topStories.slice(0, 5).map((story, index) => (
                            <div 
                                key={story.id} 
                                className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-brand-500/30 transition-all cursor-pointer"
                                onClick={() => onStoryClick && onStoryClick(story.id)}
                            >
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                                    index === 0 ? 'bg-yellow-500 text-black' :
                                    index === 1 ? 'bg-slate-300 text-black' :
                                    index === 2 ? 'bg-amber-700 text-white' :
                                    'bg-dark-700 text-slate-400'
                                }`}>
                                    {index + 1}
                                </div>
                                {story.coverImage && (
                                    <img src={story.coverImage} alt="" className="w-10 h-10 rounded-md object-cover" />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-white font-medium truncate">{story.title}</h3>
                                    <p className="text-slate-500 text-xs">{story.author} • {story.reactions.love + story.reactions.like} votes</p>
                                </div>
                                {index === 0 && (
                                    <span className="px-2 py-1 bg-brand-500/20 text-brand-400 text-xs rounded border border-brand-500/20">
                                        Future Animation
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Authors */}
                <div className="bg-dark-800 rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Medal className="text-purple-400" size={24} />
                        Star Writers
                    </h2>
                    <div className="space-y-4">
                        {topAuthors.map((author, index) => (
                            <div 
                                key={author.id} 
                                className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
                                onClick={() => onAuthorClick && onAuthorClick(author.name)}
                            >
                                <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full border border-white/10" />
                                <div className="flex-1">
                                    <h3 className="text-white font-medium hover:underline">{author.name}</h3>
                                    <div className="flex gap-1 mt-1">
                                        {author.badges.map(badge => (
                                            <span key={badge.id} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                                {badge.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-white font-bold">{author.totalLikes}</span>
                                    <span className="text-xs text-slate-500">Likes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly Challenge Banner */}
            <div className="mt-8 bg-gradient-to-r from-brand-900/50 to-purple-900/50 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Weekly Writing Challenge</h3>
                    <p className="text-slate-300 mb-4">Theme: "The Forgotten Time Machine"</p>
                    <button className="px-6 py-2 bg-white text-dark-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                        Join Challenge
                    </button>
                </div>
                <Star className="absolute top-4 left-4 text-white/5 w-32 h-32 rotate-12" />
                <Star className="absolute bottom-4 right-4 text-white/5 w-24 h-24 -rotate-12" />
            </div>
        </div>
    );
};