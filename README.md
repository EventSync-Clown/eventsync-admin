# EventSync Admin

Interface d’administration de la plateforme **EventSync**.

Cette application permet aux organisateurs de gérer les événements, sessions, salles et intervenants via une interface moderne construite avec **React Admin**.

---

#  Objectif

L’admin EventSync permet :

- La gestion complète des événements
- La gestion des sessions
- La gestion des intervenants (speakers)
- La gestion des salles
- Le suivi des questions des participants
- L’organisation du planning des conférences

Cette interface est destinée uniquement aux **organisateurs**.

---

#  Stack Technique

## Frontend Admin

- React
- React Admin
- TailwindCSS
- React Router
- Axios

## Backend API

- Next.js API / Node.js / Java (selon implémentation backend)

## Base de données

- PostgreSQL

## ORM

- Prisma / TypeORM / Sequelize

---

#  Structure du Projet

```bash
admin/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── resources/
│   │   ├── events/
│   │   ├── sessions/
│   │   ├── speakers/
│   │   ├── rooms/
│   │   └── questions/
│   ├── providers/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

# Installation 
```bash
1- git clone https://github.com/EventSync-Clown/eventsync-admin.git
2- npm install
3- npm run dev
```

---
# Licence 
Projet Académique - Usage éducatif