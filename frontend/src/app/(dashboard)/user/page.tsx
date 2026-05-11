export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400">Bienvenue dans votre espace de gestion EventSync.</p>
      </div>

      {/* Cartes de test pour l'affichage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 h-32 animate-pulse">
            <div className="w-12 h-4 bg-[#c4a973]/20 rounded mb-4"></div>
            <div className="w-24 h-8 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}