<div align="center">
  <h1>
    <b>Computepedia</b>
  </h1>

  <p>
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  </p>
</div>

---

## 🚀 About The Project

**Computepedia** is a full-stack project designed as a case study for building a modern web application from scratch. This project simulates a simple online store where authenticated users can manage a catalog of products and categories.

The main goal of this project is to implement a clean, separated architecture (MVC on the backend, centralized state management on the frontend) and essential features like API security and a reactive user experience.

---

## ✨ Key Features

-   🔐 **User Authentication**: Secure user registration and login system using **JSON Web Tokens (JWT)**.
-   🛡️ **API Security**: Equipped with rate limiting and bot detection using **Arcjet**.
-   📦 **Product Management**: CRUD functionality for products.
-   🏷️ **Category Management**: Ability to add and delete product categories.
-   🔍 **Dynamic Search**: Real-time product search feature on the homepage with debouncing for optimization.
-   🎨 **Reactive Interface**: A responsive and modern UI built with **React**, **Zustand** for state management, and **Tailwind CSS + DaisyUI** for styling.
-   🔐 **Protected Routes**: Both API and frontend routes are protected, accessible only to authenticated users.

---

## 🛠️ Built With

The following are the main technologies used in this project:

| Backend                                                                                                | Frontend                                                                                                     |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Node.js** (Runtime)                                                                                  | **React** (UI Library)                                                                                       |
| **Express.js** (Framework)                                                                             | **Zustand** (State Management)                                                                               |
| **Neon** (Serverless PostgreSQL)                                                                       | **React Router** (Routing)                                                                                   |
| **JWT** (Authentication)                                                                               | **Axios** (HTTP Client)                                                                                      |
| **Bcrypt** (Password Hashing)                                                                          | **Tailwind CSS** & **DaisyUI** (Styling)                                                                     |
| **Arcjet** (API Security)                                                                              | **Lucide React** (Icons)                                                                                     |

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following software and accounts:
* Node.js (v18 or later is recommended)
* npm or yarn
* A **[Neon](https://neon.tech/)** account and a new project created.

### Installation

1.  **Backend Setup**
    
    a. Go to the `backend` directory and install dependencies.
    ```sh
    cd backend
    npm install
    ```
    
    b. **Set up your Neon database credentials.**
      - In your Neon project dashboard, find the **Connection Details** widget.
      - Select the connection string format that shows the parameters separately (like `psql -h ...`).
      - Copy the values for `host`, `dbname`, `user`, and your password.

    c. **Configure your environment file.**
    ```sh
    cp .env.example .env 
    ```
    
    d. **Run the backend server.**
    ```sh
    npm run dev
    ```
    The backend server will be running at `http://localhost:3000`. It will automatically create the necessary tables on its first run.

2.  **Frontend Setup**
    ```sh
    cd frontend
    npm install
    
    npm run dev
    ```
    The frontend application will be running at `http://localhost:5173`.
