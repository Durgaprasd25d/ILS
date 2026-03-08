import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Schema from '../components/Schema'
import founderImg from '../assets/founder.jpg'
import teamImg from '../assets/image-18.jpg'
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router'

const Founder = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const staggeredContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    return (
        <div className="pt-20 lg:pt-32 bg-black min-h-screen text-white overflow-hidden selection:bg-[#c9a961] selection:text-black">
            <SEO 
                title="Founder's Vision | INTERIQ Interiors" 
                description="INTERIQ Interiors was founded with a vision to redefine luxury interior design in Bhubaneswar." 
                ogTitle="Founder's Vision | INTERIQ Interiors"
                ogDescription="We are a premium interior design and execution company committed to delivering high-end residential interiors."
                ogUrl="https://interiqinteriors.com/founder"
                canonical="https://interiqinteriors.com/founder"
            />
            <Schema type="BreadcrumbList" data={[
                { name: 'Home', url: 'https://interiqinteriors.com' },
                { name: "Founder's Vision", url: 'https://interiqinteriors.com/founder' }
            ]} />

            <div className="w-full px-6 lg:px-20 py-12 lg:py-16 max-w-[1800px] mx-auto">
                
                {/* 6. FOUNDER'S VISION */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-32 items-center mb-24 lg:mb-32">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex-1 space-y-6 lg:space-y-10"
                    >
                        <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] font-semibold font-inter">
                            FOUNDER'S VISION
                        </p>
                        <h1 className="text-4xl lg:text-[64px] font-normal leading-[1.2] lg:leading-[1.1] font-playfair mb-6 lg:mb-8">
                            Redefining luxury <br /> interior design
                        </h1>
                        <div className="space-y-6 text-white/70 text-[18px] leading-relaxed font-light font-inter">
                            <p>
                                INTERIQ Interiors was founded with a vision to redefine luxury interior design in Bhubaneswar. Our founder believed that interiors should not just look beautiful — they should elevate lifestyle.
                            </p>
                            <p>
                                With a strong passion for architecture and design, the foundation of INTERIQ was built on creativity, transparency, and excellence in execution.
                            </p>
                            <p>
                                Every project reflects our founder’s commitment to quality, premium detailing, and customer satisfaction.
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="flex-1 w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm relative group"
                    >
                        {/* Using placeholder until founder.jpg is populated */}
                        <img 
                            src={founderImg} 
                            onError={(e) => { e.target.src = '/vite.svg' }} // fallback to prevent 404
                            alt="Founder of INTERIQ Interiors" 
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </motion.div>
                </div>

                {/* 2. WHO WE ARE */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mb-24 lg:mb-40 pt-16 lg:pt-20 border-t border-white/5 text-center max-w-4xl mx-auto"
                >
                    <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold font-inter">WHO WE ARE</p>
                    <div className="space-y-6 text-white/50 text-lg lg:text-xl font-light leading-relaxed">
                        <p>
                            We are a premium interior design and execution company committed to delivering high-end residential interiors with transparency, quality, and attention to detail.
                        </p>
                        <p>
                            INTERIQ Interiors is driven by creativity, professionalism, and a passion for building spaces that inspire everyday living.
                        </p>
                    </div>
                </motion.div>

                {/* TEAM SECTION (Button/Bottom) */}
                <div className="mb-24 lg:mb-40 pt-16 lg:pt-20 border-t border-white/5">
                    <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-8 lg:mb-12 font-semibold font-inter text-center lg:text-left">TEAM SECTION</p>
                    <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="flex-1 w-full aspect-video overflow-hidden rounded-sm relative group"
                        >
                            <img 
                                src={teamImg} 
                                onError={(e) => { e.target.src = '/vite.svg' }} // fallback to prevent broken layout
                                alt="INTERIQ Team" 
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </motion.div>
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left"
                        >
                            <h2 className="text-3xl lg:text-5xl font-playfair">Meet the Team</h2>
                            <p className="text-white/60 text-lg lg:text-xl font-light leading-relaxed">
                                Our designers, craftsmen, and project managers work together to deliver flawless execution. Every project is handled with care, creativity, and professionalism.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* TRUST SECTION & 4. WHERE WE SERVE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-24 lg:mb-40 border-t border-white/5 pt-16 lg:pt-20">
                    
                    {/* TRUST SECTION */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggeredContainer}
                        className="space-y-8 lg:space-y-12 p-8 lg:p-12 bg-[#050505] border border-white/5 rounded-sm"
                    >
                        <div>
                            <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold font-inter">TRUST SECTION</p>
                            <h2 className="text-3xl lg:text-4xl font-playfair mb-10">Why Clients Choose INTERIQ</h2>
                            <div className="space-y-6">
                                {[
                                    "Personalized luxury design",
                                    "Premium materials",
                                    "Transparent pricing",
                                    "On-time project delivery",
                                    "End-to-end execution"
                                ].map((item, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        variants={fadeUp}
                                        className="flex items-center gap-4 text-white/70"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-[#c9a961]" />
                                        <span className="text-lg font-light">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. WHERE WE SERVE */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="bg-[#050505] p-8 lg:p-12 rounded-sm border border-white/5"
                    >
                        <MapPin className="w-10 h-10 text-[#c9a961] mb-8" />
                        <h2 className="text-3xl lg:text-4xl font-playfair mb-6">WHERE WE SERVE</h2>
                        <p className="text-white/60 mb-8 font-light text-lg">We proudly serve clients across:</p>
                        <ul className="space-y-4 text-white/80 font-light text-lg list-disc list-inside mb-10 pl-2 marker:text-[#c9a961]">
                            <li>Bhubaneswar</li>
                            <li>Cuttack</li>
                            <li>Khordha</li>
                            <li>Puri</li>
                            <li>Other major cities in Odisha</li>
                        </ul>
                        <p className="pt-8 border-t border-white/5 text-white/50 font-light">
                            We specialize in residential apartments, villas, and premium housing projects in and around Bhubaneswar.
                        </p>
                    </motion.div>

                </div>

                {/* 5. HOW TO CONTACT US */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-[#c9a961] text-black p-8 lg:p-20 rounded-sm mb-20 lg:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
                >
                    <div className="space-y-10">
                        <p className="text-black/60 text-[10px] uppercase tracking-[0.4em] font-bold font-inter">HOW TO CONTACT US</p>
                        <h2 className="text-4xl lg:text-6xl font-playfair">Contact Us</h2>
                        <p className="text-black/70 font-medium text-lg max-w-sm">
                            You can also fill out our consultation form for a free design discussion
                        </p>
                        <Link 
                            to="/book-consultation"
                            className="flex justify-center lg:inline-flex items-center gap-3 text-white bg-black px-8 py-4 font-bold uppercase tracking-[0.1em] text-[12px] group hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 w-full lg:w-auto"
                        >
                            Consultation Form <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-8 font-inter text-lg">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl pt-1">📞</span>
                            <div>
                                <p className="font-bold">Phone</p>
                                <p>7008951964</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl pt-1">☎</span>
                            <div>
                                <p className="font-bold">Office</p>
                                <p>0674-4525580</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl pt-1">📍</span>
                            <div>
                                <p className="font-bold">Address</p>
                                <p>B-202, Biraja Complex, Bomikhal</p>
                                <p>Cuttack Road, Bhubaneswar, Odisha</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">📩</span>
                            <div>
                                <span className="font-bold mr-2">Email:</span>
                                <span>interiqinteriors@gmail.com</span>
                            </div>
                        </div>
                        <div className="pt-4 lg:pt-6">
                            <a 
                                href="https://wa.me/917008951964" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex justify-center lg:inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.1em] text-[13px] hover:brightness-110 transition-all duration-300 shadow-lg w-full lg:w-auto"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                WhatsApp Button
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Founder
