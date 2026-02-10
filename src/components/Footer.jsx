import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import logo from '../../logo.png'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null) // 'loading', 'success', 'error'

    const handleJoin = async (e) => {
        e.preventDefault()
        if (!email) return
        
        setStatus('loading')
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/join-circle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                setStatus('success')
                setEmail('')
                setTimeout(() => setStatus(null), 3000)
            } else {
                setStatus('error')
            }
        } catch (error) {
            console.error('Newsletter Error:', error)
            setStatus('error')
        }
    }

    return (
        <footer className="bg-black text-white border-t border-white/5 py-32 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-8 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-10">
                        <Link to="/" className="flex items-center group">
                            <img
                                src={logo}
                                alt="Interiq Interiors"
                                className="h-12 lg:h-16 w-auto"
                                loading="lazy"
                            />
                        </Link>
                        <p className="text-white/40 text-[18px] max-w-sm leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                            INTERIQ INTERIORS designs private architectural environments defined by restraint, proportion, and permanence. Each commission is approached as a singular work of living design.
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
                        <h4 className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#c9a961]">Join The Private Circle</h4>
                        <p className="text-white/40 text-[13px] leading-relaxed font-light">Join our private circle for exclusive project insights and luxury design trends.</p>
                        <form onSubmit={handleJoin} className="space-y-4">
                            <div className="flex border-b border-white/10 pb-4 group focus-within:border-[#c9a961] transition-colors">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address" 
                                    className="bg-transparent text-[14px] w-full outline-none placeholder:text-white/10" 
                                    required
                                />
                                <motion.button 
                                    type="submit"
                                    whileHover={{ x: 5 }}
                                    disabled={status === 'loading'}
                                    className="text-[11px] font-bold tracking-widest text-[#c9a961] disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'WAITING' : 'JOIN'}
                                </motion.button>
                            </div>
                            {status === 'success' && (
                                <p className="text-[#c9a961] text-[10px] tracking-[0.2em] uppercase">Welcome to the private circle.</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500/60 text-[10px] tracking-[0.2em] uppercase">Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Sub-Footer */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.4em] font-semibold text-white/30 text-center md:text-left">
                    <div className="space-y-2">
                        <p>© 2026 INTERIQ INTERIORS. ALL RIGHTS RESERVED.</p>
                        <p className="tracking-widest opacity-60">B-202, BIRAJA COMPLEX <br /> BOMIKHAL, CUTTACK ROAD <br /> BHUBANESWAR, ODISHA – 751010 <br /> INDIA</p>
                    </div>
                    <div className="flex gap-10">
                        <a href="https://wa.me/917008951964" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a961] transition-colors uppercase">+91 7008951964</a>
                        <a href="https://www.instagram.com/interiqinteriors?igsh=MWYzcDdpOWpjdzh1bQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a961] transition-colors uppercase">INSTAGRAM</a>
                        <a href="https://www.facebook.com/profile.php?id=61587270160802" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a961] transition-colors uppercase">FACEBOOK</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
