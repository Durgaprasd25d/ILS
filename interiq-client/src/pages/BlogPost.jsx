import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${slug}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-playfair text-white mb-6 underline decoration-primary/40 underline-offset-8">404 | VISION EXTINGUISHED</h1>
            <p className="text-white/40 mb-10 max-w-md">This specific design narrative could not be retrieved from our archives.</p>
            <Link to="/blog" className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-all">RETURN TO JOURNAL</Link>
        </div>
    );

    return (
        <div className="bg-luxury-black pt-20">
            <Helmet>
                <title>{blog.metaTitle || blog.title} | INTERIQ</title>
                <meta name="description" content={blog.metaDescription || "Read more about luxury interior design at interiqinteriors.com"} />
            </Helmet>

            {/* Reading progress bar */}
            <motion.div 
                className="fixed top-20 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Hero Header */}
            <header className="relative h-[80vh] w-full overflow-hidden">
                <img 
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${blog.featuredImage}`} 
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-20">
                        <Link to="/blog" className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 hover:gap-4 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                            Return to Archive
                        </Link>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-playfair text-white max-w-5xl leading-tight mb-8"
                        >
                            {blog.title}
                        </motion.h1>
                        <div className="flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                            <span className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full">
                                <Clock className="w-3 h-3 text-primary" /> 
                                6 MIN READ
                            </span>
                            <span className="w-10 h-[1px] bg-white/10"></span>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span className="w-10 h-[1px] bg-white/10"></span>
                            <span>{blog.author || 'INTERIQ TEAM'}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-24 flex flex-col lg:flex-row gap-20">
                <div className="flex-1 max-w-4xl mx-auto">
                    <div 
                        className="prose prose-invert prose-p:text-white/70 prose-p:text-xl prose-p:leading-relaxed prose-headings:font-playfair prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-img:rounded-3xl luxury-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4">Share this vision</p>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Facebook className="w-5 h-5" /></button>
                                <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Twitter className="w-5 h-5" /></button>
                                <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Linkedin className="w-5 h-5" /></button>
                                <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-2">Editor</p>
                             <p className="text-white font-playfair italic text-xl">The Interiq Collective</p>
                        </div>
                    </div>
                </div>
            </article>

            {/* Bottom CTA */}
            <section className="py-32 border-t border-white/5 bg-[url('/bg-texture.png')] bg-fixed">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-playfair text-white mb-10 underline underline-offset-8 decoration-primary/20">Ready to write <br /> your <span className="italic">own</span> story?</h2>
                    <Link to="/book-consultation" className="inline-block px-12 py-5 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-all tracking-[0.2em] uppercase">Start Your Consultation</Link>
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
