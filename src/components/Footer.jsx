import { Link } from 'react-router'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-white/5 py-32 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-8 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-10">
                        <Link to="/" className="flex flex-col items-start group">
                            <span 
                                className="text-white text-3xl lg:text-5xl tracking-[0.1em] leading-none"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                INTERIQ
                            </span>
                            <span 
                                className="text-[#c9a961] text-[10px] lg:text-[11px] tracking-[0.5em] mt-1 uppercase font-light"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Interiors
                            </span>
                        </Link>
                        <p className="text-white/40 text-[18px] max-w-sm leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Crafting timeless luxury spaces—built around your lifestyle. We define architectural elegance through precision.
                        </p>
                    </div>
                    
                    {/* Navigation */}
                    <div className="space-y-10">
                        <h4 className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#c9a961]">Navigation</h4>
                        <ul className="space-y-6 text-white/50 text-[13px] tracking-[0.2em] font-medium">
                            <li><Link to="/" className="hover:text-[#c9a961] transition-colors">HOME</Link></li>
                            <li><Link to="/portfolio/residential" className="hover:text-[#c9a961] transition-colors">RESIDENTIAL</Link></li>
                            <li><Link to="/portfolio/commercial" className="hover:text-[#c9a961] transition-colors">COMMERCIAL</Link></li>
                            <li><Link to="/services" className="hover:text-[#c9a961] transition-colors">SERVICES</Link></li>
                            <li><Link to="/about" className="hover:text-[#c9a961] transition-colors">THE STUDIO</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter/Circle */}
                    <div className="space-y-10">
                        <h4 className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#c9a961]">Join The Circle</h4>
                        <p className="text-white/40 text-[13px] leading-relaxed font-light">Join our private circle for exclusive project insights and luxury design trends.</p>
                        <div className="flex border-b border-white/10 pb-4 group focus-within:border-[#c9a961] transition-colors">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="bg-transparent text-[14px] w-full outline-none placeholder:text-white/10" 
                            />
                            <motion.button 
                                whileHover={{ x: 5 }}
                                className="text-[11px] font-bold tracking-widest text-[#c9a961]"
                            >
                                JOIN
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Sub-Footer */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.4em] font-semibold text-white/30">
                    <p>© 2026 INTERIQ INTERIORS. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-12 font-bold">
                        <span className="hover:text-white cursor-pointer transition-colors">PRIVACY POLICY</span>
                        <span className="hover:text-white cursor-pointer transition-colors">TERMS OF SERVICE</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
