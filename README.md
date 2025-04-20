# Full-Stack Blog Application

This repository contains a full-stack blog application with a Django-based RESTful API backend and a React-based frontend.

## Overview

- **Backend:** A Django REST API that handles blog creation, user authentication, and CRUD operations.
- **Frontend:** A React application that consumes the API endpoints and provides a user interface for interacting with blog data.


## Features

- **User Authentication:** Signup and login endpoints.
- **Blog Management:** Create, update, list, and delete blog posts.
- **API Endpoints:** RESTful endpoints for handling blog operations.
- **CORS Support:** Configured to work seamlessly with the React frontend.
- **Deployment Ready:** Backend can be deployed on Render and frontend on Vercel/Netlify.

---

## Setup Instructions

### Prerequisites

- **Python 3.8+** for the Django backend.
- **Node.js and npm** for the React frontend.

---

## Backend Setup (Django)

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```
   Create and activate the virtual environment:
   ```bash
    python -m venv venv
    .\venv\Scripts\activate
   ```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run Migrations:

```bash
python manage.py migrate

```
Start the Development Server:

```bash
python manage.py runserver

```

Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd frontend
```
Install dependencies:

```bash
npm install

```

Run the React Development Server:

```bash
npm start
```
