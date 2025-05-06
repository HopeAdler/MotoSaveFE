import { Alert, Button, Form, Input, message, Modal, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createRepairCost, getAllPartCateories } from "../services/beAPIs";
import { PartCategories } from "../models/PartCategories";
import { useWatch } from "antd/es/form/Form";

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
  const [partCategories, setPartCategories] = useState<PartCategories[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const repairPackageId = useWatch('repairpackageid', form);
  const partCategoryId = useWatch('partcategoryid', form);
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
    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const fetchPartCategories = async () => {
    try {
      const results = await getAllPartCateories();
      if (results) setPartCategories(results);
    } catch (error) {
      console.error("Error fetching partcategories:", error);
    }
  }

  useEffect(() => {
    fetchPartCategories();
  }, [])

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const parsedValues = {
        ...values,
        rate: parseFloat(values.rate),
        wage: parseFloat(values.wage),
        min: parseFloat(values.min),
        max: parseFloat(values.max),
      };
      console.log(parsedValues)
      setError(null);
      const result = await createRepairCost(parsedValues, token);
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

  useEffect(() => {
    if (repairPackageId !== 2) {
      form.setFieldsValue({ partcategoryid: null });
      form.setFieldsValue({ rate: 0 });
    }
    if (repairPackageId !== 1) {
      form.setFieldsValue({ wage: 0 });
    }
  }, [repairPackageId, form]);

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

          <Form.Item label="Gói sửa xe" name="repairpackageid">
            <Select placeholder="Chọn gói sửa xe">
              <Select.Option value={1}>Cơ bản (sửa, vệ sinh)</Select.Option>
              <Select.Option value={2}>Thay thế (thay mới)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Loại linh kiện"
            name="partcategoryid"
            shouldUpdate
          >
            <Select
              placeholder="Chọn loại linh kiện"
              disabled={repairPackageId !== 2}
            >
              {partCategories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tỉ giá linh kiện (để tính công thợ)"
            name="rate"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tỉ giá linh kiện!",
              },
              () => ({
                validator(_, value) {
                  const num = parseFloat(value);
                  if (isNaN(num)) {
                    return Promise.reject(new Error("Giá trị phải là một số!"));
                  }
                  if ((num <= 0 || num > 0.5) && repairPackageId === 2) {
                    return Promise.reject(new Error("Tỉ lệ lương phải từ 0 đến 0.5!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              placeholder="Nhập tỉ lệ từ 0 - 0.5"
              type="number"
              max={0.5}
              step={0.01}
              defaultValue={0}
              disabled={(repairPackageId !== 2) || (!partCategoryId)}
              onChange={() => form.validateFields(["rate"])}
            />
          </Form.Item>

          <Form.Item
            label="Công thợ cơ bản"
            name="wage"
            rules={[{ required: true, message: "Vui lòng nhập tiền lương cơ bản!" }]}
          >
            <Input
              placeholder="Nhập tiền lương"
              type="number"
              defaultValue={0}
              disabled={repairPackageId !== 1}
              onChange={() => form.validateFields(["wage"])}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền nhỏ nhất"
            name="min"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền nhỏ nhất!",
              },
              () => ({
                validator(_, value) {
                  const num = parseFloat(value);
                  if (isNaN(num)) {
                    return Promise.reject(new Error("Giá trị phải là một số!"));
                  }
                  if (num < 10000 || num > 5000000) {
                    return Promise.reject(new Error("Giá tiền phải từ 10.000 đến 300.000!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              placeholder="Nhập giá tiền"
              type="number"
              onBlur={() => form.validateFields(["min", "max"])}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền lớn nhất"
            name="max"
            dependencies={["min"]}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền lớn nhất!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minValue = parseFloat(getFieldValue("min"));
                  const maxValue = parseFloat(value);
                  if (isNaN(maxValue)) {
                    return Promise.reject(new Error("Giá trị phải là một số!"));
                  }
                  if (maxValue < 10000 || maxValue > 5000000) {
                    return Promise.reject(new Error("Giá tiền phải từ 10.000 đến 5.000.000!"));
                  }
                  if (!isNaN(minValue) && maxValue <= minValue) {
                    return Promise.reject(new Error("Giá tiền lớn nhất phải lớn hơn giá tiền nhỏ nhất!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              placeholder="Nhập giá tiền"
              type="number"
              onBlur={() => form.validateFields(["max"])}
            />
          </Form.Item>

          {/* Display error */}
          {error && <Alert message={error} type="error" className="mb-4" />}
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              block
              onClick={handleCreate}
              // disabled={!isFormValid}
            >
              Create repair cost
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
