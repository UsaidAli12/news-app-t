import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';

import { NewList } from './features/news/NewList';
import Home from './pages/Home';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <ThemeToggle />
          <LanguageToggle />
        </header>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
        </nav>

        {/* Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
