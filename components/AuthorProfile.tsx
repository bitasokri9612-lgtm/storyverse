import React from 'react';
import { Author, Story, ReactionCounts } from '../types';
import { StoryCard } from './StoryCard';
import { Trophy, Star, Medal, ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';

interface AuthorProfileProps {
    authorName: string;
    stories: Story[];
    allAuthors: Author[];
    onBack: () => void;
    onViewStory: (id: string) => void;
    onReact: (id: string, type: keyof ReactionCounts) => void;
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
    authorName, 
    stories, 
    allAuthors, 
    onBack, 
    onViewStory, 
    onReact 
}) => {
    // Find author data or generate default
    const authorData = allAuthors.find(a => a.name === authorName) || {
        id: 'unknown',
        name: authorName,
        avatar: `https://ui-avatars.com/api/?name=${authorName}&background=random`,
        badges: [],
        totalLikes: 0
    };

    // Filter stories by this author
    const authorStories = stories.filter(s => s.author === authorName);
    const totalViews = authorStories.length * 154; // Mock calculation
    const joinedDate = "Member since Oct 2023";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Back to Browse
            </button>

            {/* Profile Header */}
            <div className="bg-dark-800 rounded-2xl border border-white/10 overflow-hidden mb-12 relative">
                {/* Cover Banner */}
                <div className="h-48 bg-gradient-to-r from-brand-900 to-purple-900 opacity-80"></div>
                
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-end -mt-16">
                        <img 
                            src={authorData.avatar} 
                            alt={authorData.name} 
                            className="w-32 h-32 rounded-full border-4 border-dark-800 shadow-xl bg-dark-900"
                        />
                        <div className="flex-1 mb-2">
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                {authorData.name}
                                {authorData.badges.length > 0 && (
                                    <Star className="text-yellow-500 fill-yellow-500" size={24} />
                                )}
                            </h1>
                            <p className="text-slate-400 flex items-center gap-4 mt-2 text-sm">
                                <span className="flex items-center gap-1"><MapPin size={14} /> Fiction City</span>
                                <span className="flex items-center gap-1"><Calendar size={14} /> {joinedDate}</span>
                            </p>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <div className="text-center px-6 py-2 bg-dark-900 rounded-lg border border-white/5">
                                <span className="block text-xl font-bold text-white">{authorStories.length}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Stories</span>
                            </div>
                            <div className="text-center px-6 py-2 bg-dark-900 rounded-lg border border-white/5">
                                <span className="block text-xl font-bold text-white">{authorData.totalLikes}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Likes</span>
                            </div>
                            <div className="text-center px-6 py-2 bg-dark-900 rounded-lg border border-white/5">
                                <span className="block text-xl font-bold text-white">{totalViews}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                {authorData.badges.length > 0 && (
                    <div className="px-8 py-6 border-t border-white/5 bg-dark-900/30">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Medal size={16} /> Achievements
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {authorData.badges.map(badge => (
                                <div key={badge.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm">
                                    <Trophy size={14} />
                                    {badge.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Author's Stories */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Users size={24} className="text-brand-500" />
                    Stories by {authorData.name}
                </h2>
                
                {authorStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {authorStories.map(story => (
                            <StoryCard 
                                key={story.id} 
                                story={story} 
                                onView={onViewStory} 
                                onReact={onReact}
                                onAuthorClick={() => {}} // Already on profile
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-dark-800 rounded-xl border border-white/5 border-dashed">
                        <p className="text-slate-400">This author hasn't published any stories yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};