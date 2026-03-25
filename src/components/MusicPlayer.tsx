import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "SynthWave AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#22d3ee"
  },
  {
    id: 2,
    title: "Cyber Drift",
    artist: "Glitch AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#f43f5e"
  },
  {
    id: 3,
    title: "Midnight Grid",
    artist: "Retro AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#a855f7"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    let nextIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (nextIndex >= TRACKS.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = TRACKS.length - 1;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };

    const handleEnded = () => skipTrack('next');

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  return (
    <div className="w-full max-w-md p-6 bg-black/40 backdrop-blur-xl rounded-3xl border border-magenta-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: currentTrack.color + '20', border: `1px solid ${currentTrack.color}40` }}
        >
          <Music style={{ color: currentTrack.color }} size={24} />
        </div>
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col"
            >
              <h3 className="text-white font-bold truncate text-lg tracking-tight">{currentTrack.title}</h3>
              <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">{currentTrack.artist}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute h-full rounded-full"
            style={{ backgroundColor: currentTrack.color, width: `${progress}%`, boxShadow: `0 0 10px ${currentTrack.color}` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4">
          <button 
            onClick={() => skipTrack('prev')}
            className="transition-all p-2 group"
          >
            <SkipBack 
              size={24} 
              className="text-white transition-all group-hover:scale-110" 
              style={{ filter: `drop-shadow(0 0 8px ${currentTrack.color})` }} 
            />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 transition-all"
            style={{ boxShadow: `0 0 30px ${currentTrack.color}` }}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={() => skipTrack('next')}
            className="transition-all p-2 group"
          >
            <SkipForward 
              size={24} 
              className="text-white transition-all group-hover:scale-110" 
              style={{ filter: `drop-shadow(0 0 8px ${currentTrack.color})` }} 
            />
          </button>
        </div>

        <div className="flex items-center gap-3 px-2 pt-2 opacity-50">
          <Volume2 size={16} className="text-gray-400" />
          <div className="h-1 flex-1 bg-gray-800 rounded-full">
            <div className="h-full w-2/3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
