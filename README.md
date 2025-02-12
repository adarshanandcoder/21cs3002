# Railway Management API

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Assumptions](#assumptions)
- [Running Tests (Optional)](#running-tests-optional)

## Introduction
The Railway Management API is designed to provide users with the ability to check train availability, book seats, and manage train schedules efficiently. The system supports role-based access control, where admin users can manage trains, while normal users can book tickets and check availability.

## Features
- **User Authentication:** Register and login users with JWT authentication.
- **Train Management:** Admins can add new trains and update seat availability.
- **Seat Booking:** Users can book available seats in real-time.
- **Race Condition Handling:** Ensures only one user can book a seat at a time.
- **Authorization and Access Control:** Protects admin APIs using an API key.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT for user authentication, API Key for admin access
- **ORM:** PostgreSQL Queries with `pg` library

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/railway-management-api.git
   cd railway-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/railway_db
SECRET_KEY=your_secret_key
ADMIN_API_KEY=your_admin_api_key
```
Replace `username`, `password`, and other values as per your setup.

## Running the Server
1. Ensure PostgreSQL is running and the database `railway_db` is created.
2. Run migrations to create necessary tables:
   ```sh
   npm run migrate
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. The server will be running on `http://localhost:5000`

## API Endpoints
### Authentication
- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Login user and receive a JWT token.

### Trains (Admin Only, Requires API Key)
- **POST /api/trains** - Add a new train.
- **GET /api/trains?source=xxx&destination=yyy** - Fetch available trains.

### Booking
- **POST /api/bookings** - Book a seat (Requires JWT Token).
- **GET /api/bookings** - Get user booking details.

## Assumptions
- The system assumes a **first-come, first-served** model for bookings.
- Only **registered users** can book tickets.
- **Admins must provide an API key** to access train management endpoints.
- **Users must authenticate using JWT** for booking and fetching booking details.



