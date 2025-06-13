import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import type { RootState } from '../src/app/store';
import { toggleTheme } from './features/theme/themeSlice';
import { NewList } from './features/news/NewList';
import i18n from './il8n/index';
import Home from './pages/Home';
import './App.css';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('preferredLanguage', selectedLang);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    i18n.changeLanguage(savedLang);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <label className="switch">
            <input type="checkbox" onChange={() => dispatch(toggleTheme())} />
            <span className="slider"></span>
          </label>

          <select
            onChange={changeLanguage}
            defaultValue={i18n.language}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
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
