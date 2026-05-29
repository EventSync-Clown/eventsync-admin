"use client";

import React from "react";
import {
  Users,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  ChefHat,
  PlusCircle,
  Sparkles,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      id: 1,
      label: "Participants",
      value: "1,284",
      icon: Users,
      change: "+12%",
      description: "Depuis le mois dernier",
    },
    {
      id: 2,
      label: "Sessions",
      value: "8",
      icon: ChefHat,
      change: "+2",
      description: "Nouvelles expériences",
    },
    {
      id: 3,
      label: "Engagement",
      value: "96%",
      icon: TrendingUp,
      change: "+4.1%",
      description: "Taux de satisfaction",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Nouvelle réservation premium",
      time: "Il y a 5 min",
    },
    {
      id: 2,
      title: "Session gastronomique validée",
      time: "Il y a 18 min",
    },
    {
      id: 3,
      title: "Ajout d’un nouveau chef",
      time: "Il y a 1 heure",
    },
  ];

  return (
    <div className="min-h-screen p-8 space-y-10 animate-in fade-in duration-1000 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c4a973]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#5f7468]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[2px] w-8 bg-[#c4a973]"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#5f7468] dark:text-[#c4a973]/60">
            Aperçu Stratégique
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter leading-none">
              Tableau de <span className="text-[#c4a973]">bord</span>
            </h1>

            <p className="text-[#5f7468] dark:text-gray-400 font-medium max-w-xl mt-4 leading-relaxed">
              Gérez l'élégance de vos événements culinaires et suivez
              l'activité de{" "}
              <span className="text-[#1a1d1a] dark:text-white font-bold italic underline decoration-[#c4a973]">
                Tendak'Anina
              </span>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 px-5 py-4 rounded-[2rem] border border-[#c4a973]/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a]">
              <Sparkles size={22} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#5f7468] dark:text-gray-500">
                Performance
              </p>
              <h3 className="font-black text-[#1a1d1a] dark:text-white text-lg">
                Excellent suivi
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 dark:border-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#c4a973]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-[1.5rem] bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={26} />
              </div>

              <span className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full border border-green-200 dark:border-green-500/20">
                {stat.change}
                <ArrowUpRight size={12} />
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-black text-[#5f7468] dark:text-gray-500 uppercase tracking-widest mb-2">
                {stat.label}
              </p>

              <h2 className="text-4xl font-black text-[#1a1d1a] dark:text-white tracking-tight">
                {stat.value}
              </h2>

              <p className="text-sm text-[#5f7468] dark:text-gray-500 mt-2 font-medium">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden p-10 rounded-[3rem] border-2 border-dashed border-[#c4a973]/30 flex flex-col items-center justify-center gap-5 group hover:border-[#c4a973] transition-all cursor-pointer bg-white/20 dark:bg-transparent backdrop-blur-md">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-[#c4a973]/5 to-transparent"></div>

          <div className="relative z-10 w-16 h-16 rounded-full bg-[#c4a973]/10 flex items-center justify-center text-[#c4a973] group-hover:bg-[#c4a973] group-hover:text-white transition-all duration-300 group-hover:scale-110">
            <PlusCircle size={32} />
          </div>

          <a href="/session" className="relative z-10 text-center">
            <span className="font-black uppercase tracking-tighter text-[#1a1d1a] dark:text-white text-lg">
              Créer une nouvelle session
            </span>

            <p className="text-sm text-[#5f7468] dark:text-gray-500 mt-2 font-medium">
              Organisez une nouvelle expérience culinaire immersive.
            </p>
          </a>
        </div>

        <div className="relative overflow-hidden p-10 rounded-[3rem] bg-[#1a1d1a] dark:bg-[#c4a973]/5 border border-white/10 text-white flex flex-col justify-between min-h-[280px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a973]/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h3 className="text-3xl font-black mb-3 italic">
                Prochain Event
              </h3>

              <p className="text-[#c4a973] font-bold text-lg">
                Dégustation Premium - 14 Mai
              </p>

              <p className="text-gray-400 mt-2 max-w-sm leading-relaxed">
                Une expérience gastronomique raffinée avec des invités
                exclusifs et des ateliers culinaires immersifs.
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <CalendarCheck size={26} className="text-[#c4a973]" />
            </div>
          </div>

          <div className="relative z-10 mt-10 space-y-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#c4a973]" />
              <span className="text-sm font-bold tracking-wide uppercase text-[#c4a973]">
                Activité récente
              </span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md"
                >
                  <div>
                    <p className="font-semibold text-sm">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-[#c4a973]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}