import { Alert, Button, Form, Input, message, Modal, Select } from "antd";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createStaffAccount } from "../services/beAPIs";

interface CreateStaffModalProps {
  onStaffCreated?: () => void;
}

export default function CreateStaffModal(
  {
    onStaffCreated
  }: CreateStaffModalProps) {
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity when opening modal
  const showModal = async () => {
    setError(null);
    setIsModalOpen(true);

    await form.validateFields().catch(() => { }); // Ensure validation runs on open
    checkFormValidity();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsFormValid(false);
  };

  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setError(null);
      const result = await createStaffAccount(values, token);
      if (result) {
        message.success("Tài khoản nhân viên đã được tạo thành công!");
        setIsModalOpen(false);
        form.resetFields();
        setIsFormValid(false);
        onStaffCreated?.();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Không thể tạo nhân viên. Vui lòng thử lại!");
    }
  };

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <Button type="primary" onClick={showModal}>
        Tạo tài khoản cho nhân viên
      </Button>

      {/* Modal */}
      <Modal
        title="Tạo tài khoản nhân viên"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer with a button
        className="rounded-lg"
        centered
      >
        <Form form={form} layout="vertical"
          onValuesChange={checkFormValidity}>
          {/* Name Field */}
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng tạo tên đăng nhập!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          {/* Name Field */}
          <Form.Item
            label="Họ và Tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập SĐT!" },
              {
                pattern: /^0\d{9}$/, // Regex: Must start with 0 and have exactly 10 digits
                message: "Số điện thoại không hợp lệ! (10 chữ số, bắt đầu bằng số 0)",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" maxLength={10} />
          </Form.Item>


          {/* Role Field */}
          <Form.Item label="Chức vụ" name="roleId">
            <Select placeholder="Chọn chức vụ">
              <Select.Option value={3}>Tài xế</Select.Option>
              <Select.Option value={4}>Thợ máy</Select.Option>
            </Select>
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {/* Display error */}
          {error && <Alert message={error} type="error" className="mb-4" />}
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" block onClick={handleCreate} disabled={!isFormValid}>
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
