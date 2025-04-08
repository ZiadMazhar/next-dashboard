# Next.js Dashboard with Firebase and Redux

A complete dashboard application built with Next.js, Firebase, Redux, and Tailwind CSS.

## Features

- User authentication (login/register) with Firebase
  - Email/password authentication
  - Google authentication
- Redux state management
- Responsive sidebar navigation
- Dark mode support
- Dynamic data table with sorting, filtering, and pagination
- Interactive charts using Chart.js
- Mobile-friendly design with Tailwind CSS

## Implementation Overview

This dashboard application demonstrates a modern web application architecture using Next.js, Firebase, Redux, and Tailwind CSS. Here's a brief explanation of the implementation:

### Architecture

The application follows a modular architecture with clear separation of concerns:

- **Next.js App Router**: Provides file-based routing and server-side rendering capabilities
- **Redux**: Manages global state across the application
- **Firebase**: Handles authentication and data storage
- **Tailwind CSS**: Enables responsive and customizable styling

### State Management with Redux

Redux is implemented using Redux Toolkit to reduce boilerplate code:

- **Store**: Centralized state container with middleware configuration
- **Slices**: Separate slices for authentication and UI state
- **Typed Hooks**: Custom hooks with TypeScript support for type-safe state access

### Firebase Integration

Firebase is integrated for authentication and potential data storage:

- **Authentication**: Email/password and Google sign-in methods
- **Real-time Updates**: Auth state changes are reflected in the UI immediately
- **Security**: Protected routes redirect unauthenticated users to the login page

### Authentication Flow

The authentication flow is handled through Redux and Firebase:

1. User submits credentials via the login/register form or Google sign-in
2. Redux dispatches the appropriate action to Firebase
3. Firebase authenticates the user and returns a result
4. Redux updates the auth state based on the result
5. The UI reacts to the auth state changes

### Responsive Design

The application is fully responsive using Tailwind CSS:

- **Mobile-first Approach**: Designed for mobile devices first, then enhanced for larger screens
- **Responsive Sidebar**: Collapses to a hamburger menu on mobile devices
- **Flexible Layouts**: Grid and flex layouts adapt to different screen sizes
- **Responsive Typography**: Font sizes adjust based on screen size

### Dark Mode Implementation

Dark mode is implemented using Tailwind's dark mode feature:

1. Toggle button in the sidebar switches between light and dark modes
2. Theme preference is stored in localStorage for persistence
3. A theme provider applies the appropriate class to the HTML element
4. Tailwind's dark variant classes style components based on the current theme

### Data Visualization

Charts are implemented using Chart.js and react-chartjs-2:

- **Multiple Chart Types**: Line, bar, and pie charts for different data visualization needs
- **Dark Mode Support**: Charts adapt to the current theme
- **Responsive Design**: Charts resize based on container size
- **Interactive Elements**: Tooltips and hover effects enhance user experience

## Setup Instructions

### Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone "https://github.com/ZiadMazhar/next-dashboard"
   cd next-firebase-dashboard
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.com/)
   - Create a new project
   - Set up Authentication with Email/Password and Google providers
   - Create a web app in your Firebase project to get your config

4. Create a `.env.local` file in the root directory with your Firebase configuration:
   \`\`\`
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/                  # Next.js App Router
│   ├── dashboard/        # Dashboard pages
│   │   ├── charts/       # Charts page
│   │   ├── table/        # Table page
│   │   ├── layout.tsx    # Dashboard layout
│   │   └── page.tsx      # Dashboard index page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Root page (redirects to login)
├── components/           # React components
│   ├── DarkModeToggle.tsx # Dark mode toggle component
│   ├── ThemeProvider.tsx # Theme provider for dark mode
│   └── Sidebar.tsx       # Sidebar navigation
├── hooks/                # Custom hooks
│   └── useAuth.ts        # Authentication hook
├── lib/                  # Utility functions
│   └── firebase.ts       # Firebase configuration
├── store/                # Redux store
│   ├── slices/           # Redux slices
│   │   ├── authSlice.ts  # Authentication slice
│   │   └── uiSlice.ts    # UI state slice
│   ├── index.ts          # Store configuration
│   └── provider.tsx      # Redux provider
└── types/                # TypeScript types
    └── firebase.ts       # Firebase-related types
\`\`\`

## Features

### Authentication

The application supports both email/password and Google authentication methods. Users can:
- Register with email and password
- Login with email and password
- Login with Google
- Logout from any page

### Dark Mode

The application includes a dark mode feature that:
- Can be toggled from the sidebar
- Persists user preference in local storage
- Automatically applies the appropriate theme on page load
- Provides a consistent dark theme across all components

### Dashboard

The dashboard includes:
- A responsive sidebar for navigation
- A table view with sorting, filtering, and pagination
- Interactive charts with dark mode support
- Mobile-friendly design


