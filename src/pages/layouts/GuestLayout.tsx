import {
  HomeOutlined,
  InfoCircleOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import { Layout, Menu, Typography } from 'antd';
import { SetStateAction, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
const { Header, Footer } = Layout;
const { Title } = Typography;

export default function GuestLayout() {
  const items = [
    { label: 'Trang chủ', icon: <HomeOutlined />, key: 'homepage', path: '/' },
    // { label: 'Thông báo', icon: <FileTextOutlined />, key: 'news', path: '/news' },
    { label: 'Biểu phí dịch vụ', icon: <OrderedListOutlined />, key: 'services', path: '/services' },
    { label: 'Về chúng tôi', icon: <InfoCircleOutlined />, key: 'about-us', path: '/about-us' },
  ];
  const [current, setCurrent] = useState('homepage');

  const handleClick = (e: { key: SetStateAction<string>; }) => {
    setCurrent(e.key);
  };

  return (
    <Layout className="min-h-screen flex flex-col">
      <Header className="fixed top-0 w-full z-50 flex justify-between items-center px-12 bg-blue-800 h-16">
        <Title level={2} className='!text-white mx-10 mt-2'>Motor_Save</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={handleClick}
          className="flex flex-1 justify-start bg-inherit"
        >
          {items.map(item => (
            <Menu.Item key={item.key} className="text-lg"
              icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>

      <div className="flex flex-1 overflow-auto px-12 bg-slate-500 p-5 justify-center items-center">
        <Outlet />
      </div>

      <Footer className="fixed bottom-0 w-full z-50 bg-blue-800 text-white text-center py-4">
        MotorSave ©{new Date().getFullYear()} All Rights Reserved
      </Footer>
    </Layout>

  );
};