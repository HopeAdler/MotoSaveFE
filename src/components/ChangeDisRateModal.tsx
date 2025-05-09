import { ArrowRightOutlined, EditFilled } from "@ant-design/icons";
import { Button, Input, message, Modal, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { DistanceRates } from "../models/DistanceRate";
import { formatMoney } from "../utils/Utils";
import { updateDistanceRate } from "../services/beAPIs";

const { Text } = Typography;

interface ChangeDisRateModalProps {
  distanceRate: DistanceRates;
  onDisRateChanged?: () => void;
}

export default function ChangeDistanceRateModal(
  {
    distanceRate,
    onDisRateChanged
  }: ChangeDisRateModalProps
) {
  const { token } = useContext(AuthContext);
  const [editedMoney, setEditedMoney] = useState<any>(distanceRate.moneyperkm);  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (isModalOpen) {
      // fetchAllStations();
    }
  }, [isModalOpen]);

  const handleConfirm = async () => {
    if (!editedMoney) return;
    setLoading(true);
    const payload = {moneyperkm : editedMoney}
    try {
      // TODO: Call API to update staff's station
      await updateDistanceRate(distanceRate.id, payload, token);
      setIsModalOpen(false);
      message.success('Cập nhật giá tiền thành công');
      onDisRateChanged && onDisRateChanged();
    } catch (error) {
      console.error("Error updating distance rate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <Button
        type="primary"
        className="rounded-full"
        icon={<EditFilled />}
        onClick={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      <Modal
        title={`Thay đổi giá tiền cho khoảng: ${distanceRate.name}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="flex-wrap"
      >
        <div className="flex items-center space-x-2">
          <span>{formatMoney(distanceRate.moneyperkm)} <ArrowRightOutlined /></span>
          <Input
            required
            defaultValue={distanceRate.moneyperkm}
            value={editedMoney}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
              setEditedMoney(value);
            }}
            className="w-fit border border-gray-300 rounded-md text-center"
            type="number"
            step={500}
            max={20000}
            min={10000}
          /> VNĐ
        </div>
        {
          (editedMoney === null || editedMoney === "" || editedMoney > 60000 || editedMoney < 40000) ? (
            <Text type="danger" className="text-red-500 mt-1 text-sm">
              {editedMoney === null || editedMoney === "" ? "Money is required" : "Money must be between 40.000 and 60.000"}
            </Text>
          ) : (
            <Button
              type="primary"
              block
              className="mt-4"
              loading={loading}
              onClick={handleConfirm}
            >
              Xác nhận cập nhật giá tiền
            </Button>
          )}
      </Modal>


    </>
  );
};
