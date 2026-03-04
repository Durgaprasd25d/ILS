import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import { API_URL, getImageUrl } from '../config';
import img18 from '../assets/image-18.jpg'
import img19 from '../assets/image-19.jpg'

const About = () => {
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/content/about`)
                if (response.data && response.data.sections) {
                    setContent(response.data.sections)
                }
            } catch (error) {
                console.error('Error fetching about content:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [])

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    // CMS data with fallbacks
    const intro = content?.intro || {
        label: "The Studio",
        title: "Architectural Curation",
        description: "At INTERIQ INTERIORS, we define design as a precision tool for self-expression and functional refinement. Our studio executes bespoke environments that resonate with the architectural soul of a space.\n\nEvery material choice and lighting element is a deliberate step toward an atmosphere of effortless luxury. We don't just design rooms; we curate experiences.",
        image: null
    }

    const stats = content?.stats || [
        { label: 'Trusted by discerning clients', value: 'Elite' },
        { label: 'Curated private residences', value: 'Bespoke' },
        { label: 'Studio Members', value: '12' },
        { label: 'Award-inspired craftsmanship', value: 'Mastery' }
    ]

    const values = content?.values || {
        title: "Honesty in Materials",
        items: [
            { title: "Precision", desc: "Millimeter accuracy in every construction and installation phase." },
            { title: "Authenticity", desc: "Sourcing only genuine, sustainable, and high-performance materials." }
        ],
        image: null
    }

    return (
        <div className="pt-24 lg:pt-32 bg-black min-h-screen text-white">
            <SEO 
                title="The Studio | INTERIQ Interiors - Luxury Design in Bhubaneswar" 
                description="Discover the vision behind INTERIQ INTERIORS. We are a premier interior design studio in Bhubaneswar, dedicated to architectural curation and elite craftsmanship for bespoke homes." 
                ogTitle="The Studio | Vision of INTERIQ Interiors"
                ogDescription="Learn about our design philosophy and commitment to architectural refinement in every project."
                ogUrl="https://interiqinteriors.com/about"
                canonical="https://interiqinteriors.com/about"
            />
            <Schema type="BreadcrumbList" data={[
                { name: 'Home', url: 'https://interiqinteriors.com' },
                { name: 'About Studio', url: 'https://interiqinteriors.com/about' }
            ]} />
            <div className="w-full px-8 lg:px-20 py-16 max-w-[1800px] mx-auto">
                {/* Intro Section */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center mb-40">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex-1 space-y-10"
                    >
                        <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {intro.label}
                        </p>
                        <h1 className="text-[48px] lg:text-[88px] font-normal leading-[1.05] whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {intro.title}
                        </h1>
                        <div className="space-y-8 text-white/60 text-[18px] lg:text-[20px] leading-relaxed max-w-xl font-light whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {intro.description}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="flex-1 w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm relative group"
                    >
                        <img 
                            src={intro.image ? getImageUrl(intro.image, { width: 1200 }) : img19} 
                            alt="The INTERIQ Studio - Luxury Interior Design Execution in Bhubaneswar" 
                            className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-20 border-y border-white/5 mb-40"
                >
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={fadeUp}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center space-y-4"
                        >
                            <h3 className="text-4xl lg:text-6xl font-normal text-[#c9a961]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {stat.value}
                            </h3>
                            <p className="text-[10px] lg:text-[11px] uppercase tracking-[0.4em] text-white/40 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Section */}
                <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="flex-1 space-y-12"
                    >
                        <h2 className="text-[42px] lg:text-[72px] font-normal leading-[1.1] whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {values.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {(values.items || []).map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-[#c9a961] text-[14px] uppercase tracking-widest font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{item.title}</h3>
                                    <p className="text-white/50 text-base leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 1 } }
                        }}
                        className="flex-1 w-full aspect-[16/10] overflow-hidden rounded-sm relative group"
                    >
                        <img 
                            src={values.image ? getImageUrl(values.image, { width: 1200 }) : img18} 
                            alt="Bespoke Craftsmanship and Precision in Interior Material Sourcing" 
                            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About
