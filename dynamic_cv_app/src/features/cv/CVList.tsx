import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCvsQuery, useDeleteCvMutation } from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";
//!Husk å fikse editknappen! Brukere må få lov å slette eller endre egen cv!
const CVList = () => {
  const { role, userId } = useSelector((state: RootState) => state.auth);
  const { data: cvs, isLoading, error } = useGetCvsQuery();
  const [deleteCv] = useDeleteCvMutation();

  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      "Are you sure you want to delete this CV? This will delete the CV permanently from the server."
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

  return (
    <div>
      <h2>{role === "admin" ? "All CVs:" : "Your CV:"}</h2>
      {filteredCvs?.length === 0 ? (
        <p>You must be logged in to view the CV</p>
      ) : (
        <ul className="cv-list">
          {filteredCvs.map((cv: CV) => (
            <li key={cv._id} className="cv-item">
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
                  {role === "admin" && (
                    <div className="button-container">
                      <button>Edit</button>
                      <button onClick={() => handleDelete(cv._id)}>
                        Delete
                      </button>
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
