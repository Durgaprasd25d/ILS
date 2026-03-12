import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Edit2, Trash2, ExternalLink, Sparkles, PenTool } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { getImageUrl } from '../config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/blogs');
            setBlogs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Failed to fetch journal entries');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vision?')) return;
        
        try {
            await api.delete(`/blogs/${id}`);
            toast.success('Journal entry deactivated');
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to remove entry');
        }
    };

    const filteredBlogs = Array.isArray(blogs) ? blogs.filter(blog => 
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <MainLayout title="Design Journal">
            <div className="max-w-[1600px] mx-auto space-y-12 pb-24">
                
                {/* Journal Controls */}
                <div className="flex flex-col xl:flex-row gap-8 justify-between items-end border-b border-white/5 pb-12">
                    <div className="space-y-4 w-full xl:w-1/2">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Editorial Management</span>
                        </div>
                        <h2 className="text-4xl font-playfair text-white tracking-tight">Visions & Stories</h2>
                        <p className="text-white/30 text-sm font-light tracking-wide max-w-xl">Curate the narrative of INTERIQ through surgical precision in storytelling and high-fidelity imagery.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto items-center">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Universal filter..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all duration-500 placeholder:text-white/10 text-sm"
                            />
                        </div>

                        <Link 
                            to="/blogs/create"
                            className="premium-button rounded-2xl flex items-center justify-center gap-4 w-full md:w-auto min-w-[240px]"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Inscribe Vision</span>
                        </Link>
                    </div>
                </div>

                {/* Journal List */}
                <div className="glass-card rounded-[3rem] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-10 py-8 text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">Chronicle Entry</th>
                                    <th className="px-10 py-8 text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">State</th>
                                    <th className="px-10 py-8 text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">Genesis</th>
                                    <th className="px-10 py-8 text-white/20 font-black text-[10px] uppercase tracking-[0.3em] text-right">Interactions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {loading ? (
                                        [1, 2, 3].map(i => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan="4" className="px-10 py-10 h-28">
                                                    <div className="w-full h-8 bg-white/5 rounded-xl"></div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : filteredBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-10 py-24 text-center">
                                                <div className="flex flex-col items-center gap-6">
                                                    <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/10">
                                                        <PenTool className="w-8 h-8 opacity-20" />
                                                    </div>
                                                    <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-black italic">The journal remains unwritten</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredBlogs.map((blog, idx) => (
                                            <motion.tr 
                                                key={blog._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-white/[0.02] transition-colors group cursor-default"
                                            >
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-24 h-16 rounded-2xl bg-luxury-gray overflow-hidden border border-white/5 group-hover:border-primary/40 transition-all duration-500 shadow-xl">
                                                            <img 
                                                                src={getImageUrl(blog.featuredImage, { width: 200 }) || '/placeholder.jpg'} 
                                                                alt={blog.title}
                                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-white text-lg font-playfair tracking-wide group-hover:text-primary transition-colors duration-500">{blog.title}</p>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-white/20 text-[10px] tracking-widest uppercase font-bold">Slug</span>
                                                                <span className="text-primary/40 text-[10px] tracking-widest uppercase font-medium">/{blog.slug}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className={`
                                                        inline-flex items-center gap-3 px-5 py-2 rounded-full text-[9px] font-black tracking-widest uppercase border transition-all duration-500
                                                        ${blog.status === 'Published' 
                                                            ? 'bg-green-500/5 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)]' 
                                                            : 'bg-primary/5 text-primary border-primary/20 shadow-[0_0_15px_rgba(201,169,97,0.05)]'}
                                                    `}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${blog.status === 'Published' ? 'bg-green-500 animate-pulse' : 'bg-primary'}`}></span>
                                                        {blog.status}
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                        <a 
                                                            href={`/blog/${blog.slug}`}
                                                            target="_blank"
                                                            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white flex items-center justify-center transition-all duration-500"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                        <Link 
                                                            to={`/blogs/edit/${blog._id}`}
                                                            className="w-12 h-12 rounded-xl bg-primary/5 hover:bg-primary/20 text-primary flex items-center justify-center transition-all duration-500"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(blog._id)}
                                                            className="w-12 h-12 rounded-xl bg-red-500/5 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all duration-500"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Blogs;
