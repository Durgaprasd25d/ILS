import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

const MainLayout = ({ children, title }) => {
    return (
        <div className="flex bg-luxury-black min-h-screen selection:bg-primary selection:text-black">
            <Sidebar />
            
            <main className="flex-1 overflow-x-hidden relative flex flex-col">
                {/* Refined Header */}
                <header className="px-12 py-8 flex items-center justify-between glass-blur sticky top-0 z-50 border-b border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
                            <span>Admin Portal</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
                            <span className="text-white/20">Studio Control</span>
                        </div>
                        <h2 className="text-4xl font-playfair text-white tracking-tight">{title}</h2>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Search & Notifs */}
                        <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <Search className="w-4 h-4 text-white/20" />
                            <input 
                                type="text" 
                                placeholder="Universal search..." 
                                className="bg-transparent border-none outline-none text-xs text-white/40 placeholder:text-white/10 w-48"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/40 hover:text-primary transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                <div className="text-right hidden lg:block">
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">Arjun S.</p>
                                    <p className="text-[9px] text-primary font-bold uppercase tracking-widest">Director</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center bg-primary/10 border-primary/20 text-primary">
                                    <User className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="p-12 flex-1"
                >
                    {children}
                </motion.div>
                
                {/* Absolute background element */}
                <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
            </main>
        </div>
    );
};

export default MainLayout;
