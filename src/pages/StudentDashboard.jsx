import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDashboard() {
  const user = getUser();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [joined, setJoined] = useState([]);
  const [activeLessons, setActiveLessons] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/");
      return;
    }

    const allCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];

    const joinedIds = enrollments
      .filter((e) => e.email === user.email)
      .map((e) => e.courseId);

    setCourses(allCourses);
    setJoined(joinedIds);
  }, [user, navigate]);

  const joinCourse = (courseId) => {
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];

    if (enrollments.find((e) => e.email === user.email && e.courseId === courseId)) return;

    const updated = [...enrollments, { email: user.email, courseId }];
    localStorage.setItem("enrollments", JSON.stringify(updated));
    setJoined([...joined, courseId]);
  };

  const showLessons = (course) => {
    setActiveLessons(course.lessons || []);
  };

  if (!user) return null;

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4 text-center text-primary">Welcome, {user?.email}</h2>

        <h4 className="mb-3">Available Courses</h4>
        <div className="row">
          {courses.length === 0 && <p>No courses available</p>}

          {courses.map((course) => (
            <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <small className="text-muted">By: {course.teacher}</small>
                  </div>
                  <div className="mt-3">
                    {joined.includes(course.id) ? (
                      <button
                        onClick={() => showLessons(course)}
                        className="btn btn-outline-success w-100"
                      >
                        View Lessons
                      </button>
                    ) : (
                      <button
                        onClick={() => joinCourse(course.id)}
                        className="btn btn-primary w-100"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeLessons.length > 0 && (
          <div className="mt-5">
            <h4>Lessons</h4>
            <ul className="list-group">
              {activeLessons.map((lesson, idx) => (
                <li key={idx} className="list-group-item">
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
