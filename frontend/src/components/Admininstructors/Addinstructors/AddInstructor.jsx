import React, { useState } from 'react';
import styles from './AddInstructor.module.css';

const AddInstructor = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({ 
    name: "", 
    subject: "Data Structures and Algorithms", 
    imageFile: null 
  });
  const [preview, setPreview] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file }); 
    }
  };

  const handleCreate = () => {
    if (!formData.name.trim()) {
      alert("Please insert the instructor's name!");
      return;
    }
    onSave(formData);
    setIsCreated(true);
  };

  return (
    <div className={styles.formIsland}>
      <h2 className={styles.label}>Add New Instructor</h2>
      
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Full Name (Required)" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Primary Subject</label>
        <select 
          className={styles.select} 
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          <option>Data Structures and Algorithms</option>
          <option>Inclusiveness</option>
          <option>Applied Math 1</option>
          <option>Database</option>
          <option>Networking</option>
        </select>
      </div>

      <div className={styles.uploadSection}>
        <label className={styles.uploadBox}>
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImg} />
          ) : (
            <span>Click to Upload Picture</span>
          )}
        </label>
      </div>

      <div className={styles.footer}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button 
          className={styles.saveBtn} 
          onClick={handleCreate}
          style={{ backgroundColor: isCreated ? "#4CAF50" : "#DA7D19" }}
        >
          {isCreated ? "Created! ✓" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddInstructor;