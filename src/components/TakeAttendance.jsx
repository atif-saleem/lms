import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function TakeAttendance() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = parseInt(searchParams.get("courseId"));

  const [students, setStudents] = useState([]);
  const [attending, setAttending] = useState({});

 useEffect(() => {
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];

  // ✅ Extract students enrolled in this course
  const joinedStudentEmails = enrollments
    .filter((e) => e.courseId === courseId)
    .map((e) => e.email);

  const enrolledStudents = allUsers.filter(
    (u) => u.role === "student" && joinedStudentEmails.includes(u.email)
  );

  setStudents(enrolledStudents);

  // ✅ Load attendance for today
  const todayKey = getTodayKey();
  const allAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
  const todayAttendance = allAttendance[courseId]?.[todayKey] || {};

  setAttending(todayAttendance);
}, [courseId]);


  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const toggleAttendance = (email) => {
    setAttending((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  const saveAttendance = () => {
    const all = JSON.parse(localStorage.getItem("attendance")) || {};
    const todayKey = getTodayKey();

    if (!all[courseId]) all[courseId] = {};
    all[courseId][todayKey] = attending;

    localStorage.setItem("attendance", JSON.stringify(all));
    alert("Attendance saved successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h3 className="mb-4 text-center text-primary">
          Mark Attendance for {getTodayKey()}
        </h3>

        {students.length === 0 ? (
          <div className="alert alert-info text-center">
            No students enrolled in this course.
          </div>
        ) : (
          <>
            <ul className="list-group mb-4">
              {students.map((student) => (
                <li
                  key={student.email}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    attending[student.email] ? "list-group-item-success" : ""
                  }`}
                >
                  {student.email}
                  <button
                    className={`btn btn-sm ${
                      attending[student.email] ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => toggleAttendance(student.email)}
                  >
                    {attending[student.email] ? "Absent" : "Present"}
                  </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary w-100" onClick={saveAttendance}>
              Save Attendance
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default TakeAttendance;
