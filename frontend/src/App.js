// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogForm from "./components/BlogForm";
import "./index.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setLoggedInUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div>
        <header className="navbar">
          <div className="container">
            <Link to="/" className="brand">
              MyBlog
            </Link>
            <div className="nav-links">
              {loggedInUser ? (
                <>
                  <span className="wel">Welcome, {loggedInUser}!</span>
                  <Link to="/blogs/new" className="cb">Create Blog</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/:id/edit" element={<BlogForm editMode={true} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
