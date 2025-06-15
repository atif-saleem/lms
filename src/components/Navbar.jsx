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
      <div className="navbar-brand d-flex align-items-center gap-2 fw-bold">
        <img
          src="/umt-logo.png"
          alt="UMT Logo"
          width="40"
          height="40"
          className="me-2"
        />
        UMT
      </div>
      <button className="btn btn-danger ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
