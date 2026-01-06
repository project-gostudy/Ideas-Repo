import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search ideas, tags..." 
          className="input pl-10" 
          style={{paddingLeft: '2.5rem'}} 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost p-2 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/ideas/new')}>
            <Plus size={18} />
            New Idea
        </button>
      </div>
    </header>
  );
};

export default Header;
