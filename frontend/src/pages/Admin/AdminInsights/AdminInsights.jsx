import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminInsights.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";
import Footer from "../../../components/common/Footer/Footer";

const API_BASE = "http://127.0.0.1:8000/api";

const AdminInsights = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all"); // "all" or "detail"
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // ------------------ FETCH INSTRUCTORS + INSIGHTS ------------------
  const fetchInstructors = async () => {
    try {
      const res = await fetch(`${API_BASE}/instructors/admin/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      // Fetch insights for each instructor
      const formatted = await Promise.all(
        data.map(async (inst) => {
          try {
            const insightsRes = await fetch(
              `${API_BASE}/instructors/${inst.id}/insights/list/`
            );
            const insightsData = await insightsRes.json();

            return {
              ...inst,
              avatar: instructorAvatar,
              feedback: insightsData.map((f) => ({
                id: f.id,
                text: `${f.teaching_style} | ${f.assessment_type} | ${f.workload_level}`,
                flagged: false,
              })),
            };
          } catch {
            return {
              ...inst,
              avatar: instructorAvatar,
              feedback: [],
            };
          }
        })
      );

      setInstructors(formatted);
    } catch (err) {
      console.error("Failed fetching instructors:", err);
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // ------------------ ACTIONS ------------------
  const handleFlag = async (instrId, feedbackId) => {
    try {
      await fetch(`${API_BASE}/instructors/admin/insights/${feedbackId}/approve/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "rejected" }),
      });
      updateFlagState(instrId, feedbackId, true);
    } catch (err) {
      console.error(err);
      alert("Failed to flag feedback.");
    }
  };

  const handleUnflag = async (instrId, feedbackId) => {
    try {
      await fetch(`${API_BASE}/instructors/admin/insights/${feedbackId}/approve/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "approved" }),
      });
      updateFlagState(instrId, feedbackId, false);
    } catch (err) {
      console.error(err);
      alert("Failed to unflag feedback.");
    }
  };

  const updateFlagState = (instrId, feedbackId, flagged) => {
    setInstructors((prev) =>
      prev.map((i) =>
        i.id === instrId
          ? {
              ...i,
              feedback: i.feedback.map((f) =>
                f.id === feedbackId ? { ...f, flagged } : f
              ),
            }
          : i
      )
    );
  };

  const handleDelete = async (instrId, feedbackId) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await fetch(`${API_BASE}/instructors/admin/insights/${feedbackId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setInstructors((prev) =>
        prev.map((i) =>
          i.id === instrId
            ? { ...i, feedback: i.feedback.filter((f) => f.id !== feedbackId) }
            : i
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback.");
    }
  };

  const handleAddFeedback = async (instrId) => {
    const teachingStyle = prompt("Enter teaching style:");
    if (!teachingStyle) return;

    try {
      const res = await fetch(`${API_BASE}/instructors/${instrId}/insights/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teaching_style: teachingStyle,
          assessment_type: "Assignments",
          workload_level: "Moderate",
        }),
      });

      const data = await res.json();

      setInstructors((prev) =>
        prev.map((i) =>
          i.id === instrId
            ? {
                ...i,
                feedback: [
                  ...i.feedback,
                  { id: data.id, text: `${teachingStyle} | Assignments | Moderate`, flagged: false },
                ],
              }
            : i
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to add feedback.");
    }
  };

  const handleSeeDetails = (instructor) => {
    setSelectedInstructor(instructor);
    setView("detail");
  };

  const handleBack = () => {
    setView("all");
    setSelectedInstructor(null);
  };

  // ------------------ RENDER ------------------
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          {view === "all" &&
            instructors.map((instr) => (
              <div key={instr.id} className={styles.studentContainer}>
                <div className={styles.studentProfileCard}>
                  <div className={styles.header}>
                    <div className={styles.info}>
                      <img src={instr.avatar} className={styles.avatar} />
                      <div>
                        <strong>{instr.name}</strong>
                      </div>
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={styles.projectsBtn}
                        onClick={() => navigate("/app/admin/projects")}
                      >
                        Projects
                      </button>
                      <span
                        className={styles.seeInsights}
                        onClick={() => handleSeeDetails(instr)}
                      >
                        See Insights &gt;&gt;
                      </span>
                    </div>
                  </div>

                  <div className={styles.feedbackList}>
                    {instr.feedback.map((f) => (
                      <div key={f.id} className={styles.feedbackCard}>
                        <img src={instr.avatar} className={styles.avatarSmall} />
                        <p>{f.text}</p>

                        {!f.flagged ? (
                          <button
                            className={styles.flagBtn}
                            onClick={() => handleFlag(instr.id, f.id)}
                          >
                            Flag
                          </button>
                        ) : (
                          <button
                            className={styles.unflagBtn}
                            onClick={() => handleUnflag(instr.id, f.id)}
                          >
                            Unflag
                          </button>
                        )}

                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(instr.id, f.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      className={styles.addBtn}
                      onClick={() => handleAddFeedback(instr.id)}
                    >
                      + Add Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* DETAIL VIEW */}
          {view === "detail" && selectedInstructor && (
            <div className={styles.detailView}>
              <button className={styles.backBtn} onClick={handleBack}>
                &lt;&lt; Back
              </button>
              <h2>{selectedInstructor.name} - Insights</h2>
              <div className={styles.feedbackList}>
                {selectedInstructor.feedback.map((f) => (
                  <div key={f.id} className={styles.feedbackCard}>
                    <img src={selectedInstructor.avatar} className={styles.avatarSmall} />
                    <p>{f.text}</p>

                    {!f.flagged ? (
                      <button
                        className={styles.flagBtn}
                        onClick={() => handleFlag(selectedInstructor.id, f.id)}
                      >
                        Flag
                      </button>
                    ) : (
                      <button
                        className={styles.unflagBtn}
                        onClick={() => handleUnflag(selectedInstructor.id, f.id)}
                      >
                        Unflag
                      </button>
                    )}

                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(selectedInstructor.id, f.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  className={styles.addBtn}
                  onClick={() => handleAddFeedback(selectedInstructor.id)}
                >
                  + Add Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminInsights;