import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  const { matricule, password } = await req.json()

  const participant = await prisma.participant.findUnique({ where: { matricule } })

  if (!participant) {
    return NextResponse.json({ message: 'Matricule incorrect' }, { status: 401 })
  }

  const valid = bcryptjs.compareSync(password, participant.password)
  if (!valid) {
    return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 })
  }

  const token = jwt.sign(
    { id: participant.id, matricule: participant.matricule, role: 'participant' },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  )

  return NextResponse.json({ token, name: participant.name, role: 'participant' })
}