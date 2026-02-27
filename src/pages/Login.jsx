import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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

    try {
      const res = await api.post("/auth/login", form)

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard")

    } 
    catch (err) {
      setError(
        err.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
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

          <a href="#" className="forgot-link">
            Olvidé mi contraseña
          </a>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Ingresar
          </button>

          <p className="register-link">
            ¿No tenés cuenta? <a href="/register">Crear cuenta</a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;