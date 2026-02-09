import { motion } from 'framer-motion'
import { useState } from 'react'
import img20 from '../assets/image-20.jpg'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Submission Error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

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
                        {submitStatus === 'success' ? (
                            <div className="p-10 border border-[#c9a961]/30 bg-[#c9a961]/5">
                                <h3 className="text-[24px] text-[#c9a961] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Thank You</h3>
                                <p className="text-white/60 font-light">Your inquiry has been sent. We will get back to you shortly.</p>
                                <button onClick={() => setSubmitStatus(null)} className="mt-8 text-[11px] tracking-widest uppercase font-bold text-[#c9a961]">Send Another Inquiry</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all placeholder:text-white/10" 
                                            placeholder="Your Name" 
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all placeholder:text-white/10" 
                                            placeholder="your@email.com" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-[#c9a961] transition-colors font-semibold">Project Narrative</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4" 
                                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#c9a961] outline-none transition-all resize-none placeholder:text-white/10" 
                                        placeholder="Tell us about your vision..."
                                    ></textarea>
                                </div>
                                <motion.button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full lg:w-fit px-20 py-6 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.4em] disabled:opacity-50"
                                >
                                    {isSubmitting ? 'SENDING...' : 'Begin Consultation'}
                                </motion.button>
                                {submitStatus === 'error' && <p className="text-red-500/60 text-[10px] tracking-[0.2em] uppercase">Something went wrong. Please try again.</p>}
                            </form>
                        )}
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
                                B-202, Biraja Complex <br />
                                Bomikhal, Cuttack Road <br />
                                Bhubaneswar, Odisha – 751010 <br />
                                India
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-[#c9a961] text-[10px] uppercase tracking-[0.5em] font-semibold">Direct</h3>
                            <div className="space-y-3">
                                <p className="text-[20px] lg:text-[24px] text-white/60 hover:text-white transition-colors cursor-pointer font-light">+91 7008951964</p>
                                <p className="text-[20px] lg:text-[24px] text-white/60 hover:text-white transition-colors cursor-pointer font-light">interiqinteriors@gmail.com</p>
                            </div>
                        </div>
                        <div className="space-y-6 pt-10 border-t border-white/5">
                            <h3 className="text-[#c9a961] text-[10px] uppercase tracking-[0.5em] font-semibold">Digital Presence</h3>
                            <div className="flex flex-wrap gap-12 text-[11px] tracking-[0.3em] font-bold text-white/40">
                                <a href="https://www.instagram.com/interiqinteriors?igsh=MWYzcDdpOWpjdzh1bQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
                                <a href="https://wa.me/917008951964" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHATSAPP</a>
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
