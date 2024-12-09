import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import CreateCV from "../features/cv/CreateCV";
import { useGetCvsQuery } from "../services/api";

const CreateCVPage = () => {
  const { isAuthenticated, userId } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: userCvs, isLoading } = useGetCvsQuery();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const existingCV = userCvs?.some((cv) => cv.user === userId);

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
      {/* Render the CreateCV form only if user does not already have a CV */}
    </div>
  );
};

export default CreateCVPage;
