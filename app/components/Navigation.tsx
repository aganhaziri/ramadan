'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Burger Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="burger-button"
      >
        <div className="burger-icon">
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
          <span className={`burger-line ${isOpen ? 'open' : ''}`} />
        </div>
      </button>

      {/* Navigation Menu */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <div className="nav-content">
          <nav className="nav-links">
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.home}
            </Link>
            <Link 
              href="/calendar" 
              className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.calendar}
            </Link>
            <Link 
              href="/tips" 
              className={`nav-link ${isActive('/tips') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t.menu.tips}
            </Link>
          </nav>

          <div className="nav-footer">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={theme === 'dark' ? t.theme.light : t.theme.dark}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span>{theme === 'dark' ? t.theme.light : t.theme.dark}</span>
            </button>
            <div className="ramadan-info">
              <div className="ramadan-label">
                {t.ramadan}
              </div>
              <div className="ramadan-year">
                {t.year}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="nav-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 