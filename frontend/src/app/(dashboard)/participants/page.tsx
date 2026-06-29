"use client";

import React, { useEffect, useState } from "react";
import { Users, Plus, Search, Phone, Mail, Hash } from "lucide-react";

type Participant = {
  id: string;
  matricule: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    matricule: '', name: '', email: '', phone: '', password: ''
  })

  useEffect(() => {
    fetch('http://localhost:4000/api/participants')
      .then(res => res.json())
      .then(data => { setParticipants(data.participants); setTotal(data.total) })
  }, [])

  const handleSubmit = async () => {
    if (!form.matricule || !form.name || !form.password) return
    setLoading(true)
    setError("")

    const res = await fetch('http://localhost:4000/api/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      const newP = await res.json()
      setParticipants([newP, ...participants])
      setTotal(total + 1)
      setForm({ matricule: '', name: '', email: '', phone: '', password: '' })
      setShowForm(false)
    } else {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création')
    }
    setLoading(false)
  }

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.matricule.toLowerCase().includes(search.toLowerCase())
  )

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
              Gestion des participants
            </span>
          </div>
          <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
            Liste des <span className="text-[#c4a973]">participants</span>
          </h1>
          <p className="text-[#5f7468] dark:text-gray-400 font-medium mt-4 max-w-2xl">
            Gérez les participants et leurs accès à la plateforme.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#1a1d1a] text-white font-black shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nouveau participant
        </button>
      </div>

      {showForm && (
        <div className="relative z-10 p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-black text-white">Ajouter un participant</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Matricule (ex: PAR-2024-002)" value={form.matricule}
              onChange={(e) => setForm({ ...form, matricule: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Nom complet" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Téléphone" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Mot de passe" type="password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white col-span-2" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-[#c4a973] text-black font-black py-3 rounded-xl disabled:opacity-60">
            {loading ? 'Création...' : 'Ajouter'}
          </button>
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md">
          <Search size={18} className="text-[#5f7468]" />
          <input type="text" placeholder="Rechercher un participant..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder:text-[#5f7468] font-medium" />
        </div>
        <div className="px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md text-white font-bold">
          {total} Participants
        </div>
      </div>

      <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-[#c4a973]/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c4a973]/10 dark:border-white/10">
                {['Participant', 'Matricule', 'Email', 'Téléphone', 'Inscrit le'].map(h => (
                  <th key={h} className="text-left px-8 py-6 text-[11px] uppercase tracking-[0.3em] text-[#5f7468] dark:text-gray-500 font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-gray-400">Aucun participant trouvé.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[#c4a973]/10 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#1a1d1a] dark:bg-[#c4a973] flex items-center justify-center text-[#c4a973] dark:text-[#1a1d1a] shadow-lg">
                          <Users size={20} />
                        </div>
                        <span className="font-black text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Hash size={14} className="text-[#c4a973]" />{p.matricule}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Mail size={14} className="text-[#c4a973]" />{p.email ?? '—'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Phone size={14} className="text-[#c4a973]" />{p.phone ?? '—'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-white font-semibold">
                      {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}   