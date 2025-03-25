import { Card } from "antd";


const AdminDashboard = () => {

  // const handleLogout = () => {
  //   setAuthenticated(false);
  //   navigate("/admin");
  // };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Welcome, Admin!</p>
      </Card>
    </div>
  )
};

export default AdminDashboard;
