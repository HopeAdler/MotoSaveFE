import { Tabs, TabsProps, Typography } from "antd";
import Accessories from "./Accessories";
import RepairCostPreviewList from "./RepairCostPreviewList";

const onChange = (key: string) => {
  console.log("Selected Tab:", key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <span className="font-semibold text-lg">📦 Phụ tùng</span>,
    children: <Accessories />,
  },
  {
    key: "2",
    label: <span className="font-semibold text-lg">🔧 Tổng quan giá sửa xe</span>,
    children: <RepairCostPreviewList />,
  },
//   {
//     key: "3",
//     label: <span className="font-semibold text-lg">🔧 Tổng quan giá sửa xe</span>,
//     children: <RepairCostPreviewList />,
//   },
];

export default function RepairServices() {
  return (
    <div className="p-6 bg-blue-400 rounded-lg shadow-lg">
      <Typography className="text-3xl font-bold mb-4 text-white">
        🛠️ Quản lí dịch vụ sửa chữa
      </Typography>

      {/* Fancy Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarStyle={{ borderBottom: "2px solid #ddd" }}
        className="bg-white p-4 rounded-lg shadow-md"
      />
    </div>
  );
}
