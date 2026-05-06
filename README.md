# GameStore

A full-stack web application for managing and browsing a game store. Built with a modern tech stack featuring a .NET 10 backend API and a React frontend.

## 🎥 Demo

Watch the application in action:

![GameStore Demo](./GameStore-ezgif.com-video-to-gif-converter%20(1).gif)

> 💡 **Tip**: Click the GIF above to view it in full size, or visit the [Loom video](https://www.loom.com/share/c82bdb6cc68e4fc59f64f215693d26fd) for the full-quality demo.

## 📋 Overview

GameStore is a web application that allows users to browse and manage games in a store. It features:

- **RESTful API** built with ASP.NET Core (.NET 10)
- **React 19** frontend with Vite for fast development
- **SQLite** database for persistent storage using Entity Framework Core
- **CORS** enabled for seamless frontend-backend communication
- **Data DTOs** for clean data transfer between layers

## 🏗️ Architecture

### Project Structure

```
GameStore/
├── GameStore.Api/           # Backend API (ASP.NET Core)
│   ├── Data/               # Database context and migrations
│   ├── Dtos/               # Data Transfer Objects
│   ├── Endpoints/          # API endpoint definitions
│   ├── Models/             # Domain models
│   ├── Program.cs          # Application startup
│   ├── appsettings.json    # Configuration
│   └── games.http          # HTTP test file
└── GameStore.React/         # Frontend (React 19 + Vite)
    ├── src/                # React components and logic
    ├── public/             # Static assets
    ├── package.json        # Dependencies
    └── vite.config.js      # Vite configuration
```

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core (.NET 10)
- **Database**: SQLite with Entity Framework Core 10.0.7
- **Features**:
  - Data validation
  - Modular endpoint handling
  - CORS support for development

### Frontend
- **Framework**: React 19.2.5
- **Build Tool**: Vite 8.0.10
- **Linting**: ESLint with React plugin

## 🚀 Getting Started

### Prerequisites

- **.NET 10** runtime and SDK
- **Node.js** 16 or higher
- **npm** or **yarn**

### Backend Setup (GameStore.Api)

1. Navigate to the backend directory:
   ```bash
   cd GameStore.Api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the API server (starts on port 5173):
   ```bash
   dotnet run
   ```

The API will be available at `http://localhost:5000` (or configured port).

### Frontend Setup (GameStore.React)

1. Navigate to the frontend directory:
   ```bash
   cd GameStore.React
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## 📁 API Endpoints

The API provides the following endpoint groups:

- **Games**: Manage game listings
  - GET, POST, PUT, DELETE operations
- **Genres**: Manage game genres

All endpoints support CORS requests from `http://localhost:5173` during development.

### Testing API Endpoints

A pre-configured `games.http` file is provided in the `GameStore.Api` directory for testing endpoints using REST client tools (VS Code REST Client extension, Postman, etc.).

## 🗄️ Database

The application uses **SQLite** for data persistence:

- Database file is created automatically on first run
- Entity Framework Core handles schema creation and migrations
- Location: Configured in `appsettings.json`

### Migrations

To create a new migration:
```bash
dotnet ef migrations add MigrationName
```

To apply migrations:
```bash
dotnet ef database update
```

## 🔧 Configuration

### Backend Configuration (`appsettings.json`)

Configure database connection strings, logging levels, and other settings in:
```
GameStore.Api/appsettings.json
GameStore.Api/appsettings.Development.json
```

### Frontend Configuration (`vite.config.js`)

The Vite configuration is set up for React development with fast refresh capabilities.

## 📦 npm Scripts

In the `GameStore.React` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## ✅ Code Quality

- **Linting**: ESLint configured for React best practices
- **Nullable Reference Types**: Enabled in backend for safer C# code
- **Implicit Usings**: Enabled for cleaner C# syntax

## 🔀 CORS Configuration

The API is configured to accept requests from the React development server:

```csharp
WithOrigins("http://localhost:5173")
.AllowAnyHeader()
.AllowAnyMethod()
```

Modify `Program.cs` to adjust CORS settings for production or other environments.

## 📝 Project Files

- **GameStore.slnx** - Solution file for opening in Visual Studio
- **GameStore.Api.csproj** - Backend project configuration
- **package.json** / **package-lock.json** - Frontend dependencies
- **eslint.config.js** - ESLint rules for React
- **.gitignore** - Version control exclusions

## 🚧 Development Workflow

1. Start the backend API server
2. Start the React development server
3. Make changes to either frontend or backend
4. Hot reload will automatically refresh changes
5. Test using the `games.http` file or UI

## 📚 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 📝 License

This project is open source. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Last Updated**: May 2026

For questions or issues, please open a GitHub issue in the repository.
