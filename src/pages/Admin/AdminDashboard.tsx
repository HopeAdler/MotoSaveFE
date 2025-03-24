import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";

interface AdminDashboardProps {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ authenticated, setAuthenticated }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setAuthenticated(false);
    navigate("/admin");
  };
  return authenticated ? (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Welcome, Admin!</p>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
      </Card>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminDashboard;
