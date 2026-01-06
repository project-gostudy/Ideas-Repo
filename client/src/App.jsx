import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllIdeas from './pages/AllIdeas';
import IdeaDetail from './pages/IdeaDetail';
import { Favorites, Archived } from './pages/Placeholders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ideas" element={<AllIdeas />} />
          <Route path="ideas/new" element={<IdeaDetail isNew={true} />} />
          <Route path="ideas/:id" element={<IdeaDetail />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="archived" element={<Archived />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
