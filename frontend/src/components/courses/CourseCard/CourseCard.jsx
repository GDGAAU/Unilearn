import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css'; 

const CourseCard = ({ course }) => {
    return (
        <div className={styles.card}> {/* Use the CSS class */}
            <h3>{course.title}</h3>
            <p><strong>Code:</strong> {course.course_code}</p>
            <Link to={`/courses/${course.id}`} className={styles.link}>
                View Course Details
            </Link>
        </div>
    );
};

export default CourseCard;