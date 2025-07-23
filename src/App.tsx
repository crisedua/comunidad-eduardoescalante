import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResourcesProvider } from './context/ResourcesContext';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Resources from './pages/Resources';
import Forum from './pages/Forum';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <ResourcesProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/recursos" element={<Resources />} />
            <Route path="/foro" element={<Forum />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
          <Toaster />
        </div>
      </ResourcesProvider>
    </BrowserRouter>
  );
}

export default App;
