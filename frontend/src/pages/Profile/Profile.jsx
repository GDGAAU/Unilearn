import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; // Using the base axios instance
import MaterialCard from '../../components/profile/MaterialCard/MaterialCard';
import styles from './Profile.module.css';

const Profile = () => {
  // Use the ID from the URL (e.g., /profile/1)
  const { id } = useParams();
  
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        const profileRes = await api.get(`/accounts/profiles/${id}/`);
        
        const resourcesRes = await api.get('/resources/');
        
        const projectsRes = await api.get('/projects/');

        setProfile(profileRes.data);
        setResources(resourcesRes.data);
        setProjects(projectsRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Could not retrieve profile data from the server.");
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  if (loading) return <div className={styles.status}>Loading Profile...</div>;
  if (error) return <div className={styles.status}>{error}</div>;
  if (!profile) return <div className={styles.status}>No profile found.</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <section className={styles.profileSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`} alt="User" />
            </div>
            <div className={styles.userDetails}>
              <h1 className={styles.userName}>{profile.full_name}</h1>
              <p className={styles.infoLine}>Year of Study: <strong>{profile.year}</strong></p>
              <p className={styles.infoLine}>Department: <strong>{profile.department}</strong></p>
              <p className={styles.bio}>{profile.bio}</p>
            </div>
          </div>
        </section>

        <section className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Materials Published</h2>
          <div className={styles.materialScroll}>
            {resources.length > 0 ? (
              resources.map(res => <MaterialCard key={res.id} material={res} />)
            ) : (
              <p className={styles.emptyText}>No resources published.</p>
            )}
            <button className={styles.addBtn}>+</button>
          </div>
        </section>

        <section className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Projects Showcased</h2>
          <div className={styles.projectsList}>
            {projects.length > 0 ? (
              projects.map(proj => (
                <div key={proj.id} className={styles.projectItem}>
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div className={styles.techStack}>
                    {proj.tech_stack?.map((tech, index) => (
                      <span key={index} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyProjects}>
                <p>Start showcasing your project today.</p>
                <p>You haven't till now :)</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Profile;