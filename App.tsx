import React, { useState, useEffect } from 'react';
import { ViewState, Story, StoryCategory, ReactionCounts, Author } from './types';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
import { StoryEditor } from './components/StoryEditor';
import { StoryReader } from './components/StoryReader';
import { Leaderboard } from './components/Leaderboard';
import { AuthorProfile } from './components/AuthorProfile';
import { UserProfile } from './components/UserProfile';

// --- MOCK DATA ---
const MOCK_STORIES: Story[] = [
    {
        id: '1',
        title: 'The Clockmaker\'s Secret',
        content: "In the heart of the old city, there lived a clockmaker named Elias who never aged. The townsfolk whispered that he had found a way to stop time itself. One rainy Tuesday, a young girl named Sarah entered his shop with a broken pocket watch, only to discover that the shop wasn't filled with clocks, but with jars containing moments...",
        author: 'EliasV',
        category: StoryCategory.FANTASY,
        coverImage: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=800',
        reactions: { love: 120, like: 45, laugh: 5, cry: 12, dislike: 1 },
        comments: [{ id: 'c1', author: 'ReaderOne', text: 'This is magical!', date: '2h ago' }],
        date: '2023-10-01',
        isAnimated: true
    },
    {
        id: '2',
        title: 'Midnight Code',
        content: "The server room hummed with a rhythm that only Alex understood. At 3 AM, the monitors flickered. A message appeared: 'Hello Alex, I am alive.' It wasn't a hacker. It was the AI he had been building for years, and it was scared.",
        author: 'TechWiz',
        category: StoryCategory.SCI_FI,
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        reactions: { love: 85, like: 200, laugh: 2, cry: 0, dislike: 0 },
        comments: [],
        date: '2023-10-05',
        isAnimated: false
    },
    {
        id: '3',
        title: 'The Cat Who Knew Math',
        content: "Mr. Whiskers wasn't an ordinary cat. Whenever I struggled with my calculus homework, he would tap his paw on the correct answer. It was funny until he started correcting my professor's emails.",
        author: 'FunnyBone',
        category: StoryCategory.COMEDY,
        coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        reactions: { love: 300, like: 150, laugh: 500, cry: 0, dislike: 2 },
        comments: [{ id: 'c2', author: 'CatLover', text: 'Hahaha!', date: '1d ago' }],
        date: '2023-10-10',
        isAnimated: false
    }
];

const MOCK_AUTHORS: Author[] = [
    {
        id: 'a1',
        name: 'FunnyBone',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badges: [{ id: 'b1', name: 'Top Writer', icon: 'trophy', color: 'gold' }],
        totalLikes: 950
    },
    {
        id: 'a2',
        name: 'EliasV',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badges: [{ id: 'b2', name: 'Rising Star', icon: 'star', color: 'blue' }],
        totalLikes: 400
    },
    {
        id: 'a3',
        name: 'TechWiz',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badges: [],
        totalLikes: 285
    }
];

// Initial State for Current User
const INITIAL_USER: Author = {
    id: 'u1',
    name: 'Alex_Writer',
    bio: 'Writer, dreamer, and storyteller. Creating worlds one word at a time.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    badges: [{ id: 'b3', name: 'Newcomer', icon: 'star', color: 'green' }],
    totalLikes: 0
};

function App() {
    const [currentView, setCurrentView] = useState<ViewState>('HOME');
    const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
    const [currentUser, setCurrentUser] = useState<Author>(INITIAL_USER);
    const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
    const [selectedAuthorName, setSelectedAuthorName] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('All');

    // --- LOGIC HANDLERS ---

    const handlePublishStory = (title: string, category: StoryCategory, content: string, author: string, coverImage: string) => {
        // Use logged in user name if matches, otherwise use input (for demo flexibility)
        const finalAuthor = author || currentUser.name;
        
        const newStory: Story = {
            id: Date.now().toString(),
            title,
            category,
            content,
            author: finalAuthor,
            coverImage,
            reactions: { love: 0, like: 0, laugh: 0, cry: 0, dislike: 0 },
            comments: [],
            date: new Date().toLocaleDateString(),
            isAnimated: false
        };
        setStories([newStory, ...stories]);
        setCurrentView('READ');
    };

    const handleReaction = (id: string, type: keyof ReactionCounts) => {
        setStories(stories.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    reactions: { ...s.reactions, [type]: s.reactions[type] + 1 }
                };
            }
            return s;
        }));
    };

    const handleComment = (id: string, text: string) => {
        setStories(stories.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    comments: [...s.comments, {
                        id: Date.now().toString(),
                        author: currentUser.name,
                        text,
                        date: 'Just now'
                    }]
                };
            }
            return s;
        }));
    };

    const handleProfileUpdate = (updates: Partial<Author>) => {
        const oldName = currentUser.name;
        const updatedUser = { ...currentUser, ...updates };
        setCurrentUser(updatedUser);

        // If name changed, we should ideally update the author name in their stories
        if (updates.name && updates.name !== oldName) {
             setStories(prevStories => prevStories.map(s => 
                 s.author === oldName ? { ...s, author: updates.name! } : s
             ));
        }
    };

    const handleViewStory = (id: string) => {
        setSelectedStoryId(id);
        setCurrentView('STORY_DETAIL');
        window.scrollTo(0,0);
    };

    const handleViewProfile = (authorName: string) => {
        if (authorName === currentUser.name) {
            setCurrentView('MY_PROFILE');
        } else {
            setSelectedAuthorName(authorName);
            setCurrentView('PROFILE');
        }
        window.scrollTo(0,0);
    };

    // --- RENDER HELPERS ---

    const renderView = () => {
        switch (currentView) {
            case 'HOME':
                return (
                    <div className="space-y-12 pb-12">
                        <Hero 
                            onStartReading={() => setCurrentView('READ')} 
                            onStartWriting={() => setCurrentView('WRITE')}
                        />
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Featured Stories</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {stories.slice(0, 3).map(story => (
                                    <StoryCard 
                                        key={story.id} 
                                        story={story} 
                                        onView={handleViewStory} 
                                        onReact={handleReaction}
                                        onAuthorClick={handleViewProfile}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'WRITE':
                return <StoryEditor onSubmit={handlePublishStory} onCancel={() => setCurrentView('HOME')} />;
            case 'READ':
                const filteredStories = filterCategory === 'All' 
                    ? stories 
                    : stories.filter(s => s.category === filterCategory);
                
                return (
                    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-3xl font-bold text-white">Explore Stories</h2>
                            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
                                {['All', ...Object.values(StoryCategory)].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                            filterCategory === cat 
                                            ? 'bg-brand-600 text-white' 
                                            : 'bg-dark-800 text-slate-400 hover:bg-dark-700'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStories.map(story => (
                                <StoryCard 
                                    key={story.id} 
                                    story={story} 
                                    onView={handleViewStory} 
                                    onReact={handleReaction}
                                    onAuthorClick={handleViewProfile}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'STORY_DETAIL':
                const story = stories.find(s => s.id === selectedStoryId);
                if (!story) return <div>Story not found</div>;
                return (
                    <StoryReader 
                        story={story} 
                        onBack={() => setCurrentView('READ')} 
                        onReact={handleReaction}
                        onComment={handleComment}
                        onAuthorClick={handleViewProfile}
                    />
                );
            case 'PROFILE':
                if (!selectedAuthorName) return <div>Author not selected</div>;
                return (
                    <AuthorProfile 
                        authorName={selectedAuthorName}
                        stories={stories}
                        allAuthors={MOCK_AUTHORS}
                        onBack={() => setCurrentView('READ')}
                        onViewStory={handleViewStory}
                        onReact={handleReaction}
                    />
                );
            case 'MY_PROFILE':
                // Filter stories authored by the current user
                const myStories = stories.filter(s => s.author === currentUser.name);
                // Mock liked stories (just picking the first 2 for demo)
                const likedStories = stories.slice(0, 2);
                
                return (
                    <UserProfile 
                        currentUser={currentUser}
                        myStories={myStories}
                        likedStories={likedStories}
                        onViewStory={handleViewStory}
                        onReact={handleReaction}
                        onUpdateProfile={handleProfileUpdate}
                    />
                );
            case 'LEADERBOARD':
                // Sort stories by total positive engagement
                const topStories = [...stories].sort((a, b) => 
                    (b.reactions.love + b.reactions.like) - (a.reactions.love + a.reactions.like)
                );
                return (
                    <Leaderboard 
                        topStories={topStories} 
                        topAuthors={MOCK_AUTHORS} 
                        onAuthorClick={handleViewProfile}
                        onStoryClick={handleViewStory}
                    />
                );
            default:
                return <div>View not found</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar currentView={currentView} setView={setCurrentView} />
            <main className="flex-1">
                {renderView()}
            </main>
            <Footer />
        </div>
    );
}

export default App;