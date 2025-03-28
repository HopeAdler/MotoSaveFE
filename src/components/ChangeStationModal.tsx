import { RetweetOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { StaffsInStations } from "../models/StaffsInStations";
import { Stations } from "../models/Stations";
import { changeStaffStation, getAllStations } from "../services/beAPIs";

interface ChangeStationModalProps {
  staff: StaffsInStations;
  onStationChanged?: () => void;
}

export default function ChangeStationModal(
  {
    staff,
    onStationChanged
  }: ChangeStationModalProps
) {
  const { token } = useContext(AuthContext);
  const [stations, setStations] = useState<Stations[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  // Fetch stations
  const fetchAllStations = async () => {
    try {
      setLoading(true);
      const results = await getAllStations();
      setStations(results);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchAllStations();
    }
  }, [isModalOpen]);

  const handleConfirm = async () => {
    if (!selectedStation) return;
    setConfirmLoading(true);

    try {
      console.log(`Assigned staff ${staff.fullname} to station ID: ${selectedStation}`);
      // TODO: Call API to update staff's station
      await changeStaffStation(staff.staffid, selectedStation, token);
      setIsModalOpen(false);
      message.success('Chuyển trạm thành công');
      onStationChanged && onStationChanged();
    } catch (error) {
      console.error("Error updating station:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <Button
        type="primary"
        className="rounded-full"
        icon={<RetweetOutlined />}
        onClick={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      <Modal
        title={`Chọn trạm cho ${staff.fullname}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {/* Station selection dropdown */}
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn trạm"
          loading={loading}
          onChange={(value) => setSelectedStation(value)}
        >
          {stations
            .filter((station) => station.id !== staff.stationid)
            .map((station) => (
              <Select.Option key={station.id} value={station.id}>
                {station.name}
              </Select.Option>
            ))}

        </Select>

        {/* Confirmation button (only shows after selection) */}
        {selectedStation && (
          <Button
            type="primary"
            block
            className="mt-4"
            onClick={handleConfirm}
            loading={confirmLoading}
          >
            Xác nhận chuyển trạm
          </Button>
        )}
      </Modal>
    </>
  );
};
