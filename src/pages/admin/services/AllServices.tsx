import { Tabs, TabsProps, Typography } from "antd";
import DistanceRateList from "./DistanceRateList";
// import RepairCostPreviewList from "./RepairCostPreviewList";
import AdminNotes from "../../../components/AdminNotes";
import ServicePackageList from "./ServicePackageList";

const onChange = (key: string) => {
  console.log("Selected Tab:", key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <span className="font-semibold text-lg">📦 Gói dịch vụ</span>,
    children: <ServicePackageList />,
  },
  {
    key: "2",
    label: <span className="font-semibold text-lg">📏 Tỉ giá khoảng cách</span>,
    children: <DistanceRateList />,
  },
  // {
  //   key: "3",
  //   label: <span className="font-semibold text-lg">🔧 Tổng quan giá sửa xe</span>,
  //   children: <RepairCostPreviewList />,
  // },
];

export default function AllServices() {
  const noteData =
    [
      "Cập nhật tỉ giá cần xác nhận.",
      "Tỉ giá hợp lệ từ 1.0 đến 1.5.",
    ];
  return (
    <div className="p-6 bg-blue-400 rounded-lg shadow-lg">
      <Typography className="text-3xl font-bold mb-4 text-white">
        🛠️ 🏪 Quản lí dịch vụ
      </Typography>
      {/* Floating Note */}
      <AdminNotes data={noteData} />

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
