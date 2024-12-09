import React from "react";
import jsPDF from "jspdf";
import { CV } from "../../utils/types";

interface CVPdfProps {
  cv: CV;
}

const CVPdf: React.FC<CVPdfProps> = ({ cv }) => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    //her går ting på x og y akser ift plassering...looks terrible! :')
    doc.setFontSize(18);
    doc.text("CV", 10, 10);

    //!picture?

    //name, email, phone:
    doc.setFontSize(12);
    doc.text(`Name: ${cv.personalInfo.name}`, 10, 20);
    doc.text(`Email: ${cv.personalInfo.email}`, 10, 30);
    doc.text(`Phone: ${cv.personalInfo.phone}`, 10, 40);
    //need some space between previous and skills:
    doc.setFontSize(14);
    doc.text("Skills:", 10, 50);
    doc.setFontSize(12);
    cv.skills.forEach((skill, index) => {
      doc.text(`- ${skill}`, 10, 60 + index * 10);
    });
    //education here:
    doc.setFontSize(14);
    doc.text("Education:", 10, 80 + cv.skills.length * 10);
    doc.setFontSize(12);
    cv.education.forEach((edu, index) => {
      doc.text(
        `${edu.institution}, ${edu.degree} (${edu.year})`,
        10,
        90 + index * 10 + cv.skills.length * 10
      );
    });
    //experience here:
    doc.setFontSize(14);
    doc.text(
      "Experience:",
      10,
      110 + cv.skills.length * 10 + cv.education.length * 10
    );
    doc.setFontSize(12);
    cv.experience.forEach((exp, index) => {
      doc.text(
        `${exp.title} at ${exp.company} (${exp.years})`,
        10,
        120 + index * 10 + cv.skills.length * 10 + cv.education.length * 10
      );
    });
    //references here:
    doc.setFontSize(14);
    doc.text(
      "References:",
      10,
      140 +
        cv.skills.length * 10 +
        cv.education.length * 10 +
        cv.experience.length * 10
    );
    doc.setFontSize(12);
    cv.references.forEach((ref, index) => {
      doc.text(
        `${ref.name} - ${ref.contactInfo}`,
        10,
        150 +
          index * 10 +
          cv.skills.length * 10 +
          cv.education.length * 10 +
          cv.experience.length * 10
      );
    });

    //const lineY = 290;
    //doc.setLineWidth(0.5);
    //doc.line(10, lineY, 200, lineY);

    doc.save(`${cv.personalInfo.name}_CV.pdf`);
  };

  return <button onClick={handleGeneratePDF}>Download PDF</button>;
};

export default CVPdf;
