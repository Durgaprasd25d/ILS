import React from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const MainLayout = ({ children, title }) => {
    return (
        <div className="flex bg-luxury-black min-h-screen">
            <Sidebar />
            
            <main className="flex-1 overflow-x-hidden relative">
                {/* Subtle gradient pattern */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(#c9a961_1px,transparent_1px)] [background-size:40px_40px]"></div>
                
                <header className="px-12 py-8 flex items-center justify-between bg-luxury-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                    <h2 className="text-3xl font-playfair text-white tracking-wide">{title}</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                        <span className="text-white/60 text-sm">Administrator</span>
                    </div>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default MainLayout;
