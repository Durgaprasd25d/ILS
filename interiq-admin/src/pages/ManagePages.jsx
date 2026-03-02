import React from 'react';
import { useNavigate } from 'react-router';
import { Layout, ArrowRight, Eye, Edit3 } from 'lucide-react';
import MainLayout from '../components/MainLayout';

const pageGroups = [
    {
        title: 'Core Experience',
        pages: [
            { id: 'home', name: 'Homepage', description: 'Hero, Philosophy, Curated Sections', sections: 4, icon: Layout },
            { id: 'about', name: 'About Studio', description: 'Studio Intro, Stats, Brand Values', sections: 3, icon: Layout },
            { id: 'contact', name: 'Contact Page', description: 'Hero, Inquiry Form, Studio Details', sections: 4, icon: Layout },
            { id: 'book-consultation', name: 'Consultation', description: 'Hero, Success Message, Process Steps', sections: 5, icon: Layout }
        ]
    },
    {
        title: 'Services Showcase',
        pages: [
            { id: 'services', name: 'Services Overview', description: 'Main area of expertise list', sections: 2, icon: Layout },
            { id: 'services-residential', name: 'Residential Interiors', description: 'Hero, Service Grid, Featured Project', sections: 4, icon: Layout },
            { id: 'services-commercial', name: 'Commercial Interiors', description: 'Hero, Delivery Model, Features', sections: 5, icon: Layout },
            { id: 'services-living-room', name: 'Elegant Living Room', description: 'Project Story, Key Features', sections: 4, icon: Layout }
        ]
    },
    {
        title: 'Portfolio Galleries',
        pages: [
            { id: 'portfolio-residential', name: 'Residential Portfolio', description: 'Full showcase of homes', sections: 3, icon: Layout },
            { id: 'portfolio-commercial', name: 'Commercial Portfolio', description: 'Business & Hospitality workspace', sections: 3, icon: Layout },
            { id: 'penthouse-main', name: 'City Penthouse', description: 'Main project landing page', sections: 4, icon: Layout },
            { id: 'penthouse-kitchen', name: 'Penthouse Kitchen', description: 'Specific project detail', sections: 3, icon: Layout },
            { id: 'penthouse-bedroom', name: 'Penthouse Bedroom', description: 'Specific project detail', sections: 3, icon: Layout }
        ]
    }
];

const ManagePages = () => {
    const navigate = useNavigate();

    return (
        <MainLayout title="Experience Management">
            <div className="max-w-7xl mx-auto py-10 px-6 space-y-16">
                {pageGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-8">
                        <div className="flex items-center gap-6">
                            <h2 className="text-xl font-bold text-primary tracking-[0.2em] uppercase whitespace-nowrap">{group.title}</h2>
                            <div className="h-[1px] w-full bg-white/5"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {group.pages.map((page) => (
                                <div 
                                    key={page.id}
                                    className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col justify-between"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <page.icon className="w-24 h-24" />
                                    </div>
                                    
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                                <page.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">{page.sections} Sections</span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-playfair text-white group-hover:text-primary transition-colors">{page.name}</h3>
                                            <p className="text-white/40 text-xs font-light leading-relaxed line-clamp-2">{page.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-8 relative z-10">
                                        <button 
                                            onClick={() => navigate(`/pages/edit/${page.id}`)}
                                            className="flex-1 bg-white/[0.05] hover:bg-primary hover:text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-white/5"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Configure
                                        </button>
                                        <a 
                                            href={page.id === 'home' ? '/' : `/${page.id.replace(/-/g, '/')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-14 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default ManagePages;
