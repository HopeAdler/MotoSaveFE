import { message } from "antd";
import axios from "axios";
import { RepairCostFields, ServicePackageUpdateFields, StaffAccountCreatFields, StaffAssignFields } from "../models/FormFields";

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

export async function getStaffsInStation(stationId: string, token: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://motor-save-be.vercel.app/api/v1/staffinstations/${stationId}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching staffs in this station", error);
    message.error("Không thể lấy danh sách nhân viên");
    throw error;
  }
}

export async function getUnAssignedStaffs(token: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://motor-save-be.vercel.app/api/v1/staffinstations/unAssignedStaffs`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching unassigned staffs", error);
    message.error("Không thể lấy danh sách nhân viên");
    throw error;
  }
}

export async function getAllStations(): Promise<any> {
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

export async function getServicePackages(): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/servicepackages"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching service packages", error);
    message.error("Không thể lấy các gói dịch vụ");
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

export async function assignStaffAccount(
  payload: StaffAssignFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.post(
      "https://motor-save-be.vercel.app/api/v1/staffinstations",
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể thêm nhân viên vào trạm");
    console.error("Error assigning staff", error);
    throw error;
  }
}

export async function changeStaffStation(
  staffId: string,
  stationId: string,
  token: string
): Promise<any> {
  try {
    const response = await axios.put(
      `https://motor-save-be.vercel.app/api/v1/staffinstations/${staffId}/station`,
      { stationId },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể chuyển trạm cho nhân viên");
    console.error("Error assigning staff", error);
    throw error;
  }
}

export async function updateServicePackage(
  serPackId: string,
  payload: ServicePackageUpdateFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.put(
      `https://motor-save-be.vercel.app/api/v1/servicepackages/${serPackId}`,
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể chuyển trạm cho nhân viên");
    console.error("Error assigning staff", error);
    throw error;
  }
}

export async function createRepairCost(
  payload: RepairCostFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.post(
      "https://motor-save-be.vercel.app/api/v1/repaircostpreviews",
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể tạo repair cost");
    console.error("Error creating repair cost", error);
    throw error;
  }
}

export async function updateRepairCost(
  id: number | any,
  payload: RepairCostFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.put(
      `https://motor-save-be.vercel.app/api/v1/repaircostpreviews/${id}`,
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể update repair cost");
    console.error("Error updating repair cost", error);
    throw error;
  }
}
