import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await api.post("/auth/register", form);

      setMessage("Te enviamos un mail para verificar tu cuenta.");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Crear cuenta</h1>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="login-button">
            Registrarme
          </button>

          <p className="register-link">
            ¿Ya tenés cuenta? <a href="/">Iniciar sesión</a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;