import { motion } from 'framer-motion'
import { Link } from 'react-router'
import livingRoomImg from '../assets/elegant-living-room.png'

const ElegantLivingRoom = () => {
    return (

            <div className="bg-black min-h-screen text-white pt-24 lg:pt-32">
                <div className="max-w-[1800px] mx-auto px-8 lg:px-20">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link to="/services/residential" className="text-white/50 hover:text-[#c9a961] text-[12px] uppercase tracking-[0.3em] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                            ← Residential Interiors
                        </Link>
                    </motion.div>

                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-16"
                    >
                        <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Residential Project
                        </p>
                        <h1 className="text-[56px] lg:text-[96px] font-normal leading-[0.95] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Meridian Residence
                        </h1>
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="relative aspect-[16/10] mb-20 overflow-hidden"
                    >
                        <img 
                            src={livingRoomImg} 
                            alt="The Meridian Residence" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32"
                    >
                        <div>
                            <h2 className="text-[36px] lg:text-[48px] font-normal mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Where Luxury Meets Comfort
                            </h2>
                            <p className="text-white/70 text-[16px] lg:text-[18px] leading-relaxed font-light mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                                This exquisite residence exemplifies our approach to residential design: sophisticated yet welcoming, luxurious yet livable.
                            </p>
                            <p className="text-white/70 text-[16px] lg:text-[18px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Every element is carefully selected to create a warm, inviting atmosphere perfect for both entertaining guests and quiet evenings at home.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[20px] font-semibold mb-8 text-[#c9a961] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Key Features
                            </h3>
                            <ul className="space-y-6 text-white/70 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Designer sofas in premium cream tones</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Layered lighting with floor lamps and recessed fixtures</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Curated artwork and tasteful decor</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Custom coffee table with decorative styling</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Floor-to-ceiling windows for natural light</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#c9a961] mr-4">—</span>
                                    <span>Warm color palette creating inviting ambiance</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="py-32 border-t border-white/10 text-center"
                    >
                        <h2 className="text-[36px] lg:text-[56px] font-normal mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Reimagine Your Living Space
                        </h2>
                        <div className="flex flex-wrap gap-6 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-14 py-5 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.3em]"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Get in Touch
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/services/residential"
                                    className="inline-flex items-center justify-center px-14 py-5 border border-white/30 hover:border-white text-white font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.3em]"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    All Services
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        
    )
}

export default ElegantLivingRoom
