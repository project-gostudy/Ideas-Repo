import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash, Share2, MoreHorizontal, Calendar, Tag, FileText } from 'lucide-react';

const IdeaDetail = ({ isNew }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!isNew);
  const [idea, setIdea] = useState({
    title: '',
    content: '',
    status: 'idea',
    category: 'Personal',
    tags: [],
    is_pinned: false
  });

  useEffect(() => {
    if (!isNew && id) {
      fetch(`http://localhost:3001/api/ideas/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.data) {
                const loaded = data.data;
                // Parse tags if string
                if (typeof loaded.tags === 'string') {
                    try { loaded.tags = JSON.parse(loaded.tags); } catch(e) { loaded.tags = []; }
                }
                setIdea(loaded);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }
  }, [id, isNew]);

  const handleSave = () => {
    const url = isNew ? 'http://localhost:3001/api/ideas' : `http://localhost:3001/api/ideas/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idea)
    })
    .then(res => res.json())
    .then(data => {
        if(isNew) {
            navigate(`/ideas/${data.data.id}`);
        } else {
            // Show toast maybe?
            alert('Saved!');
        }
    })
    .catch(err => console.error(err));
  };

  const handleChange = (field, value) => {
      setIdea(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="h-full flex flex-col">
       {/* Top Bar */}
       <div className="flex justify-between items-center mb-6 pl-1">
          <div className="flex items-center gap-4 text-slate-500">
             <button onClick={() => navigate(-1)} className="hover:text-slate-800"><ArrowLeft size={20} /></button>
             <span className="text-sm">/ All Ideas / {idea.title || 'New Idea'}</span>
          </div>
          <div className="flex items-center gap-2">
             {!isNew && (
                 <button className="btn btn-ghost p-2 text-red-500" onClick={() => {/* Delete logic */}}>
                    <Trash size={18} />
                 </button>
             )}
             <button className="btn btn-primary" onClick={handleSave}>
                <Save size={18} />
                Save
             </button>
          </div>
       </div>

       <div className="flex gap-8 h-full overflow-hidden">
          {/* Main Editor */}
          <div className="flex-1 overflow-y-auto pr-4">
             <input 
                type="text" 
                placeholder="Idea Title" 
                className="w-full text-4xl font-bold bg-transparent border-none focus:outline-none mb-4 text-slate-800 placeholder:text-slate-300"
                value={idea.title}
                onChange={e => handleChange('title', e.target.value)}
             />
             
             <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                <span className="flex items-center gap-1"><Calendar size={14} /> Created {new Date().toLocaleDateString()}</span>
                <span>Last edited just now</span>
             </div>

             {/* Toolbar Stub */}
             <div className="flex gap-2 mb-4 p-2 border-b border-slate-100 text-slate-400">
                <span className="font-bold cursor-pointer hover:text-slate-600">B</span>
                <span className="italic cursor-pointer hover:text-slate-600">I</span>
                <span className="underline cursor-pointer hover:text-slate-600">U</span>
             </div>

             <textarea 
                placeholder="Describe your idea..." 
                className="w-full h-[60vh] resize-none bg-transparent border-none focus:outline-none text-lg text-slate-600 leading-relaxed"
                value={idea.content}
                onChange={e => handleChange('content', e.target.value)}
             />
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-slate-100 pl-8 pt-2">
             <div className="card mb-6 p-4">
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Status</label>
                <select 
                    className="w-full p-2 border rounded bg-slate-50 text-sm"
                    value={idea.status}
                    onChange={e => handleChange('status', e.target.value)}
                >
                    <option value="idea">Idea</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
             </div>

             <div className="card mb-6 p-4">
                <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Tags</label>
                    <button className="text-blue-500 text-xs font-bold hover:underline">+</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="badge" style={{backgroundColor: '#DBEAFE', color: '#1D4ED8'}}>Strategy</span>
                    <span className="badge" style={{backgroundColor: '#F3E8FF', color: '#7E22CE'}}>AI</span>
                </div>
             </div>
             
             <div className="card p-4">
                 <label className="text-xs font-bold text-slate-400 uppercase mb-4 block">Collborators</label>
                 <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                     <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                     <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-dashed border-slate-300">+</button>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default IdeaDetail;
