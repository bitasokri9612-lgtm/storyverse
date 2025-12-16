import React from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-950 border-t border-white/10 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">StoryVerse</h3>
                        <p className="text-slate-400">
                            A platform where imagination meets community. Write, read, and win.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <div className="space-y-2 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>support@storyverse.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>123 Creative Lane, Fiction City</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
                                <Instagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} StoryVerse. All rights reserved.
                </div>
            </div>
        </footer>
    );
};