import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, context: Context) {
  const { id } = await context.params
  const { status, isPinned } = await req.json()

  const allowed = ['PENDING', 'CONFIRMED', 'REJECTED']

  if (status && !allowed.includes(status)) {
    return NextResponse.json({ message: 'Statut invalide' }, { status: 400 })
  }

  const session = await prisma.session.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(isPinned !== undefined && { isPinned }),
    }
  })

  return NextResponse.json(session)
}

export async function DELETE(_req: Request, context: Context) {
  const { id } = await context.params
  await prisma.session.delete({ where: { id } })
  return NextResponse.json({ message: 'Session supprimée' })
}