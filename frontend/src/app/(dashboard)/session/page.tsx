"use client";

import React, { useState, useEffect } from "react";

type Session = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

export default function SessionPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "", description: "", day: "Lundi", start: "08:00", end: "09:00",
  })

  useEffect(() => {
  fetch('http://localhost:4000/api/sessions')
    .then(res => res.json())
    .then(data => {
      // Gérer les deux cas : tableau direct ou objet avec sessions
      if (Array.isArray(data)) {
        setSessions(data)
      } else {
        setSessions(data.sessions ?? [])
      }
    })
}, [])

  const handleSubmit = async () => {
    if (!form.title || !form.start || !form.end) return
    setLoading(true)
    setError("")

    const res = await fetch('http://localhost:4000/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      const newSession = await res.json()
      setSessions([newSession, ...sessions])
      setForm({ title: "", description: "", day: "Lundi", start: "08:00", end: "09:00" })
    } else {
      setError("Erreur lors de la création")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8 space-y-8">
      <h1 className="text-4xl font-black text-[#1a1d1a] dark:text-white">
        Sessions
      </h1>

      {/* Formulaire */}
      <div className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
        <h2 className="text-xl font-black text-[#1a1d1a] dark:text-white">Créer une session</h2>

        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 rounded-xl border border-[#c4a973]/20 bg-transparent text-white"
        />

        <div className="grid grid-cols-2 gap-3">
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="p-3 rounded-xl border border-[#c4a973]/20 bg-[#1a1d1a] text-white">
            {days.map((d) => <option key={d}>{d}</option>)}
          </select>

          <select value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })}
            className="p-3 rounded-xl border border-[#c4a973]/20 bg-[#1a1d1a] text-white">
            {Array.from({ length: 13 }).map((_, i) => {
              const h = (8 + i).toString().padStart(2, "0") + ":00"
              return <option key={h}>{h}</option>
            })}
          </select>

          <select value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })}
            className="p-3 rounded-xl border border-[#c4a973]/20 bg-[#1a1d1a] text-white col-span-2">
            {Array.from({ length: 13 }).map((_, i) => {
              const h = (8 + i).toString().padStart(2, "0") + ":00"
              return <option key={h}>{h}</option>
            })}
          </select>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-[#c4a973] text-black font-black py-3 rounded-xl disabled:opacity-60">
          {loading ? 'Création...' : 'Ajouter la session'}
        </button>
      </div>

      {/* Liste des sessions */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-[#1a1d1a] dark:text-white">Sessions existantes</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-400">Aucune session pour le moment.</p>
        ) : (
          sessions.map(session => (
            <div key={session.id} className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20">
              <h3 className="font-black text-white text-lg">{session.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{session.description}</p>
              <p className="text-[#c4a973] text-xs mt-2">
                {new Date(session.startTime).toLocaleString()} → {new Date(session.endTime).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}