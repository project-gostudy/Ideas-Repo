import React, { useEffect, useState } from 'react';
import IdeaCard from '../components/IdeaCard';

const AllIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Fetch ideas
    fetch('http://localhost:3001/api/ideas')
        .then(res => res.json())
        .then(data => {
            if(data.data) setIdeas(data.data);
        })
        .catch(err => console.error(err));
  }, []);

  const filteredIdeas = filter === 'All' ? ideas : ideas.filter(i => i.category === filter || i.status === filter);

  const filters = ['All', 'Design', 'Technology', 'Personal', 'in-progress', 'completed'];

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6 text-slate-800">All Ideas</h1>
        
        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {filters.map(f => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filter === f ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                >
                    {f}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map(idea => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
            
            {/* Empty State */}
            {filteredIdeas.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400">
                    <p>No ideas found. Create one to get started!</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AllIdeas;
