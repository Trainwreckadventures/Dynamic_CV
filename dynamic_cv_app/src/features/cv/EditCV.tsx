import React, { useState, useRef } from "react";
import { CV } from "../../utils/types";

interface EditCVProps {
  cv: CV;
  onSave: (updatedCv: CV) => void;
  onCancel: () => void;
}

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
    <div className="form-group">
      <h3>Edit CV</h3>
      <div>
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
            placeholder="Enter your full name"
          />
        </label>
        <label>
          <strong>Upload Photo:</strong>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setEditedCv((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      photo: reader.result as string,
                    },
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
        {editedCv.personalInfo.photo && (
          <img
            src={editedCv.personalInfo.photo}
            alt="Profile Preview"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        )}
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
            placeholder="Enter your email address"
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
            placeholder="Enter your phone number"
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
            placeholder="Enter a skill"
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
            placeholder="Enter institution name"
          />
          <input
            type="text"
            value={education.degree}
            onChange={(e) => handleChange(e, "degree", "education", index)}
            placeholder="Enter your degree"
          />
          <input
            type="text"
            value={education.year}
            onChange={(e) => handleChange(e, "year", "education", index)}
            placeholder="Enter graduation year"
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
            placeholder="Enter job title"
          />
          <input
            type="text"
            value={experience.company}
            onChange={(e) => handleChange(e, "company", "experience", index)}
            placeholder="Enter company name"
          />
          <input
            type="text"
            value={experience.years}
            onChange={(e) => handleChange(e, "years", "experience", index)}
            placeholder="Enter years of experience"
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
            placeholder="Enter reference's name"
          />
          <input
            type="text"
            value={ref.contactInfo}
            onChange={(e) =>
              handleChange(e, "contactInfo", "references", index)
            }
            placeholder="Enter reference's email"
          />
          <button onClick={() => handleRemove("references", index)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => handleAdd("references")}>Add Reference</button>

      <div>
        <button className="fab-save-button" onClick={handleSave}>
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCV;
