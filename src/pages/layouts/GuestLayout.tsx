import { Button, Layout, Menu, Typography } from 'antd';
import { SetStateAction, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export default function GuestLayout() {
    const items = [
        { label: 'Trang chủ', key: 'homepage', path: '/' },
        { label: 'Về chúng tui', key: 'about-us', path: '/about-us' },
    ];
    const [current, setCurrent] = useState('homepage');

    const handleClick = (e: { key: SetStateAction<string>; }) => {
        setCurrent(e.key);
    };

    return (
        <Layout className="min-h-screen flex flex-col">
            <Header className="fixed w-full flex justify-between items-center align-middle px-12 bg-blue-800">
                <Title level={2} className='!text-white'>MotorSave</Title>
                <Menu theme="dark" mode="horizontal" selectedKeys={[current]} onClick={handleClick} className="w-fit">
                    {items.map(item => (
                        <Menu.Item key={item.key} className="text-white">
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