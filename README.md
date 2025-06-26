# ToDo-App
Legacy React TS To-Do App with .NET Core Backend – A full-stack to-do application built with React TS and ASP.NET Core, featuring JWT authentication, SQL Server integration, and optional C# enhancements like SignalR and analytics.

---

## 🧾 Project Overview

This is a complete full-stack application built with modern technologies:

### Frontend
- **React 19** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for modern, responsive styling
- **React Router** for client-side navigation
- **Axios** for API communication

### Backend
- **ASP.NET Core 7.0** Web API
- **Entity Framework Core** for database operations
- **JWT Authentication** for secure user management
- **SQL Server** database with Docker support

### Features
- ✅ User registration and authentication
- ✅ Secure JWT-based login system
- ✅ Full CRUD operations for to-do items
- ✅ User isolation (users can only access their own todos)
- ✅ Modern, responsive UI with animations
- ✅ Protected routes and authentication guards
- ✅ Real-time form validation
- ✅ Error handling and loading states

---

## 🏗️ Project Structure

```
AngularJS-To-Do-App/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── views/          # Page components (Login, Register, Home, etc.)
│   │   ├── navigation/     # Routing configuration
│   │   └── utils/          # API utilities and helpers
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend-specific documentation
├── server/                 # ASP.NET Core Backend
│   ├── Controllers/        # API endpoints (Auth, Users, Todos)
│   ├── Models/            # Data models (User, TodoItem)
│   ├── Data/              # Database context and configuration
│   ├── Migrations/        # Entity Framework migrations
│   ├── server.csproj      # Backend project file
│   └── README.md          # Backend-specific documentation
└── README.md              # This file - project overview
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **.NET 7.0 SDK**
- **Docker** (for SQL Server)
- **Git**

### 1. Clone and Setup
```bash
git clone https://github.com/Ceeyar/AngularJS-To-Do-App
cd AngularJS-To-Do-App
```

### 2. Start SQL Server
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=**YourStrongPassw0rd**" \
  -p 1433:1433 --name sqlserver --hostname sqlserver \
  -d mcr.microsoft.com/mssql/server:2019-latest
```

### 3. Start Backend
```bash
cd server
dotnet restore
dotnet ef database update
dotnet run
```
API will be available at: `https://localhost:5048`

### 4. Start Frontend
```bash
# In a new terminal
cd client
npm install
npm run dev
```
App will be available at: `http://localhost:5173`

---

## 🔧 Technology Stack

### Frontend Technologies
- **React 19.1.0** - Modern UI library
- **TypeScript 5.8.3** - Type safety and better development experience
- **Vite 7.0.0** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.6.2** - Client-side routing
- **Axios 1.10.0** - HTTP client for API calls

### Backend Technologies
- **ASP.NET Core 7.0** - Modern web framework
- **Entity Framework Core 7.0.20** - ORM for database operations
- **SQL Server** - Relational database
- **JWT Bearer Authentication** - Secure token-based auth
- **Swagger/OpenAPI** - API documentation

### Development Tools
- **Docker** - Containerized SQL Server
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting

---

## 🔐 Authentication & Security

The application implements a secure JWT-based authentication system:

### Authentication Flow
1. **Registration**: Users create accounts with username, email, and password
2. **Login**: Users authenticate and receive JWT tokens
3. **Token Management**: Tokens are stored securely and automatically refreshed
4. **Protected Routes**: Frontend routes are protected based on authentication status
5. **API Security**: Backend endpoints require valid JWT tokens

### Security Features
- Password hashing with secure algorithms
- JWT token expiration and refresh mechanisms
- CORS configuration for secure cross-origin requests
- User isolation (users can only access their own data)

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

### Todos
- `GET /api/todos` - Get user's todos (authenticated)
- `POST /api/todos` - Create new todo (authenticated)
- `PUT /api/todos/{id}` - Update todo (authenticated)
- `DELETE /api/todos/{id}` - Delete todo (authenticated)

---

## 🎨 User Interface

The frontend features a modern, responsive design with:

### Design Features
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Modern Styling**: Clean design with Tailwind CSS
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation

### Pages
- **Login Page**: Secure authentication with validation
- **Register Page**: User registration with form validation
- **Home Page**: Main dashboard (protected route)
- **404 Page**: Custom error page with navigation

---

## 🗄️ Database Schema

The application uses SQL Server with the following schema:

### Users Table
- `Id` (Primary Key)
- `Username` (Unique)
- `Email` (Unique)
- `PasswordHash`
- `CreatedAt`
- `UpdatedAt`

### TodoItems Table
- `Id` (Primary Key)
- `Title`
- `Description`
- `IsCompleted`
- `UserId` (Foreign Key to Users)
- `CreatedAt`
- `UpdatedAt`

---

## 🛠️ Development

### Adding New Features

1. **Backend**: Add controllers, models, and migrations as needed
2. **Frontend**: Create components and pages in the appropriate directories
3. **Database**: Use Entity Framework migrations for schema changes

### Environment Configuration

- **Backend**: Configure in `server/appsettings.Development.json`
- **Frontend**: Use `.env` files for environment variables
- **Database**: Connection string configured for Docker SQL Server

### Testing

- **API Testing**: Use Swagger UI at `https://localhost:7001/swagger`
- **Frontend Testing**: Manual testing with browser dev tools
- **Database**: Direct SQL Server access via Docker

---

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy dist/ folder to hosting service
```

### Backend Deployment
```bash
cd server
dotnet publish -c Release
# Deploy published files to hosting service
```

### Database Deployment
- Use Azure SQL Database or AWS RDS for production
- Update connection strings accordingly
- Run migrations on production database

---

## 📚 Documentation

- **[Client README](./client/README.md)** - Frontend-specific documentation
- **[Server README](./server/README.md)** - Backend-specific documentation
- **API Documentation** - Available via Swagger UI when backend is running

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎯 Project Goals

This project demonstrates:

- **Modern Full-Stack Development**: React + ASP.NET Core
- **Authentication & Security**: JWT-based user management
- **Database Design**: Proper relationships and data modeling
- **API Design**: RESTful endpoints with proper error handling
- **User Experience**: Responsive design with modern UI/UX
- **Development Best Practices**: TypeScript, proper project structure, documentation

---

Happy coding! 🎉
