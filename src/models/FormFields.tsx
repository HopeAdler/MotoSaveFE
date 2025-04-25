
export interface StaffAccountCreatFields {
  username: string,
  password: string,
  fullName: string,
  phone: string,
  roleId: number
}

export interface StationCreateFields {
  name: string,
  address: string,
  long: number,
  lat: number,
}

export interface StaffAssignFields {
  stationId: string,
  staffId: string,
}
export interface ServicePackageUpdateFields {
  name: string,
  description: string,
  rate: number,
}

export interface RepairCostFields {
  name: string,
  description: string,
  min: string,
  max: string,
}

export interface AccessoryFields {
  partcategoryid: number,
  brandId: number,
  name: string,
  cost: number,
}
export interface DistanceRateUpdateFields {
  moneyperkm: number,
}

