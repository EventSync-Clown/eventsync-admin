import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const totalParticipants = await prisma.participant.count()
  const totalSessions = await prisma.session.count()

  return NextResponse.json({
    stats: {
      participants: {
        total: totalParticipants,
        change: '+12%',
        description: 'Depuis le mois dernier'
      },
      sessions: {
        total: totalSessions,
        change: '+2',
        description: 'Nouvelles expériences'
      },
      engagement: {
        total: '96%',
        change: '+4.1%',
        description: 'Taux de satisfaction'
      },
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
  })
}