import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "../../services/api";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
//!Trenger en create new user også...
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div>
      <h2>Login</h2>
      {error && <p>Error loading users. Please try again later.</p>}
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
      </form>
    </div>
  );
};

export default LoginForm;
