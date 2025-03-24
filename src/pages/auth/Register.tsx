import React from "react";
import { Button, Card, Layout } from "antd";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <Layout className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <Card className="p-6 shadow-lg bg-transparent text-center">
        <h1 className="text-2xl font-bold mb-4">Register Page</h1>
        {/* Ensure buttons are stacked vertically */}
        <div className="flex flex-col gap-4 mt-4 w-full">
          <Button type="default" onClick={handleToHome} className="w-full">
            Back To Home
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Register;
