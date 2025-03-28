import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createRepairCost } from "../services/beAPIs";

interface CreateRepairCostModalProps {
  onRepairCostCreated?: () => void;
}

export default function CreateRepairCostModal({
  onRepairCostCreated,
}: CreateRepairCostModalProps) {
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity when opening modal
  const showModal = async () => {
    setError(null);
    setIsModalOpen(true);

    await form.validateFields().catch(() => {}); // Ensure validation runs on open
    checkFormValidity();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsFormValid(false);
  };

  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setError(null);
      const result = await createRepairCost(values, token);
      if (result) {
        message.success("Create success!");
        setIsModalOpen(false);
        form.resetFields();
        setIsFormValid(false);
        onRepairCostCreated?.();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Please try again!");
    }
  };

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <Button type="primary" onClick={showModal}>
        Create new repair cost
      </Button>

      {/* Modal */}
      <Modal
        title="Tạo repair cost"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer with a button
        className="rounded-lg"
        centered
      >
        <Form form={form} layout="vertical" onValuesChange={checkFormValidity}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng tạo tên!" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>

          <Form.Item
            label="Giá tiền nhỏ nhất"
            name="min"
            rules={[{ required: true, message: "Vui lòng giá tiền nhỏ nhất!" }]}
          >
            <Input
              placeholder="Nhập giá tiền"
              type="number"
              onChange={() => form.validateFields(["max"])}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền lớn nhất"
            name="max"
            dependencies={["min"]}
            rules={[
              { required: true, message: "Vui lòng nhập giá tiền lớn nhất!" },
              // {
              //   type: "number",
              //   min: 1000,
              //   max: 10000000,
              //   message: "Giá tiền phải từ 1.000 đến 10.000.000!",
              // },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value <= getFieldValue("min")) {
                    return Promise.reject(
                      new Error(
                        "Giá tiền lớn nhất phải lớn hơn giá tiền nhỏ nhất!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Nhập giá tiền" type="number" />
          </Form.Item>

          {/* Display error */}
          {error && <Alert message={error} type="error" className="mb-4" />}
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              block
              onClick={handleCreate}
              disabled={!isFormValid}
            >
              Create repair cost
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
