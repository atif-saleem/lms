import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <span className="navbar-brand fw-bold">GCUL</span>
      <button className="btn btn-danger ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
