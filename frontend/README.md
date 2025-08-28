# Refurb Tech Frontend

A modern React frontend for the refurbished electronics e-commerce platform built with Vite, Tailwind CSS, and React Router.

## 🚀 Features

### ✅ Completed Features

- **Modern React Setup**: Built with Vite for fast development and optimized builds
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Design System**: Custom design tokens from `refurb-theme.tokens.json`
- **Dark/Light Mode**: Automatic theme switching with user preference persistence
- **Authentication System**: Complete auth flow with JWT tokens
- **Protected Routes**: Route protection based on authentication status
- **Professional UI Components**: Reusable components following design system

### 🎨 Design System

The application uses a comprehensive design system with:

- **Typography**: Inter & Manrope fonts with proper font features
- **Color Palette**: Carefully crafted light/dark mode colors
- **Components**: Button variants, cards, inputs, badges
- **Shadows & Radius**: Consistent spacing and visual hierarchy
- **Transitions**: Smooth animations with custom easing

### 🔐 Authentication Features

- **User Registration**: With email verification
- **User Login**: Email or username based login
- **JWT Token Management**: Automatic token refresh
- **Email Verification**: Complete email verification flow
- **Password Reset**: Forgot password functionality (backend ready)
- **Protected Routes**: Automatic redirection for auth state
- **Persistent Sessions**: Maintain login state across browser sessions

### 📱 Pages

#### Static Pages

- **Home**: Hero section, features, testimonials, CTAs
- **Products**: Product catalog with filtering and search
- **About**: Company story, team, values, timeline
- **Contact**: Contact form, office info, FAQ

#### Authentication Pages

- **Login**: Email/username login with validation
- **Register**: User registration with password strength
- **Email Verification**: Email verification handling

#### Protected Pages

- **Profile**: User profile management (placeholder)
- **Orders**: Order history (placeholder)

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM v6
- **State Management**: React Context for auth state
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Cookies**: js-cookie for token management

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navbar, Footer, Layout)
│   └── ui/              # Reusable UI components (ProtectedRoute)
├── context/             # React Context providers (AuthContext)
├── hooks/               # Custom React hooks
├── pages/
│   ├── auth/            # Authentication pages
│   └── static/          # Static pages (Home, About, etc.)
├── services/            # API services (auth, api client)
├── utils/               # Utility functions
├── App.jsx              # Main app component with routes
├── main.jsx             # App entry point
└── index.css            # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend server running on http://localhost:8000

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Environment Variables

The app is configured to connect to the backend at `http://localhost:8000/api/v1`.

To change this, update the `baseURL` in `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: "your-backend-url/api/v1",
  // ...
});
```

### Design Tokens

The design system is implemented using CSS variables defined in `src/index.css`. The tokens are automatically applied in both light and dark modes.

To customize the design:

1. Update `refurb-theme.tokens.json` with your design tokens
2. Update CSS variables in `src/index.css`
3. Update Tailwind config in `tailwind.config.js`

## 🔌 API Integration

### Authentication Endpoints

The frontend integrates with these backend endpoints:

- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/me` - Get current user
- `GET /users/verify-email/:token` - Verify email
- `POST /users/resend-verification` - Resend verification email
- `POST /users/refresh-token` - Refresh access token
- `POST /users/forgot-password` - Request password reset
- `POST /users/reset-password/:token` - Reset password
- `POST /users/change-password` - Change password

### Token Management

- **Access tokens**: Stored in cookies and localStorage
- **Refresh tokens**: Automatically refreshed when expired
- **Token persistence**: Maintains auth state across browser sessions
- **Security**: HTTP-only cookies in production, fallback to localStorage

## 🎯 Authentication Flow

1. **Registration**: User registers → Email verification required → Login
2. **Login**: Credentials validated → Tokens stored → User redirected
3. **Auto-refresh**: Expired tokens automatically refreshed
4. **Logout**: Tokens cleared → User redirected to login
5. **Protected routes**: Automatic redirection based on auth state

## 🔄 State Management

Authentication state is managed using React Context (`AuthContext`) which provides:

- `user`: Current user object
- `isAuthenticated`: Boolean auth status
- `isLoading`: Loading state for auth operations
- `error`: Error messages
- Auth actions: `login`, `register`, `logout`, etc.

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px+ (base)
- **Tablet**: 768px+ (md)
- **Desktop**: 1024px+ (lg)
- **Large**: 1280px+ (xl)

## 🎨 Component Library

### Button Variants

- `btn-primary`: Main action button
- `btn-secondary`: Secondary action button
- `btn-ghost`: Subtle button variant

### Form Components

- `input`: Styled form inputs with focus states
- `card`: Container component with shadow and borders

### Layout Components

- `Navbar`: Responsive navigation with user menu
- `Footer`: Site footer with links and info
- `Layout`: Page layout wrapper

## 🚧 Future Enhancements

### Planned Features

- Shopping cart functionality
- Product detail pages
- User dashboard
- Order management
- Payment integration
- Advanced filtering
- Wishlist functionality
- Product reviews
- Admin panel

### Technical Improvements

- Add unit tests (Jest + React Testing Library)
- Add E2E tests (Playwright/Cypress)
- Implement PWA features
- Add search functionality
- Optimize performance (code splitting)
- Add analytics
- Implement error tracking

## 🐛 Common Issues

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Clear node_modules if issues persist: `rm -rf node_modules && npm install`

### Authentication Issues

- Check backend server is running on correct port
- Verify CORS configuration on backend
- Check browser console for API errors
- Clear browser storage if auth state is corrupted

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check CSS variable definitions in `index.css`
- Verify design tokens are properly applied

## 📝 Development Notes

### Code Style

- Use functional components with hooks
- Implement proper error handling
- Follow React best practices
- Use TypeScript for future type safety
- Maintain consistent file naming

### Performance

- Lazy load pages when needed
- Optimize images and assets
- Implement proper caching strategies
- Monitor bundle size

### Security

- Validate all user inputs
- Implement proper CSRF protection
- Use secure token storage
- Sanitize user-generated content

## 📄 License

This project is part of the Refurb Tech e-commerce platform.
