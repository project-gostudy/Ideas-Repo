import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';

const IdeaCard = ({ idea }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ideas/${idea.id}`);
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'in-progress': return { bg: '#FEF3C7', text: '#B45309' };
          case 'completed': return { bg: '#D1FAE5', text: '#059669' };
          default: return { bg: '#DBEAFE', text: '#1D4ED8' };
      }
  };
  
  const statusFormatted = idea.status ? idea.status.replace('-', ' ') : 'Idea';
  const statusStyle = getStatusColor(idea.status);

  return (
    <div className="card hover:shadow-md cursor-pointer flex flex-col h-full" onClick={handleClick}>
      <div className="flex justify-between items-start mb-3">
        <span className="badge" style={{backgroundColor: statusStyle.bg, color: statusStyle.text}}>
            {idea.category || statusFormatted}
        </span>
        <button className="text-slate-400 hover:text-slate-600 p-1" onClick={(e) => { e.stopPropagation(); }}>
            <MoreHorizontal size={16} />
        </button>
      </div>
      
      <h3 className="font-bold text-lg mb-2 text-slate-800">{idea.title}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-3 overflow-hidden text-ellipsis display-webkit-box" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
          {idea.content}
      </p>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
         <span className="text-xs text-slate-400">
             {new Date(idea.updated_at).toLocaleDateString()}
         </span>
         {idea.is_favorite === 1 && <span className="text-yellow-400">★</span>}
      </div>
    </div>
  );
};

export default IdeaCard;
