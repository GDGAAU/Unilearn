import React from 'react';
import styles from './CourseCard.module.css';

const CourseCard = ({ resource }) => {
  const handleDownload = (e) => {
    e.preventDefault();
    if (resource.file_url && resource.file_url !== '#') {
      window.open(resource.file_url, '_blank');
    } else {
      alert("No file attached to this resource yet.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageHeader}>
        <div className={styles.illustration}>📚</div>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.infoLine}>
          <span className={styles.orangeLabel}>CourseName:</span> {resource.title}
        </p>
        <p className={styles.infoLine}>
          <span className={styles.orangeLabel}>Instructor:</span> {resource.instructor_name}
        </p>
        <p className={styles.infoLine}>
          <span className={styles.orangeLabel}>CourseID:</span> {resource.course_code}
        </p>
        
        <div className={styles.footer}>
          <button onClick={handleDownload} className={styles.downloadLink}>
            Download&gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;