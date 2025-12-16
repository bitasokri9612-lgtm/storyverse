import React, { useState, useRef, useEffect } from 'react';
import { Author, Story, ReactionCounts } from '../types';
import { StoryCard } from './StoryCard';
import { Settings, Edit2, MapPin, Calendar, Heart, BookOpen, Camera, Mail, Lock, User, Upload, Save, Check } from 'lucide-react';

interface UserProfileProps {
    currentUser: Author;
    myStories: Story[];
    likedStories: Story[];
    onViewStory: (id: string) => void;
    onReact: (id: string, type: keyof ReactionCounts) => void;
    onUpdateProfile: (updates: Partial<Author>) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
    currentUser, 
    myStories, 
    likedStories, 
    onViewStory, 
    onReact,
    onUpdateProfile
}) => {
    const [activeTab, setActiveTab] = useState<'stories' | 'liked' | 'settings'>('stories');
    
    // Form State
    const [name, setName] = useState(currentUser.name);
    const [bio, setBio] = useState(currentUser.bio || '');
    const [showSaveMessage, setShowSaveMessage] = useState(false);

    // Sync form state with props if they change externally
    useEffect(() => {
        setName(currentUser.name);
        setBio(currentUser.bio || '');
    }, [currentUser]);
    
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'avatar') {
                    onUpdateProfile({ avatar: result });
                } else {
                    onUpdateProfile({ coverImage: result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveSettings = () => {
        onUpdateProfile({ name, bio });
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
            {/* Hidden Input Fields */}
            <input 
                type="file" 
                ref={avatarInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'avatar')}
            />
            <input 
                type="file" 
                ref={coverInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'cover')}
            />
            
            {/* Profile Header Card */}
            <div className="bg-dark-800 rounded-2xl border border-white/10 overflow-hidden mb-8 relative group">
                {/* Cover Image */}
                <div className="h-64 relative w-full group/cover overflow-hidden">
                     {currentUser.coverImage ? (
                        <img 
                            src={currentUser.coverImage} 
                            alt="Cover" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/cover:scale-105" 
                        />
                     ) : (
                        <div className="w-full h-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"></div>
                     )}
                     
                     <div className="absolute inset-0 bg-black/20 group-hover/cover:bg-black/40 transition-colors duration-300"></div>
                     
                     <button 
                        onClick={() => coverInputRef.current?.click()}
                        className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-md transition-all opacity-0 group-hover/cover:opacity-100 flex items-center gap-2 border border-white/20"
                     >
                        <Camera size={18} />
                        <span className="text-sm font-medium">Change Cover</span>
                     </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-end -mt-20">
                        <div className="relative group/avatar">
                            <img 
                                src={currentUser.avatar} 
                                alt={currentUser.name} 
                                className="w-40 h-40 rounded-full border-4 border-dark-800 shadow-2xl bg-dark-900 object-cover"
                            />
                            {/* Hover Overlay for Avatar */}
                            <div 
                                onClick={() => avatarInputRef.current?.click()}
                                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 cursor-pointer transition-opacity border-4 border-transparent"
                            >
                                <Camera size={32} className="text-white drop-shadow-lg" />
                            </div>
                            
                            <button 
                                onClick={() => avatarInputRef.current?.click()}
                                className="absolute bottom-2 right-2 bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-full border-4 border-dark-800 transition-colors z-10"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>
                        
                        <div className="flex-1 mb-2 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 group/name">
                                <h1 className="text-3xl font-bold text-white mb-1">{currentUser.name}</h1>
                                <button 
                                    onClick={() => setActiveTab('settings')}
                                    className="text-slate-500 hover:text-brand-400 opacity-0 group-hover/name:opacity-100 transition-opacity p-1"
                                    title="Edit Profile Name"
                                >
                                    <Edit2 size={18} />
                                </button>
                            </div>
                            <p className="text-slate-400 text-sm mb-3 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                {currentUser.bio || "No bio yet."}
                            </p>
                            
                            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm">
                                <span className="flex items-center gap-1"><MapPin size={14} /> New York, USA</span>
                                <span className="flex items-center gap-1"><Calendar size={14} /> Joined October 2023</span>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto justify-center">
                            <div className="text-center px-6 py-3 bg-dark-900 rounded-xl border border-white/5">
                                <span className="block text-2xl font-bold text-white">{myStories.length}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Stories</span>
                            </div>
                            <div className="text-center px-6 py-3 bg-dark-900 rounded-xl border border-white/5">
                                <span className="block text-2xl font-bold text-white">{currentUser.totalLikes}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('stories')}
                    className={`px-8 py-4 font-medium text-sm flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'stories' 
                        ? 'text-brand-500 border-brand-500' 
                        : 'text-slate-400 border-transparent hover:text-white'
                    }`}
                >
                    <BookOpen size={18} /> My Stories
                </button>
                <button
                    onClick={() => setActiveTab('liked')}
                    className={`px-8 py-4 font-medium text-sm flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'liked' 
                        ? 'text-brand-500 border-brand-500' 
                        : 'text-slate-400 border-transparent hover:text-white'
                    }`}
                >
                    <Heart size={18} /> Liked Stories
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-8 py-4 font-medium text-sm flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'settings' 
                        ? 'text-brand-500 border-brand-500' 
                        : 'text-slate-400 border-transparent hover:text-white'
                    }`}
                >
                    <Settings size={18} /> Settings
                </button>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                {activeTab === 'stories' && (
                    <>
                        {myStories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myStories.map(story => (
                                    <StoryCard 
                                        key={story.id} 
                                        story={story} 
                                        onView={onViewStory} 
                                        onReact={onReact}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-dark-800 rounded-xl border border-white/5 border-dashed">
                                <BookOpen size={48} className="mx-auto text-slate-600 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No stories yet</h3>
                                <p className="text-slate-400">Start writing your first masterpiece today!</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'liked' && (
                    <>
                        {likedStories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {likedStories.map(story => (
                                    <StoryCard 
                                        key={story.id} 
                                        story={story} 
                                        onView={onViewStory} 
                                        onReact={onReact}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-dark-800 rounded-xl border border-white/5 border-dashed">
                                <Heart size={48} className="mx-auto text-slate-600 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No liked stories</h3>
                                <p className="text-slate-400">Explore the library and find stories you love.</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-dark-800 rounded-xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input 
                                                type="text" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-dark-900 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 outline-none"
                                            />
                                            <User size={18} className="absolute left-3 top-3.5 text-slate-500" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            defaultValue="user@example.com"
                                            className="w-full bg-dark-900 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 outline-none"
                                            readOnly
                                        />
                                        <Mail size={18} className="absolute left-3 top-3.5 text-slate-500" />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 ml-1">Email cannot be changed in this demo.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
                                    <textarea 
                                        rows={4}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full bg-dark-900 border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                        placeholder="Tell us about yourself..."
                                    ></textarea>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                    <button className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2">
                                        <Lock size={16} /> Change Password
                                    </button>
                                    <div className="flex items-center gap-4">
                                        {showSaveMessage && (
                                            <span className="text-green-400 text-sm font-medium flex items-center gap-1 animate-pulse">
                                                <Check size={16} /> Saved!
                                            </span>
                                        )}
                                        <button 
                                            onClick={handleSaveSettings}
                                            className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                                        >
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};