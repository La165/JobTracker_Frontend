import { useState } from "react";
import API from "../services/api";
import "./Auth.css";

function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      console.log("SUCCESS:", res.data);
      alert("Registered successfully!");
      switchToLogin();

    } catch (err) {
        console.log("FULL ERROR:", err); // 🔥 add this
  console.error("ERROR DATA:", err.response?.data);
  console.error("STATUS:", err.response?.status);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>  {/* ✅ FORM ADDED */}

        <h2>Register</h2>

        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary"> {/* ✅ IMPORTANT */}
          Register
        </button>

        <p className="switch-text" onClick={switchToLogin}>
          Already have an account? Login
        </p>

      </form>
    </div>
  );
}

export default Register;