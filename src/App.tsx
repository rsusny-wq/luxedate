import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { db } from './services/db';
import './index.css';

const AuthGuard = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (db.isLoggedIn() && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, []);
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <AuthGuard>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AuthGuard>
      </div>
    </Router>
  );
}

export default App;
