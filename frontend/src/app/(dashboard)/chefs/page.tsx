"use client";

import React, { useEffect, useState } from "react";
import { ChefHat, Plus, Search, Phone, Mail, Star } from "lucide-react";

type ChefSession = { id: string; title: string; date: string }

type Chef = {
  id: string;
  name: string;
  specialty: string;
  bio?: string;
  phone?: string;
  email?: string;
  sessions: ChefSession[];
}

export default function ChefsPage() {
  const [chefs, setChefs] = useState<Chef[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: '', specialty: '', bio: '', phone: '', email: ''
  })

  useEffect(() => {
    fetch('http://localhost:4000/api/chefs')
      .then(res => res.json())
      .then(data => { setChefs(data.chefs); setTotal(data.total) })
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.specialty) return
    setLoading(true)
    setError("")

    const res = await fetch('http://localhost:4000/api/chefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      const newChef = await res.json()
      setChefs([{ ...newChef, sessions: [] }, ...chefs])
      setTotal(total + 1)
      setForm({ name: '', specialty: '', bio: '', phone: '', email: '' })
      setShowForm(false)
    } else {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création')
    }
    setLoading(false)
  }

  const filtered = chefs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.specialty.toLowerCase().includes(search.toLowerCase())
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
              Équipe culinaire
            </span>
          </div>
          <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
            Nos <span className="text-[#c4a973]">chefs</span>
          </h1>
          <p className="text-[#5f7468] dark:text-gray-400 font-medium mt-4 max-w-2xl">
            Gérez les chefs et leurs participations aux événements culinaires.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#1a1d1a] text-white font-black shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nouveau chef
        </button>
      </div>

      {showForm && (
        <div className="relative z-10 p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-black text-white">Ajouter un chef</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Nom complet" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Spécialité (ex: Cuisine française)" value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Téléphone" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <textarea placeholder="Bio" value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
          <input type="text" placeholder="Rechercher un chef..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder:text-[#5f7468] font-medium" />
        </div>
        <div className="px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md text-white font-bold">
          {total} Chefs
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-400 col-span-3">Aucun chef trouvé.</p>
        ) : (
          filtered.map((chef) => (
            <div key={chef.id} className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1a1d1a] flex items-center justify-center text-[#c4a973] shadow-lg">
                  <ChefHat size={26} />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">{chef.name}</h3>
                  <div className="flex items-center gap-1 text-[#c4a973] text-sm font-semibold">
                    <Star size={12} />{chef.specialty}
                  </div>
                </div>
              </div>

              {chef.bio && <p className="text-gray-400 text-sm">{chef.bio}</p>}

              <div className="space-y-2">
                {chef.email && (
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Mail size={14} className="text-[#c4a973]" />{chef.email}
                  </div>
                )}
                {chef.phone && (
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Phone size={14} className="text-[#c4a973]" />{chef.phone}
                  </div>
                )}
              </div>

              {chef.sessions.length > 0 && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-[#c4a973] font-black mb-2">Événements</p>
                  <div className="space-y-1">
                    {chef.sessions.map(s => (
                      <div key={s.id} className="text-xs text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c4a973]"></div>
                        {s.title} — {s.date}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}