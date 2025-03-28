import { CheckOutlined, DropboxOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Input, List, message, Modal, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { ServicePackages } from "../../../models/ServicePackages";
import { getServicePackages, updateServicePackage } from "../../../services/beAPIs";
import { formatDate } from "../../../utils/Utils";

const { Title, Text } = Typography;

export default function ServicePackageList() {
  const { token } = useContext(AuthContext);
  const [servicePackages, setServicePackages] = useState<ServicePackages[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editedSerPack, setEditedSerPack] = useState<ServicePackages | null>(null);
  const [editedRates, setEditedRates] = useState<any>({});
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const fetchServicePackages = async () => {
    try {
      setLoading(true);
      const results = await getServicePackages();
      setServicePackages(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stations:", error);
      setLoading(false);
    }
  };
  const handleEditClick = (editedSerPac: ServicePackages, currentRate: number) => {
    setEditedSerPack(editedSerPac);
    setEditedRates((prev: any) => ({ ...prev, [editedSerPac.id]: currentRate }));
  };

  const handleSave = async (id: string) => {
    if (!editedSerPack) return;

    // Show confirmation popup
    Modal.confirm({
      centered: true,
      title: "Xác nhận cập nhật tỉ giá",
      content: `Bạn có chắc muốn thay đổi tỉ giá thành ${editedRates[id]}x?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        console.log(`New rate for package ${id}:`, editedRates[id]);
        setConfirmLoading(true);

        const payload = {
          name: editedSerPack.name,
          description: editedSerPack.description,
          rate: editedRates[editedSerPack.id],
        };

        try {
          await updateServicePackage(editedSerPack.id, payload, token);
          message.success("Tỉ giá đã được cập nhật");
          fetchServicePackages();
        } catch (error) {
          console.error("Error updating service package:", error);
        } finally {
          setConfirmLoading(false);
          setEditedSerPack(null); // ✅ Exit edit mode
          setEditedRates({}); // ✅ Reset state
        }
      },
      onCancel: async () => {
        setConfirmLoading(false);
        setEditedSerPack(null); // ✅ Exit edit mode
        setEditedRates({}); // ✅ Reset state
      }
    });
  };



  useEffect(() => {
    fetchServicePackages()
  }, [])

  return (
    <Card className="p-6 shadow-lg">
      <Title level={3} className="text-blue-600">📦 Các gói dịch vụ</Title>
      <Text type="secondary">Điều chỉnh tỉ giá dịch vụ ở đây.</Text>

      <List
        className="mt-4"
        itemLayout="horizontal"
        dataSource={servicePackages}
        loading={loading}
        renderItem={(item) => (
          <List.Item className="p-4 my-5 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 justify-between items-center">
            <List.Item.Meta
              className="p-5"
              avatar={<Avatar size="large" icon={<DropboxOutlined />} className="bg-blue-500" />}
              title={<Text className="text-lg font-semibold text-blue-800">{item.name}</Text>}
              description={
                <div>
                  <Text type="secondary">{item.description}</Text>
                  <div className="mt-2 flex items-center space-x-2">
                    {/* Editable Rate Input */}
                    <div className="flex flex-col items-start">
                      <Tag color="gold" className="w-40 flex items-center justify-between px-3 py-2 rounded-lg shadow-md text-base">
                        <span className="text-black font-medium">Rate:</span>
                        {editedSerPack?.id === item.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              required
                              value={editedRates[item.id] !== null && editedRates[item.id] !== undefined ? editedRates[item.id] : ""}
                              onChange={(e) => {
                                const value = e.target.value === "" ? null : parseFloat(e.target.value);
                                setEditedRates((prev: Record<string, number | null>) => ({ ...prev, [item.id]: value }));
                              }}
                              className="w-16 border border-gray-300 rounded-md text-center"
                              type="number"
                              step={0.01}
                              max={1.5}
                              min={1}
                            />
                            <Button
                              type="primary"
                              size="small"
                              shape="circle"
                              icon={<CheckOutlined />}
                              loading={confirmLoading}
                              onClick={() => handleSave(item.id)}
                              disabled={editedRates[item.id] === null || editedRates[item.id] === "" || editedRates[item.id]! > 1.5 || editedRates[item.id]! < 1}
                            />
                          </div>
                        ) : (
                          <div className="flex items-start space-x-2">
                            <Typography.Text className="font-semibold">{item.rate}x</Typography.Text>
                            <Button
                              type="dashed"
                              size="small"
                              shape="circle"
                              icon={<EditOutlined />}
                              onClick={() => handleEditClick(item, item.rate)}
                            />
                          </div>
                        )}
                      </Tag>

                      {/* Validation Message (Positioned Below) */}
                      {(editedRates[item.id] === null || editedRates[item.id] === "" || editedRates[item.id]! > 1.5 || editedRates[item.id]! < 1) && (
                        <Text type="danger" className="text-red-500 mt-1 text-sm">
                          {editedRates[item.id] === null || editedRates[item.id] === "" ? "Rate is required" : "Rate must be between 1 and 1.5"}
                        </Text>
                      )}
                    </div>


                    <Tag color="cyan" className="text-lg">{formatDate(item.updateddate)}</Tag>
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
