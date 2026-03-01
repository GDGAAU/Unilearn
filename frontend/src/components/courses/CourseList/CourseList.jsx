import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import styles from './CourseList.module.css';

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p className={styles.empty}>No academic resources found.</p>;
  }

  return (
    <div className={styles.grid}>
      {courses.map((item) => (
        <CourseCard 
          key={item.id} 
          resource={item}
        />
      ))}
    </div>
  );
};

export default CourseList;