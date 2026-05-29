"use client";

import React, { useState } from "react";

type Session = {
  id: number;
  title: string;
  description: string;
  day: string;
  start: string;
  end: string;
};

type Props = {
  onCreate: (session: Session) => void;
};

const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

export default function CreateSessionForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    day: "Lundi",
    start: "08:00",
    end: "09:00",
  });

  const handleSubmit = () => {
    if (!form.title || !form.start || !form.end) return;

    const newSession: Session = {
      id: Date.now(),
      ...form,
    };

    onCreate(newSession);

    setForm({
      title: "",
      description: "",
      day: "Lundi",
      start: "08:00",
      end: "09:00",
    });
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-[#c4a973]/20 backdrop-blur-md space-y-4">
      <h2 className="text-xl font-black text-[#1a1d1a] dark:text-white">
        Créer une session
      </h2>

      <input
        placeholder="Titre"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-3 rounded-xl border border-[#c4a973]/20 bg-transparent"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-3 rounded-xl border border-[#c4a973]/20 bg-transparent"
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          value={form.start}
          onChange={(e) => setForm({ ...form, start: e.target.value })}
          className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent"
        >
          {Array.from({ length: 13 }).map((_, i) => {
            const h = (8 + i).toString().padStart(2, "0") + ":00";
            return <option key={h}>{h}</option>;
          })}
        </select>

        <select
          value={form.end}
          onChange={(e) => setForm({ ...form, end: e.target.value })}
          className="p-3 rounded-xl border border-[#c4a973]/20 bg-transparent col-span-2"
        >
          {Array.from({ length: 13 }).map((_, i) => {
            const h = (8 + i).toString().padStart(2, "0") + ":00";
            return <option key={h}>{h}</option>;
          })}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#c4a973] text-black font-black py-3 rounded-xl"
      >
        Ajouter la session
      </button>
    </div>
  );
}