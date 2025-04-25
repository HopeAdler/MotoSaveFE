import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { updateAccessory } from "../services/beAPIs"; // Replace with actual update API function
import { Accessory } from "../models/Accessories";

interface UpdateAccessoryModalProps {
  accessory: Accessory | null;
  onAccessoryUpdated?: () => void;
  onClose: () => void;
}

export default function UpdateAccessoryModal({
  accessory,
  onAccessoryUpdated,
  onClose,
}: UpdateAccessoryModalProps) {
  const { token } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Set form values when accessory changes
  useEffect(() => {
    if (accessory) {
      form.setFieldsValue(accessory);
      checkFormValidity();
    }
  }, [accessory]);

  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setError(null);

      const result = await updateAccessory(accessory?.id, values, token);
      if (result) {
        message.success("Update successful!");
        onAccessoryUpdated?.();
        onClose();
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Update failed. Please try again!"
      );
    }
  };

  return (
    <Modal
      title="Update Accessory"
      open={!!accessory}
      onCancel={onClose}
      footer={null}
      className="rounded-lg"
      centered
    >
      <Form form={form} layout="vertical" onValuesChange={checkFormValidity}>
        <Form.Item
          label="Accessory Name"
          name="accessoryname"
          rules={[{ required: true, message: "Please input accessory name!" }]}
        >
          <Input placeholder="Input name" />
        </Form.Item>

        <Form.Item
          label="Cost"
          name="cost"
          rules={[{ required: true, message: "Please input cost!" }]}
        >
          <Input placeholder="Input cost" type="number" />
        </Form.Item>

        {/* Display error */}
        {error && <Alert message={error} type="error" className="mb-4" />}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            block
            onClick={handleUpdate}
            disabled={!isFormValid}
          >
            Update Accessory
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
