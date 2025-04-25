import { Alert, Button, Form, Input, message, Modal, Select, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createAccessory, getAllBrand, getAllPartCateories } from "../services/beAPIs";

const { Option } = Select;

interface CreateAccessoryModalProps {
  onAccessoryCreated?: () => void;
}

export default function CreateAccessoryModal({
    onAccessoryCreated,
}: CreateAccessoryModalProps) {
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [partCategories, setPartCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      const result = await createAccessory(values, token);
      if (result) {
        message.success("Create success!");
        setIsModalOpen(false);
        form.resetFields();
        setIsFormValid(false);
        onAccessoryCreated?.();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Please try again!");
    }
  };

  const fetchDropdownData = async () => {
    try {
      setLoading(true);
      const [brandsData, partCategoryData] = await Promise.all([
        getAllBrand(),
        getAllPartCateories(),
      ]);
      setBrands(brandsData);
      setPartCategories(partCategoryData);
    } catch (err) {
      console.error("Error fetching dropdown data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchDropdownData();
    }
  }, [isModalOpen]);

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <Button type="primary" onClick={showModal}>
        Create new accessory
      </Button>

      {/* Modal */}
      <Modal
        title="Create new accessory"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer with a button
        className="rounded-lg"
        centered
      >
        {loading ? (
          <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
        ) : (
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

            <Form.Item
              label="Brand"
              name="brandId"
              rules={[{ required: true, message: "Please select brand!" }]}
            >
              <Select placeholder="Select brand">
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Part Category"
              name="partcategoryid"
              rules={[{ required: true, message: "Please select part category!" }]}
            >
              <Select placeholder="Select part category">
                {partCategories.map((part) => (
                  <Option key={part.id} value={part.id}>
                    {part.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {error && <Alert message={error} type="error" className="mb-4" />}

            <Form.Item>
              <Button
                type="primary"
                block
                onClick={handleCreate}
                disabled={!isFormValid}
              >
                Create accessory
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}
