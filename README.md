# EventSync Admin

## 📌 Présentation

**EventSync** est une plateforme de gestion d'événements et d'interactions en temps réel.

Ce projet est développé dans un cadre académique et est destiné à gérer un événement composé de plusieurs **ateliers de cuisine à Madagascar**.

Ce dépôt correspond au **Back Office Administrateur**, permettant de gérer :

* 📅 Les événements
* 🕒 Les sessions
* 🏛️ Les salles
* 👨‍🍳 Les intervenants
* ❓ Les questions et réponses des participants

---

# 🛠️ Stack Technique

## Frontend Admin

* React Admin
* Tailwind CSS

## Backend API

* Next.js
* GraphQL Yoga
* Prisma ORM
* PostgreSQL

---

# 📁 Structure du projet

```text
eventsync-admin/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/EventSync-Clown/eventsync-admin.git
cd eventsync-admin
```

---

# 🗄️ Configuration de la base de données

Créer une base PostgreSQL nommée :

```sql
CREATE DATABASE eventsync;
```

Puis connecter PostgreSQL :

```sql
\c eventsync
```

Créer les tables suivantes.

## Table Admin

```sql
CREATE TABLE Admin (
    id VARCHAR(25) PRIMARY KEY,
    matricule VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Table Participant

```sql
CREATE TABLE Participant (
    id VARCHAR(25) PRIMARY KEY,
    matricule VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Table Session

```sql
CREATE TABLE Session (
    id VARCHAR(25) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    chef VARCHAR(255),
    menuItems TEXT[],
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔐 Configuration des variables d'environnement

Se placer dans le dossier du backend :

```bash
cd backend
```

Créer un fichier `.env`

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/eventsync"
JWT_SECRET="eventsync_secret_2024"
```

Créer également un fichier `.env.local`

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/eventsync"
JWT_SECRET="eventsync_secret_2024"
```

---

# 📦 Installation des dépendances

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd ../frontend
npm install
```

---

# ▶️ Lancer le projet

Le frontend et le backend doivent être démarrés séparément.

## 1. Lancer le Backend

Depuis le dossier `backend` :

```bash
npm run dev -- -p 4000
```

Le serveur GraphQL sera disponible sur :

```
http://localhost:4000
```

---

## 2. Lancer le Frontend

Depuis le dossier `frontend` :

```bash
npm run dev
```

Puis ouvrir :

```
http://localhost:3000/roleSelection
```

---

# 🌿 Organisation Git

La branche **main** contient uniquement les versions stables du projet.

Le développement doit toujours être effectué sur une branche dédiée.

## Créer une branche

```bash
git checkout -b feat/nom-feature
```

Exemples :

```bash
feat/admin-auth
feat/session-management
feat/speaker-management
fix/prisma-schema
docs/readme
```

---

## Envoyer sa branche

```bash
git push origin nom-de-la-branche
```

Exemple :

```bash
git push origin feat/admin-auth
```

---

## Pull Request

Une fois le développement terminé :

1. Créer une Pull Request vers `main`.
2. Faire relire le code.
3. Fusionner uniquement après validation.

⚠️ Aucun développement ne doit être effectué directement sur la branche `main`.

---

# 📄 Licence

Projet développé dans le cadre d'un usage académique.

Tous droits réservés aux membres du projet EventSync.
