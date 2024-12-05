import React from "react";
import LoginForm from "../features/auth/login";

const LoginPage = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm />
      {/* ny bruker logikk som trigger om du ikke finnes i systemet her? */}
    </div>
  );
};

export default LoginPage;
