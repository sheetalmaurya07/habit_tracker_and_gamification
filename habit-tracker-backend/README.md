# Habit Tracker and Gamification - Backend

Spring Boot REST API backend for the Habit Tracker and Gamification project.

## Technologies
- Java 17
- Spring Boot
- Spring Security
- JWT
- MySQL
- JPA/Hibernate
- Maven
- Docker

## Before running

1. Make sure MySQL is installed and running.
2. Open `src/main/resources/application.properties`.
3. Change `spring.datasource.password` if your MySQL password is not `root`.

## Run with Maven

```bash
mvn clean install
mvn spring-boot:run
```

Backend:
http://localhost:8080

## API endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login

### Users
GET /api/users/{id}
PUT /api/users/{id}

### Habits
GET /api/habits?userId={id}
POST /api/habits?userId={id}
PUT /api/habits/{id}/complete
PUT /api/habits/{id}/reset
DELETE /api/habits/{id}

### Progress
GET /api/progress/{userId}

### Achievements
GET /api/achievements/{userId}

## Register example

POST http://localhost:8080/api/auth/register

```json
{
  "name": "Sheetal",
  "email": "sheetal@gmail.com",
  "password": "123456"
}
```

## Login example

POST http://localhost:8080/api/auth/login

```json
{
  "email": "sheetal@gmail.com",
  "password": "123456"
}
```

Copy the returned JWT token and use it as a Bearer token for protected endpoints.

## Docker

Build the project first:

```bash
mvn clean package
```

Then:

```bash
docker compose up --build
```
