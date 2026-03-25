import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminProfile.module.css"; // keeps original CSS
import instructorAvatar from "../../../assets/instructor-avatar.png";

const API_BASE = "http://127.0.0.1:8000/api";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Mock data fallback
  const mockUser = {
    id: 1,
    full_name: "Hundaol Dagne",
    email: "Hundaol@example.com",
    year: "3rd",
    department: "Software Engineering",
    role: "admin",
    bio: "I love coding, AI, and open-source projects.",
  };
  const mockResources = [
    { id: 1, title: "Midterm Notes", resource_type: "notes" },
    { id: 2, title: "Lecture Slides", resource_type: "slides" },
  ];
  const mockProjects = [
    {
      id: 1,
      title: "Campus Planner",
      description: "Web app to organize courses and schedules",
      tech_stack: ["React", "Django", "PostgreSQL"],
    },
    {
      id: 2,
      title: "AI Chatbot",
      description: "AI-powered chatbot for university FAQs",
      tech_stack: ["Python", "TensorFlow", "React"],
    },
  ];

  // ------------------- FETCH PROFILE -------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user info
        const resUser = await fetch(`${API_BASE}/accounts/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch profile");
        const dataUser = await resUser.json();
        setUser(dataUser);

        // Fetch user resources
        const resResources = await fetch(`${API_BASE}/resources/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataResources = await resResources.json();
        setResources(dataResources);

        // Fetch user projects
        const resProjects = await fetch(`${API_BASE}/projects/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataProjects = await resProjects.json();
        setProjects(dataProjects);
      } catch (err) {
        console.error(err);
        // fallback mock
        setUser(mockUser);
        setResources(mockResources);
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ------------------- EDIT HANDLERS -------------------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/accounts/me/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: user.full_name,
          email: user.email,
          year: user.year,
          department: user.department,
          bio: user.bio,
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");
      const updatedUser = await res.json();
      setUser(updatedUser);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving profile. Changes not saved.");
    }
  };

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (!user) return <div className={styles.status}>User not found</div>;

  // ------------------- VIEW / EDIT JSX -------------------
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <img src={instructorAvatar} alt="Avatar" />
          </div>

          {!editing ? (
            // ---------- VIEW MODE ----------
            <div className={styles.userDetails}>
              <h1 className={styles.userName}>{user.full_name}</h1>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p className={styles.bio}>{user.bio}</p>
              <div className={styles.actionBtns}>
                <button
                  className={styles.editBtn}
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            // ---------- EDIT MODE ----------
            <form className={styles.editForm} onSubmit={handleSave}>
              <label>Full Name</label>
              <input
                name="full_name"
                value={user.full_name}
                onChange={handleChange}
              />

              <label>Email</label>
              <input name="email" value={user.email} onChange={handleChange} />

              <label>Year</label>
              <input name="year" value={user.year} onChange={handleChange} />

              <label>Department</label>
              <input
                name="department"
                value={user.department}
                onChange={handleChange}
              />

              <label>Bio</label>
              <textarea name="bio" value={user.bio} onChange={handleChange} />

              <button type="submit" className={styles.saveBtn}>
                Save Changes
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Materials */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Materials Published</h2>
          <div className={styles.materialScroll}>
            {resources.length > 0 ? (
              resources.map((res) => (
                <div key={res.id} className={styles.card}>
                  <h3>{res.title}</h3>
                  <p>Type: {res.resource_type}</p>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>No materials published</p>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects Showcased</h2>
          <div className={styles.projectsList}>
            {projects.length > 0 ? (
              projects.map((proj) => (
                <div key={proj.id} className={styles.projectItem}>
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div className={styles.techStack}>
                    {proj.tech_stack.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>No projects showcased yet</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProfile;