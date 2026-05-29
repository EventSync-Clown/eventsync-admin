"use client";

import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Plus,
  Search,
} from "lucide-react";

export default function PlanningPage() {
  const events = [
    {
      id: 1,
      title: "Dégustation Premium",
      date: "14 Mai 2026",
      time: "18:30",
      location: "Ivandry",
      participants: 48,
      status: "Confirmé",
    },
    {
      id: 2,
      title: "Atelier Gastronomique",
      date: "18 Mai 2026",
      time: "10:00",
      location: "Analakely",
      participants: 25,
      status: "En attente",
    },
    {
      id: 3,
      title: "Masterclass Chef",
      date: "22 Mai 2026",
      time: "15:00",
      location: "Ambatoroka",
      participants: 62,
      status: "Confirmé",
    },
    {
      id: 4,
      title: "Brunch Signature",
      date: "25 Mai 2026",
      time: "11:30",
      location: "Ankorondrano",
      participants: 31,
      status: "Annulé",
    },
    {
        id: 5,
        title: "Soirée Dégustation",
        date: "28 Mai 2026",
        time: "19:00",
        participants: 20,
        status: "En attente",
        location: "Ivato"
    }
  ];

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c4a973]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#5f7468]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-[#c4a973]"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#5f7468] dark:text-[#c4a973]/60">
              Gestion des événements
            </span>
          </div>

          <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
            Planning des <span className="text-[#c4a973]">sessions</span>
          </h1>

          <p className="text-[#5f7468] dark:text-gray-400 font-medium mt-4 max-w-2xl">
            Retrouvez l’ensemble des événements créés et gérez leur organisation
            en temps réel.
          </p>
        </div>

        <button className="group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#1a1d1a] dark:bg-[#c4a973] text-white dark:text-[#1a1d1a] font-black shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Nouvelle session
        </button>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 dark:border-white/10 backdrop-blur-md">
          <Search size={18} className="text-[#5f7468]" />

          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="bg-transparent outline-none w-full text-[#1a1d1a] dark:text-white placeholder:text-[#5f7468] dark:placeholder:text-gray-500 font-medium"
          />
        </div>

        <div className="px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 dark:border-white/10 backdrop-blur-md text-[#1a1d1a] dark:text-white font-bold">
          8 Sessions actives
        </div>
      </div>

      <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-[#c4a973]/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c4a973]/10 dark:border-white/10">
                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Événement
                </th>

                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Date
                </th>

                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Heure
                </th>

                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Lieu
                </th>

                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Participants
                </th>

                <th className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[#c4a973]/10 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a] shadow-lg">
                        <CalendarDays size={24} />
                      </div>

                      <div>
                        <h3 className="font-black text-[#1a1d1a] dark:text-white">
                          {event.title}
                        </h3>

                        <p className="text-sm text-[#5f7468] dark:text-gray-500 font-medium">
                          Session culinaire premium
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[#1a1d1a] dark:text-white font-semibold">
                      <CalendarDays size={16} className="text-[#c4a973]" />
                      {event.date}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[#1a1d1a] dark:text-white font-semibold">
                      <Clock3 size={16} className="text-[#c4a973]" />
                      {event.time}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[#1a1d1a] dark:text-white font-semibold">
                      <MapPin size={16} className="text-[#c4a973]" />
                      {event.location}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[#1a1d1a] dark:text-white font-semibold">
                      <Users size={16} className="text-[#c4a973]" />
                      {event.participants}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-black border ${
                        event.status === "Confirmé"
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:border-green-500/20"
                          : event.status === "En attente"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20"
                          : "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}