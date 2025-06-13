import React, { useEffect } from 'react';
import i18n from '../il8n/index';


const LanguageToggle: React.FC = () => {
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };


  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') || 'en';
    i18n.changeLanguage(saved);
  }, []);

  return (
    <select
      onChange={changeLanguage}
      defaultValue={i18n.language}
      className="language-select"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageToggle;
