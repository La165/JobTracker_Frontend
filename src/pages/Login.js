import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
function Login({ setLoggedIn, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data);
      setLoggedIn(true);
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input className="input" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text" onClick={switchToRegister}>
          New user? Register
        </p>
      </div>
    </div>
  );
}

export default Login;