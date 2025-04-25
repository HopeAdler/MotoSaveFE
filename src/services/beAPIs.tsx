import { message } from "antd";
import axios from "axios";
import { AccessoryFields, DistanceRateUpdateFields, RepairCostFields, ServicePackageUpdateFields, StaffAccountCreatFields, StaffAssignFields, StationCreateFields } from "../models/FormFields";
import { Accessory } from "../models/Accessories";

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

export async function getAllBrand(): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/brands"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching brands", error);
    throw error;
  }
}

export async function getAllPartCateories(): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/partcategories"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching partcategories", error);
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

export async function getDistanceRates(): Promise<any> {
  try {
    const response = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/distance"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching distancerate", error);
    message.error("Không thể lấy tỉ giá khoảng cách");
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

export async function createStation(
  payload: StationCreateFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.post(
      "https://motor-save-be.vercel.app/api/v1/stations",
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể tạo trạm mới");
    console.error("Error creating station", error);
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

export async function updateDistanceRate(
  disRateId: number,
  payload: DistanceRateUpdateFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.put(
      `https://motor-save-be.vercel.app/api/v1/distance/${disRateId}`,
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể cập nhật giá tiền cho khoảng này");
    console.error("Error updating distancerate", error);
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

export async function createAccessory(
  payload: AccessoryFields,
  token: string
): Promise<any> {
  try {
    const response = await axios.post(
      "https://motor-save-be.vercel.app/api/v1/accessories",
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể tạo accessory");
    console.error("Error creating accessory", error);
    throw error;
  }
}

export async function updateAccessory(
  id: number | any,
  payload: Accessory,
  token: string
): Promise<any> {
  try {
    const response = await axios.put(
      `https://motor-save-be.vercel.app/api/v1/accessories/${id}`,
      payload,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    message.error("Không thể update accessory");
    console.error("Error updating accessory", error);
    throw error;
  }
}
