import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminCourses.module.css";
import api from "../../../services/api";

const AdminCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/courses/${id}/`);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete course. Check console.");
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.course_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button
          className={styles.addBtn}
          onClick={() => navigate("/app/admin/courses/add")}
        >
          + Add Course
        </button>
      </div>

      <div className={styles.grid}>
        {filteredCourses.length === 0 && <p className={styles.empty}>No courses found.</p>}

        {filteredCourses.map((course) => (
          <div key={course.id} className={styles.card}>
            <h2>{course.course_name}</h2>
            <div className={styles.tags}>
              <span className={styles.tag}>{course.department}</span>
              <span className={styles.tag}>{course.year}</span>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.viewBtn}
                onClick={() => navigate(`/app/courses/${course.id}`)}
              >
                View
              </button>
              <button
                className={styles.editBtn}
                onClick={() => navigate(`/app/admin/courses/edit/${course.id}`)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;