import { Card, List, Typography, Avatar, Tag } from "antd";
import { ExperimentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const servicePackages = [
  {
    id: "60c642e7-ceea-418e-b07d-d99238854287",
    name: "Cứu hộ nước ngập",
    description: "Cứu hộ qua điểm ngập nước (Giới hạn vận chuyển dưới 1km)",
    rate: 1,
    createddate: "2025-02-15T12:00:00.000Z",
  },
  {
    id: "0961c26b-1e2c-45a9-bf67-7cc42e2e9320",
    name: "Cứu hộ thường",
    description: "Cứu hộ từ A -> B",
    rate: 1.05,
    createddate: "2025-02-15T11:02:00.000Z",
  },
  {
    id: "c4e17e2c-27ba-44a5-804e-189af235afd4",
    name: "Cứu hộ đến trạm",
    description: "Cứu hộ từ A -> trạm",
    rate: 1,
    createddate: "2025-02-15T11:10:00.000Z",
  },
];

export default function ServicePackageList() {
  return (
    <Card className="p-6 shadow-lg">
      <Title level={3} className="text-blue-600">🚀 Các gói dịch vụ</Title>
      <Text type="secondary">Manage your service packages here.</Text>

      {/* Fancy List with Ant Design */}
      <List
        className="mt-4"
        itemLayout="horizontal"
        dataSource={servicePackages}
        renderItem={(item) => (
          <List.Item className="p-4 my-5 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <List.Item.Meta
              className="p-5"
              avatar={
                <Avatar
                  size="large"
                  icon={<ExperimentOutlined />}
                  className="bg-blue-500"
                />
              }
              title={
                <Text className="text-lg font-semibold text-blue-800">{item.name}</Text>
              }
              description={
                <div>
                  <Text type="secondary">{item.description}</Text>
                  <div className="mt-2">
                    <Tag color="gold">Rate: {item.rate}x</Tag>
                    <Tag color="cyan">
                      {new Date(item.createddate).toLocaleDateString()}
                    </Tag>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
