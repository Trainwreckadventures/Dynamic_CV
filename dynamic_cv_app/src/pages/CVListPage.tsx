import React from "react";
import CVList from "../features/cv/CVList";

const CVListPage = () => {
  return (
    <div className="container">
      <CVList />
      {/* Se liste over Alle CVs om du er admin eller egen om du er user */}
    </div>
  );
};

export default CVListPage;
