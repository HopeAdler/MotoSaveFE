
import {
    BarChartOutlined,
    TeamOutlined
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  
  export default function ManagerSideNav() {
    const location = useLocation();
    const selectedKey =
      location.pathname === "/manager"
        ? "1"
        : location.pathname === "/manager/staffs"
          ? "2.1"
          : location.pathname === "/manager/stations"
            ? "2.2"
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
      getItem(<Link to="/manager">Thống kê</Link>, "1", <BarChartOutlined />, ""),
      getItem("Quản lý nhân sự", "2", <TeamOutlined />, [
        getItem(<Link to="./staffs">Nhân viên</Link>, "2.1", "", ""),
        getItem(<Link to="./stations">Các trạm sửa chữa</Link>, "2.2", "", ""),
      ])
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