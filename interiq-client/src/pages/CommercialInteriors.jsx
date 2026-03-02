import { motion } from 'framer-motion'
import { Link } from 'react-router'
import commercialImg from '../assets/commercial-interior.png'

const CommercialInteriors = () => {
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
                            Commercial Interiors
                        </h1>
                        <p className="text-white/70 text-[18px] lg:text-[22px] max-w-3xl leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Designing professional, modern commercial spaces that blend functionality with premium aesthetics to elevate your brand and enhance productivity.
                        </p>
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="relative aspect-[16/9] mb-24 overflow-hidden"
                    >
                        <img 
                            src={commercialImg} 
                            alt="Modern Commercial Office Interior" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Services Grid */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-32"
                    >
                        <h2 className="text-[36px] lg:text-[64px] font-normal mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Our Services
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <motion.div variants={fadeInUp} className="group">
                                <div className="mb-6 text-[#c9a961]">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                        01
                                    </div>
                                </div>
                                <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Office Interiors
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Modern office spaces designed to inspire collaboration, creativity, and productivity while reflecting your corporate identity.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="group">
                                <div className="mb-6 text-[#c9a961]">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                        02
                                    </div>
                                </div>
                                <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Retail Spaces
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Captivating retail environments that enhance customer experience and showcase your products with sophistication.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="group">
                                <div className="mb-6 text-[#c9a961]">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[18px] font-light">
                                        03
                                    </div>
                                </div>
                                <h3 className="text-[24px] font-normal mb-4 group-hover:text-[#c9a961] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Hospitality Design
                                </h3>
                                <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Luxurious hospitality interiors for hotels, restaurants, and lounges that create memorable guest experiences.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32 py-20 border-y border-white/10"
                    >
                        <div>
                            <h2 className="text-[36px] lg:text-[48px] font-normal mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Elevate Your Professional Environment
                            </h2>
                            <p className="text-white/70 text-[16px] lg:text-[18px] leading-relaxed font-light mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Our commercial design approach combines strategic space planning with premium aesthetics to create environments that work as hard as your team does.
                            </p>
                            <p className="text-white/70 text-[16px] lg:text-[18px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                From sleek reception areas to collaborative workspaces, we design spaces that make a lasting impression on clients and employees alike.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[20px] font-semibold mb-8 text-[#c9a961] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                What We Deliver
                            </h3>
                            <ul className="space-y-6 text-white/70 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Spatial strategies that elevate workflow</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Custom furniture and millwork solutions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Integrated technology and smart systems</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Sustainable and eco-conscious design choices</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Brand-aligned visual identity throughout</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>White-glove project execution</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="py-32 text-center"
                    >
                        <h2 className="text-[36px] lg:text-[64px] font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Ready to Elevate Your Space?
                        </h2>
                        <p className="text-white/60 text-[16px] lg:text-[18px] mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Let's discuss how we can transform your commercial environment into a space that drives success.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-16 py-5 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em]"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Schedule a Consultation
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        
    )
}

export default CommercialInteriors
