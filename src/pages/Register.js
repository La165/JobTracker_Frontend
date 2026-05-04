import { useState } from "react";
import API from "../services/api";
import "./Auth.css";
function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully!");
      switchToLogin();
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input className="input" placeholder="Name"
          onChange={e => setName(e.target.value)} />

        <input className="input" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn-primary" onClick={handleRegister}>
          Register
        </button>

        <p className="switch-text" onClick={switchToLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;