import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import styles from "./CourseDetails.module.css"; 

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}/`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className={styles.status}>Loading details...</div>;
  if (!course) return <div className={styles.status}>Course not found. <Link to="/courses">Go back</Link></div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link to="/courses" className={styles.backButton}>
          ← Back to Courses
        </Link>
        
        <header className={styles.header}>
          <span className={styles.courseCode}>{course.course_code}</span>
          <h1 className={styles.courseName}>{course.course_name}</h1>
        </header>

        <hr className={styles.divider} />

        <section className={styles.overviewSection}>
          <h3 className={styles.sectionTitle}>Course Overview</h3>
          <p className={styles.description}>{course.description}</p>
        </section>
        
      </div>
    </div>
  );
};

export default CourseDetails;