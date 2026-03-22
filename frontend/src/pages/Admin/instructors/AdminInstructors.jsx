import React, { useState, useMemo, useEffect } from "react";
import AdminInstructorCard from "../../../components/Admininstructors/Adinstructorscard/AdminInstructorCard";
import styles from './AdminInstructors.module.css';
import Navbar from "../../../components/common/Navbar/Navbar";
import Footer from "../../../components/common/Footer/Footer";
import AddInstructor from "../../../components/Admininstructors/Addinstructors/AddInstructor";
import EditInstructor from "../../../components/Admininstructors/Editinstructor/EditInstructor";
import { api } from "../../../services/api";
import instructorAvatar from "../../../assets/instructor-avatar.png";


const AdminInstructors = () => {
 // MOCK DATA 
  const mockData = [
    {
      id: 1,
      name: "Software Engineering Department",
      instructors: [
        { id: 1, name: "Mr. Abebe", subjects: ["DSP", "EAD", "HCI"], avatar: instructorAvatar },
        { id: 2, name: "Ms. Hana", subjects: ["Data Structures", "Algorithms"], avatar: instructorAvatar },
      ],
    }
  ];

  const [departments, setDepartments] = useState(mockData); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [insightInstructor, setInsightInstructor] = useState(null);

  // DATA FETCHING
 const loadInstructors = async () => {
    try {
      const data = await api.instructors.getAll();
      if (data && data.length > 0) {
        setDepartments(data); 
      }
    } catch (error) {
      console.log("Backend not ready yet, using mock data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  // Api
  const handleAddSave = async (newData) => {
    const fd = new FormData();
    fd.append("name", newData.name);
    fd.append("department", newData.department || "Software Engineering");
    fd.append("subjects", JSON.stringify([newData.subject])); 
    if (newData.imageFile) fd.append("avatar", newData.imageFile);

    try {
      await api.instructors.create(fd);
      await loadInstructors(); 
      setIsAdding(false);
    } catch (err) {
      alert("Failed to create instructor");
    }
  };

  const handleEditSave = async (updatedData) => {
    const fd = new FormData();
    fd.append("name", updatedData.name);
    fd.append("subjects", JSON.stringify(updatedData.subjects));
    
    if (updatedData.imageFile instanceof File) {
      fd.append("avatar", updatedData.imageFile);
    }

    try {
      await api.instructors.update(updatedData.id, fd);
      await loadInstructors(); 
      setEditingInstructor(null);
    } catch (err) {
      alert("Failed to update instructor");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      try {
        await api.instructors.delete(id);
        await loadInstructors();
        setEditingInstructor(null);
      } catch (err) {
        alert("Failed to delete instructor from database");
      }
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingInstructor(null);
  };

  // SEARCH 
  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departments;
    const query = search.toLowerCase();
    return departments.map(dept => ({
      ...dept,
      instructors: dept.instructors.filter(inst => 
        inst.name.toLowerCase().includes(query) || 
        inst.subjects.some(s => s.toLowerCase().includes(query))
      )
    })).filter(dept => dept.instructors.length > 0);
  }, [departments, search]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.content}>
          
          {!isAdding && !editingInstructor && (
            <div className={styles.header}>
              <div className={styles.searchSection}>
                <div className={styles.inputWrapper}>
                  <input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
                  <div className={styles.iconButton}> 
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>
              <button className={styles.addBtn} onClick={() => setIsAdding(true)}>
                <span>+</span> Add Instructors 
              </button>
            </div>
          )}

          {insightInstructor && (
            <div className={styles.modalOverlay} onClick={() => setInsightInstructor(null)}>
              <div className={styles.insightModal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setInsightInstructor(null)}>×</button>
                <h3>{insightInstructor.name}</h3>
                <p><strong>Status:</strong> Active Instructor</p>
                <div className={styles.divider}></div>
                <p className={styles.desc}>This instructor manages {insightInstructor.subjects?.length || 0} active subjects.</p>
              </div>
            </div>
          )}

          {isAdding && <AddInstructor onSave={handleAddSave} onCancel={closeForm} />}
          
          {editingInstructor && (
            <EditInstructor 
              instructor={editingInstructor} 
              onSave={handleEditSave} 
              onCancel={closeForm} 
              onDelete={() => handleDelete(editingInstructor.id)} 
              onSeeInsights={() => setInsightInstructor(editingInstructor)}
            />
          )}

          {!isAdding && !editingInstructor && filteredDepartments.map((dept) => (
            <section key={dept.id} className={styles.departmentSection}>
              <h2 className={styles.departmentName}>{dept.name}</h2>
              <div className={styles.instructorGrid}>
                {dept.instructors.map((inst) => (
                  <AdminInstructorCard
                    key={inst.id}
                    instructor={inst}
                    onEdit={() => setEditingInstructor(inst)}
                    onDelete={() => handleDelete(inst.id)}
                    onSeeInsights={() => setInsightInstructor(inst)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminInstructors;