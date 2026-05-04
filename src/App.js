import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  if (!loggedIn) {
    return page === "login" ? (
      <Login
        setLoggedIn={setLoggedIn}
        switchToRegister={() => setPage("register")}
      />
    ) : (
      <Register switchToLogin={() => setPage("login")} />
    );
  }

  return <Dashboard setLoggedIn={setLoggedIn} />;
}

export default App;