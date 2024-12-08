import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import CreateCV from "../features/cv/CreateCV";

const CreateCVPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <CreateCV />
      {/* CV skjema her */}
    </div>
  );
};

export default CreateCVPage;
