import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddCourse.module.css";
import api from "../../../services/api";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("1st");

  const handleSave = async () => {
    if (!courseName || !department || !year) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      course_name: courseName,
      department,
      year: parseInt(year),
    };

    try {
      await api.post("/courses/", payload);
      alert("Course added successfully!");
      navigate("/app/admin/courses");
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to add course. Check console for details.");
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Add New Course</h1>
      <div className={styles.form}>
        <label>Course Name</label>
        <input
          type="text"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <label>Department</label>
        <input
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <label>Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
          <option value="5th">5th Year</option>
        </select>

        <button className={styles.saveBtn} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCourse;