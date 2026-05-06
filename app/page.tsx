"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [activeAnim, setActiveAnim] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (id: string, path: string) => {
    setActiveAnim(id);
    // On attend 1 seconde pour que l'animation se termine avant de changer de page
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  const modes: { 
    id: string; 
    name: string; 
    path: string; 
    gradient: string; 
    icon: string; 
    animation: any; 
  }[] = [
    { 
      id: 'fruits', 
      name: 'Meyveler', 
      path: '/fruits', 
      gradient: 'from-orange-400 to-red-500',
      icon: "🍎",
      animation: {
        y: [0, -150],
        scale: [1, 1.8, 0],
        rotate: [0, 25, -25, 45],
        opacity: [1, 1, 0],
        transition: { duration: 0.8, ease: "easeOut" }
      }
    },
    { 
      id: 'cars', 
      name: 'Arabalar', 
      path: '/arabalar', 
      gradient: 'from-blue-500 to-indigo-600',
      icon: "🏎️",
      animation: {
        x: [0, -40, 1500], 
        y: [0, -2, 2, -2, 0], 
        scale: [1, 1.1, 1.4],
        transition: { 
          duration: 0.8, 
          times: [0, 0.1, 1], 
          ease: "easeIn" 
        }
      }
    },
    { 
      id: 'cities', 
      name: 'Şehirler', 
      path: '/sehirler', 
      gradient: 'from-emerald-400 to-teal-600',
      icon: "🌍",
      animation: {
        scale: [1, 2, 25], 
        rotate: 720,
        opacity: [1, 1, 0],
        transition: { duration: 1, ease: "easeInOut" }
      }
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 overflow-hidden">
      
      {/* Titre principal */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-black text-slate-800 tracking-tighter">
          SIRALAMA <span className="text-orange-500">USTASI</span>
        </h1>
        <p className="text-slate-400 font-medium italic">En iyisini sen seç!</p>
      </motion.div>
      
      <div className="grid gap-6 w-full max-w-sm px-4">
        {modes.map((mode) => (
          <div 
            key={mode.id}
            className="relative" 
            onClick={() => handleNavigation(mode.id, mode.path)}
          >
            {/* Le bouton */}
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="relative h-28 sm:h-32 rounded-[2.5rem] shadow-xl flex items-center px-8 overflow-hidden z-10 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient}`}></div>
              <span className="relative text-2xl font-black text-white uppercase tracking-widest z-20">
                {mode.name}
              </span>
            </motion.div>

            {/* L'icône animée */}
            <motion.span 
              className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl pointer-events-none z-50"
              style={{ 
                display: 'inline-block',
                scaleX: mode.id === 'cars' ? -1 : 1 
              }}
              animate={activeAnim === mode.id ? mode.animation : {}}
            >
              {activeAnim === mode.id && mode.id === 'fruits' ? "😋" : mode.icon}
            </motion.span>

            {/* Effet de fumée pour la voiture */}
            {activeAnim === 'cars' && mode.id === 'cars' && (
              <div className="absolute right-24 top-1/2 -translate-y-1/2 flex gap-1 z-40">
                {[1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="text-3xl"
                    style={{ display: 'inline-block', scaleX: -1 }}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ 
                      scale: [1, 2.5], 
                      opacity: [0.8, 0],
                      x: [-10, -70 * i], 
                      y: [-5, -15] 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.05 * i,
                      ease: "easeOut"
                    }}
                  >
                    💨
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flash pour l'explosion des villes */}
      {activeAnim === 'cities' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="fixed inset-0 bg-white z-[60] pointer-events-none"
        />
      )}
    </div>
  );
}

