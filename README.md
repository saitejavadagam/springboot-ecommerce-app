# ShopEase Ecommerce 🛒

A high-performance e-commerce ecosystem featuring a React + Vite frontend and a Spring Boot 4.0 backend, orchestrated with Docker Compose.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🌟 Tech Stack
* **Frontend:** React 18, Vite, Axios, Tailwind CSS.

* **Backend:** Spring Boot 4.0.2 (Project Leyden), JJWT 0.12.6.

* **Database:** MySQL 8.0.

* **Infrastructure:** Docker, Docker Compose, Multi-stage builds.

## 🏗 System Architecture
The application uses a decoupled architecture where the frontend consumes a stateless REST API.

* **Frontend:** Client-side routing with React Router and state management.

* **Backend:** 3-tier architecture (Controller → Service → Repository).

* **Security:** JWT Authentication filter intercepting requests via Spring Security.

---

## 🔑 Environment Configuration

### 1. Frontend (/frontend/.env)

```bash
# URL of the backend service (Spring Boot)
# For local development, this usually points to localhost:8080
VITE_API_BASE_URL=http://localhost:8080
```

### 2. Backend (/backend/.env)

```bash
# Database Configuration
# Note: Use 'db' as host for Docker, 'localhost' for local manual run
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/ecommerce?allowPublicKeyRetrieval=true&useSSL=false
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_database_password

# JPA / Hibernate Settings
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=true

# Security Settings
# Generate a strong, random 256-bit string for the secret
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRATION=3600000

# Server Settings
SERVER_PORT=8080

```

---

## 🚀 Getting Started (Docker Compose)
The easiest way to spin up the entire stack (Frontend, Backend, and Database) is using the root-level docker-compose.yml.

### 1. Clone the repo:

```Bash
git clone https://github.com/your-repo/shopease.git
cd shopease
```
### 2. Build and Launch:

```Bash
docker-compose up --build
```

### 3. Access the services:

* **Frontend:** `http://localhost:5173`

* **Backend API:** `http://localhost:8080`

* **MySQL:** `http://localhost:3306`

---

## 🛠 Manual Development Setup

If you prefer running the services individually for faster hot-reloading:

### Frontend (Vite)
```Bash
cd frontend
npm install
npm run dev
```

### Backend (Spring Boot)
> [!IMPORTANT]
> Ensure your local MySQL is running and the database `ecommerce` exists.

```Bash
cd backend
mvn clean install
mvn spring-boot:run
```
---
---

# Springboot Backend

A modern REST API built on the **Spring Boot 4.0** framework, utilizing high-performance security patterns and JWT-based stateless authentication.

## 🌟 Features
* **Spring Boot 4.0.2**: Leveraging the latest improvements in Project Leyden for faster startup times and optimized runtime.
* **Stateless Security**: Custom JWT implementation using JJWT 0.12.6.
* **Containerized**: Multi-stage Docker builds with automated testing.
* **Observability**: Integrated Spring Boot Actuator for health monitoring.

---

## 🏗 Project Architecture
The project follows a modular layered architecture to ensure separation of concerns:

* **Config**: Security filter chain and JWT filter setup.
* **Controller**: REST API entry points.
* **Service**: Business logic and authentication handling.
* **Repository**: Data access layer (Spring Data JPA).
* **DTO**: Data Transfer Objects for clean API requests/responses.

---
