import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import Workout from './pages/Workout';
import History from './pages/History';
import FitnessGuide from './pages/FitnessGuide';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions/:type" element={<Instructions />} />
          <Route path="/workout/:type" element={<Workout />} />
          <Route path="/history" element={<History />} />
          <Route path="/guide" element={<FitnessGuide />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
