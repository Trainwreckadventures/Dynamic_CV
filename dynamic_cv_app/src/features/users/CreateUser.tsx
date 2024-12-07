import React, { useState } from "react";
import { useAddUserMutation } from "../../services/api";
import { User } from "../../utils/types";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser] = useAddUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Default role is aways user (need to work out the logic to change roles in userlist for admin! That's a job for future me!)
    const newUser: User = {
      _id: "",
      name,
      email,
      password,
      role: "user",
    };

    try {
      await addUser(newUser).unwrap();
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New User</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
