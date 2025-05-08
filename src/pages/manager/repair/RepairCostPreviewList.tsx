import { Button, Card, Dropdown, Input, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { RepairCost } from "../../../models/RepairCost";
import axios from "axios";
import Table, { ColumnType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import CreateRepairCostModal from "../../../components/CreateRepairCostModal";
import UpdateRepairCostModal from "../../../components/UpdateRepairCostModal";
import { deleteRepairCost } from "../../../components/DeleteRepairCostModal";
import AuthContext from "../../../context/AuthContext";
import { removeVietnameseTones } from "../../../utils/Utils";

const RepairCostPreviewList = () => {
  const { token } = useContext(AuthContext);
  const [searchText, setSearchText] = useState<string>("");
  const allowEdit = !!token; // `true` if user exists, otherwise `false`
  const [repairCostList, setRepairCostList] = useState<RepairCost[]>([]);
  const [selectedRepairCost, setSelectedRepairCost] =
    useState<RepairCost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRepairCosts = async () => {
    try {
      const response = await axios.get<RepairCost[]>(
        "https://motor-save-be.vercel.app/api/v1/repaircostpreviews"
      );
      setRepairCostList(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRepairCosts();
  }, []);
  const handleUpdate = (repairCost: RepairCost) => {
    setSelectedRepairCost(repairCost);
  };

  const handleUpdateModalClose = () => {
    setSelectedRepairCost(null);
    fetchRepairCosts(); // Refresh data after update
  };

  const handleDelete = (id: number) => {
    deleteRepairCost(id, token, () => {
      fetchRepairCosts(); // Refresh list after deletion
    });
  };
  const columns: ColumnType<RepairCost>[] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <div>
          <p className="font-semibold">{text}</p>
        </div>
      ),
    },
    {
      title: "Min Cost",
      dataIndex: "min",
      key: "min",
      sorter: (a, b) => a.min - b.min,
      render: (text: number) => (
        <p className="truncate max-w-xs">{text.toLocaleString() + " VNĐ"}</p>
      ),
    },
    {
      title: "Max Cost",
      dataIndex: "max",
      key: "max",
      sorter: (a, b) => a.max - b.max,
      render: (text: number) => (
        <p className="truncate max-w-xs">{text.toLocaleString() + " VNĐ"}</p>
      ),
    },
    {
      title: "Wage",
      dataIndex: "wage",
      key: "wage",
      sorter: (a, b) => a.wage - b.wage,
      render: (text: number) => (
        <p className="truncate max-w-xs">{text.toLocaleString() + " VNĐ"}</p>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      sorter: (a, b) => a.rate - b.rate,
      render: (text: number) => <p className="truncate max-w-xs">{text}</p>,
    },
    {
      title: "Package",
      dataIndex: "repairpackagename",
      key: "repairpackagename",
      filters: [
        {
          text: "Basic",
          value: "Basic",
        },
        {
          text: "Addons",
          value: "Addons",
        },
      ],
      onFilter: (value: any, record) =>
        record.repairpackagename.indexOf(value) === 0,
      render: (text) => <p className="truncate max-w-xs">{text}</p>,
    },
    ...(allowEdit
      ? [
          {
            title: "Action",
            key: "action",
            render: (_: any, _record: any) => (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="update"
                      onClick={() => handleUpdate(_record)}
                    >
                      Update
                    </Menu.Item>
                    <Menu.Item
                      key="delete"
                      onClick={() => handleDelete(_record.id)}
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
        ]
      : []),
  ];
  return (
    <Card className="shadow-lg">
      <div className="flex items-center justify-between">
        <Title level={3} className="m-0">
          Bảng giá sửa xe
        </Title>

        <div className="flex items-center justify-end my-4">
          <Input.Search
            placeholder="Search name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
          {allowEdit && (
            <CreateRepairCostModal onRepairCostCreated={fetchRepairCosts} />
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={repairCostList.filter((item) =>
          removeVietnameseTones(item.name.toLowerCase()).includes(
            removeVietnameseTones(searchText.toLowerCase())
          )
        )}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
      <UpdateRepairCostModal
        repairCost={selectedRepairCost}
        onRepairCostUpdated={handleUpdateModalClose}
        onClose={() => setSelectedRepairCost(null)}
      />
    </Card>
  );
};
export default RepairCostPreviewList;
