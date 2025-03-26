import { message } from "antd";
import axios from "axios";
import { StaffAccountCreatFields } from "../models/Staffs";

export async function getAllStaffs(token: string): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/auth/staffs",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs", error);
    message.error("Không thể lấy danh sách nhân viên");
    throw error;
  }
}

export async function getAllStationss(): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/stations"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs", error);
    message.error("Không thể lấy danh sách trạm sửa");
    throw error;
  }
}

export async function createStaffAccount(
  payload: StaffAccountCreatFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.post(
      "https://motor-save-be.vercel.app/api/v1/auth/staffs",
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể tạo nhân viên");
    console.error("Error creating staff", error);
    throw error;
  }
}