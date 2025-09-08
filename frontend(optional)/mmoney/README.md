# Minit Money Frontend

A React frontend for the Minit Money backend, built with Tailwind CSS, Axios, and React Router. Features user registration, login, and transaction management with a modern, responsive UI.

## Features

- Register and login with JWT authentication
- Send money with amount, recipient, and currency (USD/KES)
- View transactions with filters (currency, date, amount range) and pagination
- Cool UI with gradients, rounded cards, and animations
- Toast notifications for feedback
- Protected routes and auto token refresh

## Tech Stack

- React (Create React App)
- Tailwind CSS for styling
- Axios for API requests
- React Router for navigation
- React-Toastify for notifications

## Prerequisites

- Node.js v18+ (`node -v`, `npm -v`)
- Backend running at `http://localhost:3000` (see backend repo)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/minit-money-frontend.git
   cd minit-money-frontend