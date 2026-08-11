import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <div className="logo">
          <span className="logo-shell">◒</span>
          RuralConnect
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/register">Join Us</a>
          <a href="/login">Login</a>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;