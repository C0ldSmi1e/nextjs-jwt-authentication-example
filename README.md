# Next.js JWT Authentication Example

A minimalist Next.js project demonstrating route protection with JWT authentication for admin pages.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/C0ldSmi1e/nextjs-jwt-authentication-example?tab=readme-ov-file&project-name=nextjs-jwt-authentication-example&repository-name=nextjs-jwt-authentication-example)

## Overview

This starter provides a clean separation between public and admin pages with a simple JWT-based authentication system. It's ideal for:

- Projects requiring protected admin areas
- Sites with pre-defined admin users (no registration needed)
- Simple authentication without complex user management

[Live Demo](https://nextjs-jwt-login-example.vercel.app/)

**Default credentials:** username: `abc` | password: `xyz`

## Features

- **Route Protection**: Only authenticated users can access admin pages
- **JWT Authentication**: Secure token-based auth with 30-day expiration
- **Middleware-based Protection**: All `/admin/*` routes automatically protected
- **Smart Redirects**: Authenticated users are redirected from login to admin dashboard
- **Modern Stack**: Built with Next.js 15+, React 19+, and TailwindCSS 4
- **TypeScript**: Fully typed for better developer experience

## Project Structure

```
src/
├── app/
│   ├── (admin)/admin/     # Protected admin routes
│   │   ├── login/         # Admin login page
│   │   └── page.tsx       # Admin dashboard
│   ├── (site)/            # Public pages
│   ├── api/auth/          # Authentication API endpoints
│   │   ├── login/         # Login API
│   │   └── logout/        # Logout API
│   └── components/        # Shared components
├── middleware.ts          # Route protection logic
```

## How It Works

### Route Protection

The middleware (`src/middleware.ts`) intercepts requests to `/admin/*` routes:

- **Unauthenticated users** trying to access `/admin/*` are redirected to `/admin/login`
- **Authenticated users** trying to access `/admin/login` are redirected to `/admin/`
- Authentication is verified by checking the JWT token in cookies

### Authentication Flow

1. User submits credentials on the login page
2. The `/api/auth/login` endpoint verifies credentials against environment variables
3. On success, a JWT token is generated and stored in an HTTP-only cookie
4. The middleware validates this token for all admin route requests

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/C0ldSmi1e/nextjs-jwt-login-example.git
   cd nextjs-jwt-login-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env.local` file (see `.env.example`):
   ```
   JWT_SECRET=your-secret-key
   ADMIN_USERS={"username1": "password1", "username2": "password2"}
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```



## License

[MIT License](./LICENSE)