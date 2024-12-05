import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserList from "../features/users/UserList.tsx";
//her må jeg gjøre mer på login+auth og cvlista først:
const Dashboard = () => {
  /*  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <div>Please log in to access your dashboard.</div>;
  }*/
  return (
    <div>
      {/*<h1>{role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h1>*/}
      <h2>Welcome to Dynamic CV Maker!</h2>
      <UserList />
      {/* {role === "admin" ? (
        <div>
          <h2>All Users</h2>
         <UserList /> 
          <h2>All CVs</h2>
       <CVList /> 
        </div>
      ) : (
        <div>
          <h2>Your CV</h2>
        <CVList /> 
        </div>
      )}
    </div>
  ); */}
    </div>
  );
};

export default Dashboard;
