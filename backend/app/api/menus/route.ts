import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const menus = await prisma.menu.findMany({
    include: { session: true },
    orderBy: { createdAt: 'desc' }
  })

  const result = menus.map(menu => ({
    id: menu.id,
    name: menu.name,
    description: menu.description,
    category: menu.category,
    ingredients: menu.ingredients,
    allergens: menu.allergens,
    price: menu.price,
    session: menu.session ? {
      id: menu.session.id,
      title: menu.session.title,
    } : null,
    createdAt: menu.createdAt,
  }))

  return NextResponse.json({ menus: result, total: result.length })
}

export async function POST(req: Request) {
  const { name, description, category, ingredients, allergens, price, sessionId } = await req.json()

  if (!name || !description || !category) {
    return NextResponse.json({ message: 'Nom, description et catégorie requis' }, { status: 400 })
  }

  const menu = await prisma.menu.create({
    data: {
      name,
      description,
      category,
      ingredients: ingredients ?? [],
      allergens: allergens ?? [],
      price: price ? parseFloat(price) : null,
      sessionId: sessionId ?? null,
    }
  })

  return NextResponse.json(menu, { status: 201 })
}