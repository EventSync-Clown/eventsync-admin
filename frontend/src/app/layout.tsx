import type { Metadata } from "next";
import "./global.css"; 

export const metadata: Metadata = {
  title: "EventSync - Admin",
  description: "Gestion d'événements en temps réel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}