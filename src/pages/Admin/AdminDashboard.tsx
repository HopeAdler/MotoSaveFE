import { Card, Layout, Typography } from "antd";

const AdminDashboard = () => {

  return (
    <Layout className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 shadow-lg">
        <Typography className="text-2xl font-bold mb-4">Admin Dashboard</Typography>
        <Typography className="text-lg">Welcome, Admin!</Typography>
      </Card>
    </Layout>
  )
};

export default AdminDashboard;
