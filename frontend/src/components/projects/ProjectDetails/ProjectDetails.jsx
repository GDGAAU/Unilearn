import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './ProjectDetails.module.css';
import { api } from '../../../services/api';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [likes, setLikes] = useState(location.state?.currentLikes || 0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.projects.getById(id);
        setProject(data);
        if (!location.state?.currentLikes) {
          setLikes(data.likes_count || data.likesCount || 0);
        }
      } catch (err) {
        console.error("Failed to fetch project details.");
      }
    };
    fetchDetails();
  }, [id, location.state]);

  if (!project) return <div className={styles.loading}>Loading Project Report...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to Projects</button>
        <span className={styles.categoryBadge}>{project.category || "Academic Project"}</span>
      </div>

      <div className={styles.mainPaper}>
        <section className={styles.titleSection}>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.authorLead}>Developed by <span className={styles.orange}>{project.author}</span></p>
        </section>

        <img src={project.screenshots?.[0] || project.mediaUrl} alt="Hero" className={styles.heroImg} />

        <div className={styles.gridBody}>
          <div className={styles.leftCol}>
            <h3 className={styles.sectionHeading}>Project Overview</h3>
            <p className={styles.descriptionText}>{project.fullDescription || project.description}</p>
            <h3 className={styles.sectionHeading}>Technical Breakdown</h3>
            <p className={styles.descriptionText}>Built using modular architecture principles as part of the UniLearn academic showcase.</p>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.statBox}>
              <span className={styles.label}>Tech Stack</span>
              <div className={styles.tagCloud}>
                {(project.tech_stack || project.tags)?.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
              </div>
            </div>
            <div className={styles.statBox}>
              <span className={styles.label}>Student Recognition</span>
              <p className={styles.starCount}>★ {likes} Stars</p>
            </div>
            <button className={styles.primaryDownload} onClick={() => window.open(project.zipUrl)}>Download Zip File</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;