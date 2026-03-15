import React, { useState } from 'react';
import styles from './EditInstructor.module.css';

const EditInstructor = ({ instructor, onSave, onCancel, onDelete, onSeeInsights }) => {
  const [formData, setFormData] = useState({ ...instructor, imageFile: null });
  const [preview, setPreview] = useState(instructor.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file }); 
    }
  };

  const handleLocalSave = () => {
    onSave(formData);
    setIsSaved(true);
  };

  return (
    <div className={styles.formIsland}>
      <div className={styles.formHeader}>
         <span className={styles.insightsLink} onClick={onSeeInsights}>See Insights &raquo;&raquo;</span>
         <button className={styles.deleteLink} onClick={onDelete}>Delete Instructor</button>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Name</label>
        <input 
          type="text" 
          className={styles.input} 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        />
      </div>

      {/* DEPARTMENT FIELD */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Department</label>
        <input 
          type="text" 
          className={styles.input} 
          value={formData.department || "Software Engineering"} 
          onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
        />
      </div>

      {/* SUBJECTS FIELD */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Subjects</label>
        <select 
          className={styles.select} 
          value={formData.subjects[0]} 
          onChange={(e) => setFormData({ ...formData, subjects: [e.target.value] })}
        >
          <option>Data Structures and Algorithms</option>
          <option>Inclusiveness</option>
          <option>Applied Math 1</option>
          <option>Database</option>
          <option>Networking</option>
        </select>
      </div>
         
         {/* IMAGE UPLOAD */}
      <div className={styles.uploadSection}>
        <label className={styles.label}>Change Picture</label>
        <label className={styles.uploadBox}>
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
          <img src={preview} alt="Profile" className={styles.previewImg} />
        </label>
      </div>

      <div className={styles.footer}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button 
          className={styles.saveBtn} 
          onClick={handleLocalSave}
          style={{ backgroundColor: isSaved ? "#4CAF50" : "#DA7D19" }}
        >
          {isSaved ? "Saved! ✓" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditInstructor;