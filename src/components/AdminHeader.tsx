import { Avatar, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import {
  UserOutlined
} from "@ant-design/icons";
import Title from 'antd/es/typography/Title';
export default function AdminHeader() {
  return (
    <Header className="h-[50px] w-[300px] fixed px-5 bg-white border-r border-gray-300 shadow-md z-8">
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
  )
}
