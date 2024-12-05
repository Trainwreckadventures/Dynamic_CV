import React from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery, useDeleteUserMutation } from "../../services/api";
import { RootState } from "../../store/store";
import { User } from "../../utils/types.ts";

const UserList = () => {
  const { isAuthenticated, role, userId } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (!isAuthenticated) {
    return <div>Please log in to view the user list.</div>;
  }

  if (role !== "admin") {
    const currentUser = users?.find((user: User) => user._id === userId);
    if (!currentUser) {
      return <div>User not found.</div>;
    }

    return (
      <div>
        <h2>Your Information</h2>
        <ul>
          <li key={currentUser._id}>
            {currentUser.name} ({currentUser.email}) - {currentUser.role}
          </li>
        </ul>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users?.map((user: User) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.role}
            {role === "admin" && (
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
