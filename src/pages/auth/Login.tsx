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
import "../../css/Login.css"
import AuthContext from "../../context/AuthContext";
import MySpin from "../../components/MySpin";

const { Title } = Typography;

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {loading, dispatch} = useContext(AuthContext);
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
        values,
      );
      if (res.status === 201) {
        const {user, token} = res.data
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <MySpin />
  }

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          <Title className="text-login">Sign In</Title>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="login-input"
              label="Username or phone"
              name="identifier"
              rules={[
                {
                  required: true,
                  message: "Please input your username or phone!",
                },
              ]}
            >
              <Input placeholder="Username or phone" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              className="login-input"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
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
                      {isShowPassword ? (
                        <EyeInvisibleOutlined />
                      ) : (
                        <EyeOutlined />
                      )}
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
    </div>
  );
};

export default Login;
