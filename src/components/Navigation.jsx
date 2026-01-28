import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileExpanded = (name) => {
        setMobileExpanded(mobileExpanded === name ? null : name)
    }

    const navLinks = [
        { 
            name: 'Portfolio', 
            path: '#',
            dropdown: [
                { name: 'Residential', path: '/portfolio/residential' },
                { name: 'Commercial / Hospitality', path: '/portfolio/commercial' }
            ]
        },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ]

    // Magnetic Button Hook Logics
    const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 })
    const handleMagneticMove = (e) => {
        const { clientX, clientY, currentTarget } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        setMagneticPos({ x: x * 0.3, y: y * 0.3 })
    }
    const resetMagnetic = () => setMagneticPos({ x: 0, y: 0 })

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                scrolled ? 'py-4' : 'py-8'
            }`}
        >
            {/* Nav Background with Sophisticated Glassmorphism */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
                <div className="glass w-full h-full" />
            </div>

            <div className="relative z-10 max-w-[1800px] mx-auto px-8 lg:px-16 flex items-center justify-between">
                {/* Logo Branding */}
                <Link to="/" className="group flex flex-col items-start select-none">
                    <motion.span 
                        className="text-white text-3xl lg:text-4xl tracking-[0.1em] leading-none block transition-all duration-300"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        whileHover={{ opacity: 0.7 }}
                    >
                        INTERIQ
                    </motion.span>
                    <span 
                        className="text-[#c9a961] text-[10px] lg:text-[11px] tracking-[0.5em] mt-1 uppercase font-light transition-opacity duration-300 group-hover:opacity-60"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Interiors
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-12">
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <div 
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`relative text-[13px] uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-1 ${
                                        location.pathname === link.path ? 'text-[#c9a961]' : 'text-white/60 hover:text-white'
                                    }`}
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {link.name}
                                    {link.dropdown && (
                                        <motion.svg 
                                            animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                                            className="w-3 h-3 opacity-60" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    )}
                                    <motion.div 
                                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#c9a961] origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                    />
                                </Link>

                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute top-full -left-4 w-64 glass-dark shadow-2xl mt-4 py-6 px-2 overflow-hidden"
                                        >
                                            {link.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="block px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
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

                    {/* Book Consultation Button with Magnetic Effect */}
                    <motion.div
                        onMouseMove={handleMagneticMove}
                        onMouseLeave={resetMagnetic}
                        animate={{ x: magneticPos.x, y: magneticPos.y }}
                        transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
                    >
                        <Link
                            to="/contact"
                            className="px-8 py-3.5 border border-[#c9a961] text-[#c9a961] text-[12px] uppercase tracking-[0.25em] font-semibold hover:bg-[#c9a961] hover:text-black transition-all duration-500 block relative overflow-hidden group"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <span className="relative z-10">Book Consultation</span>
                            <motion.div 
                                className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" 
                            />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-white p-2 relative z-[60]"
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

            {/* Mobile Menu Overlay - Circular Reveal Style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 90% 5%)' }}
                        animate={{ clipPath: 'circle(150% at 90% 5%)' }}
                        exit={{ clipPath: 'circle(0% at 90% 5%)' }}
                        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed inset-0 bg-[#0a0a0a] z-[60] lg:hidden flex flex-col p-8"
                    >
                        {/* Close Button */}
                        <div className="flex justify-between items-center mb-16">
                            <span 
                                className="text-white text-2xl tracking-[0.1em]"
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
                                    <span className="absolute w-full h-[2px] bg-white rotate-45"></span>
                                    <span className="absolute w-full h-[2px] bg-white -rotate-45"></span>
                                </div>
                            </button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                >
                                    {link.dropdown ? (
                                        <div className="w-full">
                                            <button 
                                                onClick={() => toggleMobileExpanded(link.name)}
                                                className="w-full flex items-center justify-between group py-2"
                                            >
                                                <span 
                                                    className={`text-[42px] uppercase tracking-[0.1em] font-light transition-colors duration-300 ${mobileExpanded === link.name ? 'text-[#c9a961]' : 'text-white/80'}`}
                                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                                >
                                                    {link.name}
                                                </span>
                                                <motion.svg 
                                                    animate={{ rotate: mobileExpanded === link.name ? 180 : 0 }}
                                                    className="w-8 h-8 text-[#c9a961]" 
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
                                                        className="overflow-hidden flex flex-col gap-6 mt-6 pl-4 border-l border-[#c9a961]/30"
                                                    >
                                                        {link.dropdown.map((sub) => (
                                                            <Link 
                                                                key={sub.name}
                                                                to={sub.path} 
                                                                onClick={() => setIsOpen(false)}
                                                                className="text-xl uppercase tracking-[0.2em] font-light text-white/40 active:text-[#c9a961]"
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
                                            className="text-[42px] uppercase tracking-[0.1em] font-light text-white/80 hover:text-white block py-2"
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
                            className="mt-auto space-y-8"
                        >
                            <div className="h-[1px] w-full bg-white/10" />
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center py-6 bg-[#c9a961] text-black font-bold uppercase tracking-[0.4em] text-[13px]"
                            >
                                Book Consultation
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navigation
