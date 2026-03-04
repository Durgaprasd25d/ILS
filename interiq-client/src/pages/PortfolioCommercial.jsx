import { motion } from 'framer-motion'
import { Link } from 'react-router'
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import img13 from '../assets/image-13.jpg'
import img16 from '../assets/image-16.jpg'
import img20 from '../assets/image-20.jpg'

const commercialProjects = [
    {
        id: 13,
        title: 'Architectural Reception',
        category: 'Hospitality / Office',
        description: 'A grand entry sequence designed to articulate corporate prestige through material honesty and precision lighting.',
        image: img13
    },
    {
        id: 16,
        title: 'Collaborative Excellence',
        category: 'Corporate Workspace',
        description: 'Precision-engineered environments for critical leadership and tactical strategy, balanced with organic textures.',
        image: img16
    },
    {
        id: 20,
        title: 'The Leadership Lounge',
        category: 'Private Club / Hospitality',
        description: 'Sophisticated networking environments that prioritize acoustic intimacy and visual serenity.',
        image: img20
    }
]

const PortfolioCommercial = () => {
    return (
        <div className="pt-24 lg:pt-32 bg-black min-h-screen text-white">
            <SEO 
                title="Commercial Portfolio | Strategic Workplace Design Bhubaneswar | INTERIQ" 
                description="Expert interior design for corporate offices, hospitality spaces, and retail environments. See how INTERIQ defines business excellence through architectural detailing in Odisha." 
                ogTitle="Commercial Interior Architecture | INTERIQ Interiors"
                ogDescription="Transforming workspaces into high-performance environments. View our commercial design portfolio."
                ogUrl="https://interiqinteriors.com/portfolio/commercial"
                canonical="https://interiqinteriors.com/portfolio/commercial"
            />
            <Schema type="BreadcrumbList" data={[
                { name: 'Home', url: 'https://interiqinteriors.com' },
                { name: 'Portfolio', url: 'https://interiqinteriors.com/portfolio/commercial' },
                { name: 'Commercial', url: 'https://interiqinteriors.com/portfolio/commercial' }
            ]} />
            <div className="w-full px-8 lg:px-20 py-16 max-w-[1800px] mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-32"
                >
                    <p className="text-[#c9a961] text-[10px] lg:text-[12px] uppercase tracking-[0.5em] font-medium mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Corporate & Hospitality
                    </p>
                    <h1 className="text-[48px] lg:text-[88px] font-normal leading-[1.05] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Business Refined
                    </h1>
                    <div className="w-24 h-[1px] bg-[#c9a961] mb-10"></div>
                </motion.div>

                {/* Project Showcase - Alternating Layout */}
                <div className="space-y-40 lg:space-y-64">
                    {commercialProjects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
                        >
                            {/* Project Image */}
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 w-full aspect-[16/10] lg:aspect-[3/2] overflow-hidden rounded-sm relative group"
                            >
                                <img 
                                    src={project.image} 
                                    alt={`${project.title} - ${project.category} Design Execution by INTERIQ`} 
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </motion.div>

                            {/* Project Info */}
                            <div className="flex-1 space-y-8">
                                <p className="text-[#c9a961] text-[11px] uppercase tracking-[0.4em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {project.category}
                                </p>
                                <h2 className="text-[32px] lg:text-[56px] font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {project.title}
                                </h2>
                                <p className="text-white/60 text-[18px] leading-relaxed max-w-lg font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {project.description}
                                </p>
                                <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <Link to="/contact" className="inline-flex items-center gap-4 text-[#c9a961] group">
                                        <span className="text-[12px] tracking-[0.2em] font-semibold uppercase">Project Inquiry</span>
                                        <div className="w-12 h-[1px] bg-[#c9a961] transition-all duration-300 group-hover:w-20"></div>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Highlight Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-64 border border-white/5 bg-[#050505] flex flex-col lg:flex-row items-center"
                >
                    <div className="p-12 lg:p-24 flex-1 space-y-8">
                        <h2 className="text-[32px] lg:text-[48px] font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Architectural Excellence for Growth.
                        </h2>
                        <p className="text-white/50 text-lg font-light leading-relaxed max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
                            We design strategic environments that communicate brand values and optimize human performance.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-12 py-5 border border-white/20 text-white hover:bg-white hover:text-black font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.3em]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Request Consultation
                        </Link>
                    </div>
                    <div className="flex-1 w-full aspect-square lg:aspect-auto overflow-hidden">
                        <img 
                            src={img13} 
                            alt="Corporate Interior Excellence and Brand Detailing - INTERIQ Bhubaneswar" 
                            className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-1000"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PortfolioCommercial
