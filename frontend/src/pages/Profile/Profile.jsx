import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; 
import MaterialCard from '../../components/profile/MaterialCard/MaterialCard';
import styles from './Profile.module.css';

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const profileRes = await api.get(`/accounts/profiles/${id}/`);
        setProfile(profileRes.data);

        // Fetch resources filtered by user
        const resourcesRes = await api.get(`/resources/?user=${id}`);
        setResources(resourcesRes.data);

        // Fetch projects filtered by user
        const projectsRes = await api.get(`/projects/?user=${id}`);
        setProjects(projectsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Could not retrieve profile data from the server.");
        setLoading(false);
      }
    };

    if (id) fetchProfileData();
  }, [id]);

  const handleAddResource = async () => {
    try {
      const res = await api.post('/resources/', {
        ...newResource,
        user: id,
      });
      setResources(prev => [...prev, res.data]);
      setShowModal(false);
      setNewResource({ title: '', description: '', link: '' });
    } catch (err) {
      console.error("Add Resource Error:", err);
      alert("Failed to add resource.");
    }
  };

  if (loading) return <div className={styles.status}>Loading Profile...</div>;
  if (error) return <div className={styles.status}>{error}</div>;
  if (!profile) return <div className={styles.status}>No profile found.</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Profile Info */}
        <section className={styles.profileSection}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
                alt="User Avatar"
              />
            </div>
            <div className={styles.userDetails}>
              <h1 className={styles.userName}>{profile.full_name}</h1>
              <p className={styles.infoLine}>
                Year of Study: <strong>{profile.year}</strong>
              </p>
              <p className={styles.infoLine}>
                Department: <strong>{profile.department}</strong>
              </p>
              <p className={styles.bio}>{profile.bio}</p>
            </div>
          </div>
        </section>

        {/* Materials Published */}
        <section className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Materials Published</h2>
          <div className={styles.materialScroll}>
            {resources.length > 0 ? (
              resources.map(res => (
                <MaterialCard key={res.id} material={res} />
              ))
            ) : (
              <p className={styles.emptyText}>No resources published.</p>
            )}
            <button
              className={styles.addBtn}
              onClick={() => setShowModal(true)}
            >
              +
            </button>
          </div>
        </section>

        {/* Projects Showcased */}
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
                      <span key={index} className={styles.techBadge}>
                        {tech}
                      </span>
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

      {/* Modal for adding new resource */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Add New Resource</h2>
            <input
              className={styles.modalInput}
              placeholder="Title"
              value={newResource.title}
              onChange={e =>
                setNewResource(prev => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              className={styles.modalInput}
              placeholder="Description"
              value={newResource.description}
              onChange={e =>
                setNewResource(prev => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <input
              className={styles.modalInput}
              placeholder="Link"
              value={newResource.link}
              onChange={e =>
                setNewResource(prev => ({ ...prev, link: e.target.value }))
              }
            />
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleAddResource}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;