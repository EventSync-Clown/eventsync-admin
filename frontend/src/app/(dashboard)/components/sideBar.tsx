"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, CalendarClock, Users, Settings, LogOut, 
    PlusCircle, BarChart3, Sun, Moon, ChefHat, BookOpen
} from 'lucide-react';

const menuItems = [
    { group: "Principal", items: [
        { name: 'Tableau de bord', icon: LayoutDashboard, href: '/user' },
        { name: 'Emplois du temps', icon: CalendarClock, href: '/user/schedule' },
    ]},
    { group: "Événements", items: [
        { name: 'Gérer les sessions', icon: PlusCircle, href: '/user/manage-events' },
        { name: 'Participants', icon: Users, href: '/user/participants' },
    ]},
    { group: "Cuisine & Staff", items: [
        { name: 'Intervenants / Chefs', icon: ChefHat, href: '/user/chefs' },
        { name: 'Menus & Recettes', icon: BookOpen, href: '/user/menus' },
    ]},
    { group: "Analyse", items: [
        { name: 'Statistiques', icon: BarChart3, href: '/user/stats' },
        { name: 'Paramètres', icon: Settings, href: '/user/settings' },
    ]}
];

export default function SideBar() {
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <aside className={`w-72 h-full flex flex-col transition-colors duration-300 border-r ${
            isDarkMode ? 'bg-[#1a1d1a] border-white/10' : 'bg-white border-gray-200'
        }`}>
            {/* Section Logo Tendak'Anina */}
            <div className="p-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-20 h-20">
                        {/* Utilisation du logo présent dans /public */}
                        <Image 
                            src="/Tendak_anina_logo-removebg-preview.png" 
                            alt="Logo Tendak'Anina"
                            fill
                            className={`object-contain transition-all ${!isDarkMode ? 'brightness-0' : ''}`}
                        />
                    </div>
                    <h1 className={`text-xl font-black uppercase italic tracking-tighter text-center ${
                        isDarkMode ? 'text-white' : 'text-[#1a1d1a]'
                    }`}>
                        Tendak'Anina
                    </h1>
                </div>
            </div>

            {/* Navigation avec scroll bar personnalisée */}
            <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
                {menuItems.map((group) => (
                    <div key={group.group}>
                        <p className="px-4 text-[10px] uppercase tracking-widest text-[#c4a973] font-bold mb-2">
                            {group.group}
                        </p>
                        {group.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all mb-1
                                    ${isActive 
                                        ? 'bg-[#c4a973] text-[#1a1d1a] font-bold shadow-lg shadow-[#c4a973]/20' 
                                        : isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }
                                `}>
                                    <item.icon size={20} />
                                    <span className="text-sm">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer : Sélecteur de Thème & Déconnexion */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`flex items-center justify-between w-full p-2.5 mb-4 rounded-xl border transition-all ${
                        isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {isDarkMode ? <Moon size={18} className="text-[#c4a973]" /> : <Sun size={18} className="text-[#c4a973]" />}
                        <span className="text-xs font-bold uppercase tracking-wider">
                            {isDarkMode ? 'Sombre' : 'Clair'}
                        </span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-[#c4a973]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
                    </div>
                </button>

                <Link href="/roleSelection" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm">
                    <LogOut size={18} />
                    <span>Quitter l'espace</span>
                </Link>
            </div>
        </aside>
    );
}