import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSubmitting(true);

    try {
      const response = await API.post("/auth/login", formData);

      login(response.data.token);
      navigate("/profile");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Sign in to continue to RuralConnect.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {message && (
          <p className="error-message">
            {message}
          </p>
        )}

        <p className="switch-auth">
          Don't have an account?
          <Link to="/register"> Create one</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;