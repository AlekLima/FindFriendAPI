🐾 FindFriendAPI
A backend REST API (Node.js + TypeScript) that simulates a pet adoption platform. Built to demonstrate Clean Architecture, SOLID principles, Domain-Driven Design (DDD), and Test-Driven Development (TDD).

📋 Project Summary
FindFriendAPI lets organizations (ONGs) register pets and lets users search for adoptable animals by city and characteristics. The project focuses on a decoupled, testable architecture with fast in-memory tests and a Prisma + PostgreSQL integration for end-to-end validation.

🎯 Purpose & Vision
Model real-world adoption rules and constraints
Apply Clean Architecture with separation of concerns
Use SOLID principles to guide design
Decouple business rules from frameworks and databases
Enable fast, reliable testing via in-memory repositories
🏗️ Architecture Overview
Pattern: Clean Architecture

Layers:

HTTP Layer (Interface): Fastify controllers & routes
Application Layer (Use Cases): Business rules & orchestration
Domain Layer (Entities): Core models & contracts
Infrastructure Layer (Repositories): Prisma ORM & other persistence implementations
Key decisions:

Dependency Inversion — domain defines repository interfaces, infra provides implementations
Repository Pattern — abstracts persistence, supports Prisma + in-memory repos
Factory Pattern — centralizes dependency injection for use cases
Validation at boundaries using Zod (domain remains framework-free)
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
Pets can only be created by authenticated ORGs
Pets are searchable by characteristics and location
Address / Location

Searches are city-based to ensure pets are shown from nearby organizations
Entity relationship: Organization (1) ──< Pet (N)

⚙️ Core Features & Use Cases
Organization management
Register organization
Authenticate organization (JWT)
Pet management
Register pet
List pets by city
Filter pets by characteristics:
Age
Size
Energy level
Environment
Independence level
🛠️ Technology Stack
Runtime: Node.js
Language: TypeScript
HTTP Framework: Fastify
Database: PostgreSQL
ORM: Prisma
Authentication: JWT
Validation: Zod
Testing: Vitest (unit tests)
E2E Testing: Supertest
Encryption: bcryptjs
🧪 Testing Strategy
Unit tests
Focus on use cases
Use in-memory repositories for speed and determinism
Integration / E2E tests
Full HTTP flow using Prisma + test DB
Verify authentication, filters, and flows
Test infrastructure
In-memory repositories
Custom Prisma test environment
Coverage reports available
📂 Project Structure
find-friend-api/ ├── prisma/ │ ├── migrations/ │ └── schema.prisma ├── src/ │ ├── env/ │ ├── http/ │ │ ├── controllers/ │ │ └── middlewares/ │ ├── repositories/ │ │ ├── in-memory/ │ │ ├── prisma/ │ │ └── interfaces/ │ ├── use-cases/ │ │ ├── factories/ │ │ └── *.ts │ ├── utils/ │ ├── app.ts │ └── server.ts ├── .env.example ├── docker-compose.yml ├── package.json └── tsconfig.json

🚀 Getting Started
Prerequisites:

Node.js (LTS)
Docker & Docker Compose
npm or yarn
Quickstart:

bash
git clone https://github.com/AlekLima/FindFriendAPI
cd FindFriendAPI
npm install
cp .env.example .env

# Start DB
docker-compose up -d

# Run migrations
npx prisma migrate dev

# Start server (development)
npm run dev
Environment and scripts are configured in package.json and .env.example.

🔐 Non-Functional Requirements
Security: encrypted passwords, JWT authentication
Scalability: Clean Architecture, repository abstraction
Maintainability: strong typing, SOLID principles
Testability: isolation of business logic and in-memory repos
🔮 Future Enhancements
Planned improvements:

Adoption request flow
User (adopter) accounts
Image upload for pets
Pagination for list endpoints
Advanced geolocation search
Swagger / OpenAPI documentation
Admin dashboards
📚 References
Clean Architecture — Robert C. Martin
SOLID Principles — Robert C. Martin
Domain-Driven Design — Eric Evans
If you'd like, I can:

✨ Translate this README to Portuguese
🔍 Rework it to be more recruiter-focused
📌 Add architecture diagrams (SVG/PlantUML)
🧪 Add a TDD section that maps each use case to tests
