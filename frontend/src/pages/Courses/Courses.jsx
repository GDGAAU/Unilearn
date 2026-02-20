import React, { useState, useEffect } from 'react';
import courseService from "../../services/courseService";
import CourseList from "../../components/courses/CourseList/CourseList";
import styles from './Courses.module.css'; // Import

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <div style={{ textAlign: 'center' }}>Loading Courses...</div>;

    if (courses.length === 0) return <div style={{ textAlign: 'center' }}>No courses found.</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Explore Courses</h1>
                <p>Find academic resources and student projects.</p>
            </header>
            <CourseList courses={courses} />
        </div>
    );
};

export default Courses;