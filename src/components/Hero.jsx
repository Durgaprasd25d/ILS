import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router'
import heroBg from '../assets/image-01.jpg'

const Hero = () => {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const scale = useTransform(scrollY, [0, 500], [1, 1.1])
    
    const title = "Crafting timeless luxury spaces—built around your lifestyle."
    
    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.02,
            },
        },
    }

    const letter = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        },
    }

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center bg-black">
            {/* Parallax Background */}
            <motion.div 
                style={{ y: y1, scale }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={heroBg}
                    alt="Luxury Interior Design"
                    className="w-full h-full object-cover grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-8 lg:px-20 max-w-[1800px] mx-auto mt-20">
                <div className="max-w-5xl">
                    {/* Animated Headline */}
                    <motion.h1
                        variants={sentence}
                        initial="hidden"
                        animate="visible"
                        className="text-[44px] sm:text-[64px] lg:text-[88px] xl:text-[100px] font-normal text-white leading-[1.05] tracking-tight mb-10"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {title.split(" ").map((word, index) => (
                            <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
                                {word.split("").map((char, charIdx) => (
                                    <motion.span key={charIdx} variants={letter} className="inline-block">
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtext */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="space-y-12"
                    >
                        <p 
                            className="text-white/60 text-[18px] lg:text-[22px] max-w-2xl leading-relaxed font-light"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            INTERIQ INTERIORS designs refined residential and commercial interiors with premium materials, balanced lighting, and timeless detailing.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-10">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/portfolio/residential"
                                    className="inline-flex items-center justify-center px-16 py-6 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em] relative overflow-hidden group shadow-2xl"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    <span className="relative z-10">View Portfolio</span>
                                    <motion.div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-16 py-6 border border-white/20 hover:border-white text-white font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em] backdrop-blur-sm"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Get Quote
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 hidden lg:flex"
            >
                <span className="text-white/30 text-[11px] uppercase tracking-[0.6em] rotate-90 origin-left translate-x-[4px] font-medium">Scroll</span>
                <div className="w-[1px] h-24 bg-gradient-to-b from-[#c9a961] to-transparent"></div>
            </motion.div>
        </section>
    )
}

export default Hero
