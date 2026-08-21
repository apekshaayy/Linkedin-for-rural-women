import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await API.post("/auth/register", formData);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create your account</h1>

        <p>Join RuralConnect and showcase your skills.</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn full-compact">
            Create account
          </button>

        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p>
          Already have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;