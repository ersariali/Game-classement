"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function SecretPage() {
  const [step, setStep] = useState(1); // 1: Q1, 2: Q2, 3: Message Final
  const [isError, setIsError] = useState(false);

  // Fonction pour gérer les réponses
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setStep((prev) => prev + 1);
    } else {
      // Effet de vibration visuelle + physique
      setIsError(true);
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(200); // Vibre 200ms sur mobile
      }
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans overflow-hidden">
      {/* Fond décoratif animé */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {/* QUESTION 1 */}
        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isError ? [0, -10, 10, -10, 10, 0] : 0 
            }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl text-center"
          >
            <span className="text-yellow-500 font-black text-xs uppercase tracking-[0.3em]">Güvenlik Kontrolü 01</span>
            <h2 className="text-white text-2xl font-black mt-4 mb-8">Seni ne kadar seviyorum ?</h2>
            <div className="grid gap-4">
              <button onClick={() => handleAnswer(false)} className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5">Emin değilim sanırım azıcık</button>
              <button onClick={() => handleAnswer(true)} className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5">Çok seviyorsun hemde sonsuz bir aşk</button>
            </div>
          </motion.div>
        )}

        {/* QUESTION 2 */}
        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: 1, 
              x: isError ? [0, -10, 10, -10, 10, 0] : 0 
            }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl text-center"
          >
            <span className="text-yellow-500 font-black text-xs uppercase tracking-[0.3em]">Güvenlik Kontrolü 02</span>
            <h2 className="text-white text-2xl font-black mt-4 mb-8">Sana ne kadar değer veriyorum ?</h2>
            <div className="grid gap-4">
              <button onClick={() => handleAnswer(true)} className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5">Çok çok çoooooooooooooooooooooooooooook değer veriyorsun</button>
              <button onClick={() => handleAnswer(false)} className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5">Azıcık değer veriyorsun</button>
            </div>
          </motion.div>
        )}

        {/* MESSAGE FINAL */}
        {step === 3 && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md text-center"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mb-8"
            >
              💗🩷💘
            </motion.div>
            <h1 className="text-white text-4xl font-black mb-4 uppercase italic">Tebrikler !</h1>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Seni ne kadar sevdiğimi ve değer verdiğimi biliyorsun ve her zaman öyle olacak ve sana ben her zaman öpücük veririm 🫣😚
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.3)] uppercase tracking-widest text-sm"
              >
                Ana Sayfaya Dön
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}