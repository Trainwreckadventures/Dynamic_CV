import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CVListPage from "./pages/CVListPage";
import CreateCVPage from "./pages/CreateCVPage";
import UserList from "./features/users/UserList";

const App = () => {
  return (
    <Provider store={store}>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/cv-list" element={<CVListPage />} />
          <Route path="/create-cv" element={<CreateCVPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
