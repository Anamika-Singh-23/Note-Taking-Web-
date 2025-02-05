import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css'; // Create this CSS file for custom styles

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
