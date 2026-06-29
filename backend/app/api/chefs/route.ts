import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const chefs = await prisma.chef.findMany({
    include: {
      sessions: {
        include: {
          session: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const result = chefs.map(chef => ({
    id: chef.id,
    name: chef.name,
    specialty: chef.specialty,
    bio: chef.bio,
    phone: chef.phone,
    email: chef.email,
    photoUrl: chef.photoUrl,
    sessions: chef.sessions.map(cs => ({
      id: cs.session.id,
      title: cs.session.title,
      date: new Date(cs.session.startTime).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    }))
  }))

  return NextResponse.json({ chefs: result, total: result.length })
}

export async function POST(req: Request) {
  const { name, specialty, bio, phone, email, photoUrl } = await req.json()

  if (!name || !specialty) {
    return NextResponse.json({ message: 'Nom et spécialité requis' }, { status: 400 })
  }

  const chef = await prisma.chef.create({
    data: { name, specialty, bio, phone, email, photoUrl }
  })

  return NextResponse.json(chef, { status: 201 })
}