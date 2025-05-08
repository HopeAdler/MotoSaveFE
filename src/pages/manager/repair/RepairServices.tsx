import { Tabs, TabsProps, Typography } from "antd";
import ManagerNotes from "../../../components/ManagerNotes";
import Accessories from "./Accessories";
import RepairCostPreviewList from "./RepairCostPreviewList";

const onChange = (key: string) => {
  console.log("Selected Tab:", key);
};

const noteData =
[
  "Giá phụ tùng thay thế cần cập nhật theo thị trường.",
  "Các gói 'Basic' chỉ có thể cài đặt công thợ (Wage), không được chỉnh tỉ giá linh kiện (Rate)",
  "Các gói 'Addons' không trực tiếp đặt công thợ, mà phải thông qua tỉ giá linh kiện để tính tiền công",
  "Tỉ giá linh kiện (Rate) không được vượt quá 50% giá phụ tùng",
];

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <span className="font-semibold text-lg">🔧 Tổng quan giá sửa xe</span>,
    children: <RepairCostPreviewList />,
  },
  {
    key: "2",
    label: <span className="font-semibold text-lg">📦 Phụ tùng</span>,
    children: <Accessories />,
  },
    {
      key: "3",
      label: <span className="font-semibold text-lg">📏 Ghi chú</span>,
      children: <ManagerNotes data={noteData} />,
    },
];

export default function RepairServices() {
 
  return (
    <div className="p-6 bg-blue-400 rounded-lg shadow-lg">
      <Typography className="text-3xl font-bold mb-4 text-white">
        🛠️ Quản lí dịch vụ sửa chữa
      </Typography>

      {/* Floating Note */}
      {/* <ManagerNotes data={noteData} /> */}
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
