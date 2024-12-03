import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CVListPage from "./pages/CVListPage";
import CreateCVPage from "./pages/CreateCVPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/cv-list" element={<CVListPage />} />{" "}
        <Route path="/create-cv" element={<CreateCVPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
