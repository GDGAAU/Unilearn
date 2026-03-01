import { useNavigate } from "react-router-dom";
import styles from "./InstructorCard.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png"




export default function InstructorCard({ instructor }) {
  const navigate = useNavigate();

  const subjectsList = Array.isArray(instructor.subjects)
    ? instructor.subjects.join(", ")
    : instructor.subjects || "";

  return (
    <div className={styles.card}>
      <img
        src={instructor.avatar || {instructorAvatar}}
        alt={`${instructor.name} avatar`}
        className={styles.avatar}
      />

      <div className={styles.info}>
        <h3 className={styles.name}>{instructor.name}</h3>

        <p className={styles.subjects}>
          <span className={styles.subjectsLabel}>Subjects:</span> {subjectsList}
        </p>

        <button
          type="button"
          className={styles.learnMore}
          onClick={() => navigate(`/instructors/${instructor.id}`)}
        >
          Learn More &raquo;
        </button>
      </div>
    </div>
  );
}
