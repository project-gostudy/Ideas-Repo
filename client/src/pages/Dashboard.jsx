import React, { useEffect, useState } from 'react';
import { Plus, Search, Bell } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, trendUp }) => (
  <div className="card flex-1">
    <div className="flex justify-between items-start mb-4">
       <span className="text-slate-500 font-medium text-sm">{title}</span>
       <span className="p-2 bg-slate-100 rounded-lg text-slate-600">{icon}</span>
    </div>
    <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        {trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  style={{ backgroundColor: trendUp ? 'var(--status-completed-bg)' : '#FEE2E2', color: trendUp ? 'var(--status-completed-text)' : '#B91C1C' }}>
                {trend}
            </span>
        )}
    </div>
  </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0 });
    const [pinnedIdeas, setPinnedIdeas] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/api/stats')
            .then(res => res.json())
            .then(data => {
                if(data.data) setStats(data.data);
            })
            .catch(err => console.error("Failed to fetch stats", err));

        fetch('http://localhost:3001/api/ideas?pinned=true')
            .then(res => res.json())
            .then(data => {
                if(data.data) setPinnedIdeas(data.data);
            })
            .catch(err => console.error("Failed to fetch pinned", err));
    }, []);


    return (
        <div>
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Good Morning, Lorenzo</h1>
                <p className="text-slate-500">You have <span className="font-semibold text-blue-600">{stats.inProgress} ideas</span> in progress waiting for your review.</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-10">
                <StatCard 
                    title="Total Ideas" 
                    value={stats.total} 
                    icon="💡" 
                    trend="+3 this week" 
                    trendUp={true} 
                />
                <StatCard 
                    title="In Progress" 
                    value={stats.inProgress} 
                    icon="⚡" 
                />
                <StatCard 
                    title="Completed" 
                    value={stats.completed} 
                    icon="✅" 
                    trend="+10%" 
                    trendUp={true} 
                />
            </div>
            
            {/* Recent Section Placeholder */}
             <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    📌 Pinned Ideas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pinnedIdeas.length > 0 ? pinnedIdeas.map(idea => (
                        <div key={idea.id} className="card cursor-pointer hover:shadow-md transition-all" onClick={() => window.location.href=`/ideas/${idea.id}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="badge" style={{backgroundColor: '#DBEAFE', color: '#1D4ED8'}}>{idea.category || 'Idea'}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{idea.content}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs text-slate-400">Updated {new Date(idea.updated_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-400 col-span-2">No pinned ideas yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
