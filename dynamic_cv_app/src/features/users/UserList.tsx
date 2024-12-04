import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../../services/api";
import { User } from "../../utils/types.ts";

const UserList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully!"); //add the id of the user here?
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete user. Please try again."); //and here?
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users?.map((user: User) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
