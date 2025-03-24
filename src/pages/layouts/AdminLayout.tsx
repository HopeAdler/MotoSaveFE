import {
    UploadOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { Link, Outlet } from 'react-router-dom';
import { CContent, CHeader, CSideHeader, CSider } from "../../styles/PageLayouteStyle";
import AdminSideNav from "../../components/AdminSideNav";
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminPageLayout = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            {/* AVATAR's header */}
            <Header style={CSideHeader}>
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

                    </Title>
                </Space>
            </Header>

            <Sider style={CSider} width={300}>
                <AdminSideNav />
            </Sider>

            <Layout style={{ marginLeft: 300 }}>


                <Header style={CHeader}>
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
                <Content style={CContent}>
                    <div
                        style={{
                            padding: "0 5% 0 5%",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPageLayout;


