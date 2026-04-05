# Society Management Web App

A powerful and intuitive React-based Single Page Application (SPA) designed to streamline the management of housing societies. This frontend application provides tailored experiences for both Administrative staff and Society Members using Role-Based Access Control.

# 🚀 Features

### General
- **Role-Based Authentication**: Secure, protected routing that dynamically renders different dashboards depending on whether the logged-in user is an Admin or a Member.
- **Mock Data Layer**: Built-in state management via React Context combined with local JSON files (`src/data/*.json`) to simulate a backend REST API without needing a server.

### 🛡️ Admin Features
- **Dashboard Overview**: Get a bird's-eye view of society activities.
- **Flat Management**: Maintain and view records of all flats and their assigned members.
- **Maintenance Tracking**: Issue maintenance bills and track payment statuses across the society.
- **Issue Resolution**: View, track, and resolve complaints raised by society members.
- **Announcements**: Send out society-wide notifications and alerts.

### 🏠 Member Features
- **Member Dashboard**: Personalized view of a member's own activities.
- **My Dues & Maintenance**: View personal maintenance bills and payment history.
- **Raise Complaints**: Open new tickets/complaints for the Admin to address.
- **Notifications**: Stay updated with the latest announcements from the society administration.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`AuthContext` & `DataContext`)
- **Linting**: ESLint

## 📁 Project Structure

```text
src/
├── assets/         # Static assets like images and global styling
├── components/     # Reusable UI components (Layout, ProtectedRoute)
├── context/        # React Context providers for global state (Auth, Data)
├── data/           # Mock JSON data simulating a database (users, flats, etc.)
├── pages/          # Role-specific page components (AdminDashboard, MemberDashboard, etc.)
├── utils/          # Utility and helper functions
├── App.jsx         # Root component with routing and role conditionals
└── main.jsx        # Entry point of the Vite application
```

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd project_society_management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`. You can log in using the credentials defined in `src/data/users.json` to access either the Admin or Member dashboard.

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run lint` - Lints the codebase using ESLint.
- `npm run preview` - Locally previews the production build.
