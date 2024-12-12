import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserList from "../features/users/UserList.tsx";
//This shows you the content of the user list page if you are logged in:
const UserListPage = () => {
  return (
    <div className="container">
      <h2>Userlist</h2>
      <UserList />
    </div>
  );
};

export default UserListPage;
