import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminAccounts.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";

const API_BASE = "http://127.0.0.1:8000/api";

const AdminAccounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [showFlagged, setShowFlagged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("access_token"); // assume token is stored
        const res = await fetch(`${API_BASE}/instructors/admin/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch accounts");
        const data = await res.json();

        // Map API response to expected structure
        const mappedAccounts = data.map((item) => ({
          id: item.id,
          name: item.name,
          department: item.courses?.[0]?.department || "N/A",
          year: item.courses?.[0]?.year || "N/A",
          flagged: false, // flag UI only
        }));

        setAccounts(mappedAccounts);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  // Flag toggle (UI only)
  const handleFlagToggle = (id) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, flagged: !acc.flagged } : acc))
    );
  };

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch = acc.department.toLowerCase().includes(searchTerm.toLowerCase());
    return showFlagged ? acc.flagged && matchesSearch : matchesSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* 🔍 SEARCH + TOGGLE */}
        <div className={styles.topBar}>
          <input
            type="text"
            placeholder="Search by department..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span
            className={styles.toggle}
            onClick={() => setShowFlagged(!showFlagged)}
          >
            {showFlagged ? "<< Back" : ">> view flagged accounts"}
          </span>
        </div>

        {/* 🧾 CARDS */}
        {filteredAccounts.map((acc) => (
          <div key={acc.id} className={styles.card}>
            
            {/* LEFT */}
            <div className={styles.left}>
              <img src={instructorAvatar} alt="avatar" className={styles.avatar} />

              <div>
                <h3>{acc.name}</h3>
                <p>
                  <span>Year of study:</span> {acc.year}
                </p>

                <div className={styles.tags}>
                  <span>{acc.department}</span>
                  <span>{acc.year}</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.right}>
              
              {/* 🚩 FLAG */}
              <button
                className={styles.flagBtn}
                onClick={() => handleFlagToggle(acc.id)}
              >
                {acc.flagged ? "UnFlag" : "Flag"}
              </button>

              {/* 📁 PROJECTS */}
              <button
                className={styles.projectBtn}
                onClick={() => navigate(`/app/projects?user=${acc.id}`)}
              >
                Projects
              </button>

              {/* 🔍 INSIGHTS */}
              <span
                className={styles.link}
                onClick={() => navigate(`/app/admin/insights/${acc.id}`)}
              >
                See Insights &gt;&gt;
              </span>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredAccounts.length === 0 && (
          <p className={styles.emptyText}>No accounts found</p>
        )}
      </div>
    </div>
  );
};

export default AdminAccounts;