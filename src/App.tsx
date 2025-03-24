import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/admin" element={<AdminDashboard authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
