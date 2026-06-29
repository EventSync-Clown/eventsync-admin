import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const sessions = await prisma.session.findMany({
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ]
  })
  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  const { title, description, day, start, end } = await req.json()

  if (!title || !start || !end) {
    return NextResponse.json({ message: 'Champs manquants' }, { status: 400 })
  }

  const startHour = parseInt(start.split(':')[0])
  const endHour = parseInt(end.split(':')[0])

  // Correction automatique si début >= fin
  const correctedEndHour = startHour >= endHour ? startHour + 1 : endHour

  const dayMap: Record<string, number> = {
    'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4,
    'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0
  }

  const now = new Date()
  const currentDay = now.getDay()
  const targetDay = dayMap[day] ?? 1
  const diff = (targetDay - currentDay + 7) % 7 || 7

  const startDate = new Date(now)
  startDate.setDate(now.getDate() + diff)
  startDate.setHours(startHour, 0, 0, 0)

  const endDate = new Date(startDate)
  endDate.setHours(correctedEndHour, 0, 0, 0)

  const session = await prisma.session.create({
    data: {
      title,
      description,
      startTime: startDate,
      endTime: endDate,
      status: 'PENDING',
      isPinned: true,
    }
  })

  return NextResponse.json(session, { status: 201 })
}