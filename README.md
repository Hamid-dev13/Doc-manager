# Doc Manager

Application web de gestion de documents organisés en pages. Chaque page contient une grille de cards avec titre, description et prix. Les titres et descriptions de pages sont éditables directement en cliquant dessus.

## Stack

- Frontend : React 18 + Vite, servi par nginx
- Backend : Express + better-sqlite3 (SQLite synchrone)
- Infra : Docker Compose

## Lancement

```bash
docker compose up --build
```

L'application est accessible sur `http://localhost:3057`.

La base de données est persistée dans `backend/data/sqlite.db` via un volume Docker.

## Structure

```
doc-manager/
├── backend/
│   ├── src/
│   │   ├── server.js          # Point d'entrée Express
│   │   ├── db.js              # Init SQLite + migrations
│   │   └── routes/
│   │       ├── pages.js       # CRUD pages
│   │       └── cards.js       # CRUD cards (par page)
│   └── data/                  # Volume SQLite (gitignore)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Navigation home / vue page
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
│   │       ├── HomeView.jsx   # Grille des pages
│   │       └── PageView.jsx   # Vue d'une page
│   └── nginx.conf
├── docker-compose.yml
└── nginx-vps.conf             # Config Nginx pour deploiement VPS
```

## API

### Pages

| Methode | Route | Description |
|---------|-------|-------------|
| GET | /api/pages | Liste toutes les pages avec le nombre de cards |
| POST | /api/pages | Cree une page (`title`, `description`) |
| PATCH | /api/pages/:id | Modifie `title` et/ou `description` |
| DELETE | /api/pages/:id | Supprime la page et toutes ses cards |

### Cards

| Methode | Route | Description |
|---------|-------|-------------|
| GET | /api/pages/:pageId/cards | Liste les cards d'une page |
| POST | /api/pages/:pageId/cards | Cree une card (`title`, `description`, `price`) |
| DELETE | /api/cards/:id | Supprime une card |

## Deploiement VPS

Le fichier `nginx-vps.conf` contient un exemple de configuration Nginx a placer dans `/etc/nginx/sites-available/` sur le serveur. Remplacer `doc-manager.example.com` par le vrai domaine.

Pour HTTPS, utiliser certbot :

```bash
certbot --nginx -d doc-manager.example.com
```

Puis decommenter le bloc HTTPS dans `nginx-vps.conf`.

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
