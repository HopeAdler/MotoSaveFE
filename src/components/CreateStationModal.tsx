import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { formatCoordinate } from "../utils/Utils";
import { createStation } from "../services/beAPIs";

interface CreateStationModalProps {
  onStationCreated?: () => void;
}

export default function CreateStationModal(
  {
    onStationCreated
  }: CreateStationModalProps) {
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
    setError(null);
  };

  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const allFilled = form.getFieldsValue(true); // Get all values

    // Check if all required fields are filled
    const isAllFilled = Object.values(allFilled).every(value => value !== undefined && value !== "");

    setIsFormValid(isAllFilled && !hasErrors);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const parsedValues = {
        ...values,
        long: parseFloat(values.long),
        lat: parseFloat(values.lat),
      };
      setError(null);
      const result = await createStation(parsedValues, token);
      if (result) {
        message.success("Trạm mới đã được tạo thành công!");
        setIsModalOpen(false);
        form.resetFields();
        setIsFormValid(false);
        onStationCreated?.();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Không thể tạo trạm mới. Vui lòng thử lại!");
    }
  };

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <Button type="primary" onClick={showModal}>
        Tạo chi nhánh sửa xe mới
      </Button>

      {/* Modal */}
      <Modal
        title="Tạo trạm mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer with a button
        className="rounded-lg"
        centered
      >
        <Form form={form} layout="vertical" onValuesChange={checkFormValidity}>
          {/* Name Field */}
          <Form.Item
            label="Tên trạm"
            name="name"
            rules={[{ required: true, message: "Vui lòng tạo tên trạm!" }]}
          >
            <Input placeholder="Nhập tên trạm" />
          </Form.Item>

          {/* Name Field */}
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          {/* Location Details Field */}
          <Form.Item
            label="Kinh độ"
            name="long"
            rules={[
              { required: true, message: "Vui lòng nhập kinh độ!" },
              {
                pattern: /^-?(?:180\.000000|(?:1[0-7]\d|\d{1,2})\.\d{6})$/,
                message: "Kinh độ không hợp lệ! Nhập giá trị từ -180.000000 đến 180.000000 với đúng 6 chữ số thập phân.",
              },
            ]}
          >
            <Input
              placeholder="Nhập kinh độ"
              maxLength={10}
              onBlur={(e) => {
                const value = e.target.value;
                form.setFields([
                  {
                    name: "long",
                    value: formatCoordinate(value, true),
                    errors: [],
                  },
                ]);
                checkFormValidity(); // Ensure validation updates properly
              }}
            />
          </Form.Item>

          <Form.Item
            label="Vĩ độ"
            name="lat"
            rules={[
              { required: true, message: "Vui lòng nhập vĩ độ!" },
              {
                pattern: /^-?(90(\.0{1,6})?|[0-8]?\d(\.\d{1,6})?)$/,
                message: "Vĩ độ không hợp lệ! Nhập giá trị từ -90.000000 đến 90.000000 với tối đa 6 chữ số thập phân.",
              },
            ]}
          >
            <Input
              placeholder="Nhập vĩ độ"
              maxLength={10}
              onBlur={(e) => {
                const value = e.target.value;
                form.setFields([
                  {
                    name: "lat",
                    value: formatCoordinate(value, false),
                    errors: [],
                  },
                ]);
                checkFormValidity(); // Ensure validation updates properly
              }}
            />
          </Form.Item>


          {/* Display error */}
          {error && <Alert message={error} type="error" className="mb-4" />}
          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" block onClick={handleCreate} disabled={!isFormValid || error !== null}>
              Tạo chi nhánh sửa xe
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
