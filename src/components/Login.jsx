import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="login-logo">
          <div>₹</div>
          <span>ExpenseIQ</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to continue managing your finances.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button">
              Forgot Password?
            </button>
          </div>

          <button className="signin-btn" type="submit">
            Sign In
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <button type="button"> Create Account</button>
        </p>

      </div>
    </div>
  );
}

export default Login;