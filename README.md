# DevShowcase API

Backend REST em Node.js, Express, Sequelize e PostgreSQL/Supabase.

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie `.env` a partir de `.env.example` e informe a URL do Transaction Pooler do Supabase em `DATABASE_URL`.

3. Inicie a API:

```bash
node src/app.js
```

A API fica disponível em `http://localhost:3000`.

## Endpoints

- `POST /api/profiles` - `{ "name": "Ana", "email": "ana@example.com", "bio": "...", "github": "..." }`
- `GET /api/profiles/:id`
- `POST /api/technologies` - `{ "name": "Node.js" }`
- `GET /api/technologies`
- `POST /api/projects` - `{ "title": "Projeto", "description": "...", "url": "https://...", "profileId": 1, "technologyIds": [1] }`
- `GET /api/projects`

## Modelo relacional

- Um `Profile` possui vários `Project`.
- Um `Project` possui várias `Technology`, por meio de `project_technologies`.
- Um `Project` possui vários `Feedback`.

## Testes

```bash
npm test
```
