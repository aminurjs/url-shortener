# URL Shortener & QR Code Generator

This project is a **URL Shortener** and **QR Code Generator** web application that allows users to shorten URLs, generate dynamic QR codes, and track analytics for the links. It also includes a **custom authentication system** with **OAuth 2.0** integration, allowing users to sign in securely with Google, GitHub, and email.

---

## Features

### Core Features:

- **URL Shortening**: Shorten any URL to share it easily.
- **Custom Branded URLs**: Shorten links with your brand's domain.
- **Dynamic QR Code Generation**: Generate and manage QR codes that can be updated anytime.
- **Advanced Link Analytics**: Track clicks, devices, locations, and more.
- **Password Protection**: Secure your shortened links with passwords.
- **Link Expiration**: Set expiration dates for your short URLs.
- **Bulk URL Shortening**: Shorten multiple URLs at once.
- **API Access**: Integrate URL shortening functionality into other apps.

### Authentication:

- **OAuth 2.0 Authentication**: Custom authentication with OAuth 2.0.
  - **Google Sign-In**
  - **Email and Password Sign-In**
- **Two-Factor Authentication** (2FA) for added security.

---

## Tech Stack

- **Frontend**: React, Shadcn ui, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Custom authentication using OAuth 2.0 with Google, and Email Sign-In.
- **QR Code Generation**: `qrcode` npm package
- **Link Analytics**: Custom analytics tracking

---

## Installation

To get started with the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/aminurjs/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies

For both the frontend (Next.js) and backend (Node.js), install the required dependencies.

```bash
# Install all dependencies
npm run install:all
```

### 3. Set Up Environment Variables

Create `.env` files for both frontend and backend. Fill all the field according to `.env.example`:

### 4. Run the Application

To run both frontend and backend servers:

```bash
# Run frontend (Next.js) and  backend (Node.js)
npm run dev
```

Visit the frontend in your browser at `http://localhost:3000` to access the application.

---

## Usage

1. **Sign Up / Sign In**:
   - Sign up with Google, GitHub, or email/password.
   <!-- - Use 2FA for added security. -->
2. **Shorten URL**:
   - Enter a long URL and click **Shorten** to generate a short link.
3. **Generate QR Code**:
   - For any shortened URL, generate a dynamic QR code.
4. **Analytics**:

   - Track the performance of your links including clicks, devices, and locations.

5. **Manage Links**:
   - Edit, delete, or set expiration dates for your shortened links.

---

## Acknowledgments

- **OAuth 2.0**: For secure authentication.
- **Lucide Icons**: For beautiful and customizable icons.
- **Tailwind CSS**: For styling the frontend.
- **Shadcn UI**: For for component.
- **MongoDB**: For storing user data and link information.
- **QR Code Package**: For generating QR codes.

---
