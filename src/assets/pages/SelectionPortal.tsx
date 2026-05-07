import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 font-sans">
      {/* En-tête avec les couleurs Nude et Gold */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-brand-nude mb-3 tracking-tighter">
          Event<span className="text-brand-gold">Sync</span>
        </h1>
        <p className="text-brand-nude/60 text-lg font-light uppercase tracking-widest">
          Portail d'authentification centralisé
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        
        {/* Carte Admin - Thème Doré */}
        <div 
          onClick={() => navigate('/admin')}
          className="group relative bg-white/5 border border-brand-gold/20 p-10 rounded-[2rem] hover:border-brand-gold transition-all cursor-pointer overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="text-6xl text-brand-gold">🛡️</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-gold mb-4">Administrateur</h2>
          <p className="text-brand-nude/70 mb-8 leading-relaxed">
            Accès sécurisé pour la gestion des événements, des utilisateurs et le monitoring du système.
          </p>
          <button className="w-full py-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-black rounded-xl font-black uppercase tracking-tighter transition-transform active:scale-95">
            Gérer la plateforme
          </button>
        </div>

        {/* Carte Client - Thème Argile */}
        <div 
          onClick={() => window.location.href = 'http://localhost:5174'}
          className="group relative bg-white/5 border border-brand-clay/20 p-10 rounded-[2rem] hover:border-brand-clay transition-all cursor-pointer overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="text-6xl text-brand-clay">👤</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-clay mb-4">Participant</h2>
          <p className="text-brand-nude/70 mb-8 leading-relaxed">
            Accédez aux conférences, gérez vos réservations et découvrez les fonctionnalités clients.
          </p>
          <button className="w-full py-4 bg-brand-clay hover:bg-brand-clay/90 text-brand-black rounded-xl font-black uppercase tracking-tighter transition-transform active:scale-95">
            Espace Client
          </button>
        </div>

      </div>

      {/* Pied de page avec le Vert Ardoise */}
      <div className="mt-20 flex items-center gap-4">
        <div className="h-px w-12 bg-brand-green/30"></div>
        <span className="text-brand-green font-mono text-xs tracking-[0.3em] uppercase">
          EventSync Security System &copy; 2026
        </span>
        <div className="h-px w-12 bg-brand-green/30"></div>
      </div>
    </div>
  );
};

export default SelectionPortal;