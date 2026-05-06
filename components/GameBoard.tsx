"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces pour TypeScript ---
interface GameItem {
  id: number;
  img: string;
}

interface GameBoardProps {
  title: string;
  initialItems: GameItem[];
  theme: string;
}

export default function GameBoard({ title, initialItems, theme }: GameBoardProps) {
  // États de gestion du jeu
  const [remainingItems, setRemainingItems] = useState<GameItem[]>([]);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [ranking, setRanking] = useState<(GameItem | null)[]>(Array(10).fill(null));
  
  // États pour l'interface et le Zoom
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // ÉTATS POUR LE COMPARTIMENT SECRET
  const [secretClicks, setSecretClicks] = useState(0);
  const [isSecretMode, setIsSecretMode] = useState(false);

  // Fonction pour (re)lancer le jeu
  const resetGame = () => {
    const shuffled = [...initialItems].sort(() => Math.random() - 0.5);
    setRanking(Array(10).fill(null));
    setRemainingItems(shuffled.slice(1));
    setCurrentItem(shuffled[0]);
    setZoomedImg(null);
    setIsSecretMode(false); // On désactive le secret au reset si tu veux
  };

  useEffect(() => {
    resetGame();
  }, [initialItems]);

  // Détection du secret (5 clics rapides sur le titre)
  const handleSecretTrigger = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 500) {
      if (secretClicks + 1 >= 5) {
        setIsSecretMode(!isSecretMode); // Alterne le mode secret
        setSecretClicks(0);
      } else {
        setSecretClicks(prev => prev + 1);
      }
    } else {
      setSecretClicks(1);
    }
    setLastClickTime(currentTime);
  };

  // Détection du double-clic standard pour le zoom
  const handleItemClick = (img: string) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      setZoomedImg(img);
    }
    setLastClickTime(currentTime);
  };

  // Logique de placement
  const handlePlace = (rankIndex: number) => {
    if (!currentItem || ranking[rankIndex] !== null) return;

    const newRanking = [...ranking];
    newRanking[rankIndex] = currentItem;
    setRanking(newRanking);

    if (remainingItems.length > 0) {
      setCurrentItem(remainingItems[0]);
      setRemainingItems(remainingItems.slice(1));
    } else {
      setCurrentItem(null);
    }
  };

  return (
    <main className={`flex flex-col items-center p-3 min-h-screen relative overflow-x-hidden ${
      theme === 'fruits' ? 'bg-orange-50' : theme === 'cars' ? 'bg-blue-50' : 'bg-emerald-50'
    }`}>
      
      {/* --- OVERLAY ZOOM --- */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="relative w-full max-w-lg aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src={zoomedImg} alt="zoom" fill unoptimized className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER (Optimisé pour mobile - Titre en haut, boutons en dessous) --- */}
      <div className="w-full max-w-md flex flex-col items-center gap-3 mb-4">
        <h1 
          onClick={handleSecretTrigger}
          className={`text-sm font-black uppercase tracking-[0.2em] select-none transition-colors ${
            isSecretMode ? 'text-yellow-600 animate-pulse' : 'text-slate-800'
          }`}
        >
          {isSecretMode ? "GİZLİ BÖLÜM 🕵️‍♂️" : title}
        </h1>
        
        <div className="w-full flex justify-between items-center px-1">
          <Link href="/" className="p-2 px-5 bg-white rounded-xl shadow-sm text-[10px] font-black border border-slate-100 active:scale-90 transition-transform">
            ← GERİ
          </Link>
          <button 
            onClick={resetGame} 
            className="p-2 px-4 bg-white rounded-xl shadow-sm text-[10px] font-black text-blue-600 border border-slate-100 active:scale-90 transition-transform"
          >
            YENİDEN BAŞLAT 🔄
          </button>
        </div>
      </div>

      {/* --- PIOCHE (Objet à placer) --- */}
      <div className="w-full max-w-md mb-6 flex flex-col items-center">
        <span className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Sıradaki Nesne</span>
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-4 transition-colors ${
          isSecretMode ? 'border-yellow-400 bg-black' : 'border-white bg-white'
        }`}>
          {currentItem ? (
            <motion.div 
              key={currentItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-full cursor-pointer"
              onClick={() => handleItemClick(currentItem.img)}
            >
              <Image src={currentItem.img} alt="current" fill unoptimized className="object-cover" />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-2">
              <span className="font-black text-green-500 uppercase text-xs">Tamamlandı! ✅</span>
              <button onClick={resetGame} className="text-[9px] font-bold text-slate-400 underline">Tekrar Oyna</button>
            </div>
          )}
        </div>
      </div>

      {/* --- LISTE DE CLASSEMENT --- */}
      <div className="w-full max-w-md space-y-2 pb-12">
        {ranking.map((item, i) => (
          <div 
            key={i} 
            className={`flex items-center bg-white rounded-xl p-1.5 shadow-sm border h-14 transition-all overflow-hidden ${
              !item && currentItem ? 'border-dashed border-slate-200 active:bg-blue-50/50' : 'border-transparent'
            }`}
            onClick={() => handlePlace(i)}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs shrink-0 ml-1 shadow-sm ${
              theme === 'fruits' ? 'bg-orange-500' : theme === 'cars' ? 'bg-blue-600' : 'bg-emerald-500'
            }`}>
              {i + 1}
            </div>

            <div className="flex-grow flex justify-center items-center h-full px-2">
              {item ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative w-full h-full max-w-[130px] rounded-md overflow-hidden"
                  onClick={(e) => { e.stopPropagation(); handleItemClick(item.img); }}
                >
                  <Image src={item.img} alt="ranked" fill unoptimized className="object-cover" />
                </motion.div>
              ) : (
                <div className="text-slate-200 font-bold uppercase text-[8px] tracking-tight text-center">Buraya Yerleştir</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* COMPARTIMENT CACHÉ (N'apparaît que si le secret est débloqué) */}
      <AnimatePresence>
  {isSecretMode && (
    <Link href="/secret-page"> {/* <--- Mets ici le chemin de ta nouvelle page */}
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-white cursor-pointer"
      >
        <span className="text-2xl drop-shadow-md">⭐</span>
        
        {/* Petit badge discret pour inciter à cliquer */}
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-amber-600 whitespace-nowrap"
        >
          TIKLA!
        </motion.span>
      </motion.div>
    </Link>
  )}
</AnimatePresence>

    </main>
  );
}
