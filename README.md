FindFriendAPI — Overview README
📋 Project Summary
FindFriendAPI is a backend REST API (Node.js + TypeScript) that simulates a pet adoption platform. It demonstrates Clean Architecture, SOLID principles, Domain-Driven Design (DDD) ideas, and Test-Driven Development (TDD). Organizations (ONGs) can register and manage pets; users can search for adoptable animals by city and characteristics.

🎯 Purpose & Vision
Model real-world adoption rules and constraints.
Apply Clean Architecture with clear separation of concerns.
Use SOLID principles to guide design and maintainability.
Decouple domain rules from frameworks and persistence.
Enable fast, reliable testing via in-memory repositories and deterministic tests.
🏗️ Architecture Overview
Pattern: Clean Architecture

Layers:

HTTP Layer (Interface): Fastify controllers & routes
Application Layer (Use Cases): Business rules & orchestration
Domain Layer (Entities): Core models & contracts
Infrastructure Layer (Repositories): Prisma ORM & in-memory implementations
Key decisions:

Dependency Inversion — domain defines repository interfaces; infra implements them
Repository Pattern — abstracts persistence (Prisma + in-memory)
Factory Pattern — centralizes dependency wiring for use cases
Boundary validation with Zod; domain remains framework-free
🧩 Domain Model
Core entities and rules:

Organization (ORG)

Attributes: id, name, email, password_hash, address, city, state, zip_code, phone
Business rules:
Email must be unique
Passwords must be encrypted
Only authenticated ORGs can register pets
Pet

Attributes: id, name, age, size, energy_level, independence_level, environment, description, org_id
Business rules:
Every pet belongs to an ORG
Pets are created only by authenticated ORGs
Pets are searchable by city and characteristics
Address / Location

City-based searches to show pets from nearby organizations
Relationship: Organization (1) ──< Pet (N)
⚙️ Core Features & Use Cases
Organization management

Register organization
Authenticate organization (JWT)
Pet management

Register pet (authenticated ORG)
List pets by city
Filter pets by:
Age
Size
Energy level
Independence level
Environment
Search behavior:

City-based results to prioritize nearby organizations
🛠️ Technology Stack
Runtime: Node.js
Language: TypeScript
HTTP Framework: Fastify
Database: PostgreSQL
ORM: Prisma
Authentication: JWT
Validation: Zod
Testing: Vitest (unit)
E2E Testing: Supertest
Encryption: bcryptjs
🧪 Testing Strategy
Unit tests

Focus on use cases and domain logic
Use in-memory repositories for speed and determinism
Command: npm test
Integration / E2E tests

Full HTTP flow with Prisma + test DB
Verify authentication, filters, and flows
Command: npm run test:e2e
Test infrastructure

In-memory repositories for unit tests
Custom Prisma test environment for E2E
Coverage reports available
📂 Project Structure (example)
find-friend-api/ ├── prisma/ │ ├── migrations/ │ └── schema.prisma ├── src/ │ ├── env/ │ ├── http/ │ │ ├── controllers/ │ │ └── middlewares/ │ ├── lib/ │ ├── repositories/ │ │ ├── in-memory/ │ │ └── prisma/ │ ├── use-cases/ │ │ └── factories/ │ ├── domain/ │ ├── utils/ │ ├── app.ts │ └── server.ts ├── .env.example ├── docker-compose.yml ├── package.json └── tsconfig.json

🚀 Getting Started
Prerequisites:

Node.js (LTS)
Docker & Docker Compose
npm or yarn
Quickstart:

git clone https://github.com/AlekLima/FindFriendAPI
cd FindFriendAPI
npm install
cp .env.example .env (edit values)
Start DB:

docker-compose up -d
Run migrations:

npx prisma migrate dev
Start server (development):

npm run dev
Available Scripts
npm run dev — start development server with hot reload
npm run build — build for production
npm start — start production server
npm test — run unit tests
npm run test:e2e — run end-to-end tests
npm run test:coverage — generate coverage report
🔐 Non-Functional Requirements
Security: encrypted passwords, JWT authentication
Scalability: Clean Architecture and repository abstraction
Maintainability: strong typing, SOLID-guided design
Testability: isolation of business logic with in-memory repos
📝 API Overview (suggested endpoints)
POST /orgs — Register organization
POST /sessions — Authenticate organization (returns JWT)
POST /pets — Register pet (auth required)
GET /pets — List pets by city and filters (query params: city, age, size, energy_level, independence_level, environment)
(Actual route names may vary — check src/http/routes)

🎓 Learning Outcomes
Practical application of SOLID principles in a backend service
Clean Architecture with domain-first design
Test-Driven Development: unit-first, then integration tests
Decoupling business logic from frameworks and databases
Using Zod for validation and Prisma for type-safe DB access
🔮 Future Enhancements
Adoption request flow and adopter accounts
Image upload for pets
Pagination on list endpoints
Advanced geolocation (radius-based search)
Swagger / OpenAPI documentation
Admin dashboards
📚 References
Clean Architecture — Robert C. Martin
SOLID Principles — Robert C. Martin
Domain-Driven Design — Eric Evans
If you'd like, I can:

Translate this README to Portuguese
Rework it to be more recruiter-focused
Add architecture diagrams (SVG / PlantUML)
Map each use case to the existing tests (TDD mapping)
Which of those would you like next?

✨ Translate this README to Portuguese
🔍 Rework it to be more recruiter-focused
📌 Add architecture diagrams (SVG/PlantUML)
🧪 Add a TDD section that maps each use case to tests
