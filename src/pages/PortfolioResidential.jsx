import { motion } from 'framer-motion'
import { Link } from 'react-router'
import img04 from '../assets/image-04.jpg'
import img05 from '../assets/image-05.jpg'
import img06 from '../assets/image-06.jpg'
import img07 from '../assets/image-07.jpg'
import img08 from '../assets/image-08.jpg'
import img09 from '../assets/image-09.jpg'
import img10 from '../assets/image-10.jpg'
import img11 from '../assets/image-11.jpg'
import img12 from '../assets/image-12.jpg'

const portfolioItems = [
    { id: 4, src: img04, title: 'The Meridian Residence', category: 'Apartment' },
    { id: 5, src: img05, title: 'The Meridian Residence', category: 'Penthouse' },
    { id: 6, src: img06, title: 'The Meridian Bedroom', category: 'Residential' },
    { id: 7, src: img07, title: 'Private Guest Suite', category: 'Residential' },
    { id: 8, src: img08, title: 'The Horizon Kitchen', category: 'Culinary Space' },
    { id: 9, src: img09, title: 'The Skyline Dining Suite', category: 'Residential' },
    { id: 10, src: img10, title: 'The Grand Entertainment Hall', category: 'Entertainment' },
    { id: 11, src: img11, title: 'The Atelier Wardrobe', category: 'Private Dressing Suite' },
    { id: 12, src: img12, title: 'The Private Spa Sanctuary', category: 'Spa Area' }
]

const PortfolioResidential = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (
        <div className="pt-24 lg:pt-32 bg-black min-h-screen text-white">
            <div className="w-full px-8 lg:px-20 py-16 max-w-[1800px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-24"
                >
                    <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Residential Showcase
                    </p>
                    <h1 className="text-[48px] lg:text-[88px] font-normal leading-[1.05] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Redefining Living
                    </h1>
                    <p className="text-white/60 text-[18px] lg:text-[20px] max-w-2xl leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                        A residence shaped around evening light and panoramic city silence. Designed for hosting, intimacy, and sculptural calm. Refined living spaces designed for the discerning.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {portfolioItems.map((item) => (
                        <motion.div 
                            key={item.id} 
                            variants={itemVariants}
                            className="group relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-white/5 cursor-pointer rounded-sm"
                        >
                            <motion.img 
                                src={item.src} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                            />
                            {/* Overlay Card Style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0">
                                <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-3 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {item.category}
                                </p>
                                <h3 className="text-3xl font-normal text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {item.title}
                                </h3>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    className="h-[1px] bg-white/20 mt-6"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Next Chapter CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 pt-20 border-t border-white/10 text-center"
                >
                    <h2 className="text-[32px] lg:text-[56px] font-normal mb-12 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Begin a Private Consultation
                    </h2>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/contact"
                            className="px-16 py-5 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[14px] uppercase tracking-[0.3em]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Inquire Now
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default PortfolioResidential
