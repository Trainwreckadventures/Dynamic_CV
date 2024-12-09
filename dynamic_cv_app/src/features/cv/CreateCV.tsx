import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAddCvMutation, useGetCvsQuery } from "../../services/api";
import { RootState } from "../../store/store";
import { CV } from "../../utils/types";

const CreateCV = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const { data: userCvs, isLoading } = useGetCvsQuery();
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
  const [canCreate, setCanCreate] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (userCvs && userCvs.some((cv: CV) => cv.user === userId)) {
      setCanCreate(false);
    }
  }, [userCvs, userId]);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: e.target.value,
    });
  };

  const handleSkillsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: e.target.value };
    setEducation(newEducation);
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: e.target.value };
    setExperience(newExperience);
  };

  const handleReferencesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    const newReferences = [...references];
    newReferences[index] = { ...newReferences[index], [field]: e.target.value };
    setReferences(newReferences);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const existingCv = userCvs?.find((cv: CV) => cv.user === userId);

    if (existingCv) {
      alert(
        "You already have a CV associated with your account, you can edit it on the CVs page!"
      );
      return;
    }

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
    } catch (error) {
      console.error("Error creating CV", error);
      alert("Failed to create CV. Please try again.");
    }
  };

  const handleAddSkill = () => setSkills([...skills, ""]);

  const handleAddEducation = () =>
    setEducation([...education, { institution: "", degree: "", year: "" }]);

  const handleAddExperience = () =>
    setExperience([...experience, { title: "", company: "", years: "" }]);

  const handleAddReference = () =>
    setReferences([...references, { name: "", contactInfo: "" }]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group">
        <h2>Create New CV</h2>

        {canCreate ? (
          <>
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
                  onChange={(e) => handleSkillsChange(e, index)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddSkill}>
              Add Skill
            </button>

            <h4>Education:</h4>
            {education.map((edu, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(e, "institution", index)
                  }
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(e, "degree", index)}
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(e, "year", index)}
                  placeholder="Year"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>
              Add Education
            </button>

            <h4>Experience:</h4>
            {experience.map((exp, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(e, "title", index)}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(e, "company", index)}
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(e, "years", index)}
                  placeholder="Years"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddExperience}>
              Add Experience
            </button>

            <h4>References:</h4>
            {references.map((ref, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => handleReferencesChange(e, "name", index)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={ref.contactInfo}
                  onChange={(e) =>
                    handleReferencesChange(e, "contactInfo", index)
                  }
                  placeholder="Contact Info"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddReference}>
              Add Reference
            </button>

            <button type="submit">Submit CV</button>
          </>
        ) : (
          <div>
            <p>
              You already have a CV associated with your account, you can view
              it here: <Link to="/cv-list">CVs</Link>.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCV;
