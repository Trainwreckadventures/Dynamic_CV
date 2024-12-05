import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
//bør bytte utseende om du er admin eller user:
const Dashboard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h2>Welcome to the Dynamic CV Maker!</h2>
      {!isAuthenticated && (
        <p>To be able to use our services, you must be logged in</p>
      )}
    </div>
  );
};

export default Dashboard;
