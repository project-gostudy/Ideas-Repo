import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Lightbulb, Star, Archive, Plus } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{backgroundColor: 'var(--primary)'}}>
          <Lightbulb size={20} />
        </div>
        <h1 className="font-bold text-xl text-slate-800">IdeaBox</h1>
      </div>

      <nav className="flex-1">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/ideas" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Lightbulb size={20} />
          All Ideas
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Star size={20} />
          Favorites
        </NavLink>
        <NavLink to="/archived" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Archive size={20} />
          Archived
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="p-4 bg-slate-50 rounded-xl" style={{backgroundColor: '#F1F5F9'}}>
          <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=random" alt="User" />
             </div>
             <div>
                <p className="font-medium text-sm">Lorenzo Balzoni</p>
                <p className="text-xs text-slate-500">Pro Plan</p>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
