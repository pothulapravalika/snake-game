import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background Grid & Atmosphere */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-magenta-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 mb-12 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-cyan-400 animate-pulse" size={24} />
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400/60 font-bold">ARCADE EXPERIENCE</span>
        </div>
        <h1 className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="text-6xl md:text-9xl font-digital text-white animate-glitch drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] tracking-tighter">
            NEON
          </span>
          <span className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
            BEATS
          </span>
        </h1>
      </motion.header>

      {/* Main Content */}
      <main className="z-10 flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl px-6">
        {/* Left Panel: Info/Stats */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden xl:flex flex-col gap-6 w-64"
        >
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Gamepad2 size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Controls</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-400 font-mono">
              <li className="flex justify-between"><span>UP</span> <span className="text-white">↑</span></li>
              <li className="flex justify-between"><span>DOWN</span> <span className="text-white">↓</span></li>
              <li className="flex justify-between"><span>LEFT</span> <span className="text-white">←</span></li>
              <li className="flex justify-between"><span>RIGHT</span> <span className="text-white">→</span></li>
            </ul>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-magenta-400 mb-4">
              <Music size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Now Playing</span>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              Experience the fusion of classic arcade gameplay and AI-driven synthwave rhythms.
            </div>
          </div>
        </motion.div>

        {/* Center: Snake Game */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SnakeGame />
        </motion.div>

        {/* Right Panel: Music Player */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <MusicPlayer />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
          © 2026 NEON ARCADE • BUILT WITH GOOGLE AI STUDIO
        </div>
      </footer>
    </div>
  );
}
