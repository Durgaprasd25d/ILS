import { motion } from 'framer-motion'
import { Link } from 'react-router'
import penthouseHero from '../assets/city-penthouse-hero.png'
import kitchenImg from '../assets/sophisticated-kitchen.png'
import bedroomImg from '../assets/serene-bedroom.png'

const CityViewPenthouse = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    }

    return (

            <div className="bg-black min-h-screen text-white">
                {/* Hero Section */}
                <div className="relative h-screen">
                    <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        src={penthouseHero} 
                        alt="Luxury City View Penthouse" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 px-8 lg:px-20 pb-20 lg:pb-32 max-w-[1800px] mx-auto"
                    >
                        <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Portfolio / Residential
                        </p>
                        <h1 className="text-[56px] lg:text-[108px] font-normal leading-[0.95] mb-8 max-w-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                            City View Penthouse
                        </h1>
                        <p className="text-white/70 text-[18px] lg:text-[22px] max-w-2xl leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Where urban sophistication meets timeless luxury. Expansive city skyline views framed by floor-to-ceiling glass, modern architecture, and premium finishes.
                        </p>
                    </motion.div>
                </div>

                {/* Spaces Grid */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="px-8 lg:px-20 py-32 max-w-[1800px] mx-auto"
                >
                    <motion.div variants={fadeInUp} className="mb-20">
                        <h2 className="text-[36px] lg:text-[64px] font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Featured Spaces
                        </h2>
                        <p className="text-white/60 text-[16px] lg:text-[18px] max-w-2xl font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Explore the refined details that define this exceptional residence.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Kitchen Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/portfolio/penthouse/kitchen" className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-white/5 mb-8">
                                    <img 
                                        src={kitchenImg} 
                                        alt="Sophisticated Kitchen" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Culinary Excellence
                                </p>
                                <h3 className="text-[32px] lg:text-[40px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Sophisticated Kitchen
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Modern modular design with premium finishes, quartz countertops, and ambient lighting creating the perfect culinary sanctuary.
                                </p>
                            </Link>
                        </motion.div>

                        {/* Bedroom Card */}
                        <motion.div variants={fadeInUp}>
                            <Link to="/portfolio/penthouse/bedroom" className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-white/5 mb-8">
                                    <img 
                                        src={bedroomImg} 
                                        alt="Serene Master Bedroom" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Private Retreat
                                </p>
                                <h3 className="text-[32px] lg:text-[40px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Serene Master Bedroom
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Calm tones, plush bedding, and soft lighting converge to create a peaceful atmosphere for ultimate relaxation.
                                </p>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="px-8 lg:px-20 py-32 border-t border-white/10 max-w-[1800px] mx-auto text-center"
                >
                    <h2 className="text-[36px] lg:text-[64px] font-normal mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Experience Elevated Living
                    </h2>
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
        
    )
}

export default CityViewPenthouse
