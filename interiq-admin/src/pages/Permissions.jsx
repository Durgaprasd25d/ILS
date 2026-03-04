import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { 
    Search, RefreshCw, Home, Folder, FileText, 
    Image, Layout, Grid, Coffee, Bed, Settings, Info,
    PenTool, LayoutDashboard, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { toast } from 'react-toastify';

const getIcon = (key) => {
    const k = key.toLowerCase();
    if (k.includes('home')) return Home;
    if (k.includes('portfolio') || k.includes('gallery')) return Image;
    if (k.includes('kitchen')) return Coffee;
    if (k.includes('bedroom')) return Bed;
    if (k.includes('service')) return Settings;
    if (k.includes('blog')) return PenTool;
    if (k.includes('contact')) return Folder;
    if (k.includes('dashboard')) return LayoutDashboard;
    if (!k.includes('.')) return Layout;
    return Grid;
};

const PermissionNode = ({ node, allPermissions, onToggle, depth = 0, isLastChild = false }) => {
    const [isOpen, setIsOpen] = useState(true);
    const children = allPermissions.filter(p => p.parentId === node._id);
    const hasChildren = children.length > 0;
    
    // The reference image uses a specific icon for each type. 
    // If it's a root (Home, Services) it has NO icon, just centered text.
    // If it's a leaf/child, it has small thin icons on the left.
    const Icon = getIcon(node.key);
    const isRoot = depth === 0;

    const isActive = node.isEnabled;
    // Base colors matching the reference image exactly
    const activeColor = '#dcb46a'; // Glowing gold
    const inactiveColor = '#3c4053'; // Muted dark blue-gray border
    const textActiveColor = '#ffffff';
    const textInactiveColor = '#8b92a5';
    const bgInactive = '#1e2230'; // Dark blue-gray background
    const bgActive = '#1e2230'; // Same bg, but with gold border
    
    const borderColor = isActive ? activeColor : inactiveColor;

    const Pill = (
        <motion.div 
            className={`
                relative flex items-center gap-4 px-6 py-2 rounded-full border 
                transition-all duration-400 z-10 whitespace-nowrap select-none
                shadow-lg
            `}
            style={{ 
                borderColor: borderColor,
                backgroundColor: bgInactive,
                boxShadow: isActive ? `0 0 15px rgba(220, 180, 106, 0.15)` : 'none',
                minWidth: isRoot ? '180px' : 'auto',
                justifyContent: isRoot ? 'center' : 'flex-start'
            }}
        >
            <div 
                className="flex items-center gap-3 cursor-pointer" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Reference shows icons only for sub-items */}
                {!isRoot && (
                    <Icon className="w-[14px] h-[14px]" style={{ color: isActive ? activeColor : textInactiveColor }} strokeWidth={1.5} />
                )}
                
                <span className="text-[14px] font-medium tracking-wide" style={{ color: isActive ? textActiveColor : textInactiveColor }}>
                    {isRoot ? `/ ${node.label}` : node.label}
                </span>
            </div>

            {/* Optional integrated toggle - if we want it in the pill. The reference image DOES NOT have toggles in the pill, 
                it's just a static diagram structure. But since this is a functional admin panel, we need a way to toggle. 
                We will keep a very minimal, subtle toggle on the far right. */}
            <div 
                onClick={() => onToggle(node._id, !node.isEnabled, hasChildren)}
                className="ml-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <div 
                    className="w-8 h-4 rounded-full flex items-center transition-colors duration-300"
                    style={{ backgroundColor: isActive ? activeColor : '#2a2f42' }}
                >
                    <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                        isActive ? 'translate-x-[18px]' : 'translate-x-[2px]'
                    }`} />
                </div>
            </div>
            
            {/* Dashed outline effect for specific "slug" type nodes shown in reference */}
            {node.key.includes('slug') && (
                <div className="absolute -inset-1 rounded-full border-2 border-dashed" style={{ borderColor: activeColor, opacity: 0.5 }} />
            )}
        </motion.div>
    );

    // SVG Line styles matching the reference exactly
    // Paths are rounded and glowing gold if active, solid muted if inactive
    const PathLine = ({ isVertical, top, left, width, height, glow }) => (
        <div 
            className="absolute rounded-bl-xl"
            style={{
                top, left, width, height,
                borderLeft: isVertical ? `1.5px solid ${glow ? activeColor : inactiveColor}` : 'none',
                borderTop: !isVertical ? `1.5px solid ${glow ? activeColor : inactiveColor}` : 'none',
                borderBottom: isVertical && !height ? `1.5px solid ${glow ? activeColor : inactiveColor}` : 'none',
                zIndex: 0,
                // Add corner rounding logic based on SVG path look
                borderBottomLeftRadius: isVertical && width ? '12px' : '0px',
            }}
        />
    );

    const Dot = ({ top, left, glow }) => (
        <div 
            className="absolute rounded-full z-20"
            style={{
                top, left,
                width: '6px', height: '6px',
                backgroundColor: glow ? activeColor : inactiveColor,
                transform: 'translate(-50%, -50%)',
                boxShadow: glow ? `0 0 8px ${activeColor}` : 'none'
            }}
        />
    );

    if (isRoot) {
        return (
            <div className="flex flex-col items-center relative mb-24 w-full">
                <div className="relative z-10 w-full flex justify-center">
                    {Pill}
                    {hasChildren && isOpen && (
                        <>
                            {/* Line coming straight down from root */}
                            <div 
                                className="absolute left-1/2 top-full w-[1.5px] h-8 -translate-x-1/2 z-0" 
                                style={{ backgroundColor: isActive ? activeColor : inactiveColor }}
                            />
                        </>
                    )}
                </div>

                <AnimatePresence>
                    {hasChildren && isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center relative mt-8 w-full"
                        >
                            <div className="flex gap-16 relative pt-4">
                                {/* The central horizontal connector line */}
                                {children.length > 1 && (
                                    <div 
                                        className="absolute top-0 h-[1.5px] z-0" 
                                        style={{ 
                                            left: 'calc(25% + 0px)', // Precise alignment depends on actual DOM layout
                                            right: 'calc(25% + 0px)',
                                            width: '50%',
                                            transform: 'translateX(50%)',
                                            backgroundColor: isActive ? activeColor : inactiveColor 
                                        }}
                                    />
                                )}

                                {children.map((child, idx) => {
                                    const isLeftChild = idx < children.length / 2;
                                    const isRightChild = idx >= children.length / 2;
                                    
                                    return (
                                        <div key={child._id} className="relative flex flex-col items-center">
                                            {/* Vertical drop down to the child */}
                                            <div 
                                                className="absolute top-0 w-[1.5px] h-4 z-0"
                                                style={{ left: '50%', transform: 'translateX(-50%)', backgroundColor: child.isEnabled ? activeColor : inactiveColor }}
                                            />
                                            {/* Dot on top of child pill */}
                                            <Dot top="16px" left="50%" glow={child.isEnabled} />
                                            
                                            <div className="mt-4">
                                                <PermissionNode 
                                                    node={child} 
                                                    allPermissions={allPermissions} 
                                                    onToggle={onToggle} 
                                                    depth={depth + 1} 
                                                    isLastChild={idx === children.length - 1}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Standard Sub-node (Horizontal tree structure)
    return (
        <div className="flex flex-col relative w-max min-w-[200px] items-start">
            <div className="relative w-max z-10">
                {Pill}
            </div>

            <AnimatePresence>
                {hasChildren && isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col ml-8 pl-8 relative pt-4 overflow-visible"
                    >
                        {/* Main vertical trunk line dropping down from the parent */}
                        <div 
                            className="absolute left-[20px] top-[-10px] w-[1.5px] z-0" 
                            style={{ 
                                bottom: '26px', // Stop above the last child
                                backgroundColor: isActive ? activeColor : inactiveColor 
                            }} 
                        />
                        
                        {children.map((child, idx) => {
                            const isFinal = idx === children.length - 1;
                            return (
                                <div key={child._id} className="relative mb-4 last:mb-0 w-max z-10 flex cursor-pointer">
                                    {/* Horizontal branch line approaching the child pill */}
                                    {isFinal ? (
                                        // The curved L-shape for the very last item
                                        <div 
                                            className="absolute left-[-12px] top-[-26px] w-[28px] h-[46px] rounded-bl-[12px] z-0"
                                            style={{
                                                borderLeft: `1.5px solid ${child.isEnabled ? activeColor : inactiveColor}`,
                                                borderBottom: `1.5px solid ${child.isEnabled ? activeColor : inactiveColor}`
                                            }}
                                        />
                                    ) : (
                                        // Standard horizontal T-junction connector
                                        <div 
                                            className="absolute left-[-12px] top-[20px] w-[16px] h-[1.5px] z-0"
                                            style={{ backgroundColor: child.isEnabled ? activeColor : inactiveColor }}
                                        />
                                    )}

                                    {/* Connector Dot right before the pill */}
                                    <Dot top="20px" left="4px" glow={child.isEnabled} />

                                    <PermissionNode 
                                        node={child} 
                                        allPermissions={allPermissions} 
                                        onToggle={onToggle} 
                                        depth={depth + 1} 
                                        isLastChild={isFinal}
                                    />
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await api.get('/permissions');
            setPermissions(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching permissions:', error);
            if (error.response?.status === 403 || error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
            }
            setPermissions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    const handleToggle = async (id, isEnabled, isSubtree) => {
        try {
            const endpoint = isSubtree ? `toggle-subtree/${id}` : id;
            const response = await api.put(`/permissions/${endpoint}`, { isEnabled });
            
            const updated = response.data;
            if (isSubtree && Array.isArray(updated)) {
                setPermissions(updated);
            } else if (!isSubtree && updated && updated._id) {
                setPermissions(prev => prev.map(p => p._id === id ? updated : p));
            }
            toast.success(isEnabled ? 'Enabled dynamic CMS content' : 'Static Fallback Active');
        } catch (error) {
            console.error('Error updating permission:', error);
            toast.error('Failed to update system');
        }
    };

    const rootNodes = Array.isArray(permissions) ? permissions.filter(p => !p.parentId) : [];
    const filteredRoots = rootNodes.filter(node => 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        node.key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout title="Architecture Control Center">
            <div className="w-full flex flex-col h-full min-h-[80vh] bg-[#121622] rounded-3xl p-8 shadow-2xl">
                {/* Header Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between mx-auto w-full max-w-[1400px]">
                    <div className="relative w-full md:w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                            type="text"
                            placeholder="Search architecture nodes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-[#c9a961]/50 outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={async () => {
                                setIsSyncing(true);
                                try {
                                    const response = await api.post('/permissions/sync');
                                    setPermissions(Array.isArray(response.data) ? response.data : []);
                                    toast.success('System topography synchronized');
                                } catch (error) {
                                    toast.error('Sync failed');
                                } finally {
                                    setTimeout(() => setIsSyncing(false), 1000);
                                }
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/20 text-[#c9a961] hover:bg-[#c9a961]/20 transition-all ${isSyncing ? 'opacity-50' : ''}`}
                        >
                            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                            Sync Registry
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center flex-1">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#c9a961]"></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-32 pb-40 w-full max-w-[1400px] mx-auto overflow-x-auto scroller-hidden">
                        {filteredRoots.length > 0 ? filteredRoots.map(node => (
                            <PermissionNode 
                                key={node._id}
                                node={node}
                                allPermissions={permissions}
                                onToggle={handleToggle}
                                depth={0}
                            />
                        )) : (
                            <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl w-full max-w-lg">
                                <Shield className="w-12 h-12 text-[#c9a961]/30 mx-auto mb-4" />
                                <p className="text-white/40 font-mono text-sm uppercase tracking-widest">No nodes match your query</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <style jsx>{`
                .scroller-hidden::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </MainLayout>
    );
};

export default Permissions;
