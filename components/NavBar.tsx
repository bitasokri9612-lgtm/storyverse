import React, { useEffect } from 'react';
import { BookOpen, PenTool, Trophy, User, Menu, X, Home } from 'lucide-react';
import { ViewState } from '../types';

interface NavBarProps {
    currentView: ViewState;
    setView: (view: ViewState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navItems = [
        { id: 'HOME', label: 'Home', icon: <Home size={18} /> },
        { id: 'READ', label: 'Read Stories', icon: <BookOpen size={18} /> },
        { id: 'WRITE', label: 'Write Story', icon: <PenTool size={18} /> },
        { id: 'LEADERBOARD', label: 'Leaderboard', icon: <Trophy size={18} /> },
        { id: 'MY_PROFILE', label: 'Profile', icon: <User size={18} /> },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center cursor-pointer" onClick={() => setView('HOME')}>
                            <span className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
                                StoryVerse
                            </span>
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setView(item.id as ViewState)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            currentView === item.id 
                                            ? 'bg-brand-600 text-white' 
                                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="text-slate-300 hover:text-white p-2 transition-colors"
                            >
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Full Screen Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden bg-dark-950/98 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-200">
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={32} />
                    </button>
                    
                    <div className="flex flex-col items-center gap-8 w-full px-8">
                        {navItems.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setView(item.id as ViewState);
                                    setIsMenuOpen(false);
                                }}
                                className={`flex items-center gap-4 text-2xl font-bold w-full justify-center py-2 transition-all duration-300 ${
                                    currentView === item.id 
                                    ? 'text-brand-500 scale-105' 
                                    : 'text-slate-400 hover:text-white hover:scale-105'
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {item.icon && React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-12 text-slate-600 text-sm">
                        Tap anywhere to close
                    </div>
                    {/* Close on background click */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsMenuOpen(false)}></div>
                </div>
            )}
        </>
    );
};