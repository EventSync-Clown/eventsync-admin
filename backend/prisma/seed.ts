import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admins
  await prisma.admin.upsert({
    where: { matricule: 'ADM-2024-001' },
    update: {},
    create: {
      matricule: 'ADM-2024-001',
      password: bcryptjs.hashSync('admin123', 10),
      name: 'Jean-Baptiste Rakoto'
    }
  })

  await prisma.admin.upsert({
    where: { matricule: 'ADM-2024-002' },
    update: {},
    create: {
      matricule: 'ADM-2024-002',
      password: bcryptjs.hashSync('admin123', 10),
      name: 'Marie Rasoanindrina'
    }
  })

  // Participants
  const participantsData = [
    { matricule: 'PAR-2024-001', name: 'Hery Andriamampionona', email: 'hery@gmail.com', phone: '0321234567' },
    { matricule: 'PAR-2024-002', name: 'Noro Rakotomalala', email: 'noro@gmail.com', phone: '0337654321' },
    { matricule: 'PAR-2024-003', name: 'Fanja Rabemananjara', email: 'fanja@gmail.com', phone: '0341122334' },
    { matricule: 'PAR-2024-004', name: 'Tiana Andrianasolo', email: 'tiana@gmail.com', phone: '0349988776' },
    { matricule: 'PAR-2024-005', name: 'Lalaina Razafindrakoto', email: 'lalaina@gmail.com', phone: '0321234599' },
    { matricule: 'PAR-2024-006', name: 'Voahangy Rasolofo', email: 'voahangy@gmail.com', phone: '0337654399' },
    { matricule: 'PAR-2024-007', name: 'Rivo Andrianaivo', email: 'rivo@gmail.com', phone: '0341122399' },
    { matricule: 'PAR-2024-008', name: 'Zo Rakotonirina', email: 'zo@gmail.com', phone: '0349988799' },
  ]

  for (const p of participantsData) {
    await prisma.participant.upsert({
      where: { matricule: p.matricule },
      update: {},
      create: { ...p, password: bcryptjs.hashSync('part123', 10) }
    })
  }

  // Sessions
  const session1 = await prisma.session.upsert({
    where: { id: 'session-001' },
    update: {},
    create: {
      id: 'session-001',
      title: 'Dégustation Premium',
      description: 'Une expérience gastronomique raffinée avec des invités exclusifs et des ateliers culinaires immersifs.',
      startTime: new Date('2026-07-14T18:30:00'),
      endTime: new Date('2026-07-14T22:00:00'),
    }
  })

  const session2 = await prisma.session.upsert({
    where: { id: 'session-002' },
    update: {},
    create: {
      id: 'session-002',
      title: 'Atelier Gastronomique',
      description: 'Apprenez les techniques de cuisine malagasy moderne avec nos chefs étoilés.',
      startTime: new Date('2026-07-18T10:00:00'),
      endTime: new Date('2026-07-18T13:00:00'),
    }
  })

  const session3 = await prisma.session.upsert({
    where: { id: 'session-003' },
    update: {},
    create: {
      id: 'session-003',
      title: 'Masterclass Chef',
      description: 'Une masterclass exclusive animée par des chefs internationaux sur la fusion franco-malagasy.',
      startTime: new Date('2026-07-22T15:00:00'),
      endTime: new Date('2026-07-22T18:00:00'),
    }
  })

  const session4 = await prisma.session.upsert({
    where: { id: 'session-004' },
    update: {},
    create: {
      id: 'session-004',
      title: 'Brunch Signature',
      description: 'Un brunch dominical avec des produits locaux et des recettes signatures de la maison.',
      startTime: new Date('2026-07-25T11:30:00'),
      endTime: new Date('2026-07-25T14:30:00'),
    }
  })

  // Chefs
  const chef1 = await prisma.chef.upsert({
    where: { email: 'pierre.martin@tendakanina.com' },
    update: {},
    create: {
      name: 'Pierre Martin',
      specialty: 'Cuisine française gastronomique',
      bio: 'Chef étoilé avec 15 ans d\'expérience dans les plus grands restaurants parisiens. Passionné par la fusion franco-malagasy.',
      email: 'pierre.martin@tendakanina.com',
      phone: '0321112233',
    }
  })

  const chef2 = await prisma.chef.upsert({
    where: { email: 'solo.rakoto@tendakanina.com' },
    update: {},
    create: {
      name: 'Solo Rakotoarisoa',
      specialty: 'Cuisine malagasy traditionnelle',
      bio: 'Maître de la cuisine malagasy authentique, Solo perpétue les traditions culinaires des hautes terres avec une touche moderne.',
      email: 'solo.rakoto@tendakanina.com',
      phone: '0337778899',
    }
  })

  const chef3 = await prisma.chef.upsert({
    where: { email: 'amina.hassan@tendakanina.com' },
    update: {},
    create: {
      name: 'Amina Hassan',
      specialty: 'Pâtisserie et desserts',
      bio: 'Pâtissière de renom formée à Paris et Tokyo, Amina crée des desserts qui marient les saveurs de l\'océan Indien.',
      email: 'amina.hassan@tendakanina.com',
      phone: '0349990011',
    }
  })

  const chef4 = await prisma.chef.upsert({
    where: { email: 'luc.dupont@tendakanina.com' },
    update: {},
    create: {
      name: 'Luc Dupont',
      specialty: 'Cuisine fusion internationale',
      bio: 'Ancien chef du Ritz Paris, Luc apporte une vision internationale à la gastronomie malagasy.',
      email: 'luc.dupont@tendakanina.com',
      phone: '0321445566',
    }
  })

  // ChefSessions
  await prisma.chefSession.createMany({
    data: [
      { chefId: chef1.id, sessionId: session1.id },
      { chefId: chef2.id, sessionId: session1.id },
      { chefId: chef1.id, sessionId: session3.id },
      { chefId: chef3.id, sessionId: session2.id },
      { chefId: chef4.id, sessionId: session3.id },
      { chefId: chef2.id, sessionId: session4.id },
      { chefId: chef3.id, sessionId: session4.id },
    ],
    skipDuplicates: true
  })

  // Menus
  await prisma.menu.createMany({
    data: [
      {
        name: 'Foie Gras Poêlé aux Épices Malagasy',
        description: 'Foie gras de canard poêlé, accompagné d\'une réduction de vanille de Sambava et de gingembre frais.',
        category: 'Entrée',
        ingredients: ['Foie gras', 'Vanille', 'Gingembre', 'Miel', 'Pain brioché'],
        allergens: ['Gluten', 'Lactose'],
        price: 28.00,
        sessionId: session1.id,
      },
      {
        name: 'Ravitoto au Bœuf Angus',
        description: 'Plat traditionnel malagasy revisité avec du bœuf Angus premium, feuilles de manioc braisées au lait de coco.',
        category: 'Plat',
        ingredients: ['Bœuf Angus', 'Feuilles de manioc', 'Lait de coco', 'Ail', 'Gingembre'],
        allergens: ['Fruits à coque'],
        price: 35.00,
        sessionId: session1.id,
      },
      {
        name: 'Soupe Chinoise aux Crevettes',
        description: 'Bouillon délicat aux crevettes du canal des Pangalanes, vermicelles de riz et légumes croquants.',
        category: 'Entrée',
        ingredients: ['Crevettes', 'Vermicelles de riz', 'Citronnelle', 'Coriandre', 'Piment'],
        allergens: ['Crustacés', 'Gluten'],
        price: 18.00,
        sessionId: session2.id,
      },
      {
        name: 'Zébu Grillé Sauce Romazava',
        description: 'Côte de zébu grillée sur braises de bois de rose, sauce romazava aux brèdes mafane et tomates.',
        category: 'Plat',
        ingredients: ['Côte de zébu', 'Brèdes mafane', 'Tomates', 'Oignons', 'Curcuma'],
        allergens: [],
        price: 42.00,
        sessionId: session2.id,
      },
      {
        name: 'Millefeuille Vanille Bourbon',
        description: 'Millefeuille croustillant à la crème pâtissière infusée à la vanille Bourbon de Madagascar.',
        category: 'Dessert',
        ingredients: ['Pâte feuilletée', 'Crème pâtissière', 'Vanille Bourbon', 'Sucre glace'],
        allergens: ['Gluten', 'Œufs', 'Lactose'],
        price: 14.00,
        sessionId: session1.id,
      },
      {
        name: 'Cocktail Litchi Passion',
        description: 'Cocktail sans alcool aux litchis frais de Tamatave, fruit de la passion et eau pétillante.',
        category: 'Boisson',
        ingredients: ['Litchi', 'Fruit de la passion', 'Eau pétillante', 'Menthe', 'Citron vert'],
        allergens: [],
        price: 8.00,
        sessionId: session1.id,
      },
      {
        name: 'Filet de Capitaine en Croûte',
        description: 'Filet de capitaine pêché localement, en croûte d\'herbes fraîches, purée de patate douce à la vanille.',
        category: 'Plat',
        ingredients: ['Capitaine', 'Herbes fraîches', 'Patate douce', 'Vanille', 'Citron'],
        allergens: ['Poisson', 'Gluten'],
        price: 38.00,
        sessionId: session3.id,
      },
      {
        name: 'Fondant Chocolat Sambirano',
        description: 'Fondant au chocolat noir 75% de la région Sambirano, cœur coulant au caramel salé.',
        category: 'Dessert',
        ingredients: ['Chocolat Sambirano', 'Beurre', 'Œufs', 'Sucre', 'Caramel salé'],
        allergens: ['Gluten', 'Œufs', 'Lactose'],
        price: 12.00,
        sessionId: session3.id,
      },
    ],
    skipDuplicates: true
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())