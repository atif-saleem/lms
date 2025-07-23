import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AddQuiz from "./components/AddQuiz";
import TakeAttendance from "./components/TakeAttendance"; // ✅ correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/attendance" element={<TakeAttendance />} /> {/* ✅ fixed */}
      </Routes>
    </Router>
  );
}

export default App;
