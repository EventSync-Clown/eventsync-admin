"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, CalendarClock, Users, LogOut,
    PlusCircle, ChefHat, BookOpen,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const menuItems = [
    {
        group: "Principal", items: [
            { name: 'Dashboard', icon: LayoutDashboard, href: '/user' },
            { name: 'Planning', icon: CalendarClock, href: '/user/schedule' },
        ]
    },
    {
        group: "Événements", items: [
            { name: 'Sessions', icon: PlusCircle, href: '/user/manage-events' },
            { name: 'Participants', icon: Users, href: '/user/participants' },
        ]
    },
    {
        group: "Cuisine", items: [
            { name: 'Chefs', icon: ChefHat, href: '/user/chefs' },
            { name: 'Menus', icon: BookOpen, href: '/user/menus' },
        ]
    },
];

export default function SideBar() {
    const pathname = usePathname();
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <aside className={`h-full flex flex-col transition-all duration-500 border-r border-white/10 relative overflow-hidden bg-[#1a1d1a] ${isMinimized ? 'w-20' : 'w-72'
            }`}>

            <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="absolute top-1/2 -right-3 z-50 w-6 h-12 bg-[#c4a973] text-[#1a1d1a] flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                {isMinimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className={`p-6 transition-all duration-500 relative z-10 ${isMinimized ? 'items-center' : ''}`}>
                <div className="flex flex-col items-center gap-4">
                    <div className={`relative transition-all duration-500 ${isMinimized ? 'w-30 h-30' : 'w-50 h-50'}`}>
                        <Image
                            src="/Tendak_anina_logo-removebg-preview.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {!isMinimized && (
                        <p className="text-lg font-black uppercase italic tracking-tighter text-[#c4a973]">
                            Tendak'anina
                        </p>
                    )}
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-6 overflow-y-auto relative z-10 custom-scrollbar">
                {menuItems.map((group) => (
                    <div key={group.group}>
                        {!isMinimized && (
                            <p className="px-4 text-[10px] uppercase tracking-widest text-[#c4a973] font-black mb-3">
                                {group.group}
                            </p>
                        )}
                        {group.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className={`
                                    flex items-center rounded-2xl transition-all duration-300 mb-1 group
                                    ${isMinimized ? 'justify-center p-3' : 'gap-3 px-4 py-3'}
                                    ${isActive
                                        ? 'bg-[#c4a973] text-[#1a1d1a] shadow-xl shadow-[#c4a973]/10'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}>
                                    <item.icon size={20} className={isActive ? 'text-[#1a1d1a]' : ''} />
                                    {!isMinimized && <span className="text-sm font-bold truncate">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5 relative z-10">
                <Link href="/roleSelection" className={`flex items-center text-red-500 hover:bg-red-500/10 transition-all rounded-2xl ${isMinimized ? 'justify-center p-2' : 'gap-3 px-4 py-3'
                    }`}>
                    <LogOut size={18} />
                    {!isMinimized && <span className="font-black text-xs uppercase">Quitter</span>}
                </Link>
            </div>
        </aside>
    );
}