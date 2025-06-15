import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/auth";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );
    if (user) {
      saveUser(user);
      navigate(user.role === "student" ? "/student" : "/teacher");
    } else {
      alert("Invalid credentials");
    }
  };

  const pageStyle = {
    backgroundImage:
      "url('https://t4.ftcdn.net/jpg/06/42/37/03/360_F_642370364_5VWj5RsbXdPO96ef9sdT1Wso3A3KX2Re.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={pageStyle}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow p-4"
          style={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
          }}
        >
          <div className="text-center mb-3">
            <h2 className="fw-bold text-primary">UMT LMS</h2>
            <p className="text-muted">Login to your account</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="mb-0">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="btn btn-link p-0"
                style={{ fontSize: "1rem" }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
