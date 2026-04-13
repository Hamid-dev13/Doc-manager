# Super Cost Tracker

Application web de suivi et d'estimation de budgets. Organisez vos dépenses en budgets distincts, ajoutez des lignes de coût avec titre, description et prix, et consultez les totaux en temps réel.

## Fonctionnalites

- Creer plusieurs budgets (materiel, deplacement, logiciels, etc.)
- Ajouter des lignes de cout dans chaque budget
- Titre et description du budget editables en un clic
- Calcul automatique : total, cout moyen, nombre de lignes
- Suppression d'un budget avec toutes ses lignes

## Stack

- Frontend : React 18 + Vite, servi par nginx
- Backend : Express + better-sqlite3 (SQLite synchrone)
- Infra : Docker Compose

## Lancement

```bash
docker compose up --build
```

L'application est accessible sur `http://localhost:3057`.

La base de donnees est persistee dans `backend/data/sqlite.db` via un volume Docker.

## Structure

```
doc-manager/
├── backend/
│   ├── src/
│   │   ├── server.js          # Point d'entree Express
│   │   ├── db.js              # Init SQLite + migrations
│   │   └── routes/
│   │       ├── pages.js       # CRUD budgets
│   │       └── cards.js       # CRUD lignes de cout
│   └── data/                  # Volume SQLite (gitignore)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Navigation accueil / vue budget
│   │   ├── hooks/
│   │   │   ├── usePages.js
│   │   │   └── useCards.js
│   │   ├── components/
│   │   │   ├── EditableText.jsx
│   │   │   ├── PageCard.jsx
│   │   │   ├── AddPageModal.jsx
│   │   │   ├── AddCardModal.jsx
│   │   │   ├── CardGrid.jsx
│   │   │   └── DocCard.jsx
│   │   └── views/
│   │       ├── HomeView.jsx   # Grille des budgets
│   │       └── PageView.jsx   # Vue d'un budget
│   └── nginx.conf
├── docker-compose.yml
└── nginx-vps.conf
```

## API

### Budgets

| Methode | Route | Description |
|---------|-------|-------------|
| GET | /api/pages | Liste tous les budgets avec le nombre de lignes |
| POST | /api/pages | Cree un budget (`title`, `description`) |
| PATCH | /api/pages/:id | Modifie `title` et/ou `description` |
| DELETE | /api/pages/:id | Supprime le budget et toutes ses lignes |

### Lignes de cout

| Methode | Route | Description |
|---------|-------|-------------|
| GET | /api/pages/:pageId/cards | Liste les lignes d'un budget |
| POST | /api/pages/:pageId/cards | Cree une ligne (`title`, `description`, `price`) |
| DELETE | /api/cards/:id | Supprime une ligne |

## Deploiement VPS

Le fichier `nginx-vps.conf` contient un exemple de configuration Nginx a placer dans `/etc/nginx/sites-available/`. Remplacer `doc-manager.example.com` par le vrai domaine.

Pour HTTPS, utiliser certbot :

```bash
certbot --nginx -d votre-domaine.com
```

## Developpement local (sans Docker)

Backend :

```bash
cd backend
npm install
npm run dev   # node --watch, port 3001
```

Frontend :

```bash
cd frontend
npm install
VITE_API_URL=http://localhost:3001/api npm run dev   # port 5173
```
