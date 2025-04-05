🧠 Project Overview
FindFriendAPI is a backend REST API designed to simulate a system where users can create profiles, log in, and find friends by filtering by gender, age, city, etc.

It uses .NET 6 with Entity Framework Core, SQL Server, and follows a layered architecture: Domain, Application, and Infrastructure.

📦 Technologies Used
ASP.NET Core 6

Entity Framework Core

SQL Server

AutoMapper

JWT Authentication

Swagger

xUnit (for testing)

🧱 Architecture (DDD-inspired)
Project is divided into layers:

1. Domain
Entities like User, Friend

Enumerations like Gender, States

Domain interfaces (e.g., IUserRepository)

2. Application
Use cases like:

Registering a user

Authenticating (login)

Finding friends with filters

DTOs and services to handle business logic

3. Infrastructure
Repository implementations using Entity Framework

DB context

Dependency Injection configuration

4. API
Controllers that expose endpoints:

api/user

api/auth

api/friends

Swagger for API docs

🔐 Authentication
JWT is used for securing routes.

Only authenticated users can access the "Find Friends" feature.

🧪 Testing
xUnit is set up for testing.

Some unit tests in FindFriendTests test services like filtering users.

🚀 Example Use Cases
POST /api/user
Register a new user.

POST /api/auth
Authenticate and return a JWT token.

GET /api/friends
Find users based on query filters like city, gender, age range.

Application Rules
 (x)  It must be possible to register a pet

 (x) It must be possible to list all available pets for adoption in a city

 (x) It must be possible to filter pets by their characteristics

 (x) It must be possible to view details of a pet available for adoption

 (x) It must be possible to register as an ORG (organization)

 (x) It must be possible to log in as an ORG

Business Rules
 (x) To list pets, it's mandatory to provide the city

 (x) An ORG must have an address and a WhatsApp number

 (x) A pet must be associated with an ORG

 (x) The user who wants to adopt will contact the ORG via WhatsApp

 (x) All filters besides the city are optional

 (x) For an ORG to access the application as an admin, it must be logged in
