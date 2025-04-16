'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Kalau mobile menu lagi kebuka, langsung close
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 bg-background z-50">
      <div className="text-xl font-bold">Puja Swara</div>
      <div className="md:flex hidden gap-8 text-lg">
        <button onClick={() => scrollToSection('home')}>Home</button>
        <button onClick={() => scrollToSection('about')}>About</button>
        <button onClick={() => scrollToSection('skills')}>Skills</button>
        <button onClick={() => scrollToSection('portfolio')}>Portfolio</button>
        <button onClick={() => scrollToSection('commentSection')}>Comments</button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">☰</button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-4 bg-background border p-4 flex flex-col gap-4 shadow-lg">
          <button onClick={() => scrollToSection('home')}>Home</button>
          <button onClick={() => scrollToSection('about')}>About</button>
          <button onClick={() => scrollToSection('skills')}>Skills</button>
          <button onClick={() => scrollToSection('portfolio')}>Portfolio</button>
          <button onClick={() => scrollToSection('commentSection')}>Comments</button>
          <button onClick={() => { toggleTheme(); toggleMenu(); }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      )}
    </nav>
  );
}
