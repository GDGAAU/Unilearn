import React, { useState, useEffect } from 'react';
import CourseList from '../../components/courses/CourseList/CourseList';
import styles from './Courses.module.css';

const Courses = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResources([
      { id: 1, title: 'Distributed Systems', instructor_name: 'Dr. Abebe', course_code: '47', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 2, title: 'Distributed Systems', instructor_name: 'Dr. Abebe', course_code: '47', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 3, title: 'Distributed Systems', instructor_name: 'Dr. Abebe', course_code: '47', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 4, title: 'Distributed Systems', instructor_name: 'Dr. Abebe', course_code: '47', file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchInner}>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Software Engineering Department</h1>
        <CourseList courses={resources} />
      </div>
    </div>
  );
};

export default Courses;