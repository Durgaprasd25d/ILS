import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Save, ArrowLeft, Upload, Loader2, Plus, Trash2, Layout, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { getImageUrl } from '../config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_CONFIG = {
    home: {
        name: 'Homepage',
        sections: [
            { id: 'hero', name: 'Hero Entrance', type: 'form', fields: ['title', 'subtitle', 'btnText', 'btnLink'] },
            { id: 'philosophy', name: 'Design Philosophy', type: 'form', fields: ['label', 'title', 'description'], image: true },
            { id: 'curated', name: 'Curated Spaces', type: 'form', fields: ['label', 'title', 'description'], image: true },
            { id: 'blogs', name: 'Journal Header', type: 'form', fields: ['label', 'title'] }
        ]
    },
    about: {
        name: 'About Studio',
        sections: [
            { id: 'intro', name: 'Studio Intro', type: 'form', fields: ['label', 'title', 'description1', 'description2'], image: true },
            { id: 'stats', name: 'Studio Stats', type: 'list', fields: ['label', 'value'], limit: 4 },
            { id: 'values', name: 'Brand Values', type: 'form', fields: ['title'], listFields: ['precisionTitle', 'precisionText', 'authTitle', 'authText'], image: true }
        ]
    },
    services: {
        name: 'Our Services',
        sections: [
            { id: 'header', name: 'Services Header', type: 'form', fields: ['label', 'title', 'description'] },
            { id: 'items', name: 'Service Offerings', type: 'list', fields: ['label', 'title', 'description'], image: true }
        ]
    },
    'portfolio-residential': {
        name: 'Portfolio: Residential',
        sections: [
            { id: 'header', name: 'Header Section', type: 'form', fields: ['label', 'title', 'description'] },
            { id: 'items', name: 'Portfolio Items', type: 'list', fields: ['category', 'title'], image: true },
            { id: 'cta', name: 'Call to Action', type: 'form', fields: ['title', 'btnText'] }
        ]
    },
    'portfolio-commercial': {
        name: 'Portfolio: Commercial',
        sections: [
            { id: 'header', name: 'Header Section', type: 'form', fields: ['label', 'title'] },
            { id: 'items', name: 'Project List', type: 'list', fields: ['category', 'title', 'description'], image: true },
            { id: 'highlight', name: 'Bottom Highlight', type: 'form', fields: ['title', 'description', 'btnText'], image: true }
        ]
    },
    'penthouse-main': {
        name: 'Project: City View Penthouse',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title', 'description'], image: true },
            { id: 'featured', name: 'Featured Spaces', type: 'form', fields: ['title', 'description'] },
            { id: 'spaces', name: 'Spaces Grid', type: 'list', fields: ['label', 'title', 'description', 'link'], image: true },
            { id: 'cta', name: 'Call to Action', type: 'form', fields: ['title', 'btnText'] }
        ]
    },
    'penthouse-kitchen': {
        name: 'Project Detail: Penthouse Kitchen',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title'], image: true },
            { id: 'content', name: 'Description & Features', type: 'form', fields: ['title', 'text1', 'text2'] },
            { id: 'features', name: 'Key Features List', type: 'list', fields: ['item'] }
        ]
    },
    'penthouse-bedroom': {
        name: 'Project Detail: Penthouse Bedroom',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title'], image: true },
            { id: 'content', name: 'Description & Features', type: 'form', fields: ['title', 'text1', 'text2'] },
            { id: 'features', name: 'Key Features List', type: 'list', fields: ['item'] }
        ]
    },
    'services-residential': {
        name: 'Service: Residential Interiors',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title', 'description'] },
            { id: 'grid', name: 'Service Grid', type: 'list', fields: ['number', 'title', 'description'] },
            { id: 'featured', name: 'Featured Project', type: 'form', fields: ['title', 'label', 'tagline', 'btnText', 'btnLink'], image: true },
            { id: 'cta', name: 'Call to Action', type: 'form', fields: ['title', 'description', 'btnText'] }
        ]
    },
    'services-commercial': {
        name: 'Service: Commercial Interiors',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title', 'description'], image: true },
            { id: 'services', name: 'Services Grid', type: 'list', fields: ['number', 'title', 'description'] },
            { id: 'features', name: 'What We Deliver', type: 'form', fields: ['title', 'text1', 'text2', 'listTitle'] },
            { id: 'deliverables', name: 'Deliverables List', type: 'list', fields: ['item'] },
            { id: 'cta', name: 'Call to Action', type: 'form', fields: ['title', 'description', 'btnText'] }
        ]
    },
    'services-living-room': {
        name: 'Service Detail: Elegant Living Room',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title'], image: true },
            { id: 'content', name: 'Description & Features', type: 'form', fields: ['title', 'text1', 'text2'] },
            { id: 'features', name: 'Key Features List', type: 'list', fields: ['item'] },
            { id: 'cta', name: 'Call to Action', type: 'form', fields: ['title'] }
        ]
    },
    contact: {
        name: 'Contact Page',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title'], image: true },
            { id: 'form', name: 'Form Header', type: 'form', fields: ['title'] },
            { id: 'details', name: 'Contact Details', type: 'form', fields: ['studioTitle', 'address', 'directTitle', 'phone', 'email'] },
            { id: 'socials', name: 'Social Links', type: 'list', fields: ['platform', 'link'] }
        ]
    },
    'book-consultation': {
        name: 'Book Consultation',
        sections: [
            { id: 'hero', name: 'Hero Section', type: 'form', fields: ['label', 'title', 'description'] },
            { id: 'success', name: 'Success Message', type: 'form', fields: ['title', 'text', 'btnText'] },
            { id: 'info', name: 'What to Expect Header', type: 'form', fields: ['title'] },
            { id: 'steps', name: 'Consultation Steps', type: 'list', fields: ['number', 'title', 'text'] },
            { id: 'contact', name: 'Sidebar Contact', type: 'form', fields: ['title', 'email', 'phone', 'hours'] }
        ]
    }
};

const EditPageContent = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const config = PAGE_CONFIG[pageId];
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [sections, setSections] = useState({});
    const [previews, setPreviews] = useState({});
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        if (!config) {
            toast.error('Invalid page configuration');
            navigate('/pages');
            return;
        }
        fetchContent();
        if (config.sections.length > 0) setActiveSection(config.sections[0].id);
    }, [pageId]);

    const fetchContent = async () => {
        try {
            const response = await api.get(`/content/${pageId}`);
            setSections(response.data.sections || {});
            
            // Initialize previews
            const newPreviews = {};
            Object.keys(response.data.sections || {}).forEach(secId => {
                const sec = response.data.sections[secId];
                if (sec.image) {
                    newPreviews[secId] = getImageUrl(sec.image, { width: 800 });
                }
                if (Array.isArray(sec)) {
                    sec.forEach((item, idx) => {
                        if (item.image) {
                            newPreviews[`${secId}_${idx}`] = getImageUrl(item.image, { width: 400 });
                        }
                    });
                }
            });
            setPreviews(newPreviews);
        } catch (error) {
            console.log('No existing content, starting fresh');
            const initial = {};
            config.sections.forEach(s => {
                if (s.type === 'list') initial[s.id] = [];
                else initial[s.id] = {};
            });
            setSections(initial);
        } finally {
            setFetching(false);
        }
    };

    const handleFieldChange = (sectionId, field, value) => {
        setSections(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [field]: value
            }
        }));
    };

    const handleImageUpload = async (sectionId, file, index = null) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            toast.info('Encoding architectural asset...');
            const response = await api.post('/upload', formData, { 
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const imagePath = response.data.featuredImage;
            const previewKey = index !== null ? `${sectionId}_${index}` : sectionId;

            setPreviews(prev => ({ ...prev, [previewKey]: URL.createObjectURL(file) }));

            if (index !== null) {
                const newList = [...sections[sectionId]];
                newList[index] = { ...newList[index], image: imagePath };
                setSections(prev => ({ ...prev, [sectionId]: newList }));
            } else {
                setSections(prev => ({
                    ...prev,
                    [sectionId]: { ...prev[sectionId], image: imagePath }
                }));
            }
            toast.success('Visual sequence integrated');
        } catch (error) {
            toast.error('Asset integration failed');
        }
    };

    const handleListItemChange = (sectionId, index, field, value) => {
        const newList = [...sections[sectionId]];
        newList[index] = { ...newList[index], [field]: value };
        setSections(prev => ({ ...prev, [sectionId]: newList }));
    };

    const addListItem = (sectionId) => {
        const fieldConfig = config.sections.find(s => s.id === sectionId);
        const newItem = {};
        fieldConfig.fields.forEach(f => newItem[f] = '');
        if (fieldConfig.image) newItem.image = '';
        
        setSections(prev => ({
            ...prev,
            [sectionId]: [...(prev[sectionId] || []), newItem]
        }));
    };

    const removeListItem = (sectionId, index) => {
        const newList = sections[sectionId].filter((_, i) => i !== index);
        setSections(prev => ({ ...prev, [sectionId]: newList }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.post(`/content/${pageId}`, { sections });
            toast.success('Experience matrix updated');
            navigate('/pages');
        } catch (error) {
            toast.error('Synchronization failure');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <MainLayout title="Establishing Connection">
            <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
                <div className="relative">
                    <div className="w-24 h-24 border-2 border-primary/10 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-primary rounded-full animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">Syncing Core Intelligence</p>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout title={config.name}>
            <div className="flex flex-col lg:flex-row gap-12 max-w-[1800px] mx-auto pb-24 relative">
                
                {/* Section Navigation Rail */}
                <div className="lg:w-80 space-y-8 sticky top-32 h-fit">
                    <div className="glass-card p-6 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Experience Stack</p>
                        </div>
                        <div className="space-y-2">
                            {config.sections.map(sec => (
                                <button
                                    key={sec.id}
                                    onClick={() => setActiveSection(sec.id)}
                                    className={`
                                        w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group
                                        ${activeSection === sec.id 
                                            ? 'bg-primary/5 border border-primary/20 text-primary shadow-[0_0_20px_rgba(201,169,97,0.05)]' 
                                            : 'text-white/30 hover:text-white hover:bg-white/[0.03] border border-transparent'}
                                    `}
                                >
                                    <span className="text-[11px] uppercase tracking-widest font-bold">{sec.name}</span>
                                    {sections[sec.id] && (
                                        <CheckCircle2 className={`w-3 h-3 ${activeSection === sec.id ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-[2rem] space-y-6 bg-primary/5 border-primary/10">
                        <div className="space-y-3">
                            <h4 className="text-white font-playfair text-lg">Studio Control</h4>
                            <p className="text-white/30 text-[10px] leading-relaxed italic uppercase tracking-wider">Commit changes to update the live production matrix.</p>
                        </div>
                        <button 
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full premium-button rounded-2xl flex items-center justify-center gap-4 group"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span className="group-hover:translate-x-1 transition-transform">Commit Sync</span>
                        </button>
                        <button 
                            onClick={() => navigate('/pages')}
                            className="w-full flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors py-2"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            Release Session
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-12 min-w-0">
                    <AnimatePresence mode="wait">
                        {config.sections.filter(s => s.id === activeSection).map(section => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between gap-6 mb-8 group">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-primary"></div>
                                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em]">Section Configuration</span>
                                        </div>
                                        <h2 className="text-5xl font-playfair text-white tracking-tighter">{section.name}</h2>
                                    </div>
                                    <div className="p-4 rounded-2xl glass-card flex items-center gap-4 text-white/20">
                                        <Layout className="w-5 h-5" />
                                        <span className="text-[10px] uppercase tracking-widest font-black">{section.type} mode</span>
                                    </div>
                                </div>

                                {section.type === 'form' && (
                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                                        <div className="xl:col-span-2 space-y-8 glass-card p-12 rounded-[3rem]">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {section.fields.map(field => (
                                                    <div key={field} className="space-y-3">
                                                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black ml-4">
                                                            {field.replace(/([A-Z])/g, ' $1')}
                                                        </label>
                                                        <input 
                                                            type="text"
                                                            value={sections[section.id]?.[field] || ''}
                                                            onChange={(e) => handleFieldChange(section.id, field, e.target.value)}
                                                            className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-5 px-8 text-sm focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all duration-500 text-white/80 placeholder:text-white/10"
                                                            placeholder={`Define ${field.toLowerCase()}...`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {section.image && (
                                            <div className="space-y-4">
                                                <div 
                                                    className="relative aspect-[4/5] rounded-[3rem] bg-black border border-white/5 flex items-center justify-center overflow-hidden hover:border-primary/40 transition-all duration-700 cursor-pointer group glass-card"
                                                    onClick={() => document.getElementById(`img-${section.id}`).click()}
                                                >
                                                    {previews[section.id] ? (
                                                        <>
                                                            <img src={previews[section.id]} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                                                <div className="p-3 rounded-xl glass-card bg-primary text-black border-none">
                                                                    <ImageIcon className="w-5 h-5" />
                                                                </div>
                                                                <span className="text-[10px] uppercase tracking-widest text-white font-black">Replace Asset</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center p-12">
                                                            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-700">
                                                                <Upload className="w-8 h-8 text-white/10 group-hover:text-primary transition-colors" />
                                                            </div>
                                                            <p className="text-[11px] uppercase font-black tracking-[0.3em] text-white/20">Integrate Visual</p>
                                                        </div>
                                                    )}
                                                    <input 
                                                        id={`img-${section.id}`}
                                                        type="file" hidden accept="image/*"
                                                        onChange={(e) => handleImageUpload(section.id, e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {section.type === 'list' && (
                                    <div className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <AnimatePresence>
                                                {(sections[section.id] || []).map((item, idx) => (
                                                    <motion.div 
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="glass-card p-10 rounded-[3rem] space-y-8 relative group overflow-hidden"
                                                    >
                                                        <button 
                                                            onClick={() => removeListItem(section.id, idx)}
                                                            className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all duration-500 z-20"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        
                                                        <div className="grid grid-cols-1 gap-6">
                                                            {section.fields.map(field => (
                                                                <div key={field} className="space-y-2">
                                                                    <label className="text-[9px] uppercase tracking-widest text-white/20 font-black ml-2">{field}</label>
                                                                    <input 
                                                                        type="text"
                                                                        value={item[field] || ''}
                                                                        onChange={(e) => handleListItemChange(section.id, idx, field, e.target.value)}
                                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-6 text-xs focus:border-primary/30 focus:bg-white/[0.05] outline-none transition-all duration-500 text-white/60 placeholder:text-white/10"
                                                                        placeholder={`Provide ${field}...`}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {section.image && (
                                                            <div className="relative aspect-video rounded-3xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden cursor-pointer group/img"
                                                                onClick={() => document.getElementById(`img-${section.id}-${idx}`).click()}
                                                            >
                                                                {previews[`${section.id}_${idx}`] ? (
                                                                    <img src={previews[`${section.id}_${idx}`]} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000 opacity-60" />
                                                                ) : <Upload className="w-5 h-5 text-white/10" />}
                                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <span className="text-[9px] uppercase tracking-widest text-white font-black">Change Meta Asset</span>
                                                                </div>
                                                                <input id={`img-${section.id}-${idx}`} type="file" hidden onChange={(e) => handleImageUpload(section.id, e.target.files[0], idx)} />
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                        <button 
                                            onClick={() => addListItem(section.id)}
                                            className="w-full py-10 border-2 border-dashed border-white/5 rounded-[3rem] text-white/20 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-700 flex flex-col items-center justify-center gap-4 group"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Incorporate New Entry</span>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
};

export default EditPageContent;
