import React, { useState, useEffect } from "react";
import ProjectList from "../../components/projects/ProjectList/ProjectList";
import styles from "./Projects.module.css";
import { api } from "../../services/api";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.projects.getAll();
        if (data && data.length > 0) setProjects(data);
      } catch (err) {
        console.log("Backend offline, using local state or empty array.");
      }
    };
    loadData();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.searchSection}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.iconButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      <h2 className={styles.deptTitle}>
        {projects.length > 0 && projects[0].department 
          ? `${projects[0].department} Department` 
          : "Academic Projects"}
      </h2>

      <div className={styles.listContainer}>
        {filteredProjects.length > 0 ? (
          <ProjectList projects={filteredProjects} />
        ) : (
          <p className={styles.noResults}>No projects found for "{search}"</p>
        )}
      </div>
    </div>
  );
};

export default Projects;