import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Save, ArrowLeft, Upload, Loader2, Plus, Trash2, Layout } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import api from '../api';
import { toast } from 'react-toastify';

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

    useEffect(() => {
        if (!config) {
            toast.error('Invalid page configuration');
            navigate('/pages');
            return;
        }
        fetchContent();
    }, [pageId]);

    const fetchContent = async () => {
        try {
            const response = await api.get(`/content/${pageId}`);
            setSections(response.data.sections || {});
            
            // Initialize previews for existing images
            const newPreviews = {};
            Object.keys(response.data.sections || {}).forEach(secId => {
                const sec = response.data.sections[secId];
                if (sec.image) {
                    newPreviews[secId] = `${import.meta.env.VITE_IMAGE_BASE_URL}${sec.image}`;
                }
                if (Array.isArray(sec)) {
                    sec.forEach((item, idx) => {
                        if (item.image) {
                            newPreviews[`${secId}_${idx}`] = `${import.meta.env.VITE_IMAGE_BASE_URL}${item.image}`;
                        }
                    });
                }
            });
            setPreviews(newPreviews);
        } catch (error) {
            console.log('No existing content, starting fresh');
            // Initialize empty sections based on config
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
            toast.info('Uploading imagery...');
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
            toast.success('Asset integrated');
        } catch (error) {
            toast.error('Upload failed');
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
            toast.success(`${config.name} context updated successfully`);
            navigate('/pages');
        } catch (error) {
            toast.error('Failed to sync changes');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <MainLayout title="Establishing Context">
        <div className="flex h-[60vh] items-center justify-center text-primary font-playfair text-2xl animate-pulse uppercase tracking-widest">
            Synchronizing with Core Content...
        </div>
    </MainLayout>;

    return (
        <MainLayout title={`Editing ${config.name}`}>
            <div className="max-w-6xl mx-auto pb-20 space-y-12">
                <div className="flex items-center justify-between sticky top-4 z-50 bg-luxury-black/80 backdrop-blur-xl p-4 rounded-3xl border border-white/5 shadow-2xl">
                    <button 
                        onClick={() => navigate('/pages')}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase text-[10px] tracking-[0.3em] font-bold ml-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Pages Menu
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-primary hover:bg-primary-dark text-black font-extrabold py-3 px-10 rounded-2xl transition-all shadow-lg flex items-center gap-3 text-xs tracking-[0.2em] uppercase"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Commit Changes
                    </button>
                </div>

                {config.sections.map((section) => (
                    <div key={section.id} className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex items-center gap-4 bg-white/[0.01]">
                            <Layout className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-playfair text-white">{section.name}</h3>
                        </div>

                        <div className="p-8 space-y-8">
                            {section.type === 'form' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        {section.fields.map(field => (
                                            <div key={field} className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">{field.replace(/([A-Z])/g, ' $1')}</label>
                                                <input 
                                                    type="text"
                                                    value={sections[section.id]?.[field] || ''}
                                                    onChange={(e) => handleFieldChange(section.id, field, e.target.value)}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-6 text-sm focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {section.image && (
                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Atmospheric Imagery</label>
                                            <div 
                                                className="relative aspect-video rounded-2xl bg-black border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden hover:border-primary/40 transition-all cursor-pointer group"
                                                onClick={() => document.getElementById(`img-${section.id}`).click()}
                                            >
                                                {previews[section.id] ? (
                                                    <img src={previews[section.id]} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                ) : (
                                                    <div className="text-center text-white/20">
                                                        <Upload className="w-8 h-8 mx-auto mb-2" />
                                                        <p className="text-[10px] uppercase font-bold tracking-widest">Integrate Visual</p>
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
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(sections[section.id] || []).map((item, idx) => (
                                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4 relative group">
                                                <button 
                                                    onClick={() => removeListItem(section.id, idx)}
                                                    className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                
                                                {section.fields.map(field => (
                                                    <div key={field} className="space-y-1">
                                                        <label className="text-[9px] uppercase tracking-widest text-white/20 font-bold">{field}</label>
                                                        <input 
                                                            type="text"
                                                            value={item[field] || ''}
                                                            onChange={(e) => handleListItemChange(section.id, idx, field, e.target.value)}
                                                            className="w-full bg-luxury-black border border-white/5 rounded-lg py-3 px-4 text-xs focus:border-primary min-h-[44px] outline-none transition-all"
                                                        />
                                                    </div>
                                                ))}

                                                {section.image && (
                                                    <div className="pt-2">
                                                        <div 
                                                            className="aspect-video rounded-lg bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative cursor-pointer"
                                                            onClick={() => document.getElementById(`img-${section.id}-${idx}`).click()}
                                                        >
                                                            {previews[`${section.id}_${idx}`] ? (
                                                                <img src={previews[`${section.id}_${idx}`]} className="w-full h-full object-cover" />
                                                            ) : <Upload className="w-4 h-4 text-white/10" />}
                                                            <input id={`img-${section.id}-${idx}`} type="file" hidden onChange={(e) => handleImageUpload(section.id, e.target.files[0], idx)} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => addListItem(section.id)}
                                        className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-white/20 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Incorporate Entry
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default EditPageContent;
