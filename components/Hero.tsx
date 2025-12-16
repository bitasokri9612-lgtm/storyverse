import React from 'react';
import { ViewState } from '../types';
import { PenTool } from 'lucide-react';

interface HeroProps {
    onStartReading: () => void;
    onStartWriting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartReading, onStartWriting }) => {
    return (
        <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-dark-950">
            {/* Animated Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="animate-float">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Unleash  your story because every story deserves to be heard <br />
                        <span className="bg-gradient-to-r from-brand-400 to-purple-500 bg-clip-text text-transparent">
                            Imagination
                        </span>
                    </h1>
                </div>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Join the ultimate storytelling community. Write AI-assisted stories, react with emotions, and compete to get your story animated on YouTube!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                    <button 
                        onClick={onStartReading}
                        className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-500/25 min-w-[160px]"
                    >
                        Start Reading
                    </button>
                    <button 
                        onClick={onStartWriting}
                        className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        <PenTool size={20} /> Start Writing
                    </button>
                    <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full font-bold text-lg transition-all backdrop-blur-sm min-w-[160px]">
                        Watch Winners
                    </button>
                </div>

                <div className="mt-12 flex justify-center gap-8 text-slate-400">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-white">10K+</span>
                        <span className="text-sm">Stories</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-white">5K+</span>
                        <span className="text-sm">Writers</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-white">1M+</span>
                        <span className="text-sm">Reactions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};