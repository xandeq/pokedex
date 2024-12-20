Pokedex Application

This repository contains two applications:

    Backend: A NestJS API for handling Pokémon data.
    Frontend: An Angular application for displaying the Pokémon list and details.

Prerequisites

Before starting, make sure you have the following installed:

    Node.js (version 18 or higher): Download Node.js
    npm: Comes with Node.js
    NestJS CLI (for the backend):

npm install -g @nestjs/cli

Angular CLI (for the frontend):

    npm install -g @angular/cli

Installation and Setup
1. Backend (NestJS)

    Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Configure Environment Variables:

Create a .env file in the backend folder with the following example variables:

PORT=3000
DATABASE_URL=your-database-url

Run the backend server:

npm run start:dev

The backend will be available at:

    http://localhost:3000

2. Frontend (Angular)

    Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Run the frontend application:

ng serve

The frontend will be available at:

    http://localhost:4200

How to Use

    Start the backend server first (http://localhost:3000).
    Start the frontend application (http://localhost:4200).
    Open the browser and visit http://localhost:4200 to explore the Pokedex.
