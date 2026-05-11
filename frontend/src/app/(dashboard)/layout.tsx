import SideBar from "./components/sideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1a1d1a]">
      {/* Sidebar fixe à gauche */}
      <SideBar />

      {/* Zone de contenu qui défile si besoin */}
      <main className="flex-1 overflow-y-auto p-8 text-white">
        {children}
      </main>
    </div>
  );
}