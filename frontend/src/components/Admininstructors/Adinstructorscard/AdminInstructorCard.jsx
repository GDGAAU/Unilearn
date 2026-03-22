import React from "react";
import styles from "./AdminInstructorCard.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";

function AdminInstructorCard({ instructor, onEdit, onDelete, onSeeInsights }) {

  const subjectsList = Array.isArray(instructor.subjects)
    ? instructor.subjects.join(", ")
    : instructor.subjects || "No subjects assigned";

  return (
    <div className={styles.card}>
      <div className={styles.leftSection}>
        <img
          src={instructor.avatar || instructorAvatar}
          alt={instructor.name}
          className={styles.avatar}
          onError={(e) => { e.target.src = instructorAvatar; }}
        />

        <div className={styles.info}>
          <h3 className={styles.name}>{instructor.name}</h3>
          <p className={styles.subjects}>
            <span className={styles.subjectsLabel}>Subjects:</span> {subjectsList}
          </p>
       
          {instructor.department && (
             <p className={styles.departmentText}>{instructor.department}</p>
          )}
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.buttonGroup}>
          <button className={styles.editBtn} onClick={onEdit}>Edit</button>
          <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
        </div>

        <span 
          className={styles.seeInsightsText}
          onClick={onSeeInsights}
        >
          See Insights »»
        </span>
      </div>
    </div>
  );
}

export default AdminInstructorCard;