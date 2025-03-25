import {
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { Link, Outlet } from 'react-router-dom';
import AdminSideNav from "../../components/AdminSideNav";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminPageLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* AVATAR's header */}
      <Header
        className="h-[50px] w-[300px] fixed px-[20px] bg-white border-r border-gray-300 shadow-md z-[8]"
      >
        <Space align="center" size={"small"} direction="horizontal">
          <Avatar
            shape="square"
            size={"large"}
            icon={<UserOutlined />}
            style={{ marginBottom: 20 }}

          // src={user?.photos?.[0]?.value}
          />
          <Title level={4} style={{ marginTop: 0 }}>
            {/* {user?.displayName} */}
            This is YOU
          </Title>
        </Space>
      </Header>

      <Sider
        className="overflow-auto h-auto fixed left-0 top-[50px] bottom-0 text-left z-[7] m-0 bg-white border-r border-gray-300 shadow-md"
        width={300}
      >                <AdminSideNav />
      </Sider>

      <Layout style={{ marginLeft: 300 }}>
        <Header
          className="h-[50px] w-auto bg-white px-[50px] flex justify-between items-center border-b border-gray-300 z-[6]"
        >
          <Link to="/">
            <Button
              size={"large"}
              icon={<UploadOutlined style={{ fontSize: "200%" }} />}
              style={{
                color: "#1890ff",
                backgroundColor: "#fff",
                borderColor: "1px solid #ccc",
                boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
                rotate: "90deg",
                padding: 0,
              }}
            >

            </Button>
          </Link>
        </Header>
        <Content className="overflow-initial bg-white p-10">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPageLayout;


