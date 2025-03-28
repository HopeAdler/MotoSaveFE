import { Modal, message } from "antd";
import axios from "axios";

export const deleteRepairCost = async (id: number, token: string, onSuccess: () => void) => {
  Modal.confirm({
    title: "Delete Confirm",
    content: "Are you sure delete this repair cost?",
    okText: "Delete",
    cancelText: "Cancel",
    okType: "danger",
    async onOk() {
      try {
        await axios.delete(`https://motor-save-be.vercel.app/api/v1/repaircostpreviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Delete success!");
        onSuccess();
      } catch (error: any) {
        message.error(error.response?.data?.message || "Delete failed, please try again!");
      }
    },
  });
};