"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin, Users, Plus, Search, Check, X, Pin } from "lucide-react";

type PlanningSession = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  isPinned: boolean;
}

const statusConfig = {
  PENDING: {
    label: 'En attente',
    className: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
  },
  CONFIRMED: {
    label: 'Confirmé',
    className: 'bg-green-500/10 border-green-500/30 text-green-400'
  },
  REJECTED: {
    label: 'Refusé',
    className: 'bg-red-500/10 border-red-500/30 text-red-400'
  },
}

export default function PlanningPage() {
  const [sessions, setSessions] = useState<PlanningSession[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("TOUS")
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchPlanning = () => {
    fetch('http://localhost:4000/api/planning')
      .then(res => res.json())
      .then(data => { setSessions(data.sessions ?? []); setTotal(data.total ?? 0) })
  }

  useEffect(() => { fetchPlanning() }, [])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await fetch(`http://localhost:4000/api/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchPlanning()
    setUpdating(null)
  }

  const filtered = sessions
    .filter(s => filterStatus === 'TOUS' || s.status === filterStatus)
    .filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  const pinned = filtered.filter(s => s.isPinned && s.status === 'PENDING')
  const rest = filtered.filter(s => !(s.isPinned && s.status === 'PENDING'))
  const ordered = [...pinned, ...rest]

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c4a973]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-[#c4a973]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#5f7468] dark:text-[#c4a973]/60">
              Gestion des événements
            </span>
          </div>
          <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
            Planning des <span className="text-[#c4a973]">sessions</span>
          </h1>
          <p className="text-[#5f7468] dark:text-gray-400 font-medium mt-4 max-w-2xl">
            Gérez le statut de chaque session en temps réel.
          </p>
        </div>
        <a href="/session"
          className="group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#1a1d1a] text-white font-black shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nouvelle session
        </a>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md">
          <Search size={18} className="text-[#5f7468]" />
          <input type="text" placeholder="Rechercher une session..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-[#1a1d1a] dark:text-white placeholder:text-[#5f7468] font-medium" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'TOUS', label: 'Tous' },
            { key: 'PENDING', label: 'En attente' },
            { key: 'CONFIRMED', label: 'Confirmés' },
            { key: 'REJECTED', label: 'Refusés' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilterStatus(f.key)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                filterStatus === f.key
                  ? 'bg-[#c4a973] text-black'
                  : 'bg-white/40 dark:bg-white/5 text-[#1a1d1a] dark:text-white border border-[#c4a973]/20'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md text-[#1a1d1a] dark:text-white font-bold whitespace-nowrap">
          {total} Sessions
        </div>
      </div>

      <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-[#c4a973]/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c4a973]/10 dark:border-white/10">
                {['Événement', 'Date', 'Heure', 'Lieu', 'Participants', 'Statut', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-5 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center text-gray-400">Aucune session trouvée.</td>
                </tr>
              ) : ordered.map(event => {
                const cfg = statusConfig[event.status] ?? statusConfig['PENDING']
                const isPending = event.status === 'PENDING'
                return (
                  <tr key={event.id}
                    className={`border-b border-[#c4a973]/10 dark:border-white/5 transition-all ${
                      isPending ? 'bg-yellow-500/5' : 'hover:bg-white/30 dark:hover:bg-white/5'
                    }`}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {isPending && <Pin size={13} className="text-yellow-400 shrink-0" />}
                        <div className="w-11 h-11 rounded-xl bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a] shrink-0">
                          <CalendarDays size={18} />
                        </div>
                        <div>
                          <p className="font-black text-[#1a1d1a] dark:text-white text-sm">{event.title}</p>
                          <p className="text-xs text-[#5f7468] dark:text-gray-500 max-w-[150px] truncate">{event.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#1a1d1a] dark:text-white font-semibold">
                        <CalendarDays size={13} className="text-[#c4a973]" />{event.date}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#1a1d1a] dark:text-white font-semibold">
                        <Clock3 size={13} className="text-[#c4a973]" />{event.time}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#1a1d1a] dark:text-white font-semibold">
                        <MapPin size={13} className="text-[#c4a973]" />{event.location}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#1a1d1a] dark:text-white font-semibold">
                        <Users size={13} className="text-[#c4a973]" />{event.participants}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black border ${cfg.className}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {event.status !== 'CONFIRMED' && (
                          <button onClick={() => updateStatus(event.id, 'CONFIRMED')}
                            disabled={updating === event.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black hover:bg-green-500/20 transition-all disabled:opacity-40">
                            <Check size={12} /> Accepter
                          </button>
                        )}
                        {event.status !== 'REJECTED' && (
                          <button onClick={() => updateStatus(event.id, 'REJECTED')}
                            disabled={updating === event.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black hover:bg-red-500/20 transition-all disabled:opacity-40">
                            <X size={12} /> Refuser
                          </button>
                        )}
                        {event.status === 'CONFIRMED' && (
                          <button onClick={() => updateStatus(event.id, 'PENDING')}
                            disabled={updating === event.id}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-black hover:bg-yellow-500/20 transition-all disabled:opacity-40">
                            En attente
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}