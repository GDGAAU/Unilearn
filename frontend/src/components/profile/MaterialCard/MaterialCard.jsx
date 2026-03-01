import React from 'react';
import styles from './MaterialCard.module.css';

const MaterialCard = ({ material }) => {
  
  const handleDownload = () => {
    if (material.file_url) {
      window.open(material.file_url, '_blank');
    } else {
      alert("This resource does not have a file link available.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <div className={styles.illustration}>📚</div>
      </div>
      
      <div className={styles.content}>
        <p className={styles.infoLine}>
          <span className={styles.label}>Title:</span> {material.title}
        </p>
        
        <p className={styles.infoLine}>
          <span className={styles.label}>Type:</span> {material.resource_type}
        </p>

        <button className={styles.downloadLink} onClick={handleDownload}>
          Download &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;