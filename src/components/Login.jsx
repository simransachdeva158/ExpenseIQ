import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("userEmail", email);

    if (remember) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    onLogin();
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
          Login to continue to ExpenseIQ
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            <button type="button">
              Forgot password?
            </button>
          </div>

          <button className="signin-btn" type="submit">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <button type="button">
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;