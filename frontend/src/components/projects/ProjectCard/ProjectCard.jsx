import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import { api } from '../../../services/api';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [serverLikes, setServerLikes] = useState(project.likes_count || project.likesCount || 0);

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`, { 
      state: { currentLikes: displayCount, userHasLiked: isLiked } 
    });
  };

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    try {
      const res = await api.projects.like(project.id);
      if (res?.new_count !== undefined) setServerLikes(res.new_count);
    } catch (err) {
      console.error("Like failed");
    }
  };

  const displayCount = isLiked ? serverLikes + 1 : serverLikes;

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={project.mediaUrl || "https://via.placeholder.com/300x200"} alt={project.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.author}>By {project.author || project.authorName}</h3>
        <p className={styles.description}>
          <strong>{project.title}: </strong>{project.description}
        </p>
        <div className={styles.languages}>
          <span className={styles.label}>Languages: </span>{project.tags?.join(", ")}
        </div>
        <div className={styles.stars}>
          <span className={styles.label}>Stars: </span>{displayCount}
        </div>
        <div className={styles.footer}>
          <div className={isLiked ? styles.starFilled : styles.starOutline} onClick={handleToggleLike}>★</div>
          <a href={project.zipUrl || "#"} className={styles.downloadLink} download onClick={(e) => e.stopPropagation()}>
            Download zip file 
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;