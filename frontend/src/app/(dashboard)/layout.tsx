import SideBar from "./components/sideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    /* 
       bg-white : Fond pour toutes les pages en mode clair
       dark:bg-[#1a1d1a] : Fond pour toutes les pages en mode sombre
    */
    <div className="flex h-screen bg-white dark:bg-[#1a1d1a] transition-colors duration-500">
      <SideBar />
      <main className="flex-1 overflow-y-auto p-8 relative">
          {/* La grille de fond est ici pour être visible sur TOUTES les pages */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10">
            {children}
          </div>
      </main>
    </div>
  );
}