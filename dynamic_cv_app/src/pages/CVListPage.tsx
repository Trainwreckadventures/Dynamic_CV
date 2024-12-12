import React from "react";
import CVList from "../features/cv/CVList";
//the page for the CVs (your user CV or all user CVs will be seen on this page based on role):
const CVListPage = () => {
  return (
    <div className="container">
      <CVList />
      {/* See list over all CVs if you are admin or see your own if you are user */}
    </div>
  );
};

export default CVListPage;
