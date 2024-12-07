import React, { useState, useRef } from "react";
import { CV } from "../../utils/types";

interface EditCVProps {
  cv: CV;
  onSave: (updatedCv: CV) => void;
  onCancel: () => void;
}
//Må fikse inputfeltene så det ser litt bedre ut når jeg får tid!
const EditCV: React.FC<EditCVProps> = ({ cv, onSave, onCancel }) => {
  const [editedCv, setEditedCv] = useState<CV>(cv);
  const newItemRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    section: "education" | "experience" | "references" | "skills",
    index: number
  ) => {
    setEditedCv({
      ...editedCv,
      [section]: editedCv[section].map((item: any, i) => {
        if (i === index) {
          if (section === "skills") {
            return e.target.value;
          }
          return { ...item, [field]: e.target.value };
        }
        return item;
      }),
    });
  };

  const handleAdd = (
    section: "skills" | "education" | "experience" | "references"
  ) => {
    const newItem =
      section === "skills"
        ? ""
        : section === "education"
        ? { institution: "", degree: "", year: "" }
        : section === "experience"
        ? { title: "", company: "", years: "" }
        : { name: "", contactInfo: "" };

    setEditedCv({
      ...editedCv,
      [section]: [...editedCv[section], newItem],
    });

    if (newItemRef.current) {
      newItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleRemove = (
    section: "skills" | "education" | "references" | "experience",
    index: number
  ) => {
    setEditedCv({
      ...editedCv,
      [section]: editedCv[section].filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    onSave(editedCv);
  };

  return (
    <div>
      <h3>Edit CV</h3>
      <div className="personal-info">
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            value={editedCv.personalInfo?.name || ""}
            onChange={(e) =>
              setEditedCv({
                ...editedCv,
                personalInfo: {
                  ...editedCv.personalInfo,
                  name: e.target.value,
                },
              })
            }
          />
        </label>
        <label>
          <strong>Email:</strong>
          <input
            type="email"
            value={editedCv.personalInfo?.email || ""}
            onChange={(e) =>
              setEditedCv({
                ...editedCv,
                personalInfo: {
                  ...editedCv.personalInfo,
                  email: e.target.value,
                },
              })
            }
          />
        </label>
        <label>
          <strong>Phone:</strong>
          <input
            type="text"
            value={editedCv.personalInfo?.phone || ""}
            onChange={(e) =>
              setEditedCv({
                ...editedCv,
                personalInfo: {
                  ...editedCv.personalInfo,
                  phone: e.target.value,
                },
              })
            }
          />
        </label>
      </div>

      <h4>Skills:</h4>
      {editedCv.skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleChange(e, "", "skills", index)}
          />
          <button onClick={() => handleRemove("skills", index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => handleAdd("skills")}>Add Skill</button>

      <h4>Education:</h4>
      {editedCv.education.map((education, index) => (
        <div key={index}>
          <input
            type="text"
            value={education.institution}
            onChange={(e) => handleChange(e, "institution", "education", index)}
          />
          <input
            type="text"
            value={education.degree}
            onChange={(e) => handleChange(e, "degree", "education", index)}
          />
          <input
            type="text"
            value={education.year}
            onChange={(e) => handleChange(e, "year", "education", index)}
          />
          <button onClick={() => handleRemove("education", index)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => handleAdd("education")}>Add Education</button>

      <h4>Experience:</h4>
      {editedCv.experience.map((experience, index) => (
        <div key={index}>
          <input
            type="text"
            value={experience.title}
            onChange={(e) => handleChange(e, "title", "experience", index)}
          />
          <input
            type="text"
            value={experience.company}
            onChange={(e) => handleChange(e, "company", "experience", index)}
          />
          <input
            type="text"
            value={experience.years}
            onChange={(e) => handleChange(e, "years", "experience", index)}
          />
          <button onClick={() => handleRemove("experience", index)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => handleAdd("experience")}>Add Experience</button>

      <h4>References:</h4>
      {editedCv.references.map((ref, index) => (
        <div key={index}>
          <input
            type="text"
            value={ref.name}
            onChange={(e) => handleChange(e, "name", "references", index)}
          />
          <input
            type="text"
            value={ref.contactInfo}
            onChange={(e) =>
              handleChange(e, "contactInfo", "references", index)
            }
          />
          <button onClick={() => handleRemove("references", index)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={() => handleAdd("references")}>Add Reference</button>
      <div className="button-container">
        <button className="fab-save-button" onClick={handleSave}>
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCV;
