import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Plus, Search, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { toast } from 'react-toastify';

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
            setBlogs(response.data);
        } catch (error) {
            toast.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vision?')) return;
        
        try {
            await api.delete(`/blogs/${id}`);
            toast.success('Blog deleted successfully');
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout title="Design Journal">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                    />
                </div>

                <Link 
                    to="/blogs/create"
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-luxury-black font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_30px_rgba(201,169,97,0.1)]"
                >
                    <Plus className="w-5 h-5" />
                    <span>CREATE NEW VISION</span>
                </Link>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/10 font-playfair tracking-wider">
                                <th className="px-8 py-6 text-white/40 font-medium text-xs uppercase">Journal Entry</th>
                                <th className="px-8 py-6 text-white/40 font-medium text-xs uppercase">Status</th>
                                <th className="px-8 py-6 text-white/40 font-medium text-xs uppercase">Created Date</th>
                                <th className="px-8 py-6 text-white/40 font-medium text-xs uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-8 py-8 h-20 bg-white/5"></td>
                                    </tr>
                                ))
                            ) : filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center text-white/20 font-playfair italic underline decoration-primary/20">
                                        No visions found in the journal.
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-luxury-gray overflow-hidden border border-white/10">
                                                    <img 
                                                        src={blog.featuredImage ? `${import.meta.env.VITE_IMAGE_BASE_URL}${blog.featuredImage}` : '/placeholder.jpg'} 
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">{blog.title}</p>
                                                    <p className="text-white/30 text-xs tracking-wider">/{blog.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                                                blog.status === 'Published' 
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                                    : 'bg-primary/10 text-primary border-primary/20'
                                            }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-white/40 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <Link 
                                                    to={`/blogs/edit/${blog._id}`}
                                                    className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Blogs;
