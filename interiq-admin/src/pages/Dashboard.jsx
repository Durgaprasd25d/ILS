import React from 'react';
import MainLayout from '../components/MainLayout';
import { FileText, Users, Eye, TrendingUp, ArrowUpRight, Activity, Zap, Clock } from 'lucide-react';
import api from '../api';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
            <Icon className="w-24 h-24 rotate-12" />
        </div>
        
        <div className="flex items-center justify-between mb-8">
            <div className={`p-4 rounded-2xl bg-${color}/10 border border-${color}/20 text-${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{trend}</span>
                </div>
            )}
        </div>

        <div className="space-y-1">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">{label}</p>
            <div className="flex items-end gap-3">
                <p className="text-5xl font-playfair text-white">{value}</p>
                <div className="pb-1">
                    <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
                </div>
            </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </motion.div>
);

const Dashboard = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatTime = (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    if (loading) {
        return (
            <MainLayout title="Overview">
                <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-primary/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-primary rounded-full animate-spin"></div>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black animate-pulse">Syncing System Stats</p>
                </div>
            </MainLayout>
        );
    }

    const { stats, activity } = data || { stats: {}, activity: [] };

    return (
        <MainLayout title="Studio Intelligence">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard label="Live Editorials" value={stats.blogs || 0} icon={FileText} color="primary" trend="+12%" />
                <StatCard label="Active Inquiries" value={stats.inquiries || 0} icon={Zap} color="blue-400" trend="New" />
                <StatCard label="Client Requests" value={stats.consultations || 0} icon={Users} color="green-400" trend="+4" />
                <StatCard label="Global Traffic" value={stats.visits || "0"} icon={Activity} color="purple-400" trend="Live" />
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                <Activity className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-2xl font-playfair text-white tracking-wide">Flow of Operations</h3>
                        </div>
                        <button className="text-[10px] uppercase tracking-widest text-primary font-black hover:text-white transition-colors">View All Streams</button>
                    </div>

                    <div className="space-y-8">
                        {activity.length > 0 ? activity.map((item, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(201,169,97,0.3)] transition-all duration-500 group-hover:scale-150 ${
                                        item.type === 'blog' ? 'bg-primary' : 
                                        item.type === 'inquiry' ? 'bg-blue-400' : 'bg-green-400'
                                    }`}></div>
                                    <div className="w-[1px] h-12 bg-white/5 group-last:hidden"></div>
                                </div>
                                <div className="flex-1 pb-8 border-b border-white/5 group-last:border-none">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors">{item.title}</p>
                                        <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            {formatTime(item.time)}
                                        </div>
                                    </div>
                                    <p className="text-white/30 text-xs font-light tracking-wide leading-relaxed">System event recorded in {item.type} interaction module.</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
                                <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-black">No Operations Recorded</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Insight/Tip Card */}
                <div className="space-y-8">
                    <div className="glass-card p-10 rounded-[2.5rem] bg-primary/5 border-primary/20 relative overflow-hidden h-full flex flex-col justify-between">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-8">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-playfair text-white mb-6 leading-tight">Curation <br />Intelligence</h3>
                            <p className="text-white/40 leading-relaxed italic text-sm font-light">
                                "The essence of INTERIQ lies in the restraint of design. As you manage content, prioritize high-fidelity assets and surgical precision in copy."
                            </p>
                        </div>
                        
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">Studio Status</span>
                                <span className="text-[10px] text-green-500 uppercase tracking-widest font-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Operational
                                </span>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] scale-150 rotate-12 pointer-events-none select-none">
                            <h2 className="text-[10rem] font-playfair uppercase">IQ</h2>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
