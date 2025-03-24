import { Button, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  }
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-green-500">
      <Card className="p-6 shadow-lg justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the System</h1>
          <Button type="primary" onClick={handleLogin}>Login</Button>
      </Card>
    </div>
  );
};

export default Home;
