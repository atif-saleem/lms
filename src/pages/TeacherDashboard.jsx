import React, { useState, useEffect } from "react";
import { getUser } from "../utils/auth";
import Navbar from "../components/Navbar";

function TeacherDashboard() {
  const user = getUser();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", lessons: "" });
  const [editId, setEditId] = useState(null);

useEffect(() => {
  if (!user) return;

  const all = JSON.parse(localStorage.getItem("courses")) || [];
  setCourses(all.filter((c) => c.teacher === user.email));
}, [user]);


  const saveCourses = (updated) => {
    const all = JSON.parse(localStorage.getItem("courses")) || [];
    const others = all.filter((c) => c.teacher !== user.email);
    localStorage.setItem("courses", JSON.stringify([...others, ...updated]));
    setCourses(updated);
  };
  if (!user || user.role !== "teacher") {
  return null; // Or navigate("/") if you want redirect
}


  const handleAddOrUpdate = () => {
    const lessonsArray = form.lessons.split(",").map((l) => l.trim());

    if (editId) {
      const updated = courses.map((c) =>
        c.id === editId ? { ...c, ...form, lessons: lessonsArray } : c
      );
      saveCourses(updated);
      setEditId(null);
    } else {
      const newCourse = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        lessons: lessonsArray,
        teacher: user.email,
      };
      const updated = [...courses, newCourse];
      saveCourses(updated);
    }

    setForm({ title: "", description: "", lessons: "" });
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setForm({
      title: course.title,
      description: course.description,
      lessons: (course.lessons || []).join(", "),
    });
  };

  const handleDelete = (id) => {
    const updated = courses.filter((c) => c.id !== id);
    saveCourses(updated);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-primary text-center mb-4">Welcome, {user.email}</h2>

        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h4 className="card-title mb-3">
              {editId ? "Update Course" : "Add Course"}
            </h4>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lessons (comma separated)"
                  value={form.lessons}
                  onChange={(e) => setForm({ ...form, lessons: e.target.value })}
                />
              </div>
            </div>
            <div className="text-end mt-3">
              <button className="btn btn-primary" onClick={handleAddOrUpdate}>
                {editId ? "Update" : "Add"} Course
              </button>
            </div>
          </div>
        </div>

        <h4 className="mb-3">Your Courses</h4>
        <div className="row">
          {courses.length === 0 && <p>No courses added yet.</p>}
          {courses.map((course) => (
            <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <small className="text-muted">
                      Lessons: {(course.lessons || []).join(", ")}
                    </small>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
