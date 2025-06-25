# React To-Do App Frontend

Welcome to the **React To-Do App Frontend** - a modern, responsive React application built with TypeScript, Vite, and Tailwind CSS.

---

## 🧾 Project Overview

This is the frontend application for a to-do list management system featuring:

- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **React Router** for client-side routing
- **Axios** for API communication
- **JWT Authentication** integration

---

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Index.ts       # Component exports
│   ├── views/             # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── Home.tsx       # Home page
│   │   ├── Login.tsx      # Login page
│   │   ├── NotFound.tsx   # 404 page
│   │   └── Register.tsx   # Registration page
│   ├── navigation/        # Routing configuration
│   │   └── AppRoutes.tsx  # Route definitions
│   ├── utils/             # Utility functions
│   │   └── api.ts         # API client configuration
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The React app will be available at: `http://localhost:5173`

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎨 Features

### User Interface
- **Modern Design**: Clean, responsive UI built with Tailwind CSS
- **Dark/Light Mode**: Beautiful color schemes and gradients
- **Animations**: Smooth transitions and hover effects
- **Mobile Responsive**: Optimized for all screen sizes

### Authentication
- **Login Page**: Secure user authentication
- **Registration Page**: New user signup
- **Protected Routes**: Automatic redirect for unauthenticated users
- **JWT Token Management**: Secure token storage and handling

### User Experience
- **Form Validation**: Real-time input validation
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Navigation**: Intuitive routing with React Router

---

## 🛠️ Development

### Adding New Components

1. Create new components in `src/components/`
2. Create new pages in `src/views/`
3. Update routing in `src/navigation/AppRoutes.tsx`

### Styling

The project uses Tailwind CSS for styling. You can:

- Use Tailwind utility classes directly in components
- Add custom styles in `src/index.css`
- Configure Tailwind in `tailwind.config.js`

### API Integration

API calls are configured in `src/utils/api.ts` using Axios. The client expects a backend API running on `https://localhost:7001`.

---

## 📦 Dependencies

### Core Dependencies
- **React 19.1.0** - UI library
- **React Router DOM 7.6.2** - Client-side routing
- **Axios 1.10.0** - HTTP client

### Development Dependencies
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.0** - Build tool
- **Tailwind CSS 3.4.17** - CSS framework
- **ESLint 9.29.0** - Code linting

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy

Deploy the contents of the `dist/` folder to your hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS S3**: Upload files to an S3 bucket

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory for environment-specific configuration:

```env
VITE_API_BASE_URL=https://localhost:7001
VITE_APP_NAME=React Todo App
```

### Vite Configuration

The build tool is configured in `vite.config.ts` with React plugin and path aliases.

### Tailwind Configuration

Tailwind CSS is configured in `tailwind.config.js` with custom colors and responsive breakpoints.

---

## 📝 Development Notes

- The app uses React Router for navigation with protected routes
- JWT tokens are stored in localStorage for persistence
- API calls are centralized in the `api.ts` utility
- All components are built with TypeScript for better development experience
- The UI is fully responsive and works on mobile devices

---

Happy coding! 🎉
