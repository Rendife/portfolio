import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

function Navbar({ onThemeToggle, theme }) {
  return (
    <nav className="flex justify-between items-center p-6 backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 shadow-lg fixed top-0 left-0 w-full z-50">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Rendi Febriansyah</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">Home</Link>
        <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:underline">Contact</Link>
        <button
          onClick={onThemeToggle}
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-lg overflow-hidden"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-200 via-sky-300 to-indigo-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <h2 className="text-5xl font-extrabold mb-4">Desainer Grafis Modern</h2>
      <p className="max-w-xl mb-8 text-lg opacity-90">Halo! Saya Rendi Febriansyah, seorang desainer grafis yang menciptakan karya visual modern dan interaktif dengan gaya berwarna dan futuristik.</p>
      <Link to="/contact" className="px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-500 text-white rounded-full shadow-xl hover:scale-105 transition">Hubungi Saya</Link>
    </motion.div>
  );
}

function Contact() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-3xl shadow-2xl p-10 max-w-md w-[90%] text-center">
        <h2 className="text-3xl font-bold mb-6">Hubungi Saya</h2>
        <p className="mb-8 opacity-80">Pilih cara untuk terhubung dengan saya:</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => window.open('https://wa.me/6289961434023', '_blank')}
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-105 transition"
          >
            💬 Chat via WhatsApp
          </button>
          <button
            onClick={() => window.open('mailto:rendi@gmail.com')}
            className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:scale-105 transition"
          >
            📧 Kirim Email
          </button>
        </div>
        <Link to="/" className="block mt-8 text-sm text-gray-700 dark:text-gray-300 hover:underline">⬅ Kembali ke Beranda</Link>
      </div>
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const [circle, setCircle] = useState(false);

  const toggleTheme = () => {
    setCircle(true);
    setTimeout(() => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, 200);
    setTimeout(() => setCircle(false), 700);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`relative transition-colors duration-500 ${theme}`}> 
      <Navbar onThemeToggle={toggleTheme} theme={theme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>

      {/* Circular Transition */}
      <AnimatePresence>
        {circle && (
          <motion.div
            className="fixed top-1/2 left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 z-[9999]"
            initial={{ scale: 0, opacity: 0.8, x: '-50%', y: '-50%' }}
            animate={{ scale: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
