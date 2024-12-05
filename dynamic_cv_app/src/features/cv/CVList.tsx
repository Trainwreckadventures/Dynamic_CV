import React from "react";
import { useSelector } from "react-redux";
import { useGetCvsQuery } from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";
//!fikse edit/put logikk!
const CVList = () => {
  const { role, userId } = useSelector((state: RootState) => state.auth);
  const { data: cvs, isLoading, error } = useGetCvsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading CVs</div>;

  const filteredCvs: CV[] =
    role === "admin"
      ? cvs || []
      : cvs?.filter((cv) => cv.user === userId) || [];

  return (
    <div>
      <h2>{role === "admin" ? "All CVs:" : "Your CV:"}</h2>
      {filteredCvs?.length === 0 ? (
        <p>You must be logged in to view the CV</p>
      ) : (
        <ul>
          {filteredCvs.map((cv: CV) => (
            <li key={cv._id}>
              <h3>{cv.personalInfo.name}</h3>
              <p>Email: {cv.personalInfo.email}</p>
              <p>Phone: {cv.personalInfo.phone}</p>
              <h4>Skills:</h4>
              <ul>
                {cv.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <h4>Education:</h4>
              <ul>
                {cv.education.map((education, index) => (
                  <li key={index}>
                    {education.institution} - {education.degree} (
                    {education.year})
                  </li>
                ))}
              </ul>
              <h4>Experience:</h4>
              <ul>
                {cv.experience.map((experience, index) => (
                  <li key={index}>
                    {experience.title} at {experience.company} (
                    {experience.years})
                  </li>
                ))}
              </ul>
              <h4>References:</h4>
              <ul>
                {cv.references.map((ref, index) => (
                  <li key={index}>
                    {ref.name} - {ref.contactInfo}
                  </li>
                ))}
              </ul>
              {role === "admin" && (
                <>
                  <button>Edit</button>
                  <button>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CVList;
