"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, CalendarDays } from 'lucide-react';
import { ParticipantCard } from '../components/participationCard';
import AdminCard from '../components/adminCard';

export default function RoleSelectionPage() {
    const [isParticipantActive, setIsParticipantActive] = useState(false);
    const [isAdminActive, setIsAdminActive] = useState(false);

    const toggleParticipant = (val: boolean) => {
        setIsParticipantActive(val);
        if (val) setIsAdminActive(false);
    };

    const toggleAdmin = (val: boolean) => {
        setIsAdminActive(val);
        if (val) setIsParticipantActive(false);
    };

    const isAnyFormOpen = isParticipantActive || isAdminActive;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f6f3ee]">

            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#c4a973]/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] bg-[#5f7468]/20 blur-3xl rounded-full"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">

                {!isAnyFormOpen && (
                    <div className="contents animate-in fade-in duration-700">
                        <div className="mb-6 flex items-center gap-2 border border-[#c4a973]/30 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full shadow-sm">
                            <Sparkles className="text-[#c4a973]" size={18} />
                            <span className="text-sm font-medium text-[#1a1d1a]">
                                Expérience événementielle premium
                            </span>
                        </div>

                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                            <div className="relative w-24 h-24 md:w-28 md:h-28">
                                <Image
                                    src="/Tendak_anina_logo-removebg-preview.png"
                                    alt="Logo Tendak'anina"
                                    fill
                                    className="object-contain relative z-10 drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="text-center max-w-2xl mb-14">
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#1a1d1a] leading-tight">
                                Bienvenue sur <span className="text-[#c4a973]">Tendak'Anina</span>
                            </h1>
                            <p className="mt-5 text-lg md:text-xl text-[#5f7468] leading-relaxed">
                                Une plateforme moderne pour vivre vos événements avec élégance.
                            </p>
                        </div>
                    </div>
                )}


                <div className={`grid gap-8 transition-all duration-700 ease-in-out ${isAnyFormOpen ? 'max-w-2xl w-full grid-cols-1' : 'max-w-6xl w-full md:grid-cols-2'}`}>

                    {!isAdminActive && (
                        <ParticipantCard
                            isActive={isParticipantActive}
                            onToggle={toggleParticipant}
                        />
                    )}

                    {!isParticipantActive && (
                        <AdminCard
                            isActive={isAdminActive}
                            onToggle={toggleAdmin}
                        />
                    )}
                </div>

                <div className="mt-16 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#1a1d1a]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#5f7468]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#c4a973]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#e2c2b3]"></div>
                </div>
            </div>
        </div>
    );
}