import { Layout, Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Header } = Layout;


const AppHeader = () => {
  const user = true
//   useEffect(() => {
//     const getUser = () => {
//       fetch("http://localhost:5000/auth/user/login/success", {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Credentials": true,
//         },
//       })
//         .then((response) => {
//           if (response.status === 200) return response.json();
//           throw new Error("authentication has been failed!");
//         })
//         .then((resObject) => {
//           setUser(resObject.user);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     getUser();
//   }, [!user]);
//   // console.log(user);
//   const logout = () => {
//     axios
//       .get("http://localhost:5000/auth/user/logout", { withCredentials: true })
//       .then((res) => {
//         alert(res.data);
//         window.location = "/";
//         localStorage.setItem('success', 'false');
//       })
//       .catch((error) => {
//         alert(error.data);
//       });
//   };
  const userMenu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            {/* Logout logic will go here */}
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
            {/* <p onClick={setIsLoggedIn(true)}>Login</p> */}
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
        justifyContent: "end",
        alignItems: "center",
        position: "fixed",
        zIndex: 1,
        width: "100%",
        padding: "0 15%",
        boxSizing: "border-box",
      }}
    >
      {/* <div className="logo" style={{ maxWidth: "10%", marginRight: "2%" }}>
        <img
          src="/shared/homelogo.png"
          alt="house"
          style={{ width: "100%", height: "auto", paddingTop: "20px" }}
        />
      </div> */}

      {user ? (
        <Dropdown overlay={userMenu}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#fff", marginLeft: "10px" }}>
              Welcome, Admin
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

export default AppHeader;