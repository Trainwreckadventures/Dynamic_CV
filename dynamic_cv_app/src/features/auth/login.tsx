import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersQuery, useAddUserMutation } from "../../services/api";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../../utils/types";
//now you can create a new user on the log in page :D
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [role] = useState("user");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const user = users?.find((user) => user.email === email);

    if (!user) {
      setErrorMessage("User not found.");
      return;
    }

    if (user.password !== password) {
      setErrorMessage("Incorrect password.");
      return;
    }

    dispatch(login({ userId: user._id, role: user.role }));

    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/cvs");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: Partial<User> = {
      name,
      email,
      password,
      role: "user",
    };

    try {
      await addUser(newUser).unwrap();
      alert("User created successfully! Please log in.");
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Error creating user", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="form-group">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {error && <p>Error loading users. Please try again later.</p>}

      {isSignUp ? (
        <form onSubmit={handleSignUp}>
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <a href="#" onClick={() => setIsSignUp(false)}>
              Log in
            </a>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => setIsSignUp(true)}>
              Sign Up
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
