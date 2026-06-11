import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Hash fixe de 'admin123' — ne change pas au redémarrage
const ADMIN = {
  matricule: 'ADM-2024-001',
  password: '$2b$10$TyxvECGyQdRdZry2dv2e9uTEvL5UfeRNbdkFbRsPIzR9jR5vihJGu',
  name: 'Super Admin'
}

export async function POST(req: Request) {
  const { matricule, password } = await req.json()

  if (matricule !== ADMIN.matricule) {
    return NextResponse.json(
      { message: 'Matricule incorrect' },
      { status: 401 }
    )
  }

  const valid = bcryptjs.compareSync(password, ADMIN.password)
  if (!valid) {
    return NextResponse.json(
      { message: 'Mot de passe incorrect' },
      { status: 401 }
    )
  }

  const token = jwt.sign(
    { matricule, name: ADMIN.name },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  )

  return NextResponse.json({ token, name: ADMIN.name })
}