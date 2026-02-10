import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

const BookConsultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/consultation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success')
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    serviceType: '',
                    projectType: '',
                    budget: '',
                    timeline: '',
                    message: ''
                })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const inputClasses = "w-full bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-5 text-[16px] font-light focus:border-[#c9a961] focus:bg-black/60 focus:outline-none transition-all duration-300 placeholder:text-white/40"
    
    const selectClasses = "w-full bg-black/40 backdrop-blur-sm border border-white/20 text-white px-6 py-5 text-[16px] font-light focus:border-[#c9a961] focus:bg-black/60 focus:outline-none transition-all duration-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23c9a961%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem] bg-[right_1rem_center] bg-no-repeat pr-12"

    return (
        <div className="bg-black min-h-screen text-white pt-24 lg:pt-32">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-24"
                >
                    <p className="text-[#c9a961] text-[11px] lg:text-[13px] uppercase tracking-[0.6em] font-semibold mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Begin Your Journey
                    </p>
                    <h1 className="text-[64px] lg:text-[120px] font-normal leading-[0.9] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Book a Consultation
                    </h1>
                    <p className="text-white/60 text-[17px] lg:text-[20px] max-w-2xl mx-auto leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Share your vision with us, and we'll craft a personalized approach to transform your space into something extraordinary.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-32">
                    {/* Form Section */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-1"
                    >
                        {submitStatus === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-[#c9a961]/10 to-transparent border border-[#c9a961]/30 p-16 text-center backdrop-blur-sm"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-[#c9a961] to-[#b89851] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#c9a961]/20">
                                    <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-[42px] font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Thank You!
                                </h3>
                                <p className="text-white/60 text-[17px] mb-10 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    We've received your consultation request. Our design team will contact you within 24 hours to discuss your project vision.
                                </p>
                                <button
                                    onClick={() => setSubmitStatus(null)}
                                    className="px-12 py-5 bg-[#c9a961] hover:bg-white text-black font-bold transition-all duration-500 text-[13px] uppercase tracking-[0.3em] shadow-lg shadow-[#c9a961]/30 hover:shadow-xl"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Submit Another Request
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Full Name <span className="text-[#c9a961]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                            placeholder="Arjun Sharma"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Email Address <span className="text-[#c9a961]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                            placeholder="arjun@example.com"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Phone Number <span className="text-[#c9a961]">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                        placeholder="+91 70089 51964"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    />
                                </div>

                                {/* Service Type & Project Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Service Type <span className="text-[#c9a961]">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="serviceType"
                                                value={formData.serviceType}
                                                onChange={handleChange}
                                                required
                                                className={selectClasses}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white/60">Select Service</option>
                                                <option value="residential" className="bg-[#0a0a0a] text-white">Residential Interiors</option>
                                                <option value="commercial" className="bg-[#0a0a0a] text-white">Commercial Interiors</option>
                                                <option value="renovation" className="bg-[#0a0a0a] text-white">Renovation</option>
                                                <option value="consultation" className="bg-[#0a0a0a] text-white">Design Consultation</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Project Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                className={selectClasses}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white/60">Select Type</option>
                                                <option value="fullhome" className="bg-[#0a0a0a] text-white">Full Home Design</option>
                                                <option value="kitchen" className="bg-[#0a0a0a] text-white">Kitchen</option>
                                                <option value="bedroom" className="bg-[#0a0a0a] text-white">Bedroom</option>
                                                <option value="livingroom" className="bg-[#0a0a0a] text-white">Living Room</option>
                                                <option value="office" className="bg-[#0a0a0a] text-white">Office</option>
                                                <option value="other" className="bg-[#0a0a0a] text-white">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget & Timeline */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Budget Range
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className={selectClasses}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white/60">Select Budget</option>
                                                <option value="under50k" className="bg-[#0a0a0a] text-white">Under $50,000</option>
                                                <option value="50k-100k" className="bg-[#0a0a0a] text-white">$50,000 - $100,000</option>
                                                <option value="100k-250k" className="bg-[#0a0a0a] text-white">$100,000 - $250,000</option>
                                                <option value="250k-500k" className="bg-[#0a0a0a] text-white">$250,000 - $500,000</option>
                                                <option value="over500k" className="bg-[#0a0a0a] text-white">Over $500,000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Preferred Timeline
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="timeline"
                                                value={formData.timeline}
                                                onChange={handleChange}
                                                className={selectClasses}
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                <option value="" className="bg-[#0a0a0a] text-white/60">Select Timeline</option>
                                                <option value="asap" className="bg-[#0a0a0a] text-white">As Soon As Possible</option>
                                                <option value="1-3months" className="bg-[#0a0a0a] text-white">1-3 Months</option>
                                                <option value="3-6months" className="bg-[#0a0a0a] text-white">3-6 Months</option>
                                                <option value="6-12months" className="bg-[#0a0a0a] text-white">6-12 Months</option>
                                                <option value="flexible" className="bg-[#0a0a0a] text-white">Flexible</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-white/70 text-[11px] uppercase tracking-[0.25em] mb-4 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        Project Details
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="7"
                                        className={`${inputClasses} resize-none`}
                                        placeholder="Tell us about your vision, style preferences, and any specific requirements..."
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className={`w-full px-14 py-6 ${isSubmitting ? 'bg-white/10 cursor-not-allowed' : 'bg-gradient-to-r from-[#c9a961] to-[#b89851] hover:from-white hover:to-white shadow-xl shadow-[#c9a961]/20 hover:shadow-2xl'} text-black font-bold transition-all duration-500 text-[15px] uppercase tracking-[0.35em]`}
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : 'Request Consultation'}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="lg:pl-16 order-1 lg:order-2"
                    >
                        <h2 className="text-[36px] lg:text-[48px] font-normal mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                            What to Expect
                        </h2>

                        <div className="space-y-10">
                            <div>
                                <div className="flex items-start gap-6 mb-4">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[#c9a961] text-[18px] font-light flex-shrink-0">
                                        01
                                    </div>
                                    <div>
                                        <h3 className="text-[22px] font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Private Design Consultation
                                        </h3>
                                        <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            We'll schedule a detailed discussion to understand your vision, lifestyle, and project requirements.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-start gap-6 mb-4">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[#c9a961] text-[18px] font-light flex-shrink-0">
                                        02
                                    </div>
                                    <div>
                                        <h3 className="text-[22px] font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Concept Development
                                        </h3>
                                        <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Our team will create initial concepts, mood boards, and design proposals tailored to your project.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-start gap-6 mb-4">
                                    <div className="w-12 h-12 border border-[#c9a961] rounded-full flex items-center justify-center text-[#c9a961] text-[18px] font-light flex-shrink-0">
                                        03
                                    </div>
                                    <div>
                                        <h3 className="text-[22px] font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            Curated Design Proposal
                                        </h3>
                                        <p className="text-white/60 text-[15px] leading-relaxed font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            Receive a comprehensive proposal including scope, timeline, and investment details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-16 pt-16 border-t border-white/10">
                            <h3 className="text-[20px] font-semibold mb-8 text-[#c9a961] uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Other Ways to Reach Us
                            </h3>
                            <div className="space-y-4 text-white/60 text-[15px] font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <p>
                                    <span className="text-white/40 uppercase text-[12px] tracking-[0.2em] block mb-2">Email</span>
                                    interiqinteriors@gmail.com


                                </p>
                                <p>
                                    <span className="text-white/40 uppercase text-[12px] tracking-[0.2em] block mb-2">Phone</span>
                                    +91 7008951964
                                </p>
                                <p>
                                    <span className="text-white/40 uppercase text-[12px] tracking-[0.2em] block mb-2">Office Hours</span>
                                    Monday - Friday, 9:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Back to Home CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-20 border-t border-white/10 text-center"
                >
                    <Link
                        to="/"
                        className="text-white/60 hover:text-[#c9a961] text-[13px] uppercase tracking-[0.3em] transition-colors inline-flex items-center gap-3"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        ← Back to Home 
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default BookConsultation
