import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import img02 from '../assets/image-02.jpg'
import img03 from '../assets/image-03.jpg'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import { API_URL, getImageUrl } from '../config';

const Home = () => {
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/content/home`)
                if (response.data && response.data.sections) {
                    setContent(response.data.sections)
                }
            } catch (error) {
                console.error('Error fetching home content:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [])

    const fadeUp = {
        hidden: { opacity: 0, y: 100 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const imageReveal = {
        hidden: { scale: 1.2, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
        visible: { 
            scale: 1, 
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
        }
    }

    // Magnetic effect for CTA links
    const [magneticPos1, setMagneticPos1] = useState({ x: 0, y: 0 })
    const [magneticPos2, setMagneticPos2] = useState({ x: 0, y: 0 })

    const handleMagneticMove = (e, setPos) => {
        const { clientX, clientY, currentTarget } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        setPos({ x: x * 0.4, y: y * 0.4 })
    }

    // CMS data with fallbacks
    const philosophy = content?.philosophy || {
        label: "Design Philosophy",
        title: "Refinement in Every Detail",
        description: "Our approach to luxury is rooted in the subtle balance of texture, light, and form. We source the world's most exclusive materials to create interiors that are as tactile as they are visual.",
        image: null
    }

    const curated = content?.curated || {
        label: "Curated Spaces",
        title: "Architectural Detailing",
        description: "From custom millwork to precision-engineered lighting, every element of our design is considered at an architectural level to ensure perfect integration and timeless appeal.",
        image: null
    }

    return (
        <div className="min-h-screen bg-[#050505] overflow-x-hidden">
            <SEO 
                title="INTERIQ Interiors | Luxury Interior Designer in Bhubaneswar | Bespoke Home & Office" 
                description="INTERIQ Interiors is Bhubaneswar's premier luxury interior design studio. We specialize in bespoke residential and commercial spaces, modular kitchens, and turnkey interior solutions in Odisha." 
                ogTitle="INTERIQ Interiors | Premium Interior Design Bhubaneswar"
                ogDescription="Transform your space with INTERIQ. Expert interior design services in Bhubaneswar, specializing in luxury homes and modular kitchens."
                ogUrl="https://interiqinteriors.com"
                canonical="https://interiqinteriors.com"
            />
            <Schema type="LocalBusiness" />
            <Hero content={content?.hero} />
            
            {/* Feature Highlight Section 01 - Design Philosophy */}
            <section className="py-32 lg:py-64 w-full px-8 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-20 lg:gap-40 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="flex-1 space-y-12"
                    >
                        <div className="space-y-6">
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-[#c9a961] text-[12px] lg:text-[14px] uppercase tracking-[0.6em] font-semibold"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {philosophy.label}
                            </motion.p>
                            <h2 className="text-[clamp(48px,8vw,96px)] font-normal leading-[1.05] text-white tracking-tighter whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {philosophy.title}
                            </h2>
                        </div>
                        <p className="text-white/50 text-[18px] lg:text-[22px] leading-relaxed max-w-xl font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {philosophy.description}
                        </p>
                        
                        <motion.div 
                            onMouseMove={(e) => handleMagneticMove(e, setMagneticPos1)}
                            onMouseLeave={() => setMagneticPos1({ x: 0, y: 0 })}
                            animate={{ x: magneticPos1.x, y: magneticPos1.y }}
                            className="inline-block"
                        >
                            <Link to="/about" className="inline-flex items-center gap-6 text-[#c9a961] hover:text-white transition-colors duration-500 group">
                                <span className="text-[13px] tracking-[0.4em] uppercase font-bold">Explore Studio</span>
                                <div className="relative flex items-center">
                                    <div className="w-16 h-[1px] bg-[#c9a961] transition-all duration-500 group-hover:w-28 group-hover:bg-white"></div>
                                    <div className="absolute right-0 w-2 h-2 border-r border-t border-[#c9a961] rotate-45 group-hover:border-white"></div>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={imageReveal}
                        className="flex-1 w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[2px] relative group"
                    >
                        <motion.img 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            src={philosophy.image ? getImageUrl(philosophy.image, { width: 1200 }) : img02} 
                            alt="Luxury Interior Design Philosophy - INTERIQ Interiors Bhubaneswar" 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                    </motion.div>
                </div>
            </section>

            {/* Feature Highlight Section 02 - Curated Spaces */}
            <section className="py-32 lg:py-64 w-full px-8 lg:px-20 max-w-[1800px] mx-auto bg-[#030303]">
                <div className="flex flex-col lg:flex-row-reverse gap-20 lg:gap-40 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="flex-1 space-y-12"
                    >
                        <div className="space-y-6">
                            <motion.p 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-[#c9a961] text-[12px] lg:text-[14px] uppercase tracking-[0.6em] font-semibold"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {curated.label}
                            </motion.p>
                            <h2 className="text-[clamp(48px,8vw,96px)] font-normal leading-[1.05] text-white tracking-tighter whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {curated.title}
                            </h2>
                        </div>
                        <p className="text-white/50 text-[18px] lg:text-[22px] leading-relaxed max-w-xl font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {curated.description}
                        </p>
                        
                        <motion.div 
                            onMouseMove={(e) => handleMagneticMove(e, setMagneticPos2)}
                            onMouseLeave={() => setMagneticPos2({ x: 0, y: 0 })}
                            animate={{ x: magneticPos2.x, y: magneticPos2.y }}
                            className="inline-block"
                        >
                            <Link to="/portfolio/residential" className="inline-flex flex-row-reverse lg:flex-row items-center gap-6 text-[#c9a961] hover:text-white transition-colors duration-500 group">
                                <span className="text-[13px] tracking-[0.4em] uppercase font-bold">View Portfolio</span>
                                <div className="relative flex items-center">
                                    <div className="w-16 h-[1px] bg-[#c9a961] transition-all duration-500 group-hover:w-28 group-hover:bg-white"></div>
                                    <div className="absolute right-0 w-2 h-2 border-r border-t border-[#c9a961] rotate-45 group-hover:border-white"></div>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={imageReveal}
                        className="flex-1 w-full aspect-[16/10] overflow-hidden rounded-[2px] relative group"
                    >
                        <motion.img 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            src={curated.image ? getImageUrl(curated.image, { width: 1200 }) : img03} 
                            alt="Curated Interior Spaces and Architectural Detailing - INTERIQ Bhubaneswar" 
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                    </motion.div>
                </div>
            </section>

            {/* Final CTA Portal - Premium Version */}
            <section className="py-48 lg:py-80 relative overflow-hidden flex items-center justify-center text-center">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.15 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <img src={img02} className="w-full h-full object-cover blur-2xl scale-150" alt="" />
                    <div className="absolute inset-0 bg-black"></div>
                </motion.div>
                
                <div className="relative z-10 max-w-6xl px-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-[clamp(56px,10vw,140px)] font-normal leading-tight mb-20 text-white tracking-tighter" 
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Begin your journey <br />into luxury.
                    </motion.h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            to="/contact"
                            className="px-24 py-8 bg-[#c9a961] text-black font-extrabold text-[15px] uppercase tracking-[0.4em] relative group overflow-hidden block transition-all duration-500 hover:shadow-[0_25px_60px_rgba(201,169,97,0.4)]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <span className="relative z-10 transition-colors duration-500">Book a Consultation</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#b89851] to-[#c9a961] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home
