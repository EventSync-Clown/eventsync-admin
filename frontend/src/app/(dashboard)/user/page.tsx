"use client";

import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  ArrowUpRight,
  ChefHat,
  PlusCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: "Participants", value: "1,284", icon: Users, change: "+12%" },
    { label: "Sessions", value: "8", icon: ChefHat, change: "+2" },
    { label: "Engagement", value: "96%", icon: TrendingUp, change: "+4.1%" },
  ];

  return (
    /* Le conteneur principal utilise le même fond et la même grille que la Sidebar */
    <div className="min-h-screen p-8 space-y-10 animate-in fade-in duration-1000 relative">
      
      {/* --- EFFETS DE FOND SYNCHRONISÉS --- */}
      {/* Grille subtile */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Lueurs colorées (Doré et Vert/Gris) */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c4a973]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#5f7468]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
            <div className="h-[2px] w-8 bg-[#c4a973]"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#5f7468] dark:text-[#c4a973]/60">Aperçu Stratégique</span>
        </div>
        <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
          Tableau de <span className="text-[#c4a973]">bord</span>
        </h1>
        <p className="text-[#5f7468] dark:text-gray-400 font-medium max-w-xl">
          Gérez l'élégance de vos événements culinaires et suivez l'activité de <span className="text-[#1a1d1a] dark:text-white font-bold italic underline decoration-[#c4a973]">Tendak'Anina</span>.
        </p>
      </div>

      {/* --- STATISTIQUES --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 dark:border-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 shadow-sm hover:shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a] shadow-lg">
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] font-black text-[#5f7468] dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h2 className="text-4xl font-black text-[#1a1d1a] dark:text-white">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* --- ACTIONS RAPIDES --- */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 rounded-[3rem] border-2 border-dashed border-[#c4a973]/30 flex flex-col items-center justify-center gap-4 group hover:border-[#c4a973] transition-all cursor-pointer bg-white/20 dark:bg-transparent">
            <div className="w-16 h-16 rounded-full bg-[#c4a973]/10 flex items-center justify-center text-[#c4a973] group-hover:bg-[#c4a973] group-hover:text-white transition-all">
                <PlusCircle size={32} />
            </div>
            <span className="font-black uppercase tracking-tighter text-[#1a1d1a] dark:text-white">Créer une nouvelle session</span>
        </div>
        
        <div className="p-10 rounded-[3rem] bg-[#1a1d1a] dark:bg-[#c4a973]/5 border border-white/10 text-white flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 italic">Prochain Event</h3>
                <p className="text-[#c4a973] font-bold">Dégustation Premium - 14 Mai</p>
            </div>
            <CalendarCheck size={80} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}