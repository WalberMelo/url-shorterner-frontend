# **URL Shortener Frontend**

This is the frontend application for the **URL Shortener** project, designed to allow users to create and view shortened URLs history.

## **Live Application**

You can access the live application here:  
[**URL Shortener - Live Demo**](https://github.com/WalberMelo/url-shorterner-frontend)

---

![Demo](https://res.cloudinary.com/devwm/video/upload/c_scale,e_accelerate:67,w_265/v1738000131/Repositories/krkq2yyyys7uhu3qjyf0.gif)

---

## **Features**

- **URL Shortening**: Users can input long URLs to generate shortened slug ones.
- **History Management**: View a list of recently shortened URLs with details like creation date and descriptions.
- **Delete Functionality**: Remove unwanted URLs from the history.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **Notifications**: Interactive feedback for success and error states.

---

## **Tech Stack**

### **Core Technologies**

- **React**: For building the user interface.
- **Vite**: As the build tool for fast development.
- **Tailwind CSS**: For styling the application.
- **Shadcn**: Collection of re-usable components.
- **React Query**: For data fetching, caching, and mutations.
- **Zustand**: For lightweight state management.

### **Form Handling & Validation**

- **React Hook Form**: For efficient form handling.
- **Zod**: For schema-based form validation.

### **Testing**

- **Playwright**: For end-to-end testing.
- **Vitest**: For unit testing.

### **Other Libraries**

- **Axios**: For HTTP requests.
- **React Router DOM**: For routing.

---

## **Setup Instructions**

Create a .env file in the root directory with the following variables:
VITE_API_URL=https://your-backend-url.com

### **1. Clone the Repository**

```bash
git clone https://github.com/WalberMelo/url-shortener-frontend.git

cd url-shortener-frontend
npm install
npm run dev
```
