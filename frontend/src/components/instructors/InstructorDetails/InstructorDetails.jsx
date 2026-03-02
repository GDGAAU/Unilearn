import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../../common/Navbar/Navbar";
import styles from "./InstructorDetails.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";

// --------------------
// Demo / fallback data
// --------------------
const DEMO_INSTRUCTOR = {
  id: 1,
  name: "Dr. Jane Smith",
  avatar: instructorAvatar,
  subjects: [
    { subject_name: "DSP" },
    { subject_name: "EAD" },
    { subject_name: "HCI" },
  ],
};

const DEMO_INSIGHTS = [
  {
    id: 1,
    teaching_style: "Concept-focused",
    assessment_type: "Projects and exams",
    workload_level: "Medium",
    status: "approved",
  },
  {
    id: 2,
    teaching_style: "Practical-heavy",
    assessment_type: "Assignments only",
    workload_level: "Low",
    status: "approved",
  },
];

// --------------------
// Backend API helpers
// Replace these with real API calls later
// --------------------
async function getInstructorDetails(id, token) {
  if (!token) {
    // demo fallback
    await new Promise((r) => setTimeout(r, 300));
    return DEMO_INSTRUCTOR;
  }

  // Example real backend call:
  // const res = await fetch(`/api/instructors/${id}/`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return await res.json();

  await new Promise((r) => setTimeout(r, 300)); // simulate delay
  return DEMO_INSTRUCTOR; // demo fallback
}

async function getInstructorInsights(id, token) {
  if (!token) {
    await new Promise((r) => setTimeout(r, 300));
    return DEMO_INSIGHTS;
  }

  // Example real backend call:
  // const res = await fetch(`/api/instructors/${id}/insights/`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return await res.json();

  await new Promise((r) => setTimeout(r, 300));
  return DEMO_INSIGHTS;
}

async function postInsight(id, payload, token) {
  if (!token) {
    await new Promise((r) => setTimeout(r, 300));
    return { ...payload, id: Date.now(), status: "pending" }; // mark as pending
  }

  // Example real backend POST:
  // const res = await fetch(`/api/instructors/${id}/insights/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(payload),
  // });
  // return await res.json();

  await new Promise((r) => setTimeout(r, 300));
  return { ...payload, id: Date.now(), status: "pending" };
}

// --------------------
// Component
// --------------------
export default function InstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [details, setDetails] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    teaching_style: "",
    assessment_type: "",
    workload_level: "",
  });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --------------------
  // Fetch instructor details + insights
  // --------------------
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const [detailsData, insightsData] = await Promise.all([
          getInstructorDetails(id, token),
          getInstructorInsights(id, token),
        ]);
        if (!cancelled) {
          setDetails(detailsData);
          setInsights(insightsData.filter((i) => i.status === "approved")); // only show approved
        }
      } catch {
        if (!cancelled) {
          setDetails(DEMO_INSTRUCTOR);
          setInsights(DEMO_INSIGHTS.filter((i) => i.status === "approved"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [id, token]);

  // --------------------
  // Submit insight
  // --------------------
  async function handleSubmitInsight() {
    const { teaching_style, assessment_type, workload_level } = formData;
    if (!teaching_style || !assessment_type || !workload_level) return;

    setPosting(true);
    setError("");

    try {
      const newInsight = await postInsight(id, formData, token);

      // Do NOT add pending insight to UI (simulate review workflow)
      setFormData({ teaching_style: "", assessment_type: "", workload_level: "" });
      setShowForm(false);
      setSuccessMessage("Your insight has been sent for review.");

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setError(err.message || "Failed to submit insight.");
    } finally {
      setPosting(false);
    }
  }

  const subjectsList = details?.subjects?.map((s) => s.subject_name).join(", ") || "N/A";

  // --------------------
  // JSX
  // --------------------
  return (
    <div className={styles.page}>
      <Navbar activePage="Instructors" onLogout={logout} />

      <div className={styles.content}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/instructors")}
        >
          <span className={styles.backArrow}>&lt;</span> Back to Instructors
        </button>

        <h1 className={styles.departmentTitle}>Instructor Details</h1>

        {loading && (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner} />
          </div>
        )}

        {!loading && details && (
          <>
            {/* Header Card */}
            <div className={styles.headerCard}>
              <div className={styles.headerLeft}>
                <img
                  src={details.avatar || instructorAvatar}
                  alt={`${details.name} avatar`}
                  className={styles.headerAvatar}
                />
                <div className={styles.headerInfo}>
                  <h2 className={styles.headerName}>{details.name}</h2>
                  <p className={styles.headerSubjects}>
                    <span className={styles.headerSubjectsLabel}>Subjects:</span>{" "}
                    {subjectsList}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={styles.addCommentButton}
                onClick={() => setShowForm(!showForm)}
                aria-expanded={showForm}
              >
                <div className={styles.commentDiv}>
                  <span className={styles.addCommentIcon}>+</span>
                  <span className={styles.addCommentText}>Add Insight</span>
                </div>
                <span className={styles.addCommentNote}>
                  Please be mindful of the words and connotations you use
                </span>
              </button>
            </div>

            {/* Insight Form */}
            {showForm && (
              <div className={styles.commentFormCard}>
                <div className={styles.commentFormHeader}>
                  <img
                    src={instructorAvatar}
                    alt="Your avatar"
                    className={styles.commentFormAvatar}
                  />
                  <h3 className={styles.commentFormName}>{user?.name || "You"}</h3>
                </div>

                <div className={styles.formGroup}>
                  <label>Teaching Style:</label>
                  <textarea
                    className={styles.commentTextarea}
                    value={formData.teaching_style}
                    onChange={(e) =>
                      setFormData({ ...formData, teaching_style: e.target.value })
                    }
                    placeholder="e.g. Concept-focused"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Assessment Type:</label>
                  <textarea
                    className={styles.commentTextarea}
                    value={formData.assessment_type}
                    onChange={(e) =>
                      setFormData({ ...formData, assessment_type: e.target.value })
                    }
                    placeholder="e.g. Projects and exams"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Workload Level:</label>
                  <textarea
                    className={styles.commentTextarea}
                    value={formData.workload_level}
                    onChange={(e) =>
                      setFormData({ ...formData, workload_level: e.target.value })
                    }
                    placeholder="e.g. Medium"
                  />
                </div>

                {error && <div className={styles.errorBox}>{error}</div>}

                <div className={styles.commentFormActions}>
                  <button
                    type="button"
                    className={styles.postButton}
                    onClick={handleSubmitInsight}
                    disabled={
                      posting ||
                      !formData.teaching_style.trim() ||
                      !formData.assessment_type.trim() ||
                      !formData.workload_level.trim()
                    }
                  >
                    {posting ? "Posting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}

            {successMessage && (
              <div className={styles.successBox}>{successMessage}</div>
            )}

            {/* Insights Section */}
            {insights.length === 0 ? (
              <p className={styles.emptyComments}>No insights yet. Be the first!</p>
            ) : (
              insights.map((insight) => (
                <div key={insight.id} className={styles.commentCard}>
                  <div className={styles.commentHeader}>
                    <img
                      src={instructorAvatar}
                      alt="avatar"
                      className={styles.commentAvatar}
                    />
                    <div>
                      <h4 className={styles.commentAuthor}>Insight</h4>
                      <p className={styles.commentText}>
                        <strong>Teaching Style:</strong> {insight.teaching_style} <br />
                        <strong>Assessment:</strong> {insight.assessment_type} <br />
                        <strong>Workload:</strong> {insight.workload_level}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}