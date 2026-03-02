import React from 'react';
import MainLayout from '../components/MainLayout';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';
import api from '../api';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-all group">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-4 rounded-xl bg-${color}/10 text-${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-white/40 text-sm uppercase tracking-widest mb-1">{label}</p>
        <p className="text-4xl font-playfair text-white">{value}</p>
    </div>
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
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    if (loading) {
        return (
            <MainLayout title="Dashboard Overview">
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    const { stats, activity } = data || { stats: {}, activity: [] };

    return (
        <MainLayout title="Dashboard Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard label="Total Blogs" value={stats.blogs || 0} icon={FileText} color="primary" />
                <StatCard label="Inquiries" value={stats.inquiries || 0} icon={Eye} color="blue-500" />
                <StatCard label="Consultations" value={stats.consultations || 0} icon={Users} color="green-500" />
                <StatCard label="Total Visits" value={stats.visits || "0"} icon={TrendingUp} color="purple-500" />
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-xl font-playfair text-white mb-6 tracking-wide">Recent Activity</h3>
                    <div className="space-y-6">
                        {activity.length > 0 ? activity.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                    item.type === 'blog' ? 'bg-primary' : 
                                    item.type === 'inquiry' ? 'bg-blue-500' : 'bg-green-500'
                                }`}></div>
                                <div>
                                    <p className="text-white/80 font-medium text-sm">{item.title}</p>
                                    <p className="text-white/30 text-xs mt-1">{formatTime(item.time)}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-white/30 text-sm">No recent activity found.</p>
                        )}
                    </div>
                </div>

                <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-playfair text-primary mb-4 tracking-wide">Design Vision TIP</h3>
                        <p className="text-white/70 leading-relaxed italic">
                            "Luxury is not about abundance, it's about the precision of space and the narrative of detail. Keep your blog updates focused on quality imagery and clean typography."
                        </p>
                    </div>
                    <div className="absolute bottom-[-20%] right-[-10%] opacity-5 scale-150 rotate-12">
                        <h2 className="text-9xl font-playfair uppercase">INTERIQ</h2>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
