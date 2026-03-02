import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, FileText, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Blog Management', path: '/blogs', icon: FileText },
        { label: 'Manage Pages', path: '/pages', icon: LayoutDashboard },
        { label: 'Permissions', path: '/permissions', icon: Shield },
    ];

    return (
        <aside className="w-72 bg-white/[0.02] border-r border-white/10 flex flex-col h-screen sticky top-0">
            <div className="p-8 border-b border-white/5">
                <h1 className="text-2xl font-playfair text-primary tracking-widest uppercase">INTERIQ</h1>
                <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mt-1">Admin Panel</p>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-between px-4 py-4 rounded-xl transition-all group
                            ${isActive 
                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(201,169,97,0.1)]' 
                                : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <item.icon className={`w-5 h-5 transition-colors`} />
                            <span className="font-medium text-sm tracking-wide">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-white/5">
                <button 
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-500/5 transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm tracking-wide">Logout System</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
