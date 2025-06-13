import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { toggleTheme } from '../features/theme/themeSlice';


const ThemeToggle: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem('preferredTheme', theme);
  }, [theme]);

  
  useEffect(() => {
    const saved = (localStorage.getItem('preferredTheme') as 'light' | 'dark') || theme;
    if (saved !== theme) {
      dispatch(toggleTheme());
    }
  }, []);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={() => dispatch(toggleTheme())}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;
