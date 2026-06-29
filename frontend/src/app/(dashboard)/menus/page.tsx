"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Plus, Search, Tag, AlertTriangle, Euro } from "lucide-react";

type Menu = {
  id: string;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  allergens: string[];
  price?: number;
  session?: { id: string; title: string } | null;
}

const categories = ["Entrée", "Plat", "Dessert", "Boisson"]

const categoryColors: Record<string, string> = {
  "Entrée": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20",
  "Plat": "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:border-green-500/20",
  "Dessert": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:border-pink-500/20",
  "Boisson": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/20",
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("Tous")
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: '', description: '', category: 'Plat',
    ingredients: '', allergens: '', price: ''
  })

  useEffect(() => {
    fetch('http://localhost:4000/api/menus')
      .then(res => res.json())
      .then(data => { setMenus(data.menus); setTotal(data.total) })
  }, [])

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.category) return
    setLoading(true)
    setError("")

    const res = await fetch('http://localhost:4000/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients.split(',').map(s => s.trim()).filter(Boolean),
        allergens: form.allergens.split(',').map(s => s.trim()).filter(Boolean),
        price: form.price ? parseFloat(form.price) : null,
      })
    })

    if (res.ok) {
      const newMenu = await res.json()
      setMenus([newMenu, ...menus])
      setTotal(total + 1)
      setForm({ name: '', description: '', category: 'Plat', ingredients: '', allergens: '', price: '' })
      setShowForm(false)
    } else {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création')
    }
    setLoading(false)
  }

  const filtered = menus
    .filter(m => filterCategory === 'Tous' || m.category === filterCategory)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))

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
              Carte culinaire
            </span>
          </div>
          <h1 className="text-5xl font-black text-[#1a1d1a] dark:text-white tracking-tighter">
            Nos <span className="text-[#c4a973]">menus</span>
          </h1>
          <p className="text-[#5f7468] dark:text-gray-400 font-medium mt-4 max-w-2xl">
            Gérez les plats, ingrédients, allergènes et tarifs de vos événements culinaires.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#1a1d1a] text-white font-black shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nouveau plat
        </button>
      </div>

      {showForm && (
        <div className="relative z-10 p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
          <h2 className="text-xl font-black text-white">Ajouter un plat</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Nom du plat" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <select value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-[#1a1d1a] text-white">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white col-span-2" />
            <input placeholder="Ingrédients (séparés par virgule)" value={form.ingredients}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Allergènes (séparés par virgule)" value={form.allergens}
              onChange={(e) => setForm({ ...form, allergens: e.target.value })}
              className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white" />
            <input placeholder="Prix (ex: 25.00)" type="number" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          <input type="text" placeholder="Rechercher un plat..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder:text-[#5f7468] font-medium" />
        </div>
        <div className="flex gap-2">
          {['Tous', ...categories].map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                filterCategory === cat
                  ? 'bg-[#c4a973] text-black'
                  : 'bg-white/40 dark:bg-white/5 text-white border border-[#c4a973]/20'
              }`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="px-5 py-4 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md text-white font-bold">
          {total} Plats
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-400 col-span-3">Aucun plat trouvé.</p>
        ) : (
          filtered.map((menu) => (
            <div key={menu.id} className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1a1d1a] flex items-center justify-center text-[#c4a973]">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-white">{menu.name}</h3>
                    {menu.session && (
                      <p className="text-xs text-[#c4a973]">{menu.session.title}</p>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black border ${categoryColors[menu.category] ?? ''}`}>
                  {menu.category}
                </span>
              </div>

              <p className="text-gray-400 text-sm">{menu.description}</p>

              {menu.ingredients.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Tag size={12} className="text-[#c4a973]" />
                    <span className="text-[10px] uppercase tracking-widest text-[#c4a973] font-black">Ingrédients</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {menu.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs">{ing}</span>
                    ))}
                  </div>
                </div>
              )}

              {menu.allergens.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <AlertTriangle size={12} className="text-red-400" />
                    <span className="text-[10px] uppercase tracking-widest text-red-400 font-black">Allergènes</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {menu.allergens.map((al, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg bg-red-500/10 text-red-300 text-xs border border-red-500/20">{al}</span>
                    ))}
                  </div>
                </div>
              )}

              {menu.price && (
                <div className="flex items-center gap-2 text-[#c4a973] font-black text-lg">
                  <Euro size={16} />
                  {menu.price.toFixed(2)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}