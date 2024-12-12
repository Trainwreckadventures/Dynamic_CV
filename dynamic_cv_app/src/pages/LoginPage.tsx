import React from "react";
import LoginForm from "../features/auth/login";
// This shows you the login page:
const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      {/* if you don't have a user you can also create a new one on this page */}
    </div>
  );
};

export default LoginPage;
