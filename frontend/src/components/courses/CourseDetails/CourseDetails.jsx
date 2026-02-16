import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import courseService from "../../../services/courseService";
import styles from "./CourseDetails.module.css"; // Import the styles

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className={styles.container}>Loading course details...</div>;
  if (!course) return <div className={styles.container}>Course not found. <Link to="/courses">Go back</Link></div>;

  return (
    <div className={styles.container}>
      <Link to="/courses" className={styles.backLink}>
        ← Back to All Courses
      </Link>
      
      <header className={styles.header}>
        <span className={styles.codeBadge}>{course.course_code}</span>
        <h1 className={styles.title}>{course.title}</h1>
      </header>

      <hr className={styles.divider} />

      <section>
        <h3 className={styles.sectionTitle}>Course Overview</h3>
        <p className={styles.description}>{course.description}</p>
      </section>

    </div>
  );
};

export default CourseDetails;