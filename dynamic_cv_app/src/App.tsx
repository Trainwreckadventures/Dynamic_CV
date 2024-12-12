import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pulling in pages and navbar here:
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CVListPage from "./pages/CVListPage";
import CreateCVPage from "./pages/CreateCVPage";
import UserList from "./features/users/UserList";
//main app component here:
const App = () => {
  return (
    //wrapping with router:
    <Router>
      {/* Navbar component here (shows on all pages): */}
      <Navbar />
      <Routes>
        {/* The rote definition for each page here: */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/user-list" element={<UserList />} />{" "}
        <Route path="/cv-list" element={<CVListPage />} />{" "}
        <Route path="/create-cv" element={<CreateCVPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
