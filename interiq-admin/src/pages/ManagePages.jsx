import React from 'react';
import { useNavigate } from 'react-router';
import { Layout, ArrowRight, Eye, Edit3, Compass, Brush, PenTool, Layers } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';

const pageGroups = [
    {
        title: 'Core Experience',
        description: 'Manage the foundational journey of your studio.',
        pages: [
            { id: 'home', name: 'Homepage', description: 'Hero, Philosophy, Curated Sections', sections: 4, icon: Compass },
            { id: 'about', name: 'About Studio', description: 'Studio Intro, Stats, Brand Values', sections: 3, icon: Brush },
            { id: 'contact', name: 'Contact Page', description: 'Hero, Inquiry Form, Studio Details', sections: 4, icon: PenTool },
            { id: 'book-consultation', name: 'Consultation', description: 'Hero, Success Message, Process Steps', sections: 5, icon: Layers }
        ]
    },
    {
        title: 'Services Showcase',
        description: 'Define your architectural and design expertise.',
        pages: [
            { id: 'services', name: 'Services Overview', description: 'Main area of expertise list', sections: 2, icon: Brush },
            { id: 'services-residential', name: 'Residential Interiors', description: 'Hero, Service Grid, Featured Project', sections: 4, icon: Compass },
            { id: 'services-commercial', name: 'Commercial Interiors', description: 'Hero, Delivery Model, Features', sections: 5, icon: Compass },
            { id: 'services-living-room', name: 'Elegant Living Room', description: 'Project Story, Key Features', sections: 4, icon: Brush }
        ]
    },
    {
        title: 'Portfolio Galleries',
        description: 'Curate your showcase of executed visions.',
        pages: [
            { id: 'portfolio-residential', name: 'Residential Portfolio', description: 'Full showcase of homes', sections: 3, icon: PenTool },
            { id: 'portfolio-commercial', name: 'Commercial Portfolio', description: 'Business & Hospitality workspace', sections: 3, icon: PenTool },
            { id: 'penthouse-main', name: 'City Penthouse', description: 'Main project landing page', sections: 4, icon: Compass },
            { id: 'penthouse-kitchen', name: 'Penthouse Kitchen', description: 'Specific project detail', sections: 3, icon: Brush },
            { id: 'penthouse-bedroom', name: 'Penthouse Bedroom', description: 'Specific project detail', sections: 3, icon: Brush }
        ]
    }
];

const ManagePages = () => {
    const navigate = useNavigate();

    return (
        <MainLayout title="Experience Management">
            <div className="max-w-[1600px] mx-auto space-y-24 pb-24">
                {pageGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Group 0{groupIdx + 1}</span>
                                    <div className="w-8 h-[1px] bg-primary/30"></div>
                                </div>
                                <h2 className="text-4xl font-playfair text-white tracking-tight">{group.title}</h2>
                                <p className="text-white/30 text-sm font-light tracking-wide">{group.description}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {group.pages.map((page, pIdx) => (
                                <motion.div 
                                    key={page.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: pIdx * 0.1 }}
                                    className="glass-card rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden"
                                >
                                    <div className="absolute -top-12 -right-12 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 rotate-12 group-hover:rotate-0">
                                        <page.icon className="w-48 h-48" />
                                    </div>

                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                                <page.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black">Structure</span>
                                                <span className="text-[11px] uppercase tracking-widest text-primary font-bold">{page.sections} Sections</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-playfair text-white tracking-wide leading-tight group-hover:text-primary transition-colors duration-500">{page.name}</h3>
                                            <p className="text-white/30 text-xs font-light leading-relaxed line-clamp-2 italic">"{page.description}"</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-12 relative z-10">
                                        <button 
                                            onClick={() => navigate(`/pages/edit/${page.id}`)}
                                            className="flex-1 premium-button rounded-2xl flex items-center justify-center gap-3"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Configure
                                        </button>
                                        <a 
                                            href={page.id === 'home' ? '/' : `/${page.id.replace(/-/g, '/')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-14 h-14 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:text-white transition-all duration-500"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default ManagePages;
