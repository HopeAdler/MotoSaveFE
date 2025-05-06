import { Alert, Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { PartCategories } from "../models/PartCategories";
import { RepairCost } from "../models/RepairCost";
import { getAllPartCateories, updateRepairCost } from "../services/beAPIs"; // Replace with actual update API function

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

  const repairpackagename = useWatch('repairpackagename', form);
  const partCategoryId = useWatch('partcategoryid', form);

  const [partCategories, setPartCategories] = useState<PartCategories[]>([]);

  // Set form values when repairCost changes
  useEffect(() => {
    if (repairCost) {
      form.setFieldsValue(repairCost);
      checkFormValidity();
      console.log(repairCost)
    }
  }, [repairCost]);

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
  // Check form validity
  const checkFormValidity = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => {
      console.log(errors);
      return errors.length > 0;
    });

    setIsFormValid(form.isFieldsTouched(true) && !hasErrors);
  };

  const handleUpdate = async () => {
    try {
      console.log(isFormValid)
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
          label="Gói sửa chữa"
          name="repairpackagename"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input placeholder="Nhập tên" disabled />
        </Form.Item>

        {repairpackagename === "Addons" &&
          <Form.Item
            label="Loại linh kiện"
            name="partcategoryid"
            shouldUpdate
          >
            <Select
              placeholder="Chọn loại linh kiện"
              defaultValue={partCategoryId}
              disabled={repairpackagename !== "Addons"}
            >
              {partCategories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        }

        <Form.Item
          label="Giá tiền nhỏ nhất"
          name="min"
          rules={[
            { required: true, message: "Vui lòng nhập giá tiền nhỏ nhất!" },
            {
              type: "number",
              min: 1000,
              max: 10000000,
              message: "Giá tiền phải từ 1.000 đến 10.000.000!",
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Nhập giá tiền"
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
                  return Promise.reject(new Error("Giá tiền lớn nhất phải lớn hơn giá tiền nhỏ nhất!"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder="Nhập giá tiền" type="number" />
        </Form.Item>

        <Form.Item
          label="Tỉ lệ lương"
          name="rate"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tỉ lệ tính lương!",
            },
            () => ({
              validator(_, value) {
                const num = parseFloat(value);
                if (isNaN(num)) {
                  return Promise.reject(new Error("Giá trị phải là một số!"));
                }
                if ((num <= 0 || num > 0.5) && repairpackagename === "Addons") {
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
            disabled={(repairpackagename !== "Addons") || (!partCategoryId)}
            onChange={() => form.validateFields(["rate"])}
          />
        </Form.Item>


        <Form.Item
          label="Lương cơ bản"
          name="wage"
          rules={[{ required: true, message: "Vui lòng nhập tiền lương cơ bản!" }]}
        >
          <Input
            placeholder="Nhập tiền lương"
            type="number"
            disabled={repairpackagename !== "Basic"}
            onChange={() => form.validateFields(["wage"])}
          />
        </Form.Item>
        {/* Display error */}
        {error && <Alert message={error} type="error" className="mb-4" />}

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" block onClick={handleUpdate}
          //  disabled={!isFormValid}
           >
            Update Repair Cost
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}