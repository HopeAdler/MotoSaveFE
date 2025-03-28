
export interface StaffAccountCreatFields {
  username: string,
  password: string,
  fullName: string,
  phone: string,
  roleId: number
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

