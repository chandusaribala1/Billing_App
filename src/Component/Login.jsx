import React, { useState } from "react";
import "./Auth.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login request", { email, password });
    // Later: axios.post("/auth/login", { email, password})
  };

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    console.log("Password recovery request sent to:", recoveryEmail);
    alert(`If an account exists for ${recoveryEmail}, you will receive password reset instructions.`);
    setRecoveryEmail("");
    setShowRecovery(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {!showRecovery ? (
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
            
              

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>

              <p
                className="forgot-password"
                onClick={() => setShowRecovery(true)}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                Forgot Password?
              </p>
            </form>
          </>
        ) : (
          <>
            <h2>Recover Password</h2>
            <form onSubmit={handlePasswordRecovery}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
              <button type="submit">Send Recovery Email</button>
              <p
                onClick={() => setShowRecovery(false)}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                Back to Login
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
