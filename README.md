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

# Structure du Projet

```bash
eventsync/
│
├── eventsync-admin/
    └── eventsync-admin/
        └── prisma/
        └── public/
        └── src
└── README.md
│
└── eventsync-client
```

# Licence
Usage académique pour le moment 
