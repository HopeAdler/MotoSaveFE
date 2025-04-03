import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";
import AuthContext from "../../context/AuthContext";
import MySpin from "../../components/MySpin";
import backgroundImg from "../../assets/rainy_background.png";

const { Title } = Typography;

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { loading, dispatch } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleShowHidePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onFinish = async (values: any) => {
    dispatch?.({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://motor-save-be.vercel.app/api/v1/auth/login",
        values
      );
      if (res.status === 201) {
        const { user, token } = res.data;
        dispatch?.({ type: "LOGIN_SUCCESS", payload: { user, token } });
        if (user.role === "Admin") {
          message.success("Login successful!");
          navigate("/admin");
        } else {
          dispatch?.({
            type: "LOGIN_FAILURE",
            payload: "You are not allowed!",
          });
          message.error("You are not allowed to login!");
        }
      }
    } catch (err: any) {
      dispatch?.({ type: "LOGIN_FAILURE", payload: err.response.data });
      message.error(err.response.data.message);
    }
  };

  if (loading) {
    return <MySpin />;
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Caption Section */}
      <figure className="absolute top-12 flex">
        <figcaption className="relative mx-auto flex justify-between rounded-xl border border-white bg-white/60 py-4 px-6 shadow-lg shadow-black/5 backdrop-blur-lg">
          <div className="flex flex-col justify-center items-center">
            <Title level={2}>Trang đăng nhập dành cho Quản lí hệ thống</Title>
          </div>
        </figcaption>
      </figure>

      {/* Login Form */}
      <div className="w-full max-w-md p-8 rounded-xl bg-white/70 shadow-lg backdrop-blur-md">
        <Title className="text-center">Đăng nhập</Title>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="row-col"
        >
          <Form.Item
            className="login-input"
            label="Tên đăng nhập"
            name="identifier"
            rules={[
              {
                required: true,
                message: "Hãy nhập username!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            className="login-input"
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <div className="password-container">
              <Input
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                prefix={<LockOutlined />}
                suffix={
                  <div
                    className="password-toggle"
                    onClick={handleShowHidePassword}
                    style={{ cursor: "pointer" }}
                  >
                    {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </div>
                }
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="btn-login"
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
