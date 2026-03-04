import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Save, X, Upload, Loader2, ArrowLeft, Image as ImageIcon, Sparkles, Globe, Shield, Activity, Clock } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { getImageUrl } from '../config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const EditBlog = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    
    const [blogData, setBlogData] = useState({
        title: '',
        summary: '',
        content: '',
        status: 'Draft',
        metaTitle: '',
        metaDescription: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            // Optimization: The backend likely has a single fetch endpoint, or we can use the list filter if preferred.
            // Using list for now as per original code, but could be api.get(`/blogs/${id}`) if supported.
            const response = await api.get(`/blogs`);
            if (Array.isArray(response.data)) {
                const currentBlog = response.data.find(b => b._id === id);
                if (currentBlog) {
                    setBlogData({
                        title: currentBlog.title,
                        summary: currentBlog.summary || '',
                        content: currentBlog.content,
                        status: currentBlog.status,
                        metaTitle: currentBlog.metaTitle,
                        metaDescription: currentBlog.metaDescription,
                    });
                    setPreview(getImageUrl(currentBlog.featuredImage));
                }
            }
        } catch (error) {
            toast.error('Failed to reconstruct narrative');
        } finally {
            setFetching(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            toast.info('Visual asset queued for integration');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('summary', blogData.summary);
        formData.append('content', blogData.content);
        formData.append('status', blogData.status);
        formData.append('metaTitle', blogData.metaTitle);
        formData.append('metaDescription', blogData.metaDescription);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (isEdit) {
                await api.put(`/blogs/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Experience chronicle updated');
            } else {
                await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Vision published to design journal');
            }
            navigate('/blogs');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Synchronization failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <MainLayout title="Edit Vision">
            <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
                <div className="relative">
                    <div className="w-24 h-24 border-2 border-primary/10 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-primary rounded-full animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">Reconstructing Narrative Context</p>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout title={isEdit ? 'Refine Vision' : 'New Context'}>
            <form onSubmit={handleSubmit} className="max-w-[1600px] mx-auto space-y-12 pb-24 relative">
                
                {/* Control bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-8">
                        <button 
                            type="button" 
                            onClick={() => navigate('/blogs')}
                            className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-500"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Editorial Suite</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{isEdit ? 'Revision 2.0' : 'Initial Draft'}</span>
                            </div>
                            <h2 className="text-3xl font-playfair text-white tracking-wide">{blogData.title || 'Untitled Vision'}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-3">
                            <Shield className="w-4 h-4 text-primary" />
                            <select 
                                value={blogData.status}
                                onChange={(e) => setBlogData({...blogData, status: e.target.value})}
                                className="bg-transparent text-[11px] font-black tracking-widest uppercase text-white/60 outline-none cursor-pointer"
                            >
                                <option value="Draft" className="bg-luxury-black">Draft Mode</option>
                                <option value="Published" className="bg-luxury-black text-green-500">Live Release</option>
                            </select>
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="premium-button rounded-2xl flex items-center gap-4 group min-w-[200px] justify-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span className="group-hover:translate-x-1 transition-transform">{isEdit ? 'Commit Revision' : 'Release Vision'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-12 rounded-[3rem] space-y-12"
                        >
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-4">Chronicle Designation</label>
                                <input 
                                    type="text" 
                                    required
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                                    placeholder="Define your design philosophy..."
                                    className="w-full bg-transparent border-b border-white/10 py-6 px-4 text-5xl font-playfair focus:border-primary outline-none transition-all duration-700 placeholder:text-white/5 italic tracking-tight"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-4">Executive Summation</label>
                                <textarea 
                                    required
                                    value={blogData.summary}
                                    onChange={(e) => setBlogData({...blogData, summary: e.target.value})}
                                    placeholder="A surgical hook for the digital archive..."
                                    className="w-full bg-white/[0.04] border border-white/5 rounded-3xl py-8 px-10 text-white/70 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all duration-700 placeholder:text-white/10 resize-none text-lg leading-relaxed font-light italic"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between ml-4">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Main Narrative</label>
                                    <div className="flex items-center gap-2 text-[10px] text-primary font-black tracking-widest uppercase">
                                        <Activity className="w-3 h-3" />
                                        <span>High-Fidelity Mode</span>
                                    </div>
                                </div>
                                <div className="luxury-quill-v2">
                                    <ReactQuill 
                                        theme="snow" 
                                        value={blogData.content} 
                                        onChange={(val) => setBlogData({...blogData, content: val})} 
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-10 rounded-[3rem] space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-4 h-4 text-primary" />
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Key Visual</label>
                            </div>
                            
                            <div 
                                className="relative aspect-[3/4] rounded-[2.5rem] bg-black border border-white/5 flex items-center justify-center overflow-hidden group hover:border-primary/40 transition-all duration-1000 cursor-pointer shadow-2xl"
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                            <div className="p-3 rounded-xl glass-card bg-primary text-black border-none">
                                                <ImageIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest text-white font-black">Replace Asset</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-12">
                                        <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-1000">
                                            <Upload className="w-8 h-8 text-white/10 group-hover:text-primary transition-colors" />
                                        </div>
                                        <p className="text-[11px] uppercase font-black tracking-[0.3em] text-white/20">Integrate Media</p>
                                    </div>
                                )}
                                <input 
                                    id="image-upload" 
                                    type="file" 
                                    hidden 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-10 rounded-[3rem] space-y-8"
                        >
                            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                                <Globe className="w-4 h-4 text-primary" />
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Search Architecture</label>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[9px] text-white/20 uppercase font-black tracking-widest ml-2">Focus Meta Title</label>
                                    <input 
                                        type="text" 
                                        value={blogData.metaTitle}
                                        onChange={(e) => setBlogData({...blogData, metaTitle: e.target.value})}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-xs focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all duration-500 text-white/60 placeholder:text-white/10"
                                        placeholder="SEO Title..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] text-white/20 uppercase font-black tracking-widest ml-2">Contextual Descriptor</label>
                                    <textarea 
                                        rows="4" 
                                        value={blogData.metaDescription}
                                        onChange={(e) => setBlogData({...blogData, metaDescription: e.target.value})}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-xs focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all duration-500 resize-none text-white/60 placeholder:text-white/10"
                                        placeholder="Snippet..."
                                    ></textarea>
                                </div>
                            </div>
                        </motion.div>

                        <div className="px-10 py-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/20 font-black uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>Autosave Ready</span>
                            </div>
                            <span>v2.0</span>
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
};

export default EditBlog;
