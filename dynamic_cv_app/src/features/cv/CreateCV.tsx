import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddCvMutation } from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const CreateCV = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  // state to manage the personal info fields here:
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  // state to mmanage skills (string array):
  const [skills, setSkills] = useState<string[]>([""]);
  // state to manage education (object array):
  const [education, setEducation] = useState([
    { institution: "", degree: "", year: "" },
  ]);
  // state to manage experience (object array):
  const [experience, setExperience] = useState([
    { title: "", company: "", years: "" },
  ]);
  // state to manage references (object array):
  const [references, setReferences] = useState([{ name: "", contactInfo: "" }]);
  const [addCv] = useAddCvMutation();
  const navigate = useNavigate();
  // handle change to the personal info fields here (name, email, phone):
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  // handle change to the array fields here:
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
  // handle the form submission of a new CV here:
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
      // redirect to CVs (cv-list) page
      navigate("/cv-list");
    } catch (error) {
      console.error("Error creating CV", error);
      alert("Failed to create CV. Please try again.");
    }
  };
  // handles file input for photo, saves it as base64 dataURL (there might be a better way to solve this):
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // here you see the Create CV form if you don't already have a CV saved to API:
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
        <div>
          <label>Upload Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {personalInfo.photo && (
            <div>
              <img
                src={personalInfo.photo}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
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
