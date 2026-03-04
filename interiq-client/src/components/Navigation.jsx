import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import headerBg from '../assets/headerbgimage.jpeg'
import brandLogo from '../../logo.png'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [mobileExpanded, setMobileExpanded] = useState(null)
    const location = useLocation()
    const navRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const toggleMobileExpanded = (name) => {
        setMobileExpanded(mobileExpanded === name ? null : name)
    }

    const navLinks = [
        { 
            name: 'Portfolio', 
            path: '#',
            dropdown: [
                { name: 'Residential', path: '/portfolio/residential' },
                { name: 'City View Penthouse', path: '/portfolio/penthouse' },
                { name: 'Commercial / Hospitality', path: '/portfolio/commercial' }
            ]
        },
        { 
            name: 'Services', 
            path: '#',
            dropdown: [
                { name: 'Residential Interiors', path: '/services/residential' },
                { name: 'Commercial Interiors', path: '/services/commercial' }
            ]
        },
        { name: 'About', path: '/about' },
        { name: 'The Journal', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ]

    return (
        <nav
            ref={navRef}
            className="relative z-50 w-full"
            style={{
                backgroundImage: `url(${headerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom'
            }}
        >
            <div className="max-w-[1800px] mx-auto px-8 lg:px-16 h-24 lg:h-32 flex items-center justify-between border-b border-white/5">
                {/* Logo Branding */}
                <Link to="/" className="group flex items-center gap-3 select-none" aria-label="INTERIQ Interiors Home">
                    <img 
                        src={brandLogo} 
                        alt="INTERIQ Interiors - Luxury Design Excellence" 
                        className="h-14 lg:h-24 w-auto object-contain brightness-110 contrast-110 hover:scale-105 transition-transform duration-500"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div 
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`relative text-[14px] lg:text-[16px] font-light tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                                        location.pathname === link.path ? 'text-white' : 'text-white/80 hover:text-white'
                                    }`}
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {link.name}
                                    {link.dropdown && (
                                        <motion.svg 
                                            animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                                            className="w-3 h-3 opacity-40 ml-0.5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    )}
                                </Link>

                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full -left-4 w-60 bg-[#0d0d0d] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-4 py-4 px-2 overflow-hidden rounded-[2px]"
                                        >
                                            {link.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="block px-6 py-3 text-[12px] uppercase tracking-[0.1em] text-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-300 rounded-sm"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        to="/book-consultation"
                        className="ml-4 inline-flex items-center justify-center px-8 lg:px-10 py-3 lg:py-4 border border-[#c9a961]/40 text-white hover:bg-[#c9a961] hover:text-black hover:border-[#c9a961] transition-all duration-500 text-[13px] uppercase tracking-[0.2em] font-medium"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Book Consultation
                    </Link>
                </div> 

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-white p-2 relative z-[60]"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    <motion.div
                        animate={isOpen ? "open" : "closed"}
                        className="w-7 h-6 flex flex-col justify-center gap-2"
                    >
                        <motion.span 
                            variants={{
                                closed: { rotate: 0, y: 0, width: "100%" },
                                open: { rotate: 45, y: 4, width: "100%" }
                            }}
                            className="h-[1px] bg-white block"
                        />
                        <motion.span 
                            variants={{
                                closed: { opacity: 1, x: 0 },
                                open: { opacity: 0, x: 20 }
                            }}
                            className="h-[1px] bg-white block"
                        />
                        <motion.span 
                            variants={{
                                closed: { rotate: 0, y: 0, width: "60%" },
                                open: { rotate: -45, y: -5, width: "100%" }
                            }}
                            className="h-[1px] bg-white block ml-auto"
                        />
                    </motion.div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 90% 5%)' }}
                        animate={{ clipPath: 'circle(150% at 90% 5%)' }}
                        exit={{ clipPath: 'circle(0% at 90% 5%)' }}
                        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed inset-0 bg-[#050505] z-[60] lg:hidden flex flex-col p-8"
                    >
                        {/* Close Button */}
                        <div className="flex justify-between items-center mb-16">
                            <span 
                                className="text-white text-3xl tracking-[0.1em]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                INTERIQ
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white p-3 relative z-[70]"
                                aria-label="Close menu"
                            >
                                <div className="w-8 h-8 relative flex items-center justify-center">
                                    <span className="absolute w-full h-[1px] bg-white rotate-45"></span>
                                    <span className="absolute w-full h-[1px] bg-white -rotate-45"></span>
                                </div>
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                >
                                    {link.dropdown ? (
                                        <div className="w-full">
                                            <button 
                                                onClick={() => toggleMobileExpanded(link.name)}
                                                className="w-full flex items-center justify-between group py-3"
                                            >
                                                <span 
                                                    className={`text-[36px] uppercase tracking-[0.05em] font-light transition-colors duration-300 ${mobileExpanded === link.name ? 'text-white' : 'text-white/60'}`}
                                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                                >
                                                    {link.name}
                                                </span>
                                                <motion.svg 
                                                    animate={{ rotate: mobileExpanded === link.name ? 180 : 0 }}
                                                    className="w-6 h-6 text-white/40" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                                                </motion.svg>
                                            </button>
                                            
                                            <AnimatePresence>
                                                {mobileExpanded === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden flex flex-col gap-5 mt-4 pl-4 border-l border-white/10"
                                                    >
                                                        {link.dropdown.map((sub) => (
                                                            <Link 
                                                                key={sub.name}
                                                                to={sub.path} 
                                                                onClick={() => setIsOpen(false)}
                                                                className="text-lg uppercase tracking-[0.1em] font-light text-white/40 active:text-white"
                                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className="text-[36px] uppercase tracking-[0.05em] font-light text-white/60 hover:text-white block py-3"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-auto pt-10"
                        >
                            <Link
                                to="/book-consultation"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-6 border border-[#c9a961]/40 text-white font-medium uppercase tracking-[0.2em] text-[13px]"
                            >
                                Book Consultation
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navigation
