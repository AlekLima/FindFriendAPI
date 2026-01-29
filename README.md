# FindFriendAPI

[FindFriendAPI] — A clean, testable backend for a pet adoption platform (Node.js + TypeScript)

---

Beautiful, minimal, and focused: this README highlights what the project is, why it exists, how it's organized, and how to get started quickly.

Table of contents
- [Why this project](#why-this-project)
- [Key features](#key-features)
- [Architecture & tech](#architecture--tech)
- [Quickstart](#quickstart)
- [Scripts](#scripts)
- [API overview & examples](#api-overview--examples)
- [Testing strategy](#testing-strategy)
- [Project structure (high level)](#project-structure-high-level)
- [Roadmap & next steps](#roadmap--next-steps)
- [Contributing](#contributing)
- [Credits & references](#credits--references)

Why this project
----------------
FindFriendAPI is a domain-first REST API that simulates a pet adoption platform. It was designed as a learning and demonstration project to exercise:
- Clean Architecture and separation of concerns
- SOLID principles and Domain-Driven Design ideas
- Test-driven development with deterministic unit tests
- Clear boundaries between domain logic and framework/persistence code

Key features
------------
- Organization management: register and authenticate organizations (JWT)
- Pet management: create pets (auth required), list and filter pets
- Search: city-based pet search with characteristic filters (age, size, energy, independence, environment)
- Test-friendly: in-memory repositories for fast deterministic unit tests; Prisma + test DB for E2E
- Strong validation with Zod; secure passwords with bcryptjs

Architecture & tech
-------------------
Pattern: Clean Architecture (Layered)
- HTTP Layer: Fastify controllers & routes
- Application Layer: Use cases (business orchestration)
- Domain Layer: Entities and interfaces (framework-agnostic)
- Infrastructure: Prisma (Postgres), in-memory implementations for tests

Stack:
- Runtime: Node.js
- Language: TypeScript
- HTTP: Fastify
- DB: PostgreSQL (Prisma ORM)
- Auth: JWT
- Validation: Zod
- Tests: Vitest (unit), Supertest (E2E)
- Encryption: bcryptjs
- Container: Docker + Docker Compose for DB in development

Quickstart
----------
Prerequisites:
- Node.js (LTS)
- Docker & Docker Compose
- npm or yarn

Get started locally:
```bash
git clone https://github.com/AlekLima/FindFriendAPI
cd FindFriendAPI
npm install
cp .env.example .env   # update values (JWT secret, DB url, etc.)
docker-compose up -d   # start PostgreSQL
npx prisma migrate dev # run migrations
npm run dev            # start dev server (hot reload)
```

Scripts
-------
- npm run dev — development server (Fastify + ts-node/tsup)
- npm run build — build for production
- npm start — run built server
- npm test — unit tests (Vitest)
- npm run test:e2e — end-to-end tests (Supertest + test DB)
- npm run test:coverage — coverage report

API overview & examples
-----------------------
Note: actual route names and request bodies are in `src/http/routes` and controllers.

Register organization (example)
```bash
curl -X POST http://localhost:3333/orgs \
  -H "Content-Type: application/json" \
  -d '{"name":"Happy Shelter","email":"shelter@example.com","password":"secret","address":"1234 St","city":"Lisbon","state":"PT","zip_code":"1000","phone":"+351"}'
```

Authenticate (get JWT)
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"shelter@example.com","password":"secret"}'
# => { "token": "<JWT>" }
```

Create pet (authenticated)
```bash
curl -X POST http://localhost:3333/pets \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Luna","age":"baby","size":"small","energy_level":"high","independence_level":"low","environment":"apartment","description":"Playful kitten","city":"Lisbon"}'
```

List pets (filters & city)
```bash
curl "http://localhost:3333/pets?city=Lisbon&age=baby&size=small"
```

Filtering query params:
- city (required for prioritized nearby results)
- age, size, energy_level, independence_level, environment

Testing strategy
----------------
- Unit tests: focus on domain and use cases using in-memory repositories for determinism and speed. Run with:
  npm test
- E2E tests: full HTTP flow using Prisma + test DB. Run with:
  npm run test:e2e
- Use TDD: unit-first, then integration/E2E

Project structure (high level)
------------------------------
find-friend-api/
- prisma/ — schema + migrations
- src/
  - env/ — environment config
  - http/
    - controllers/
    - routes/
    - middlewares/
  - use-cases/ — application logic
  - domain/ — entities, value objects, repository contracts
  - infra/
    - prisma/ — Prisma repository implementations
    - in-memory/ — memory repositories for tests
  - tests/ — unit & e2e tests

Roadmap & next steps
--------------------
Planned enhancements:
- Adoption requests / adopter accounts
- Image upload for pets (S3)
- Pagination on list endpoints
- Radius-based geolocation search
- Swagger / OpenAPI docs
- Admin dashboard

Contributing
------------
Contributions are welcome! Suggested workflow:
1. Fork the repo and create a feature branch
2. Follow the existing architecture and tests-first approach
3. Run tests and add unit tests for new logic
4. Open a Pull Request with a clear description of changes

If you'd like, I can:
- Translate this README to Portuguese
- Rework it for recruiter-facing presentation
- Add architecture diagrams (SVG / PlantUML)
- Map each use case to the existing tests (TDD mapping)

Credits & references
--------------------
- Inspired by: Clean Architecture (Robert C. Martin), DDD (Eric Evans), SOLID principles
- Tools & libs: Fastify, Prisma, Zod, Vitest, Supertest, bcryptjs

---

What I did
---------
I rewrote the README into a clean, scannable, and attractive format: added a table of contents, clarified quickstart steps and scripts, gave concise API examples, and organized architecture, testing and roadmap information.

What's next
----------
I can:
- generate a Portuguese translation,
- produce a recruiter-focused README variant,
- add PlantUML/SVG architecture diagrams,
- produce a TDD mapping of use cases to tests (I can scan the test files and produce the mapping if you want).
