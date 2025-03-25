import {
    UploadOutlined
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";
import { CContent, CHeader, CSider } from "../../styles/PageLayouteStyle";
const { Header, Content, Sider } = Layout;

const AdminPageLayout = () => {
    return (
        <Layout style={{ height: "100vh" }}>
            {/* AVATAR's header */}
            <AdminHeader/>

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


