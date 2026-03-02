import { motion } from 'framer-motion'
import { Link } from 'react-router'
import livingRoomImg from '../assets/elegant-living-room.png'
import SEO from '../components/SEO';

const ResidentialInteriors = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (

            <div className="bg-black min-h-screen text-white pt-24 lg:pt-32">
                <SEO 
                    title="Residential Interiors | Custom Home Design Bhubaneswar | INTERIQ" 
                    description="Transform your home with INTERIQ's bespoke residential interior design in Bhubaneswar. We specialize in luxury living rooms, bedrooms, and modular kitchens." 
                />
                <div className="max-w-[1800px] mx-auto px-8 lg:px-20">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-24"
                    >
                        <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Services
                        </p>
                        <h1 className="text-[56px] lg:text-[108px] font-normal leading-[0.95] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Residential Interiors
                        </h1>
                        <p className="text-white/70 text-[18px] lg:text-[22px] max-w-3xl leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Creating refined, elegant home environments that reflect your personality while prioritizing comfort, functionality, and timeless beauty.
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32"
                    >
                        <motion.div variants={fadeInUp} className="group">
                            <div className="mb-6 text-[#c9a961]">
                                <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                    01
                                </div>
                            </div>
                            <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Full Home Design
                            </h3>
                            <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Comprehensive interior design solutions that transform your entire home into a cohesive, luxurious living environment.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="group">
                            <div className="mb-6 text-[#c9a961]">
                                <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                    02
                                </div>
                            </div>
                            <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Room-Specific Design
                            </h3>
                            <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Focused design for individual spaces like living rooms, bedrooms, kitchens, and dining areas tailored to your needs.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="group">
                            <div className="mb-6 text-[#c9a961]">
                                <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                    03
                                </div>
                            </div>
                            <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Furniture & Styling
                            </h3>
                            <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Curated furniture selection, custom pieces, and expert styling that brings your interior vision to life.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Featured Project */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32"
                    >
                        <h2 className="text-[36px] lg:text-[64px] font-normal mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Featured Project
                        </h2>

                        <Link to="/services/residential/living-room" className="group block">
                            <div className="relative aspect-[16/9] overflow-hidden bg-white/5 mb-10">
                                <img 
                                    src={livingRoomImg} 
                                    alt="The Meridian Residence" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <div>
                                    <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Residential Project
                                    </p>
                                    <h3 className="text-[32px] lg:text-[48px] font-normal group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        The Meridian Residence
                                    </h3>
                                </div>
                                <div className="text-white/60 group-hover:text-white text-[14px] uppercase tracking-[0.3em] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Explore the Residence →
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="py-32 border-t border-white/10 text-center"
                    >
                        <h2 className="text-[36px] lg:text-[64px] font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Transform Your Home
                        </h2>
                        <p className="text-white/60 text-[16px] lg:text-[18px] mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Let's create a living space that reflects your unique style and enhances your daily life.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-16 py-5 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em]"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Start Your Project
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        
    )
}

export default ResidentialInteriors
