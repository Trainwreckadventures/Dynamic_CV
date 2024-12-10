import React from "react";
import jsPDF from "jspdf";
import { CV } from "../../utils/types";

interface CVPdfProps {
  cv: CV;
}

const CVPdf: React.FC<CVPdfProps> = ({ cv }) => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    //Photo:
    if (cv.personalInfo.photo) {
      doc.addImage(cv.personalInfo.photo, "JPEG", 160, 20, 40, 40);
    }

    // CV:
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    let yOffset = 20;
    doc.text("CV", 10, yOffset);

    yOffset += 20;
    doc.setFontSize(14);

    // Name:
    doc.setFont("helvetica", "bold");
    doc.text("Name:", 10, yOffset);
    doc.setFont("helvetica", "normal");
    doc.text(cv.personalInfo.name, 30, yOffset);
    yOffset += 10;

    //Email:
    doc.setFont("helvetica", "bold");
    doc.text("Email:", 10, yOffset);
    doc.setFont("helvetica", "normal");
    doc.text(cv.personalInfo.email, 30, yOffset);
    yOffset += 10;

    //Phone:
    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 10, yOffset);
    doc.setFont("helvetica", "normal");
    doc.text(cv.personalInfo.phone, 30, yOffset);
    yOffset += 20;

    const drawHeader = (title: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, 10, yOffset);
      doc.setFont("helvetica", "normal");
      yOffset += 10;
    };

    // Skills:
    drawHeader("Skills:");
    doc.setFontSize(12);
    cv.skills.forEach((skill, index) => {
      doc.text(`- ${skill}`, 10, yOffset + index * 10);
    });
    yOffset += cv.skills.length * 10 + 10;

    // Education:
    drawHeader("Education:");
    cv.education.forEach((edu, index) => {
      doc.text(
        `${edu.institution}, ${edu.degree} (${edu.year})`,
        10,
        yOffset + index * 10
      );
    });
    yOffset += cv.education.length * 10 + 10;

    // Experience:
    drawHeader("Experience:");
    cv.experience.forEach((exp, index) => {
      doc.text(
        `${exp.title} at ${exp.company} (${exp.years})`,
        10,
        yOffset + index * 10
      );
    });
    yOffset += cv.experience.length * 10 + 10;

    // References:
    drawHeader("References:");
    cv.references.forEach((ref, index) => {
      doc.text(`${ref.name} - ${ref.contactInfo}`, 10, yOffset + index * 10);
    });

    doc.save(`${cv.personalInfo.name}_CV.pdf`);
  };

  return <button onClick={handleGeneratePDF}>Download PDF</button>;
};

export default CVPdf;
