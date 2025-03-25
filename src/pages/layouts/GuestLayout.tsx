import {
    // LogoutOutlined,
    FileTextOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    PayCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from 'antd';
import { SetStateAction, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function GuestLayout() {
    const items = [
        { label: 'Trang chủ', icon: <HomeOutlined />, key: 'homepage', path: '/' },
        { label: 'Thông báo', icon: <FileTextOutlined />, key: 'news', path: '/news' },
        { label: 'Về chúng tôi', icon: <InfoCircleOutlined />, key: 'about-us', path: '/about-us' },
        { label: 'Biểu phí dịch vụ', icon: <PayCircleOutlined />, key: 'services', path: '/services' },
    ];
    const [current, setCurrent] = useState('homepage');

    const handleClick = (e: { key: SetStateAction<string>; }) => {
        setCurrent(e.key);
    };

    return (
        <Layout className="min-h-screen flex flex-col">
            <Header className="fixed w-full flex justify-between items-center align-middle px-12 bg-blue-800">
                <Title level={2} className='!text-white'>MotorSave</Title>
                <Menu mode="horizontal"
                    selectedKeys={[current]} onClick={handleClick}
                    className="flex flex-1 bg-inherit">
                    {items.map(item => (
                        <Menu.Item key={item.key} className="text-white" icon={item.icon}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <Link to="/login">
                    <Button type="primary" size="large" className="mt-2">Login</Button>
                </Link>
            </Header>
            <Content className="flex-grow px-12 mt-16 bg-slate-500">
                <Outlet />
            </Content>
            <Footer className="text-center fixed flex justify-center w-full bottom-0 bg-blue-800 text-white py-4">
                MotorSave ©{new Date().getFullYear()} All Rights Reserved
            </Footer>
        </Layout>
    );
};