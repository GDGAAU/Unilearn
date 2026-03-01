import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../../common/Navbar/Navbar";
import styles from "./InstructorDetails.module.css";
import instructorAvatar from "../../../assets/instructor-avatar.png";

const MOCK_COMMENTS = [
  {
    id: 1,
    author_name: "Demo User",
    avatar: instructorAvatar,
    text: "Great instructor. Very clear explanations.",
  },
];

export default function InstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");




  // Fetch instructor details
  useEffect(() => {
    let cancelled = false;

    async function fetchDetails() {
      setLoading(true);
      setError("");
      try {
        if (token) {
          const data = await getInstructorDetails(id, token);
          if (!cancelled) {
            setDetails(data);
            setComments(data.comments || MOCK_COMMENTS);
          }
        } else {
          if (!cancelled) {
            setDetails({ id, name: "Instructor Name", subjects: ["Demo Subject"] });
            setComments(MOCK_COMMENTS);
          }
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load instructor details.");
        if (!cancelled) setComments(MOCK_COMMENTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetails();
    return () => { cancelled = true; };
  }, [id, token]);






  // Post comment with backend moderation
  async function handlePostComment() {
    if (!commentText.trim()) return;
    setPosting(true);
    setError("");

    try {
      if (token) {
        // Send comment to backend
        const response = await postComment(id, commentText, token);

        if (response.success) {
          // Approved by backend
          setComments((prev) => [response.comment, ...prev]);
          setCommentText("");
          setShowForm(false);
        } else {
          // Rejected by moderation
          setError(response.message || "Comment rejected by moderation.");
        }
      } else {
        // Local fallback for demo users
        const newComment = {
          id: Date.now(),
          author_name: user?.name || "You",
          avatar: instructorAvatar,
          text: commentText.replace(/<[^>]*>/g, "").trim(),
        };
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setShowForm(false);
      }
    } catch (err) {
      setError(err.message || "Failed to post comment.");
    } finally {
      setPosting(false);
    }
  }


  
  const displayInstructor = details;
  const subjectsList = Array.isArray(displayInstructor?.subjects)
    ? displayInstructor.subjects.join(", ")
    : displayInstructor?.subjects || "";

  return (
    <div className={styles.page}>
      <Navbar activePage="Instructors" onLogout={logout} />

      <div className={styles.content}>
        <button type="button" className={styles.backButton} onClick={() => navigate("/instructors")}>
          <span className={styles.backArrow}>&lt;</span> Back to Instructors
        </button>

        <h1 className={styles.departmentTitle}>Instructor Details</h1>

        {loading && (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner} />
          </div>
        )}

        {!loading && displayInstructor && (
          <>
            <div className={styles.headerCard}>
              <div className={styles.headerLeft}>
                <img
                  src={displayInstructor.avatar || instructorAvatar}
                  alt={`${displayInstructor.name} avatar`}
                  className={styles.headerAvatar}
                />
                <div className={styles.headerInfo}>
                  <h2 className={styles.headerName}>{displayInstructor.name}</h2>
                  <p className={styles.headerSubjects}>
                    <span className={styles.headerSubjectsLabel}>Subjects:</span> {subjectsList}
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
                  <span className={styles.addCommentText}>Add Comments</span>
                </div>
                <span className={styles.addCommentNote}>
                  Please be mindful of the words and connotations you use
                </span>
              </button>
            </div>

            {/* Comment Form */}
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

                <textarea
                  className={styles.commentTextarea}
                  placeholder="Write your comment here..."
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    setError(""); // clear previous error
                  }}
                />

                {error && <div className={styles.errorBox}>{error}</div>}

                <div className={styles.commentFormActions}>
                  <button
                    type="button"
                    className={styles.postButton}
                    onClick={handlePostComment}
                    disabled={posting || !commentText.trim()}
                  >
                    {posting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            )}

            {/* Comments Section */}
            {comments.length === 0 && (
              <p className={styles.emptyComments}>No comments yet. Be the first!</p>
            )}

            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentCard}>
                <div className={styles.commentHeader}>
                  <img
                    src={comment.avatar || instructorAvatar}
                    alt={`${comment.author_name} avatar`}
                    className={styles.commentAvatar}
                  />
                  <div>
                    <h4 className={styles.commentAuthor}>{comment.author_name}</h4>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}