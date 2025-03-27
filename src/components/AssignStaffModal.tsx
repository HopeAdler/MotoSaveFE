import { PlusCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Form, message, Modal } from "antd";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { assignStaffAccount } from "../services/beAPIs";
import UnassignedStaffsTable from "./UnassignedStaffTable";

interface AssignStaffModalProps {
  stationId: string;
  onStaffAssigned?: () => void;
}

export default function AssignStaffModal(
  {
    stationId,
    onStaffAssigned
  }: AssignStaffModalProps
) {
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null); // Store API error
  // Handle modal open/close
  const showModal = () => {
    setError(null);
    setIsModalOpen(true);
  }
  const handleCancel = () => setIsModalOpen(false);

  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  // Handle form submission
  const handleAssign = async () => {
    try {
      console.log("values: ", selectedStaffIds);
      setError(null); // Clear previous errors

      // Process each staff id sequentially.
      for (const staffId of selectedStaffIds) {
        const payload = { stationId, staffId }
        await assignStaffAccount(payload, token);
      }

      // After processing all IDs, show success message.
      message.success("Các nhân viên đã được thêm vào trạm này!");
      setIsModalOpen(false);
      form.resetFields();
      onStaffAssigned && onStaffAssigned();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại!"
      );
    }
  };

  const handleConfirmAssign = () => {
    Modal.confirm({
      title: "Xác nhận thêm nhân viên?",
      content: `Bạn có chắc chắn muốn thêm ${selectedStaffIds.length} nhân viên này?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      onOk: handleAssign, // Calls handleAssign when user confirms
    });
  };

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <Button type="primary" icon={<PlusCircleOutlined />}
        onClick={showModal}>
        Thêm nhân viên vào trạm
      </Button>

      {/* Modal */}
      <Modal
        title="Chọn nhân viên từ danh sách dưới đây để thêm vào trạm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Custom footer with a button
        centered // ✅ Centers modal vertically
        width="auto" // ✅ Allows modal to wrap content properly
        className="rounded-lg"
      >
        <div className="p-5 flex flex-col items-center"> {/* ✅ Ensures spacing and alignment */}
          <UnassignedStaffsTable setSelectedStaffIds={setSelectedStaffIds} />

          {selectedStaffIds.length > 0 && (
            <Button type="primary" className="mt-4"
              onClick={handleConfirmAssign}>
              Xác nhận thêm {selectedStaffIds.length} nhân viên này
            </Button>
          )}
        </div>
        {/* Display error */}
        {error && <Alert message={error} type="error" className="mb-4" />}
      </Modal>


    </div>
  );
}
