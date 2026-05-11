"use client";

import React, { useState } from 'react';
import { LayoutDashboard, ArrowRight, X, ShieldCheck, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminCardProps {
    isActive: boolean;
    onToggle: (state: boolean) => void;
}

export default function AdminCard({ isActive, onToggle }: AdminCardProps) {

    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (matricule && password) {
            router.push('/user'); 
        }
    };

    return (
        <div
            className={`relative overflow-hidden rounded-[32px] border border-white/40 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.10)] 
            ${isActive
                    ? 'p-12 scale-105 w-full max-w-2xl mx-auto bg-[#1a1d1a]'
                    : 'p-10 bg-[#1a1d1a] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] cursor-pointer group'}`}
            onClick={() => !isActive && onToggle(true)}
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#c4a973]/20 blur-3xl rounded-full"></div>

            {!isActive ? (
                <div className="animate-in fade-in duration-300">
                    <div className="relative w-20 h-20 rounded-3xl bg-[#c4a973]/10 border border-[#c4a973]/20 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-[#c4a973] group-hover:rotate-6">
                        <LayoutDashboard size={38} className="text-[#c4a973] group-hover:text-[#1a1d1a]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Organisateur</h2>
                    <p className="text-gray-300 leading-relaxed text-lg mb-10">
                        Pilotez les sessions, gérez les intervenants et suivez l’activité des participants.
                    </p>
                    <div className="inline-flex items-center gap-3 text-[#c4a973] font-semibold text-lg">
                        <span>Espace Authentifié</span>
                        <div className="w-10 h-10 rounded-full bg-[#c4a973]/10 border border-[#c4a973]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#c4a973]">
                            <ArrowRight size={20} className="group-hover:text-[#1a1d1a]" />
                        </div>
                    </div>
                </div>
            ) : (

                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(false); }}
                        className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10 transition-colors text-[#c4a973]"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-[#c4a973] flex items-center justify-center text-[#1a1d1a]">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Vérification Admin</h2>
                            <p className="text-gray-400">Entrez vos accès professionnels</p>
                        </div>
                    </div>

                    <form
                        className="space-y-5"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit} 
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1 flex items-center gap-2">
                                <Hash size={14} className="text-[#c4a973]" />
                                Numéro Matricule
                            </label>
                            <input
                                type="text"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}
                                placeholder="Ex: ADM-2024-001"
                                className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-[#c4a973] transition-all bg-white/5 text-white placeholder:text-gray-600"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Mot de passe</label>
                            <input
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-[#c4a973] transition-all bg-white/5 text-white placeholder:text-gray-600"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#c4a973] text-[#1a1d1a] py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#c4a973]/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <ShieldCheck size={20} />
                                Valider les accès
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-500 italic">
                        Réservé aux collaborateurs de l'entreprise autorisés.
                    </p>
                </div>
            )}
        </div>
    );
}