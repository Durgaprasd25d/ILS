import { motion } from 'framer-motion'
import img20 from '../assets/image-20.jpg'

const Contact = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (
        <div className="pt-24 lg:pt-32 bg-black min-h-screen text-white">
            {/* Dramatic Header */}
            <div className="relative h-[50vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2 }}
                    src={img20} 
                    alt="Contact Background" 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="relative z-10 text-center px-8"
                >
                    <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] mb-6 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Inquiry Portal
                    </p>
                    <h1 className="text-[48px] lg:text-[100px] font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Let's Create <br />Something Timeless
                    </h1>
                </motion.div>
            </div>

            <div className="w-full px-8 lg:px-20 py-24 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40">
                    {/* Inquiry Form */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-12"
                    >
                        <h2 className="text-[32px] lg:text-[48px] font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Start a Conversation
                        </h2>
                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Full Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all placeholder:text-white/10" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Email Address</label>
                                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all placeholder:text-white/10" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Project Narrative</label>
                                <textarea rows="4" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all resize-none placeholder:text-white/10" placeholder="Tell us about your vision..."></textarea>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full lg:w-fit px-20 py-6 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.4em]"
                            >
                                Send Inquiry
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-20"
                    >
                        <div className="space-y-6">
                            <h3 className="text-[#c9a961] text-[10px] uppercase tracking-[0.5em] font-semibold">The Studio</h3>
                            <p className="text-[24px] lg:text-[32px] font-normal leading-relaxed text-white/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                                482 Architectural Way, <br />
                                Design District, NY 10013
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-[#c9a961] text-[10px] uppercase tracking-[0.5em] font-semibold">Direct</h3>
                            <div className="space-y-3">
                                <p className="text-[20px] lg:text-[24px] text-white/60 hover:text-white transition-colors cursor-pointer font-light">+1 (555) 321-7890</p>
                                <p className="text-[20px] lg:text-[24px] text-white/60 hover:text-white transition-colors cursor-pointer font-light">concierge@interiq.com</p>
                            </div>
                        </div>
                        <div className="space-y-6 pt-10 border-t border-white/5">
                            <h3 className="text-[#c9a961] text-[10px] uppercase tracking-[0.5em] font-semibold">Digital Presence</h3>
                            <div className="flex flex-wrap gap-12 text-[11px] tracking-[0.3em] font-bold text-white/40">
                                <span className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
                                <span className="hover:text-white cursor-pointer transition-colors">PINTEREST</span>
                                <span className="hover:text-white cursor-pointer transition-colors">LINKEDIN</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Contact
