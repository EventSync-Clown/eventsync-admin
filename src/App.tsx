import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Carte de test */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-center transform transition hover:scale-105 duration-300">
        
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          EventSync Admin
        </h1>

        <p className="text-slate-400 text-lg mb-6">
          Si vous voyez le texte en dégradé et ce fond sombre, <br />
          <span className="text-emerald-400 font-mono">Tailwind CSS fonctionne !</span>
        </p>

        {/* Bouton avec animation de pulsation */}
        <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-lg bg-blue-600 hover:bg-blue-500 transition-all group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative">Dashboard en ligne</span>
        </button>

      </div>

      {/* Indicateur de statut en bas */}
      <div className="mt-8 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-slate-500 text-sm uppercase tracking-widest">Système Prêt</span>
      </div>
    </div>
  );
}

export default App;