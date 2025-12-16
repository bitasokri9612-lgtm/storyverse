import React, { useState, useRef } from 'react';
import { StoryCategory } from '../types';
import { Sparkles, Wand2, CheckCheck, Save, Image as ImageIcon, Shuffle, Upload } from 'lucide-react';
import * as GeminiService from '../services/geminiService';

interface StoryEditorProps {
    onSubmit: (title: string, category: StoryCategory, content: string, author: string, coverImage: string) => void;
    onCancel: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<StoryCategory>(StoryCategory.REAL_LIFE);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('Anonymous Writer');
    const [coverImage, setCoverImage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAITitle = async () => {
        if (!content) return alert("Write some content first!");
        setIsGenerating(true);
        const newTitle = await GeminiService.generateTitle(content);
        setTitle(newTitle);
        setIsGenerating(false);
    };

    const handleAIGrammar = async () => {
        if (!content) return;
        setIsGenerating(true);
        const newContent = await GeminiService.checkGrammar(content);
        setContent(newContent);
        setIsGenerating(false);
    };

    const handleAIEnhance = async () => {
        if (!content) return;
        setIsGenerating(true);
        const newContent = await GeminiService.enhanceStory(content);
        setContent(newContent);
        setIsGenerating(false);
    };

    const handleRandomCover = () => {
        const keywords = ['fantasy', 'dark', 'nature', 'city', 'tech', 'book', 'writing', 'space'];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        // Using picsum as fallback for stability
        setCoverImage(`https://picsum.photos/seed/${Date.now()}/800/400`);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, category, content, author, coverImage);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-dark-800 rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-brand-600 rounded-lg text-white">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Create Your Masterpiece</h2>
                        <p className="text-slate-400 text-sm">Use AI tools to refine your imagination.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Author Name</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                placeholder="Your Pen Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as StoryCategory)}
                                className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            >
                                {Object.values(StoryCategory).map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image</label>
                        <div className="flex gap-3">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 bg-dark-900 border-2 border-dashed border-white/10 hover:border-brand-500/50 hover:bg-dark-700/50 rounded-lg p-4 text-slate-400 hover:text-white flex items-center justify-center gap-3 transition-all group"
                            >
                                <Upload size={20} className="group-hover:scale-110 transition-transform text-brand-500" />
                                <span>{coverImage ? 'Change Selected Image' : 'Upload from Gallery'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleRandomCover}
                                className="px-6 py-2 bg-dark-700 hover:bg-dark-600 border border-white/10 rounded-lg text-slate-300 flex items-center gap-2 transition-all"
                            >
                                <Shuffle size={16} /> 
                                <span className="hidden sm:inline">Random</span>
                            </button>
                        </div>
                        {coverImage && (
                            <div className="mt-4 h-48 w-full rounded-lg overflow-hidden border border-white/10 relative group bg-dark-900">
                                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <p className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                                        Cover Image Selected
                                     </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="flex-1 bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                placeholder="Enter story title"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleAITitle}
                                disabled={isGenerating}
                                className="px-4 py-2 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg flex items-center gap-2 text-sm transition-all disabled:opacity-50 whitespace-nowrap"
                            >
                                <Sparkles size={16} /> AI Title
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Story Content</label>
                        <div className="relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-80 bg-dark-900 border border-white/10 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-y leading-relaxed"
                                placeholder="Once upon a time..."
                                required
                            />
                            {/* AI Floating Toolbar */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleAIGrammar}
                                    disabled={isGenerating}
                                    className="px-3 py-2 bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 rounded-lg flex items-center gap-2 text-xs backdrop-blur-md transition-all disabled:opacity-50"
                                >
                                    <CheckCheck size={14} /> Fix Grammar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAIEnhance}
                                    disabled={isGenerating}
                                    className="px-3 py-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg flex items-center gap-2 text-xs backdrop-blur-md transition-all disabled:opacity-50"
                                >
                                    <Wand2 size={14} /> Enhance
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 text-slate-400 hover:text-white font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all transform hover:scale-105"
                        >
                            <Save size={18} /> Publish Story
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};