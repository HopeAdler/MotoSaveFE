import { useContext, useEffect, useState } from "react";
import { Accessory } from "../../../models/Accessories";
import axios from "axios";
import Table, { ColumnType } from "antd/es/table";
import CreateAccessoryModal from "../../../components/CreateAccessoryModal";
import { Button, Dropdown, Input, Menu } from "antd";
import { deleteAccessory } from "../../../components/DeleteAccessoryModal";
import AuthContext from "../../../context/AuthContext";
import UpdateAccessoryModal from "../../../components/UpdateAccessoryModal";
import { removeVietnameseTones } from "../../../utils/Utils";

const Accessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(AuthContext);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");

  const fetchAccessories = async () => {
    try {
      const response = await axios.get<Accessory[]>(
        "https://motor-save-be.vercel.app/api/v1/accessories"
      );
      setAccessories(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  const handleUpdate = (accessory: Accessory) => {
    setSelectedAccessory(accessory);
  };

  const handleUpdateModalClose = () => {
    setSelectedAccessory(null);
    fetchAccessories(); // Refresh data after update
  };

  const handleDelete = (id: number) => {
    deleteAccessory(id, token, () => {
      fetchAccessories(); // Refresh list after deletion
    });
  };

  const columns: ColumnType<Accessory>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Part Category",
      dataIndex: "partcategoryname",
      key: "partcategoryname",
      filters: Array.from(
        new Set(accessories.map((a) => a.partcategoryname))
      ).map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.partcategoryname === value,
      render: (text) => <p className="truncate max-w-xs">{text}</p>,
    },
    {
      title: "Brand",
      dataIndex: "brandname",
      key: "brandname",
      filters: Array.from(new Set(accessories.map((a) => a.brandname))).map(
        (name) => ({
          text: name,
          value: name,
        })
      ),
      onFilter: (value, record) => record.brandname === value,
      render: (text) => <p className="truncate max-w-xs">{text}</p>,
    },
    {
      title: "Accessory Name",
      dataIndex: "accessoryname",
      key: "accessoryname",
      render: (text) => <p className="truncate max-w-xs">{text}</p>,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      sorter: (a, b) => a.cost - b.cost,
      render: (amount) => (
        <p className="truncate max-w-xs">{amount.toLocaleString() + " VNĐ"}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="update" onClick={() => handleUpdate(record)}>
                Update
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleDelete(record.id)}
                danger
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["hover"]}
        >
          <Button className="border-none shadow-none text-gray-600 hover:text-gray-900">
            ...
          </Button>
        </Dropdown>
      ),
    },
  ];
  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Danh sách phụ tùng
        </h2>
        <div className="flex items-center justify-end">
          <Input.Search
            placeholder="Search accessory"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200, marginRight: 10 }}
          />
          <CreateAccessoryModal onAccessoryCreated={fetchAccessories} />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={accessories.filter((item) =>
          removeVietnameseTones(item.accessoryname.toLowerCase()).includes(
            removeVietnameseTones(searchText.toLowerCase())
          )
        )}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
      <UpdateAccessoryModal
        accessory={selectedAccessory}
        onAccessoryUpdated={handleUpdateModalClose}
        onClose={() => setSelectedAccessory(null)}
      />
    </div>
  );
};

export default Accessories;
