# EventSync - Tendak'anina


##  Présentation du projet

**EventSync** est une plateforme de gestion d’événements et d’interactions en temps réel.

Dans notre cas, le projet sera utilisé pour gérer un événement regroupant plusieurs **ateliers de cuisine à Madagascar**.

Ce dépôt concerne principalement :

- le **Back Office Admin**
- la gestion des :
  - événements
  - sessions
  - salles
  - intervenants
  - questions/réponses

---

# Stack Technique

## Admin 

- React Admin
- TailwindCSS

## Backend API

- Next.js
- GraphQL Yoga
- Prisma ORM
- PostgreSQL

---

#  Organisation Git

## Branche principale

La branche `main` sert uniquement à :

- stocker la version stable du projet
- initialiser la structure globale
- centraliser les merges validés

⚠️ On ne développe **jamais directement sur `main`**.

---

## Workflow Git

### 1. Cloner le projet

```bash
git clone https://github.com/EventSync-Clown/eventsync-admin.git
cd eventsync-admin
```

---

### 2. Créer sa branche personnelle

Exemple :

```bash
git checkout -b feat/admin-auth
```

Convention recommandée :

```bash
feat/nom-feature
fix/nom-correction
docs/nom-doc
```

Exemples :

```bash
feat/session-management
feat/speaker-page
fix/prisma-schema
```

---

### 3. Push sa branche

```bash
git push origin feat/admin-auth
```

---

### 4. Ouvrir une Pull Request vers `main`

Après validation :

- merge sur `main`
- suppression éventuelle de la branche

---

### 5. Démarrer le projet 
Après clonnage du répo : 

```bash
git clone https://github.com/EventSync-Clown/eventsync-admin.git
cd eventsync-admin
cd eventsync-admin
```

```bash
npm run dev
localhost:3000/roleSelection
```

---

# Structure du Projet

```bash
eventsync/
│
├── eventsync-admin/
    └── eventsync-admin/
        └── prisma/
        └── public/
        └── src/
            └── app/
               └── (auth)
                  └── components/
                  └── roleSelection/
               └── dahboard    
│                
└── README.md
│
└── eventsync-client
```

# Licence
Usage académique pour le moment 


Pour configurer le backend : 

créer d'abord votre database avec le nom "eventsync"
et créer ensuite les tables suivants 

eventsync=# CREATE TABLE Admin (
    id VARCHAR(25) PRIMARY KEY,
    matricule VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE
eventsync=# CREATE TABLE Participant (
    id VARCHAR(25) PRIMARY KEY,
    matricule VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE
eventsync=# CREATE TABLE Session (
    id VARCHAR(25) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    chef VARCHAR(255),
    menuItems TEXT[],
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE

après avoir créer tout ça il faut 

cd eventsync-admin 
cd backend
npm install 
il faut créer un .env avec DATABASE_URL="postgresql://postgres:votre_mdp@localhost:5432/eventsync" et .env.local DATABASE_URL="postgresql://postgres:votre_mdp@localhost:5432/eventsync"
JWT_SECRET="eventsync_secret_2024"


Pour lancer le projet maintenant, il faut lancer un par un le front et le backend 
pour le backend : npm run dev -- -p 4000