import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, Loader2 } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/SEO';

const BlogHome = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch only published blogs
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs?status=Published`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-32 pb-20 bg-luxury-black">
            <SEO 
                title="The Journal | INTERIQ INTERIORS Bhubaneswar" 
                description="Explore the latest trends in luxury interior design, modular kitchens, and architectural excellence in Odisha through our design journal." 
            />

            <div className="container mx-auto px-6">
                <header className="mb-20 text-center max-w-4xl mx-auto">
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4"
                    >
                        Design Journal
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-playfair text-white mb-8"
                    >
                        The Narrative <br /> of <span className="italic underline decoration-primary/40">Space</span>
                    </motion.h1>
                    
                    <div className="relative max-w-xl mx-auto mt-12 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search the journal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-8 text-white focus:border-primary outline-none transition-all placeholder:text-white/20"
                        />
                    </div>
                </header>

                {loading ? (
                    <div className="flex h-60 items-center justify-center">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 border-y border-white/5">
                        <p className="text-white/40 font-playfair text-2xl italic tracking-wide">
                            The requested narrative has not yet been written.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredBlogs.map((blog, index) => (
                            <motion.article 
                                key={blog._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <Link to={`/blog/${blog.slug}`} className="block overflow-hidden rounded-2xl relative aspect-[4/5] bg-luxury-gray">
                                    <img 
                                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${blog.featuredImage}`} 
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    
                                    <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Design Thought</span>
                                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                                <ArrowUpRight className="w-5 h-5 text-black" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-playfair text-white line-clamp-2 leading-tight mb-2">{blog.title}</h3>
                                        <p className="text-white/50 text-xs line-clamp-2 font-light tracking-wide">{blog.summary}</p>
                                    </div>
                                </Link>
                                <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-white/30 font-bold px-2">
                                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="w-12 h-[1px] bg-white/10"></span>
                                    <span>{blog.author || 'Interiq Admin'}</span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogHome;
