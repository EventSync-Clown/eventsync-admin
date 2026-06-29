import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const participants = await prisma.participant.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ participants, total: participants.length })
}

export async function POST(req: Request) {
  const { matricule, password, name, email, phone } = await req.json()

  if (!matricule || !password || !name) {
    return NextResponse.json({ message: 'Champs manquants' }, { status: 400 })
  }

  const existing = await prisma.participant.findUnique({ where: { matricule } })
  if (existing) {
    return NextResponse.json({ message: 'Matricule déjà utilisé' }, { status: 409 })
  }

  const bcryptjs = require('bcryptjs')
  const hashed = bcryptjs.hashSync(password, 10)

  const participant = await prisma.participant.create({
    data: { matricule, password: hashed, name, email, phone }
  })

  return NextResponse.json(participant, { status: 201 })
}