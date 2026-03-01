import { useState, useEffect, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar/Navbar";
import InstructorCard from "../../components/instructors/InstructorCard/InstructorCard";
import styles from "./Instructors.module.css";
import instructorAvatar from "../../assets/instructor-avatar.png"


/* ── Mock data ── */
const MOCK_DEPARTMENTS = [
  {
    id: 1,
    name: "Software Engineering Department",
    instructors: [
      { id: 1, name: "Mr. Abebe", subjects: ["DSP", "EAD", "HCI"], avatar: instructorAvatar },
      { id: 2, name: "Ms. Hana", subjects: ["Data Structures", "Algorithms"], avatar: instructorAvatar },
    ],
  },
  {
    id: 2,
    name: "Electrical and Computer Engineering Department",
    instructors: [
      { id: 3, name: "Mr. Abebe", subjects: ["DSP", "EAD", "HCI"], avatar:instructorAvatar },
      { id: 4, name: "Ms. Sara", subjects: ["Circuits", "Signals"], avatar: instructorAvatar },
    ],
  },
];




export default function Instructors({ onSelectInstructor }) {
  const { token, logout } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        if (token) {
          const data = await getInstructors(token);
          if (!cancelled) {
            if (Array.isArray(data) && data[0]?.instructors) {
              setDepartments(data);
            } else if (data?.departments) {
              setDepartments(data.departments);
            } else {
              const grouped = {};
              (data || []).forEach((inst) => {
                const dept = inst.department || "Other";
                if (!grouped[dept]) grouped[dept] = { id: dept, name: dept, instructors: [] };
                grouped[dept].instructors.push(inst);
              });
              setDepartments(Object.values(grouped));
            }
          }
        } else {
          if (!cancelled) setDepartments(MOCK_DEPARTMENTS);
        }
      } catch (err) {
        if (!cancelled) setDepartments(MOCK_DEPARTMENTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [token]);

  /* ── Filter by search ── */
  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departments;

    const query = search.toLowerCase();
    return departments
      .map((dept) => ({
        ...dept,
        instructors: dept.instructors.filter(
          (inst) =>
            inst.name.toLowerCase().includes(query) ||
            (inst.subjects || []).some((s) => s.toLowerCase().includes(query))
        ),
      }))
      .filter((dept) => dept.instructors.length > 0);
  }, [departments, search]);


  
  return (
    <div className={styles.page}>
      <Navbar activePage="Instructors" onLogout={logout} />

      <div className={styles.content}>
        {/* Search bar */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search instructors or subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search instructors"
          />
          <button type="button" className={styles.searchButton} aria-label="Search">
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner} />
          </div>
        )}

        {/* Error */}
        {error && <div className={styles.errorBox} role="alert">{error}</div>}

        {/* Departments */}
        {!loading && !error && filteredDepartments.length === 0 && (
          <p className={styles.emptyText}>
          {search.trim() 
          ? `No results for "${search}"` 
          : "No instructors found."}
          </p>
        )}

        {!loading &&
          filteredDepartments.map((dept) => (
            <section key={dept.id || dept.name} className={styles.departmentSection}>
              <h2 className={styles.departmentName}>{dept.name}</h2>
              <div className={styles.instructorGrid}>
                {dept.instructors.map((inst) => (
                  <InstructorCard
                    key={inst.id}
                    instructor={inst}
                    onLearnMore={() => onSelectInstructor && onSelectInstructor(inst, dept)}
                  />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
