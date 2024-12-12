import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import CreateCV from "../features/cv/CreateCV";
import { useGetCvsQuery } from "../services/api";
//On this page you'll be able to fill in the CV form unless you allready have a CV in the api:
const CreateCVPage = () => {
  const { isAuthenticated, userId } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: userCvs, isLoading } = useGetCvsQuery();
  //If the person isn't authenticated they get redirected to log in:
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const existingCV = userCvs?.some((cv) => cv.user === userId);
  // if the person allready has a CV they get redirected to the list:
  if (existingCV) {
    return (
      <div>
        <p>
          You already have a CV associated with your account. You can view or
          edit it <Navigate to="/cv-list" replace />.
        </p>
      </div>
    );
  }

  return (
    <div>
      <CreateCV />
      {/* Renders the CreateCV-form, but only if user does not have a CV in the database */}
    </div>
  );
};

export default CreateCVPage;
