import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddCvMutation } from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const CreateCV = () => {
  const { userId } = useSelector((state: RootState) => state.auth);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [skills, setSkills] = useState<string[]>([""]);
  const [education, setEducation] = useState([
    { institution: "", degree: "", year: "" },
  ]);
  const [experience, setExperience] = useState([
    { title: "", company: "", years: "" },
  ]);
  const [references, setReferences] = useState([{ name: "", contactInfo: "" }]);
  const [addCv] = useAddCvMutation();
  const navigate = useNavigate();

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleArrayChange = (
    setState: React.Dispatch<React.SetStateAction<any[]>>,
    field: string,
    index: number,
    value: string
  ) => {
    setState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCv: Omit<CV, "_id"> = {
      user: userId as string,
      personalInfo,
      skills,
      education,
      experience,
      references,
    };

    try {
      await addCv(newCv).unwrap();
      alert("CV created successfully!");
      navigate("/cv-list");
    } catch (error) {
      console.error("Error creating CV", error);
      alert("Failed to create CV. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group">
        <h2>Create New CV</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handlePersonalInfoChange(e, "name")}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange(e, "email")}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange(e, "phone")}
            required
          />
        </div>

        <h4>Skills:</h4>
        {skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => {
                setSkills((prev) =>
                  prev.map((s, i) => (i === index ? e.target.value : s))
                );
              }}
            />
          </div>
        ))}
        <button type="button" onClick={() => setSkills([...skills, ""])}>
          Add Skill
        </button>

        <h4>Education:</h4>
        {education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              value={edu.institution}
              placeholder="Institution"
              onChange={(e) =>
                handleArrayChange(
                  setEducation,
                  "institution",
                  index,
                  e.target.value
                )
              }
            />
            <input
              type="text"
              value={edu.degree}
              placeholder="Degree"
              onChange={(e) =>
                handleArrayChange(setEducation, "degree", index, e.target.value)
              }
            />
            <input
              type="text"
              value={edu.year}
              placeholder="Year"
              onChange={(e) =>
                handleArrayChange(setEducation, "year", index, e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setEducation([
              ...education,
              { institution: "", degree: "", year: "" },
            ])
          }
        >
          Add Education
        </button>

        <h4>Experience:</h4>
        {experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              value={exp.title}
              placeholder="Title"
              onChange={(e) =>
                handleArrayChange(setExperience, "title", index, e.target.value)
              }
            />
            <input
              type="text"
              value={exp.company}
              placeholder="Company"
              onChange={(e) =>
                handleArrayChange(
                  setExperience,
                  "company",
                  index,
                  e.target.value
                )
              }
            />
            <input
              type="text"
              value={exp.years}
              placeholder="Years"
              onChange={(e) =>
                handleArrayChange(setExperience, "years", index, e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setExperience([
              ...experience,
              { title: "", company: "", years: "" },
            ])
          }
        >
          Add Experience
        </button>

        <h4>References:</h4>
        {references.map((ref, index) => (
          <div key={index}>
            <input
              type="text"
              value={ref.name}
              placeholder="Name"
              onChange={(e) =>
                handleArrayChange(setReferences, "name", index, e.target.value)
              }
            />
            <input
              type="text"
              value={ref.contactInfo}
              placeholder="Contact Info"
              onChange={(e) =>
                handleArrayChange(
                  setReferences,
                  "contactInfo",
                  index,
                  e.target.value
                )
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setReferences([...references, { name: "", contactInfo: "" }])
          }
        >
          Add Reference
        </button>

        <button type="submit">Submit CV</button>
      </form>
    </div>
  );
};

export default CreateCV;
