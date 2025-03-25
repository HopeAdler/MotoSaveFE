import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SiderComponent from "../components/Sider";
import AppHeader from "../components/AppHeader";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  return (
    <Layout>

      <Sider>
        <SiderComponent />
      </Sider>
      <Layout>
      <AppHeader />
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Content
            style={{
              padding: " 0 50px",
              margin: "90px 20px",
            }}
          >
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
