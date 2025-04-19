
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState(""); // using username for login
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Base API URL from environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}login/`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setLoggedInUser(response.data.username);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-2">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="text-center mt-2">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
