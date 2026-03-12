import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, FileText, LogOut, ChevronRight, Shield, Settings, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Content System', path: '/pages', icon: Globe },
        { label: 'Editorial', path: '/blogs', icon: FileText },
        { label: 'Architecture', path: '/permissions', icon: Shield },
    ];

    return (
        <aside className="w-80 glass-blur border-r border-white/5 flex flex-col h-screen sticky top-0 z-[60]">
            {/* Brand Header */}
            <div className="p-10 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-playfair text-black font-black text-xl shadow-lg shadow-primary/20">
                        I
                    </div>
                    <h1 className="text-2xl font-playfair text-white tracking-[0.2em] uppercase">INTERIQ</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase font-bold">Studio Management v2.0</p>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="px-6 mb-auto overflow-y-auto">
                <p className="px-4 mb-4 text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">Main Console</p>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group relative
                                ${isActive 
                                    ? 'glass-nav-link-active' 
                                    : 'text-white/40 hover:text-white hover:bg-white/[0.03] border border-transparent'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <item.icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                                        <span className="font-medium text-[13px] tracking-wide uppercase">{item.label}</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-all duration-500 ${
                                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                    }`} />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Footer / User Section */}
            <div className="p-6 mt-6 border-t border-white/5">
                <div className="glass-card p-4 rounded-2xl mb-4 bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black shadow-lg">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-wider">Admin</p>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Teacher Studio</p>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all duration-500 group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
