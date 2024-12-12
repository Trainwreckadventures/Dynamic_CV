import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../services/api";
import { RootState } from "../../store/store";
import { User } from "../../utils/types";

const UserList = () => {
  const { isAuthenticated, role, userId } = useSelector(
    (state: RootState) => state.auth
  );
  // fetching users using RTK Query here:
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  // mutation hooks for deleting and updating users here:
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  // this is the state for handling user editing:
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  // handle user deletion here (with warning):
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
  // handel edit here:
  const handleEdit = (user: User) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };
  // handle save here:
  const handleSave = async () => {
    if (!editingUserId) return;

    const fullUser = {
      ...users?.find((u) => u._id === editingUserId),
      ...editedUser,
    };
    //removing id before sending to avoid duplicates:
    const sanitizedUser = { ...fullUser };
    delete sanitizedUser._id;

    console.log("Payload being sent to API:", sanitizedUser);

    try {
      await updateUser({ id: editingUserId, user: sanitizedUser }).unwrap();
      alert("User updated successfully!");
      setEditingUserId(null);
      setEditedUser({});
      //refetching user data from api:
      refetch();
    } catch (error) {
      console.error("Error updating user", error);
      alert("Failed to update user. Please try again.");
    }
  };
  // not logged in?:
  if (!isAuthenticated) {
    return <div>Please log in to view the user list.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;
  // role based filtering here:
  const filteredUsers =
    role === "admin" ? users : users?.filter((user) => user._id === userId);
  // based on your role you will see either see all users as admin, or your own user as user:
  return (
    <div className="container">
      <div className="form-group">
        <h2>{role === "admin" ? "All Users" : "Your Information"}</h2>
        <ul>
          {filteredUsers?.map((user: User) => (
            <li key={user._id} style={{ marginBottom: "1rem" }}>
              {editingUserId === user._id ? (
                <div>
                  <label>
                    <strong>Name:</strong>
                    <input
                      type="text"
                      value={editedUser.name || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <strong>Email:</strong>
                    <input
                      type="email"
                      value={editedUser.email || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                    />
                  </label>
                  <button onClick={handleSave} className="fab-save-button">
                    Save
                  </button>
                  <button onClick={() => setEditingUserId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className="button-container">
                    {role === "admin" || user._id === userId ? (
                      <button onClick={() => handleEdit(user)}>Edit</button>
                    ) : null}
                    {role === "admin" || user._id === userId ? (
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
