import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetCvsQuery,
  useDeleteCvMutation,
  useUpdateCvMutation,
} from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";
import EditCV from "./EditCV";

const CVList = () => {
  const { isAuthenticated, role, userId } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: cvs, isLoading, error } = useGetCvsQuery();
  const [deleteCv] = useDeleteCvMutation();
  const [updateCv] = useUpdateCvMutation();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingCvId, setEditingCvId] = useState<string | null>(null);
  const [editedCv, setEditedCv] = useState<Partial<CV>>({
    personalInfo: { name: "", email: "", phone: "" },
    skills: [],
    experience: [],
    education: [],
    references: [],
  });

  const [alertShown, setAlertShown] = useState(false);

  if (!isAuthenticated) {
    return <div>Please log in to view stored CVs.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading CVs</div>;

  const filteredCvs: CV[] =
    role === "admin"
      ? cvs || []
      : cvs?.filter((cv) => cv.user === userId) || [];

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this CV? This will permanently delete the CV from the server."
    );
    if (!confirmed) return;

    try {
      await deleteCv(id).unwrap();
      alert("CV deleted successfully!");
    } catch (error) {
      console.error("Error deleting CV:", error);
      alert("Failed to delete CV. Please try again.");
    }
  };

  //setter opp en alert så bruker får prompt om å huske å lagre endringer:
  const handleEdit = (cv: CV) => {
    if (!alertShown) {
      alert("Remember to press the save button after making your changes!");
      setAlertShown(true);
    }
    setEditingCvId(cv._id);
    setEditedCv({ ...cv });
  };

  const handleSave = async (updatedCv: CV) => {
    const sanitizedCv: Partial<CV> = { ...updatedCv };

    if (sanitizedCv._id) {
      delete sanitizedCv._id;
    }

    try {
      await updateCv({ id: updatedCv._id, cv: sanitizedCv }).unwrap();
      alert("CV updated successfully!");
      setEditingCvId(null);
      setEditedCv({
        personalInfo: { name: "", email: "", phone: "" },
        skills: [],
        experience: [],
        education: [],
        references: [],
      });
    } catch (error) {
      console.error("Error updating CV:", error);
      alert("Failed to update CV. Please try again.");
    }
  };

  return (
    <div>
      <h2>{role === "admin" ? "All CVs" : "Your CV"}</h2>
      {filteredCvs?.length === 0 ? (
        <p>
          No CVs found.{" "}
          {role === "admin" ? "Try adding CVs." : "Please create your CV."}
        </p>
      ) : (
        <ul className="cv-list">
          {filteredCvs.map((cv: CV) => (
            <li key={cv._id} className="cv-item">
              {editingCvId === cv._id ? (
                <EditCV
                  cv={cv}
                  onSave={handleSave}
                  onCancel={() => setEditingCvId(null)}
                />
              ) : (
                <div>
                  <h3 onClick={() => toggleExpand(cv._id)} className="cv-name">
                    {cv.personalInfo.name}
                  </h3>

                  {expandedId === cv._id && (
                    <div className="cv-details">
                      <p>
                        <strong>Email:</strong> {cv.personalInfo.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {cv.personalInfo.phone}
                      </p>
                      <h4>Skills:</h4>
                      <p>{cv.skills.join(", ")}</p>
                      <h4>Education:</h4>
                      {cv.education.map((education, index) => (
                        <p key={index}>
                          <strong>{education.institution}</strong> -{" "}
                          {education.degree} ({education.year})
                        </p>
                      ))}
                      <h4>Experience:</h4>
                      {cv.experience.map((experience, index) => (
                        <p key={index}>
                          {experience.title} at {experience.company} (
                          {experience.years})
                        </p>
                      ))}
                      <h4>References:</h4>
                      {cv.references.map((ref, index) => (
                        <p key={index}>
                          <strong>{ref.name}</strong> - {ref.contactInfo}
                        </p>
                      ))}
                      {role === "admin" || cv.user === userId ? (
                        <div className="button-container">
                          <button onClick={() => handleEdit(cv)}>Edit</button>
                          <button onClick={() => handleDelete(cv._id)}>
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CVList;
