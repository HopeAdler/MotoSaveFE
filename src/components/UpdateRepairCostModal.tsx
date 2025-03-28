import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { updateRepairCost } from "../services/beAPIs"; // Replace with actual update API function
import { RepairCost } from "../models/RepairCost";

interface UpdateRepairCostModalProps {
  repairCost: RepairCost | null;
  onRepairCostUpdated?: () => void;
  onClose: () => void;
}

export default function UpdateRepairCostModal({
  repairCost,
  onRepairCostUpdated,
  onClose,
}: UpdateRepairCostModalProps) {
  const { token } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Set form values when repairCost changes
  useEffect(() => {
    if (repairCost) {
      form.setFieldsValue(repairCost);
      checkFormValidity();
    }
  }, [repairCost]);

  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setError(null);
      
      const result = await updateRepairCost(repairCost?.id, values, token);
      if (result) {
        message.success("Update successful!");
        onRepairCostUpdated?.();
        onClose();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Update failed. Please try again!");
    }
  };

  return (
    <Modal
      title="Cập nhật Repair Cost"
      open={!!repairCost}
      onCancel={onClose}
      footer={null}
      className="rounded-lg"
      centered
    >
      <Form form={form} layout="vertical" onValuesChange={checkFormValidity}>
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
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
          rules={[
            { required: true, message: "Vui lòng nhập giá tiền nhỏ nhất!" },
            // {
            //   type: "number",
            //   min: 1000,
            //   max: 10000000,
            //   message: "Giá tiền phải từ 1.000 đến 10.000.000!",
            // },
          ]}
        >
          <Input placeholder="Nhập giá tiền" type="number" onChange={() => form.validateFields(["max"])}/>
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
                  return Promise.reject(new Error("Giá tiền lớn nhất phải lớn hơn giá tiền nhỏ nhất!"));
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
          <Button type="primary" block onClick={handleUpdate} disabled={!isFormValid}>
            Update Repair Cost
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}