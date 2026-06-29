import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const sessions = await prisma.session.findMany({
    orderBy: { startTime: 'asc' }
  })

  const planning = sessions.map(session => ({
    id: session.id,
    title: session.title,
    date: new Date(session.startTime).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    }),
    time: new Date(session.startTime).toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit'
    }),
    location: 'À définir',
    participants: 0,
    status: 'Confirmé',
  }))

  return NextResponse.json({ sessions: planning, total: planning.length })
}