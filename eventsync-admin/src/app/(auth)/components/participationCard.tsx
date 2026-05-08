"use client";

import React from 'react';
import { Users, ArrowRight, X } from 'lucide-react';

interface ParticipantCardProps {
    isActive: boolean;
    onToggle: (state: boolean) => void;
}

export const ParticipantCard = ({ isActive, onToggle }: ParticipantCardProps) => {
    return (
        <div 
            className={`relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.06)] 
            ${isActive ? 'p-12 scale-105 w-full max-w-2xl mx-auto' : 'p-10 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] cursor-pointer group'}`}
            onClick={() => !isActive && onToggle(true)}
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#5f7468]/10 blur-3xl rounded-full"></div>

            {!isActive ? (
                <div className="animate-in fade-in duration-300">
                    <div className="relative w-20 h-20 rounded-3xl bg-[#5f7468]/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-[#5f7468] group-hover:rotate-6">
                        <Users size={38} className="text-[#5f7468] group-hover:text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1a1d1a] mb-4">Participant</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10">
                        Consultez les événements en temps réel, échangez avec la communauté et profitez d’une expérience immersive.
                    </p>
                    <div className="inline-flex items-center gap-3 text-[#5f7468] font-semibold text-lg">
                        <span>Découvrir l'événement</span>
                        <div className="w-10 h-10 rounded-full bg-[#5f7468]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#5f7468]">
                            <ArrowRight size={20} className="group-hover:text-white" />
                        </div>
                    </div>
                </div>
            ) : (
              
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggle(false); }}
                        className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-[#5f7468]"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-[#5f7468] flex items-center justify-center text-white">
                            <Users size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-[#1a1d1a]">Connexion</h2>
                            <p className="text-[#5f7468]">Identifiez-vous pour continuer</p>
                        </div>
                    </div>

                    <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Prénom</label>
                                <input type="text" placeholder="Prénom" className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#5f7468] transition-all bg-white/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Nom</label>
                                <input type="text" placeholder="Nom" className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#5f7468] transition-all bg-white/50" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Adresse Email</label>
                            <input type="email" placeholder="votre@email.com" className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#5f7468] transition-all bg-white/50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Mot de passe</label>
                            <input type="password" placeholder="••••••••" className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#5f7468] transition-all bg-white/50" />
                        </div>
                        <button className="w-full mt-4 bg-[#5f7468] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#5f7468]/20 hover:scale-[1.02] active:scale-95 transition-all">
                            Accéder à l'expérience
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};