import { NextResponse } from 'next/server'

// Données statiques pour l'instant — on branchera la DB après
export async function GET() {
  const data = {
    stats: {
      participants: { total: 1284, change: '+12%', description: 'Depuis le mois dernier' },
      sessions: { total: 8, change: '+2', description: 'Nouvelles expériences' },
      engagement: { total: '96%', change: '+4.1%', description: 'Taux de satisfaction' },
    },
    nextEvent: {
      title: 'Dégustation Premium',
      date: '14 Mai',
      description: 'Une expérience gastronomique raffinée avec des invités exclusifs et des ateliers culinaires immersifs.',
    },
    recentActivities: [
      { id: 1, title: 'Nouvelle réservation premium', time: 'Il y a 5 min' },
      { id: 2, title: 'Session gastronomique validée', time: 'Il y a 18 min' },
      { id: 3, title: 'Ajout d\'un nouveau chef', time: 'Il y a 1 heure' },
    ],
  }

  return NextResponse.json(data)
}