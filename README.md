# 🚌 Bus Booking System - Frontend

A modern, full-featured bus ticket booking platform built with React, TypeScript, and cutting-edge web technologies. This application provides a seamless user experience for booking bus tickets, managing reservations, and handling payments.

## 🌟 Features

### 🔐 **User Authentication & Authorization**
- **Secure Login/Registration** with JWT token management
- **Google OAuth Integration** for social login
- **OTP Verification** for account security
- **Protected Routes** with role-based access control
- **User Profile Management** with avatar upload

### 🎫 **Ticket Booking System**
- **Advanced Search & Filtering** by routes, dates, and bus companies
- **Interactive Seat Selection** with real-time availability
- **Service Add-ons** (meals, WiFi, etc.) at different stations
- **Multiple Payment Methods** (VNPay, Account Balance)
- **QR Code Generation** for digital tickets
- **Invoice Management** with detailed billing

### 💰 **Payment & E-Wallet**
- **VNPay Integration** for secure online payments
- **Digital Wallet** with balance management
- **Payment Status Tracking** with success/failure handling
- **Invoice Generation** and history

### 📱 **Ticket Management**
- **My Tickets** dashboard with status filtering
- **Real-time Ticket Status** (Unused, Used, Cancelled)
- **Ticket Cancellation** within allowed timeframes
- **QR Code Lookup** for ticket verification
- **Rating & Review System** for completed trips

### 🏢 **Business Features**
- **Multi-company Support** with different bus operators
- **Route Management** between cities
- **Popular Trip Recommendations**
- **Company Ratings & Reviews**

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **React Router Dom** for client-side routing

### **UI/UX Libraries**
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible, unstyled components
- **Ant Design** for complex form components
- **Lucide React** for modern icons
- **Sonner** for beautiful toast notifications

### **State Management**
- **Context API** for global state (Auth, Invoice, Search)
- **TanStack Query** for server state management and caching
- **React Hook Form** with Zod validation

### **Development Tools**
- **TypeScript** for static type checking
- **ESLint & Prettier** for code quality and formatting
- **Tailwind Merge** for className optimization

### **External Integrations**
- **Firebase** for Google Authentication
- **Axios** for HTTP client with interceptors
- **React Dropzone** for file uploads

## 📁 Project Structure

```
src/
├── 🔐 auth/                 # Authentication logic
│   ├── AuthProvider.tsx     # Global auth context
│   ├── ProtectedRoute.tsx   # Route protection
│   └── ProtectUserRoute.tsx # User-specific routes
├── 🧩 components/           # Reusable components
│   ├── global/              # Shared components
│   │   ├── atoms/          # Basic UI elements
│   │   ├── molecules/      # Composite components
│   │   ├── organisms/      # Complex components
│   │   └── templates/      # Page layouts
│   └── local/              # Feature-specific components
├── 📄 pages/               # Application pages
├── 🌐 apis/                # API integration layer
├── 🔧 lib/                 # Utility functions
├── 📋 types/               # TypeScript definitions
├── 🎨 assets/              # Static resources
└── 📊 contexts/            # React contexts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

## 🎯 Key Features Showcase

### **Smart Booking Flow**
1. **Search** - Find routes by origin, destination, and date
2. **Filter** - Sort by price, time, company rating
3. **Select** - Choose seats with interactive seat map
4. **Customize** - Add services and amenities
5. **Pay** - Secure payment with multiple options
6. **Manage** - Track and manage bookings

### **Advanced UI Components**
- **Responsive Design** that works on all devices
- **Dark/Light Mode** support with theme switching
- **Loading States** and skeleton screens
- **Error Boundaries** for graceful error handling
- **Infinite Scrolling** for large data sets

### **Performance Optimizations**
- **Code Splitting** with React.lazy()
- **Query Caching** with TanStack Query
- **Image Optimization** and lazy loading
- **Bundle Analysis** and tree shaking

## 🔒 Security Features

- **JWT Token Management** with automatic refresh
- **HTTPS Enforcement** for all API calls
- **Input Validation** with Zod schemas
- **XSS Protection** with sanitized inputs
- **CORS Configuration** for secure API access

## 🧪 Quality Assurance

- **TypeScript**: 100% type coverage
- **ESLint Rules**: Strict coding standards
- **Prettier**: Consistent code formatting
- **Component Testing**: Unit tests for critical components
- **API Integration Tests**: Comprehensive backend testing

## 📝 API Integration

The frontend integrates with a comprehensive REST API providing:
- **User Management** - Registration, authentication, profiles
- **Booking System** - Trip search, seat selection, reservations
- **Payment Processing** - VNPay integration, wallet management
- **Ticket Management** - Status tracking, cancellation, history

**Built with ❤️ using React, TypeScript, and modern web technologies**
