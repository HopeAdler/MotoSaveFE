import { Layout } from "antd";
import Navbar from "../components/Navbar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
      <Layout>
        <Navbar />
        <Content
          style={{
            background: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    );
  };
  
  export default GuestLayout;