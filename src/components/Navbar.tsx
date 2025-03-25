import {
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    UserOutlined,
    LogoutOutlined,
    FileTextOutlined,
    PayCircleOutlined,
    ReadOutlined,
  } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Menu,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const user = false
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    sessionStorage.getItem("activeMenu") || "1"
  );

  useEffect(() => {
    sessionStorage.setItem("activeMenu", selectedKey);
  }, [selectedKey]);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);

  const userMenu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  
    return (
        <Header
          style={{
            backgroundColor: "#202020",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            zIndex: 1,
            width: "100%",
            padding: "0 2%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "10%", marginRight: "2%" }}>
            <img
              src="../src/assets/homelogo.png"
              alt="house"
              style={{ width: "100%", height: "auto", paddingTop: "20px" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "#202020",
            }}
            onClick={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            {user && (
              <Menu.Item key="/mycontracts" icon={<FileTextOutlined />}>
                <Link to="/mycontracts">My Contracts</Link>
              </Menu.Item>
            )}
            <Menu.Item key="/aboutus" icon={<InfoCircleOutlined />}>
              <Link to="/aboutus">About us</Link>
            </Menu.Item>
            <Menu.Item key="/news" icon={<ReadOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item key="/contact" icon={<MailOutlined />}>
              <Link to="/contact">Contact</Link>
            </Menu.Item>
            <Menu.Item key="/unitprice" icon={<PayCircleOutlined />}>
              <Link to="/unitprice">Pricing</Link>
            </Menu.Item>
          </Menu>
          {user ? (
            <Dropdown overlay={userMenu}>
              <div
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <span style={{ color: "#fff", marginLeft: "10px" }}>
                  Welcome, Guest
                </span>
              </div>
            </Dropdown>
          ) : (
            <Dropdown overlay={userMenu}>
              <Button
                style={{
                  backgroundColor: "#101010",
                  borderColor: "#101010",
                  color: "#fff",
                }}
              >
                Login / Register <UserOutlined />
              </Button>
            </Dropdown>
          )}
        </Header>
      );
  };
  
  export default Navbar;