import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import { API_URL, getImageUrl } from '../config';
import img14 from '../assets/image-14.jpg'
import img15 from '../assets/image-15.jpg'
import img17 from '../assets/image-17.jpg'

const Services = () => {
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/content/services`)
                if (response.data && response.data.sections) {
                    setContent(response.data.sections)
                }
            } catch (error) {
                console.error('Error fetching services content:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [])

    // CMS data with fallbacks
    const header = content?.header || {
        label: "Our Expertise",
        title: "Holistic Services",
        description: "From initial concept to final staging, we provide a seamless synthesis of architectural detailing and interior curation."
    }

    const serviceItems = content?.items || [
        {
            id: 1,
            title: 'Residential Master-Planning',
            description: 'Bespoke end-to-end living environments tailored to individual lifestyles, featuring premium materials and architectural precision.',
            image: img14,
            label: 'Residential Strategy'
        },
        {
            id: 2,
            title: 'Commercial Workflow Design',
            description: 'Optimized high-performance workspaces that blend corporate productivity with the tranquility of private luxury.',
            image: img15,
            label: 'Corporate Environments'
        },
        {
            id: 3,
            title: 'Hospitality Architecture',
            description: 'Creation of immersive brand environments that prioritize guest experience and operational flow without compromise.',
            image: img17,
            label: 'Leisure & Hospitality'
        }
    ]

    return (
        <div className="pt-24 lg:pt-32 bg-black min-h-screen text-white">
            <SEO 
                title="Bespoke Interior Services | Modular Kitchens & Luxury Homes Bhubaneswar" 
                description="INTERIQ INTERIORS offers a full suite of interior design services in Bhubaneswar, including residential master-planning, commercial workflow design, and luxury modular kitchens." 
                ogTitle="Holistic Interior Design Services | INTERIQ Bhubaneswar"
                ogDescription="From concept to execution, explore our premium design services for homes, offices, and hospitality projects."
                ogUrl="https://interiqinteriors.com/services"
                canonical="https://interiqinteriors.com/services"
            />
            <Schema type="BreadcrumbList" data={[
                { name: 'Home', url: 'https://interiqinteriors.com' },
                { name: 'Services', url: 'https://interiqinteriors.com/services' }
            ]} />
            <div className="w-full px-8 lg:px-20 py-16 max-w-[1800px] mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-32"
                >
                    <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {header.label}
                    </p>
                    <h1 className="text-[48px] lg:text-[88px] font-normal leading-[1.05] mb-8 whitespace-pre-line" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {header.title}
                    </h1>
                    <p className="text-white/60 text-[18px] lg:text-[20px] max-w-2xl leading-relaxed font-light whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {header.description}
                    </p>
                </motion.div>

                {/* Services List */}
                <div className="space-y-40 lg:space-y-64 mb-40">
                    {serviceItems.map((service, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 w-full aspect-[16/10] lg:aspect-[3/2] overflow-hidden rounded-sm relative group"
                            >
                                <img 
                                    src={service.image && typeof service.image === 'string' ? getImageUrl(service.image, { width: 1200 }) : (service.image || '/placeholder.jpg')} 
                                    alt={`${service.title} - Luxury Interior Service by INTERIQ Bhubaneswar`} 
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent"></div>
                            </motion.div>
                            <div className="flex-1 space-y-8">
                                <p className="text-[#c9a961] text-[11px] uppercase tracking-[0.4em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {service.label}
                                </p>
                                <h2 className="text-[32px] lg:text-[56px] font-normal leading-tight font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {service.title}
                                </h2>
                                <p className="text-white/60 text-[18px] leading-relaxed max-w-lg font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {service.description}
                                </p>
                                <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <Link 
                                        to="/contact" 
                                        className="inline-flex items-center gap-4 text-[#c9a961] group"
                                    >
                                        <span className="text-[12px] tracking-[0.2em] font-semibold uppercase">Schedule Workshop</span>
                                        <div className="w-12 h-[1px] bg-[#c9a961] transition-all duration-300 group-hover:w-20"></div>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing quote or statement */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="border-t border-white/10 pt-40 text-center"
                >
                    <h3 className="text-3xl lg:text-5xl font-light mb-16 italic text-white/40 leading-relaxed font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                        "Luxury is not a price point. <br />It is a standard of care and execution."
                    </h3>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/contact"
                            className="px-16 py-6 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Start Your Journey
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Services
