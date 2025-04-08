# Reimbursement Application

A full-stack web application for submitting and managing reimbursement receipts.  
Built with .NET Core 8 (Web API) for the backend and Angular for the frontend. PostgreSQL is used as the database.

---

## Online Demo

If you'd like to preview the application without setting it up locally, you can try the live demo hosted on a Google Cloud Platform instance.  
The entire application has been containerized with Docker and deployed for demonstration purposes:
**Demo URL:** [https://reimbursement-app.xuedo.ng](https://reimbursement-app.xuedo.ng)

---

## Deployment Guide

This project supports two deployment modes:

- [1. Deploy via Docker + Docker Compose](#1-deploy-via-docker--docker-compose)
- [2. Run locally in debug mode (requires .NET 8, Node.js, Angular CLI, PostgreSQL)](#2-run-locally-in-debug-mode)

---

## 1. Deploy via Docker + Docker Compose (Recommended)

### Prerequisites

- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose: https://docs.docker.com/compose/
- WSL (if on Windows): https://learn.microsoft.com/en-us/windows/wsl/install

### Steps

1. Clone the repository:

```bash
git clone https://github.com/steven-panxd/ReimbursementApp.git
cd ReimbursementApp
```

2. Give execution permision to build.sh, run.sh, and exit.sh

```
sudo chmod +x build.sh run.sh exit.sh
```

2. Build and start the containers:

```bash
sudo ./build.sh
```

```bash
sudo ./run.sh
```

3. Access the app:

- Link: http://localhost:80

4. Stop the app:

```bash
sudo ./exit.sh
```

---

## 2. Run locally in debug mode

In this mode, you will be able to access the backend Swagger page, which is good for debugging.

### Prerequisites

- .NET 8 SDK: https://dotnet.microsoft.com/en-us/download/dotnet/8.0
- Node.js: https://nodejs.org/
- Angular CLI: https://angular.io/cli
- PostgreSQL: https://www.postgresql.org/

### Steps

#### 1. Clone the repository

```bash
git clone https://github.com/steven-panxd/ReimbursementApp.git
cd ReimbursementApp
```

#### 2. Setup PostgreSQL

Make sure PostgreSQL is running locally, and create a database named:

```
ReimbursementDB
```

Update your `./ReimbursementApp-Backend/appsettings.Development.json` with your connection string:

```json
"ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ReimbursementDB;Username=youruser;Password=yourpassword"
}
```

The backend assumes this database exists.

#### 3. Run the Backend

```bash
cd ReimbursementApp-Backend
dotnet restore
dotnet ef database update
dotnet run
```

The backend will start on: http://localhost:12345
You can access the Swagger page at: http://localhost:12345/swagger/index.html

#### 4. Run the Frontend

```bash
cd ReimbursementApp-Frontend
npm install
ng serve --open
```

The frontend will start on: http://localhost:4200

---

## Project Structure

```
- ReimbursementApp-Backend/             # .NET 8 Web API (Backend)
    - Program.cs                        # .NET Program Entrance
    - appsettings.Development.json      # Development Mode App Configuration
    - ...
- ReimbursementApp-Frontend/            # Angular Client (Frontend)
- docker-compose.yml                    # Docker compose config for backend, frontend, and PostgreSQL database
- ...
```

---

## License

This project is open-source and available under the MIT License.