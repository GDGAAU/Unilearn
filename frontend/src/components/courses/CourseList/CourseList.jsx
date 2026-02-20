import React from 'react';
import CourseCard from "../CourseCard/CourseCard";
import styles from './CourseList.module.css';

const CourseList = ({ courses }) => {
    return (
        <div className={styles.grid}> {/* Used className instead of style */}
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseList;