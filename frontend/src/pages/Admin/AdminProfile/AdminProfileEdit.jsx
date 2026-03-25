import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminProfileEdit.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";

const API_BASE = "http://127.0.0.1:8000/api";

const AdminProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock fallback
  const mockUser = {
    id: 1,
    full_name: "Hundaol Dagne",
    email: "Hundaol@example.com",
    year: "3rd",
    department: "Software Engineering",
    bio: "I love coding, AI, and open-source projects.",
  };

  // ------------------- FETCH USER -------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/accounts/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Fetch failed, using mock data:", err);
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ------------------- INPUT HANDLER -------------------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ------------------- SAVE PROFILE -------------------
  const handleSubmit = async (e) => {
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
      navigate("/app/admin/profile");
    } catch (err) {
      console.error(err);
      alert("Error saving profile. Changes not saved.");
      navigate("/app/admin/profile");
    }
  };

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (!user) return <div className={styles.status}>User not found</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Edit Profile</h1>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            <img src={instructorAvatar} alt="Avatar" />
          </div>
          <form className={styles.editForm} onSubmit={handleSubmit}>
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
              onClick={() => navigate("/app/admin/profile")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileEdit;