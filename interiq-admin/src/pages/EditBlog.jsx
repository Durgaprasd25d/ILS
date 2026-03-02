import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Save, X, Upload, Loader2, ArrowLeft } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { toast } from 'react-toastify';

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
            const response = await api.get(`/blogs`); // In a real app we'd fetch by ID, but for listing we have all.
            // Simplified: filter from the list or add single fetch endpoint
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
                setPreview(`${import.meta.env.VITE_IMAGE_BASE_URL}${currentBlog.featuredImage}`);
            }
        } catch (error) {
            toast.error('Failed to load blog data');
        } finally {
            setFetching(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
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
                toast.success('Journal updated successfully');
            } else {
                await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('New vision published to journal');
            }
            navigate('/blogs');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <MainLayout title="Edit Vision">
        <div className="flex h-[60vh] items-center justify-center text-primary font-playfair text-2xl animate-pulse">
            LOADING THE NARRATIVE...
        </div>
    </MainLayout>;

    return (
        <MainLayout title={isEdit ? 'Refine Vision' : 'New Design Context'}>
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-10 pb-20">
                <div className="flex items-center justify-between mb-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/blogs')}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Archive
                    </button>
                    <div className="flex gap-4">
                        <select 
                            value={blogData.status}
                            onChange={(e) => setBlogData({...blogData, status: e.target.value})}
                            className="bg-luxury-gray border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
                        >
                            <option value="Draft">Draft Mode</option>
                            <option value="Published">Published Live</option>
                        </select>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-primary-dark text-luxury-black font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(201,169,97,0.1)] flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{isEdit ? 'SAVE CHANGES' : 'PUBLISH VISION'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Post Title</label>
                            <input 
                                type="text" 
                                required
                                value={blogData.title}
                                onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                                placeholder="Enter a compelling design title..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 px-6 text-2xl font-playfair focus:border-primary outline-none transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Short Description (Excerpt)</label>
                            <textarea 
                                required
                                value={blogData.summary}
                                onChange={(e) => setBlogData({...blogData, summary: e.target.value})}
                                placeholder="A brief hook for the listing page..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-6 text-white/70 focus:border-primary outline-none transition-all placeholder:text-white/10 resize-none"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Narrative Content</label>
                            <div className="luxury-quill">
                                <ReactQuill 
                                    theme="snow" 
                                    value={blogData.content} 
                                    onChange={(val) => setBlogData({...blogData, content: val})} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Featured Imagery</label>
                            <div 
                                className="relative aspect-video rounded-xl bg-luxury-black border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group hover:border-primary/40 transition-colors cursor-pointer"
                                onClick={() => document.getElementById('image-upload').click()}
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <Upload className="w-8 h-8 text-primary" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <Upload className="w-8 h-8 text-white/10 mb-4 mx-auto group-hover:text-primary transition-colors" />
                                        <p className="text-xs text-white/40">Drop high-res imagery here or <span className="text-primary italic">browse</span></p>
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
                        </div>

                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 font-bold">SEO Context (Metadata)</label>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] text-white/30 uppercase block mb-2">Focus Title</label>
                                    <input 
                                        type="text" 
                                        value={blogData.metaTitle}
                                        onChange={(e) => setBlogData({...blogData, metaTitle: e.target.value})}
                                        className="w-full bg-luxury-black border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/30 uppercase block mb-2">Description Snippet</label>
                                    <textarea 
                                        rows="4" 
                                        value={blogData.metaDescription}
                                        onChange={(e) => setBlogData({...blogData, metaDescription: e.target.value})}
                                        className="w-full bg-luxury-black border border-white/10 rounded-lg py-3 px-4 text-sm focus:border-primary outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
};

export default EditBlog;
