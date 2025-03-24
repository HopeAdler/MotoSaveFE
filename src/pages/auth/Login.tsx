import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // setAuthenticated(true);
    navigate("/admin");
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <Card className="p-6 shadow-lg bg-transparent text-center">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        {/* Ensure buttons are stacked vertically */}
        <div className="flex flex-col gap-4 mt-4 w-full">
          <Button type="default" onClick={handleToHome} className="w-full">
            Back To Home
          </Button>
          <Button type="primary" onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
