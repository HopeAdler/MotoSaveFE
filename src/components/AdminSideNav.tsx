
import {
  BarChartOutlined,
  OrderedListOutlined,
  StarOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSideNav() {
  const location = useLocation();
  const selectedKey =
    location.pathname === "/admin"
      ? "1"
      : location.pathname === "/admin/staffs"
        ? "2.1"
        : location.pathname === "/admin/stations"
          ? "2.2"
          : location.pathname === "/admin/services"
            ? "3"
            : location.pathname === "/admin/feedbacks"
              ? "4"
              : "0";

  // Get the initial state of the submenus from sessionStorage
  const [openKeys, setOpenKeys] = useState(
    JSON.parse(sessionStorage.getItem("openKeys") || "[]")
  );
  // Save the state of the submenus to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  function getItem(label: any, key: any, icon: any, children: any) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<Link to="/admin">Thống kê</Link>, "1", <BarChartOutlined />, ""),
    getItem("Quản lý nhân sự", "2", <TeamOutlined />, [
      getItem(<Link to="./staffs">Nhân viên</Link>, "2.1", "", ""),
      getItem(<Link to="./stations">Các trạm sửa chữa</Link>, "2.2", "", ""),
    ]),
    getItem(<Link to="./services">Quản lí dịch vụ</Link>, "3", <OrderedListOutlined />, ""),
    getItem(<Link to="./feedbacks">Feedbacks của khách hàng</Link>, "4", <StarOutlined />, ""),
  ];

  return (
    <Menu
      selectedKeys={[selectedKey]} // set the selected key
      openKeys={openKeys} // set the open keys
      onOpenChange={setOpenKeys} // update the open keys when they change
      mode="inline"
      items={items}
    />
  );
}