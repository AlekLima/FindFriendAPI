🐾 FindFriendAPI – General Overview
📋 Project Summary

FindFriendAPI is a backend REST API built with Node.js and TypeScript that simulates a pet adoption platform. The system allows organizations (ONGs) to register pets and enables users to search for adoptable pets based on location and characteristics.

This project was developed as a hands-on application of SOLID principles, Clean Architecture, Domain-Driven Design (DDD), and Test-Driven Development (TDD).

🎯 Purpose & Vision

The main goal of this project is to demonstrate how to build a scalable, testable, and well-architected backend by:

Modeling real-world adoption rules and constraints

Applying Clean Architecture with strict separation of concerns

Using SOLID principles to guide design decisions

Decoupling business rules from frameworks and databases

Enabling fast and reliable testing through in-memory repositories

🏗️ Architectural Overview
Architecture Pattern: Clean Architecture

The project is structured following Clean Architecture, ensuring that business rules remain independent of frameworks and infrastructure.

┌─────────────────────────────────────────────┐
│          HTTP Layer (Interface)             │
│     Fastify Controllers & Routes            │
├─────────────────────────────────────────────┤
│       Application Layer (Use Cases)         │
│     Business Rules & Orchestration          │
├─────────────────────────────────────────────┤
│          Domain Layer (Entities)            │
│     Core Models & Contracts                 │
├─────────────────────────────────────────────┤
│    Infrastructure Layer (Repositories)      │
│   Prisma ORM & Database Implementations     │
└─────────────────────────────────────────────┘

🔑 Key Architectural Decisions

Dependency Inversion

The domain defines repository interfaces

Infrastructure provides concrete implementations

Repository Pattern

Abstracts persistence logic

Enables Prisma + In-Memory repositories

Factory Pattern

Centralizes dependency injection for use cases

Domain-Driven Design (DDD)

Business rules live inside use cases

Entities represent real-world concepts

Validation at Boundaries

Zod schemas validate HTTP requests

Domain remains free from validation frameworks

🏢 Domain Model
Core Entities

The system revolves around three main entities:

🧑 Organization (ORG)

Represents an NGO or shelter responsible for pet adoption.

Attributes

id

name

email

password_hash

address

city

state

zip_code

phone

Business Rules

Email must be unique

Passwords must be encrypted

Only authenticated ORGs can register pets

🐶 Pet

Represents an adoptable animal.

Attributes

id

name

age

size

energy_level

independence_level

environment

description

org_id

Business Rules

Every pet belongs to an ORG

Pets can only be created by authenticated ORGs

Pets are searchable by characteristics and location

📍 Address / Location Logic

Searches are city-based

Ensures pets are shown only from nearby organizations

Entity Relationships
Organization (1) ──────< Pet (N)

⚙️ Core Features & Use Cases
Organization Management

Register Organization

Authenticate Organization (JWT)

Pet Management

Register Pet

List Pets by City

Filter Pets by Characteristics

Age

Size

Energy level

Environment

Independence level

🛠️ Technology Stack
Core Dependencies
Category	Technology	Purpose
Runtime	Node.js	JavaScript runtime
Language	TypeScript	Static typing
Framework	Fastify	HTTP server
Database	PostgreSQL	Relational database
ORM	Prisma	Type-safe persistence
Auth	JWT	Authentication
Validation	Zod	Request validation
Testing	Vitest	Unit testing
E2E Testing	Supertest	HTTP testing
Encryption	bcryptjs	Password hashing
🧪 Testing Strategy

The project follows TDD principles and uses multiple testing layers:

1. Unit Tests

Focus on use cases

Use in-memory repositories

Fast, deterministic, isolated

2. Integration / E2E Tests

Full HTTP flow testing

Prisma + test database

Validates authentication, filters, and flows

3. Test Infrastructure

In-memory repositories

Custom Prisma test environment

Coverage reports available

📂 Project Structure
find-friend-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── env/
│   ├── http/
│   │   ├── controllers/
│   │   └── middlewares/
│   ├── repositories/
│   │   ├── in-memory/
│   │   ├── prisma/
│   │   └── interfaces
│   ├── use-cases/
│   │   ├── factories/
│   │   └── *.ts
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── docker-compose.yml
├── package.json
└── tsconfig.json

🚀 Getting Started
Prerequisites

Node.js (LTS)

Docker & Docker Compose

npm or yarn

Installation
git clone https://github.com/AlekLima/FindFriendAPI
cd FindFriendAPI
npm install

Environment Setup
cp .env.example .env

Start Database
docker-compose up -d

Run Migrations
npx prisma migrate dev

Start Server
npm run dev

🔐 Non-Functional Requirements

Security

Encrypted passwords

JWT authentication

Scalability

Clean Architecture

Repository abstraction

Maintainability

Strong typing

SOLID principles

Testability

Full isolation of business logic

🧠 Learning Outcomes

This project demonstrates:

Practical Clean Architecture

SOLID principles applied in real use cases

Domain-driven backend modeling

Test-first development with Vitest

Dependency inversion and decoupled systems

Production-ready backend patterns

🔮 Future Enhancements

Adoption request flow

User (adopter) accounts

Image upload for pets

Pagination

Advanced geolocation search

Swagger / OpenAPI documentation

Admin dashboards

📚 References

Clean Architecture – Robert C. Martin

SOLID Principles – Robert C. Martin

Domain-Driven Design – Eric Evans

If you want, I can also:

✨ Adapt this README to Portuguese

🔍 Make it more recruiter-focused

📌 Add architecture diagrams

🧪 Add a TDD section per use case
