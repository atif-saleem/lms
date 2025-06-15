import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === form.email);

    if (existing) {
      alert("User already exists!");
    } else {
      users.push(form);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      navigate("/");
    }
  };

  const pageStyle = {
    backgroundImage:
      "url('https://media.istockphoto.com/id/1451316016/photo/lms-learning-management-system-for-lesson-and-online-education-course-application-study-e.jpg?s=612x612&w=0&k=20&c=fRH0AanVP3IkjZtYNwJiyALkAvN3plLtrcPd1L2MrJo=')",
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
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
          }}
        >
          <div className="text-center mb-3">
            <h2 className="fw-bold text-primary">UMT LMS</h2>
            <p className="text-muted">Create your account</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </div>

          <div className="text-center">
            <p className="mb-0">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="btn btn-link p-0"
                style={{ fontSize: "1rem" }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
