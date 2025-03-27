import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { Outlet } from "react-router-dom";
import AdminSideNav from "../../components/AdminSideNav";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminPageLayout = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch?.({ type: "LOGOUT" });
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ height: "100vh" }}>
      {/* AVATAR's header */}
      <Header className="h-[50px] w-[300px] fixed px-[20px] bg-white z-[8]">
        <Space align="center" size={"small"} direction="horizontal">
          <Title level={2} className="mx-10 mt-2">
            MotorSave
          </Title>
        </Space>
      </Header>

      <Sider
        className="overflow-auto h-auto fixed left-0 top-[50px] bottom-0 text-left z-[7] m-0 bg-white border-r border-gray-300 shadow-md"
        width={300}
      >
        {" "}
        <AdminSideNav />
      </Sider>

      <Layout style={{ marginLeft: 300 }}>
        <Header className="h-[50px] w-auto bg-white py-0 flex justify-end items-center border-b border-gray-300 z-[6]">
          <Dropdown overlay={userMenu}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ marginLeft: "10px" }}>
                <Avatar
                  size="large"
                  style={{
                    backgroundColor: "#1890ff",
                    marginRight: "10px",
                    fontSize: "20px",
                  }}
                >
                  {user.fullname.charAt(0)}
                </Avatar>
                <span style={{ fontWeight: "bold" }}>{user.fullname}</span>
              </span>
            </div>
          </Dropdown>
        </Header>

        {/* Page Content (Fixed Height & Scrollable Inner) */}
        <Content className="h-[calc(100vh-50px)] overflow-auto bg-white p-10">
          <Outlet />
        </Content>
      </Layout>
    </Layout>

  );
};

export default AdminPageLayout;
